import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const COMPONENTS = [
  ['DocsToRow.tsx', '6400'],
  ['DocsSplit.tsx', '6000'],
  ['DocsScans.tsx', '6000'],
  ['DocsAccuracy.tsx', '7200'],
  ['DocsHumanSignoff.tsx', '7200'],
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

test('hero adapter delegates lifecycle and Replay to the family workflow component', () => {
  const adapter = readFileSync(new URL('HeroProof.tsx', import.meta.url), 'utf8');
  const workflow = readFileSync(
    new URL('../home/components/HeroWorkflowStory.tsx', import.meta.url),
    'utf8',
  );

  assert.match(adapter, /<HeroWorkflowStory/u);
  assert.match(adapter, /mode="orchestrated"/u);
  assert.match(workflow, /createDemoLoop\(\{/u);
  assert.match(workflow, /threshold: 0\.35/u);
  assert.match(workflow, /holdMs: 2_000/u);
  assert.match(workflow, /showFinal,/u);
  assert.match(workflow, /reset,/u);
  assert.match(workflow, /stop,/u);
  assert.match(workflow, /controllerRef\.current\?\.replay\(\)/u);
  assert.match(workflow, /controller\.cleanup\(\)/u);
});

test('every active docs story lasts between 6 and 10 seconds before the final hold', () => {
  for (const [file] of COMPONENTS) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    const match = source.match(/cycleMs:\s*(\d+)/u);

    assert.ok(match, `${file} must declare its active story duration`);
    const cycleMs = Number(match[1]);
    assert.ok(cycleMs >= 6000, `${file} active story is only ${cycleMs}ms`);
    assert.ok(cycleMs <= 10000, `${file} active story is ${cycleMs}ms`);
  }

  const workflow = readFileSync(
    new URL('../home/components/HeroWorkflowStory.tsx', import.meta.url),
    'utf8',
  );
  const match = workflow.match(/const CYCLE_MS = ([\d_]+);/u);
  assert.ok(match, 'HeroWorkflowStory must declare its active story duration');
  const cycleMs = Number(match[1].replaceAll('_', ''));
  assert.ok(cycleMs >= 6000 && cycleMs <= 10000, `hero story duration is ${cycleMs}ms`);
  assert.match(workflow, /const ORCHESTRATED_TIMES = \[850,/u);
});

for (const [file, handler, setter] of [
  ['DocsToRow.tsx', 'showResult', 'setMs'],
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
