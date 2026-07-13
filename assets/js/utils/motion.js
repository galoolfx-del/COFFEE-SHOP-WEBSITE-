// Shared feature-detection so every module respects the same rules.
export const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer =
  window.matchMedia('(pointer: fine)').matches && !('ontouchstart' in window);
