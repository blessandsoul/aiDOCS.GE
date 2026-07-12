import assert from 'node:assert/strict';
import test from 'node:test';

import * as docsDemoModels from './docs-demo-models.mjs';
import { createDemoLoop } from '../home/components/lib/demo-loop.mjs';

const {
  ACCURACY_LINES,
  SIGNOFF_STAGES,
  createTimelinePlayer,
  partitionFields,
  signoffFrame,
} = docsDemoModels;

const FIELDS = [
  { id: 'supplier', confidence: 99 },
  { id: 'total', confidence: 97 },
  { id: 'date', confidence: 68, bad: true },
  { id: 'purpose', confidence: 39, bad: true },
];

function createClock() {
  let now = 0;
  let id = 0;
  const pending = new Map();

  return {
    setTimeout(callback, delay) {
      const timerId = ++id;
      pending.set(timerId, { callback, at: now + delay });
      return timerId;
    },
    clearTimeout(timerId) {
      pending.delete(timerId);
    },
    advance(milliseconds) {
      const target = now + milliseconds;

      while (true) {
        const next = [...pending.entries()]
          .filter(([, timer]) => timer.at <= target)
          .sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];

        if (!next) break;
        const [timerId, timer] = next;
        pending.delete(timerId);
        now = timer.at;
        timer.callback();
      }

      now = target;
    },
    get pendingCount() {
      return pending.size;
    },
  };
}

function createLoopHarness() {
  let callback;
  const listeners = new Map();
  const document = {
    hidden: false,
    addEventListener(name, next) { listeners.set(name, next); },
    removeEventListener(name) { listeners.delete(name); },
  };
  class Observer {
    constructor(next) { callback = next; }
    observe() {}
    disconnect() {}
  }
  return {
    Observer,
    document,
    enter(target) { callback([{ target, isIntersecting: true, intersectionRatio: 1 }]); },
    leave(target) { callback([{ target, isIntersecting: false, intersectionRatio: 0 }]); },
    hide() { document.hidden = true; listeners.get('visibilitychange')?.(); },
  };
}

test('safe line holds known bad fields for a human', () => {
  assert.deepEqual(ACCURACY_LINES, [96, 80, 65, 80]);

  const result = partitionFields(FIELDS, 80);

  assert.equal(result.wrong.length, 0);
  assert.deepEqual(
    result.human.filter((field) => field.bad).map((field) => field.id),
    ['date', 'purpose'],
  );
  assert.equal(result.auto.length + result.human.length + result.wrong.length, FIELDS.length);
});

test('initial confidence line matches the motion preference', () => {
  const { initialAccuracyLine } = docsDemoModels;

  assert.equal(typeof initialAccuracyLine, 'function');
  assert.equal(initialAccuracyLine(false), 96);
  assert.equal(initialAccuracyLine(null), 96);
  assert.equal(initialAccuracyLine(true), 80);
});

test('unsafe low line auto-posts the deliberately bad date', () => {
  const result = partitionFields(FIELDS, 65);

  assert.deepEqual(result.wrong.map((field) => field.id), ['date']);
  assert.deepEqual(result.human.map((field) => field.id), ['purpose']);
});

test('only the signed frame can become ORIS-ready', () => {
  assert.deepEqual(SIGNOFF_STAGES, ['held', 'corrected', 'drafted', 'signed']);

  for (const stage of SIGNOFF_STAGES.slice(0, -1)) {
    const frame = signoffFrame(stage);
    assert.notEqual(frame.record, 'oris-ready');
    assert.notEqual(frame.approval, 'signed');
    assert.equal(frame.resultKey, null);
  }
});

test('signed stage is explicitly accountant-approved', () => {
  assert.deepEqual(signoffFrame('signed'), {
    correctedDate: '2026-07-06',
    record: 'oris-ready',
    approval: 'signed',
    resultKey: 'orisReady',
  });
});

test('confidence autoplay follows the exact four-line sequence over 7200ms', () => {
  const clock = createClock();
  const seen = [];
  const player = createTimelinePlayer({
    stages: ACCURACY_LINES,
    onStage: (line) => seen.push(line),
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
  });

  player.play();
  assert.deepEqual(seen, [96]);

  clock.advance(2400);
  assert.deepEqual(seen, [96, 80]);

  clock.advance(2400);
  assert.deepEqual(seen, [96, 80, 65]);

  clock.advance(2399);
  assert.deepEqual(seen, [96, 80, 65]);

  clock.advance(1);
  assert.deepEqual(seen, [96, 80, 65, 80]);
});

