import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const COMPONENTS = [
  {
    file: 'DocsAccuracy.tsx',
    root: /<div ref=\{sectionRef\}>\s*<span className="text-\[12px\] uppercase/,
  },
  {
    file: 'DocsHumanSignoff.tsx',
    root: /<div\s+ref=\{sectionRef\}\s+className="min-w-0 rounded-2xl bg-\[#fafafa\] p-5/,
  },
];

test('timeline remains stopped until intersection and starts only once', async () => {
  const { startTimelineWhenVisible } = await import('./docs-demo-visibility.mjs');
  const observer = createObserverHarness();
  const node = { id: 'docs-demo' };
  let plays = 0;

  const cleanup = startTimelineWhenVisible({
    node,
    reducedMotion: false,
    play: () => {
      plays += 1;
    },
    createObserver: observer.create,
  });

  assert.equal(plays, 0);
  assert.equal(observer.observedNode(), node);
  assert.deepEqual(observer.options(), { threshold: 0.35 });

  observer.trigger(false);
  assert.equal(plays, 0);

  observer.trigger(true, 0.34);
  assert.equal(plays, 0);

  observer.trigger(true, 0.35);
  observer.trigger(true, 1);
  assert.equal(plays, 1);
  assert.equal(observer.disconnectCount(), 1);

  cleanup();
  assert.equal(observer.disconnectCount(), 1);
});

test('cleanup invalidates a callback that was already queued by the observer', async () => {
  const { startTimelineWhenVisible } = await import('./docs-demo-visibility.mjs');
  const observer = createObserverHarness();
  let plays = 0;

  const cleanup = startTimelineWhenVisible({
    node: { id: 'docs-demo' },
    reducedMotion: false,
    play: () => {
      plays += 1;
    },
    createObserver: observer.create,
  });

  cleanup();
  observer.trigger(true);

  assert.equal(plays, 0);
  assert.equal(observer.disconnectCount(), 1);
});

test('reduced motion emits the final player state immediately without observing', async () => {
  const { startTimelineWhenVisible } = await import('./docs-demo-visibility.mjs');
  let plays = 0;
  let observers = 0;

  const cleanup = startTimelineWhenVisible({
    node: { id: 'docs-demo' },
    reducedMotion: true,
    play: () => {
      plays += 1;
    },
    createObserver: () => {
      observers += 1;
      throw new Error('reduced motion must not create an observer');
    },
  });

  assert.equal(plays, 1);
  assert.equal(observers, 0);
  cleanup();
});

for (const { file, root } of COMPONENTS) {
  test(`${file} gates its real story box and cleans up both lifecycles`, () => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');

    assert.match(source, /import \{ startTimelineWhenVisible \} from '\.\/docs-demo-visibility\.mjs';/);
    assert.match(source, /const sectionRef = useRef<HTMLDivElement \| null>\(null\);/);
    assert.match(
      source,
      /startTimelineWhenVisible\(\{[\s\S]*?node: sectionRef\.current,[\s\S]*?play: timeline\.play,[\s\S]*?\}\)/,
    );
    assert.match(source, root);
    assert.match(source, /stopVisibility\(\);[\s\S]*?timeline\.cancel\(\);/);
    assert.doesNotMatch(source, /timeline\.play\(\)/);
  });
}

test('DocsAccuracy manual slider cancels deferred visibility and active timers', () => {
  const source = readFileSync(new URL('DocsAccuracy.tsx', import.meta.url), 'utf8');

  assert.match(source, /const visibilityCleanupRef = useRef<\(\(\) => void\) \| null>\(null\);/);
  assert.match(source, /visibilityCleanupRef\.current = stopVisibility;/);
  assert.match(
    source,
    /const setManualLine = useCallback\(\(value: number\) => \{[\s\S]*?visibilityCleanupRef\.current\?\.\(\);[\s\S]*?visibilityCleanupRef\.current = null;[\s\S]*?playerRef\.current\?\.cancel\(\);[\s\S]*?setLine\(value\);/,
  );
});

test('DocsAccuracy hydrates from the same 96 line before reduced motion resolves', () => {
  const source = readFileSync(new URL('DocsAccuracy.tsx', import.meta.url), 'utf8');

  assert.match(source, /useState\(\(\) => initialAccuracyLine\(false\)\)/);
  assert.doesNotMatch(source, /useState\(\(\) => initialAccuracyLine\(reduced\)\)/);
  assert.match(source, /reducedMotion: Boolean\(reduced\)/);
});

function createObserverHarness() {
  let callback = null;
  let currentNode = null;
  let currentOptions = null;
  let disconnects = 0;

  return {
    create(nextCallback, options) {
      callback = nextCallback;
      currentOptions = options;
      return {
        observe(node) {
          currentNode = node;
        },
        disconnect() {
          disconnects += 1;
        },
      };
    },
    trigger(isIntersecting, intersectionRatio = isIntersecting ? 1 : 0) {
      callback?.([{ isIntersecting, intersectionRatio }]);
    },
    observedNode: () => currentNode,
    options: () => currentOptions,
    disconnectCount: () => disconnects,
  };
}
