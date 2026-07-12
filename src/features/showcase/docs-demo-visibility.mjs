const VISIBILITY_THRESHOLD = 0.35;

export function startTimelineWhenVisible({
  node,
  reducedMotion,
  play,
  createObserver = undefined,
}) {
  let active = true;
  let hasPlayed = false;
  let observer = null;

  const playOnce = () => {
    if (!active || hasPlayed) return false;
    hasPlayed = true;
    play();
    return true;
  };

  const disconnectObserver = () => {
    observer?.disconnect();
    observer = null;
  };

  const stop = () => {
    active = false;
    disconnectObserver();
  };

  const observerFactory = createObserver ?? (
    typeof IntersectionObserver === 'undefined'
      ? null
      : (callback, options) => new IntersectionObserver(callback, options)
  );

  if (reducedMotion || !node || !observerFactory) {
    playOnce();
    return stop;
  }

  observer = observerFactory(
    ([entry]) => {
      if (
        !entry?.isIntersecting
        || entry.intersectionRatio < VISIBILITY_THRESHOLD
        || !playOnce()
      ) return;
      disconnectObserver();
    },
    { threshold: VISIBILITY_THRESHOLD },
  );
  observer.observe(node);

  return stop;
}
