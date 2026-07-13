import { qsa } from '../utils/dom.js';
import { prefersReducedMotion } from '../utils/motion.js';

// Animates [data-count] targets from 0 to their target value once visible.
export function initCounters() {
  const els = qsa('[data-count]');
  if (!els.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    if (prefersReducedMotion || Number.isNaN(target)) {
      el.textContent = target;
      return;
    }
    const duration = 1400;
    const start = performance.now();

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutExpo(progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  els.forEach((el) => observer.observe(el));
}
