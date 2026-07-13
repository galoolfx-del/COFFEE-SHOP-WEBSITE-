// Debounce: delays invocation until `wait` ms of silence.
export function debounce(fn, wait = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

// Throttle via rAF: at most once per animation frame — ideal for scroll/pointer handlers.
export function rafThrottle(fn) {
  let scheduled = false;
  return (...args) => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      fn(...args);
      scheduled = false;
    });
  };
}
