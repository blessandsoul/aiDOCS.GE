import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const COMPONENTS = [
  ['DocsToRow.tsx', '3100'],
  ['DocsSplit.tsx', '5600'],
  ['DocsScans.tsx', '3600'],
  ['DocsAccuracy.tsx', '7200'],
  ['DocsHumanSignoff.tsx', '7200'],
  ['HeroProof.tsx', '2100'],
];

test('docs loop wrapper applies the shared visibility and hold defaults', async () => {
  const { createDocsDemoLoop } = await import('./docs-demo-visibility.mjs');
  const observer = createObserverHarness();
  const node = { id: 'docs-demo' };
  let plays = 0;
  let finals = 0;

  const loop = createDocsDemoLoop({
    target: node,
    reducedMotion: false,
    cycleMs: 100,
    play: () => {
      plays += 1;
    },
    showFinal: () => {
      finals += 1;
    },
    reset: () => {},
    stop: () => {},
    Observer: observer.Observer,
  });

  assert.equal(plays, 0);
  assert.equal(observer.observedNode(), node);
  assert.deepEqual(observer.options(), { threshold: 0.35 });

  observer.trigger(false);
  assert.equal(plays, 0);

  observer.trigger(true, 0.34);
  assert.equal(plays, 0);

  observer.trigger(true, 0.35, node);
  assert.equal(plays, 1);
  assert.equal(finals, 0);

  loop.cleanup();
  assert.equal(observer.disconnectCount(), 1);
});

test('docs loop wrapper cleanup invalidates a queued observer callback', async () => {
  const { createDocsDemoLoop } = await import('./docs-demo-visibility.mjs');
  const observer = createObserverHarness();
  let plays = 0;
  const node = { id: 'docs-demo' };

  const loop = createDocsDemoLoop({
    target: node,
    reducedMotion: false,
    cycleMs: 100,
    play: () => {
      plays += 1;
    },
    showFinal: () => {},
    reset: () => {},
    stop: () => {},
    Observer: observer.Observer,
  });

  loop.cleanup();
  observer.trigger(true, 1, node);

  assert.equal(plays, 0);
  assert.equal(observer.disconnectCount(), 1);
});

test('docs loop wrapper reduced motion renders the final state without observing', async () => {
  const { createDocsDemoLoop } = await import('./docs-demo-visibility.mjs');
  let finals = 0;
  let observers = 0;

  const loop = createDocsDemoLoop({
    target: { id: 'docs-demo' },
    reducedMotion: true,
    cycleMs: 100,
    play: () => {},
    showFinal: () => {
      finals += 1;
    },
    reset: () => {},
    stop: () => {},
    Observer: class {
      constructor() {
      observers += 1;
      }
    },
  });

  assert.equal(finals, 1);
  assert.equal(observers, 0);
  loop.cleanup();
});

for (const [file, cycleMs] of COMPONENTS) {
  test(`${file} uses the canonical visible autoplay loop`, () => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');

    assert.match(source, /import \{ createDocsDemoLoop \} from '\.\/docs-demo-visibility\.mjs';/);
    assert.match(source, /const sectionRef = useRef<HTMLDivElement \| null>\(null\);/);
    assert.match(
      source,
      new RegExp(`createDocsDemoLoop\\(\\{[\\s\\S]*?target: sectionRef\\.current,[\\s\\S]*?cycleMs: ${cycleMs},[\\s\\S]*?play:[\\s\\S]*?showFinal:[\\s\\S]*?reset:[\\s\\S]*?stop:`),
    );
    assert.match(source, /loopRef\.current\?\.replay\(\)/);
    assert.match(source, /loop\.cleanup\(\)/);
    assert.doesNotMatch(source, /createDemoLoop|holdMs|startTimelineWhenVisible/);
  });
}

for (const [file, handler, setter] of [
  ['DocsSplit.tsx', 'place', 'setPlaced'],
  ['DocsScans.tsx', 'selectScan', 'setPick'],
  ['DocsAccuracy.tsx', 'setManualLine', 'setLine'],
]) {
  test(`${file} takes control before a manual value is stored`, () => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.match(
      source,
      new RegExp(`const ${handler} = [\\s\\S]*?\\{[\\s\\S]*?loopRef\\.current\\?\\.takeControl\\(\\);[\\s\\S]*?${setter}\\(`),
    );
  });
}

test('DocsAccuracy hydrates from the same 96 line before reduced motion resolves', () => {
  const source = readFileSync(new URL('DocsAccuracy.tsx', import.meta.url), 'utf8');

  assert.match(source, /useState\(\(\) => initialAccuracyLine\(false\)\)/);
  assert.doesNotMatch(source, /useState\(\(\) => initialAccuracyLine\(reduced\)\)/);
  assert.match(source, /showFinal: \(\) => setLine\(80\)/);
});

test('DocsToRow gives equal cell values distinct React keys', () => {
  const source = readFileSync(new URL('DocsToRow.tsx', import.meta.url), 'utf8');
  assert.match(source, /key=\{`\$\{index\}-\$\{value\}`\}/);
  assert.doesNotMatch(source, /<td key=\{value\}/);
});

function createObserverHarness() {
  let callback = null;
  let currentNode = null;
  let currentOptions = null;
  let disconnects = 0;

  return {
    Observer: class {
      constructor(nextCallback, options) {
        callback = nextCallback;
        currentOptions = options;
      }
      observe(node) {
          currentNode = node;
      }
      disconnect() {
        disconnects += 1;
      }
    },
    trigger(isIntersecting, intersectionRatio = isIntersecting ? 1 : 0, target = currentNode) {
      callback?.([{ target, isIntersecting, intersectionRatio }]);
    },
    observedNode: () => currentNode,
    options: () => currentOptions,
    disconnectCount: () => disconnects,
  };
}
