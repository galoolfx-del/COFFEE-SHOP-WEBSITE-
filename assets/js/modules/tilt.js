import { qsa } from '../utils/dom.js';
import { isFinePointer, prefersReducedMotion } from '../utils/motion.js';

// Subtle pointer-driven tilt for [data-tilt] cards. Skipped entirely on
// touch devices and when reduced motion is requested.
export function initTilt() {
  if (!isFinePointer || prefersReducedMotion) return;

  const MAX_TILT = 6; // degrees — kept subtle, not gimmicky

  qsa('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
