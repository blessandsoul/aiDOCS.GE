export const ACCURACY_LINES = [96, 80, 65, 80];

export const SIGNOFF_STAGES = ['held', 'corrected', 'drafted', 'signed'];

export function initialAccuracyLine(reducedMotion) {
  return reducedMotion ? (ACCURACY_LINES.at(-1) ?? 80) : (ACCURACY_LINES[0] ?? 96);
}

const SIGNOFF_FRAMES = {
  held: {
    correctedDate: null,
    record: 'held',
    approval: 'pending',
    resultKey: null,
  },
  corrected: {
    correctedDate: '2026-07-06',
    record: 'held',
    approval: 'corrected',
    resultKey: null,
  },
  drafted: {
    correctedDate: '2026-07-06',
    record: 'draft',
    approval: 'pending',
    resultKey: null,
  },
  signed: {
    correctedDate: '2026-07-06',
    record: 'oris-ready',
    approval: 'signed',
    resultKey: 'orisReady',
  },
};

export function partitionFields(fields, line) {
  const auto = [];
  const human = [];
  const wrong = [];

  for (const field of fields) {
    if (field.confidence < line) {
      human.push(field);
    } else if (field.bad) {
      wrong.push(field);
    } else {
      auto.push(field);
    }
  }

  const firstHeld = fields.findIndex((field) => field.confidence < line);

  return {
    auto,
    human,
    wrong,
    boundary: firstHeld === -1 ? fields.length : firstHeld,
  };
}

export function signoffFrame(stage) {
  const frame = SIGNOFF_FRAMES[stage];
  if (!frame) throw new RangeError(`Unknown sign-off stage: ${stage}`);
  return { ...frame };
}

export function createTimelinePlayer({
  stages,
  onStage,
  durationMs = 7200,
  reducedMotion = false,
  setTimeout: schedule = globalThis.setTimeout,
  clearTimeout: cancelScheduled = globalThis.clearTimeout,
}) {
  let timers = [];

  function cancel() {
    timers.forEach((timer) => cancelScheduled(timer));
    timers = [];
  }

  function play() {
    cancel();

    if (reducedMotion || stages.length === 1) {
      onStage(stages.at(-1));
      return;
    }

    onStage(stages[0]);
    const transitionCount = stages.length - 1;
    const firstChangeMs = Math.min(850, durationMs / transitionCount);
    timers = stages.slice(1).map((stage, index) => {
      const position = index + 1;
      const delay = transitionCount === 1
        ? firstChangeMs
        : firstChangeMs + ((durationMs - firstChangeMs) * (position - 1)) / (transitionCount - 1);
      return schedule(() => onStage(stage), delay);
    });
  }

  return { play, replay: play, cancel };
}