test('cancel preserves a user line and replay restores autoplay from 96', () => {
  const clock = createClock();
  const seen = [];
  const player = createTimelinePlayer({
    stages: ACCURACY_LINES,
    onStage: (line) => seen.push(line),
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
  });

  player.play();
  clock.advance(2400);
  player.cancel();
  seen.push(72);
  clock.advance(7200);
  assert.deepEqual(seen, [96, 80, 72]);
  assert.equal(clock.pendingCount, 0);

  player.replay();
  assert.equal(seen.at(-1), 96);
  assert.equal(clock.pendingCount, 3);
  clock.advance(7200);
  assert.deepEqual(seen.slice(-4), ACCURACY_LINES);
});

test('reduced motion renders the safe 80 line without timers', () => {
  const clock = createClock();
  const seen = [];
  const player = createTimelinePlayer({
    stages: ACCURACY_LINES,
    onStage: (line) => seen.push(line),
    reducedMotion: true,
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
  });

  player.play();

  assert.deepEqual(seen, [80]);
  assert.equal(clock.pendingCount, 0);
});

test('canonical loop starts when visible, holds the final state for 2000ms, then repeats', () => {
  const clock = createClock();
  const harness = createLoopHarness();
  const target = {};
  const seen = [];
  let stageTimer = null;
  const loop = createDemoLoop({
    target,
    cycleMs: 3100,
    holdMs: 2000,
    play() {
      seen.push('start');
      stageTimer = clock.setTimeout(() => seen.push('final'), 3100);
    },
    showFinal: () => seen.push('final'),
    reset: () => seen.push('reset'),
    stop() {
      if (stageTimer !== null) clock.clearTimeout(stageTimer);
      stageTimer = null;
    },
    Observer: harness.Observer,
    pageDocument: harness.document,
    schedule: clock.setTimeout,
    cancelScheduled: clock.clearTimeout,
  });

  assert.deepEqual(seen, []);
  harness.enter(target);
  assert.deepEqual(seen, ['start']);
  clock.advance(3100);
  assert.deepEqual(seen, ['start', 'final']);
  clock.advance(1999);
  assert.deepEqual(seen, ['start', 'final']);
  clock.advance(1);
  assert.deepEqual(seen, ['start', 'final', 'reset', 'start']);
  loop.cleanup();
});

test('canonical loop resets offscreen and when the page is hidden', () => {
  const clock = createClock();
  const harness = createLoopHarness();
  const target = {};
  const seen = [];
  const loop = createDemoLoop({
    target,
    cycleMs: 100,
    holdMs: 2000,
    play: () => seen.push('play'),
    showFinal: () => seen.push('final'),
    reset: () => seen.push('reset'),
    stop: () => seen.push('stop'),
    Observer: harness.Observer,
    pageDocument: harness.document,
    schedule: clock.setTimeout,
    cancelScheduled: clock.clearTimeout,
  });
  harness.enter(target);
  harness.leave(target);
  assert.deepEqual(seen, ['play', 'stop', 'reset']);
  harness.enter(target);
  harness.hide();
  assert.deepEqual(seen.slice(-3), ['play', 'stop', 'reset']);
  loop.cleanup();
});

test('manual control persists until replay explicitly resumes autoplay', () => {
  const clock = createClock();
  const harness = createLoopHarness();
  const target = {};
  const seen = [];
  const loop = createDemoLoop({
    target,
    cycleMs: 100,
    holdMs: 2000,
    play: () => seen.push('play'),
    showFinal: () => seen.push('final'),
    reset: () => seen.push('reset'),
    stop: () => seen.push('stop'),
    Observer: harness.Observer,
    pageDocument: harness.document,
    schedule: clock.setTimeout,
    cancelScheduled: clock.clearTimeout,
  });
  harness.enter(target);
  loop.takeControl();
  seen.push('manual');
  clock.advance(5000);
  assert.equal(seen.at(-1), 'manual');
  loop.replay();
  assert.deepEqual(seen.slice(-3), ['stop', 'reset', 'play']);
  loop.cleanup();
});
