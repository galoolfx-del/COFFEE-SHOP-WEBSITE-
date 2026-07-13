import { qs, qsa } from '../utils/dom.js';
import { isFinePointer } from '../utils/motion.js';

// Custom dot + ring cursor with magnetic buttons — fine pointer devices only.
// Touch devices never see this code path run, so there is zero cost for them.
export function initCursor() {
  if (!isFinePointer) return;

  const dot = qs('#cursorDot');
  const ring = qs('#cursorRing');
  if (!dot || !ring) return;

  document.body.classList.add('cursor-ready');

  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  // Ring trails the cursor with easing for a premium, weighted feel.
  const tick = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  qsa('[data-hover]').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
  });

  // Magnetic pull on CTAs
  qsa('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}
