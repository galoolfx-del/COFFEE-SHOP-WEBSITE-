import { qsa } from '../utils/dom.js';
import { prefersReducedMotion } from '../utils/motion.js';

// Reveals .reveal elements (and staggers children of [data-stagger]
// containers) as they enter the viewport. One observer, many targets —
// cheap and avoids per-element scroll listeners entirely.
export function initReveal() {
  const targets = qsa('.reveal, [data-stagger]');
  if (!targets.length) return;

  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
