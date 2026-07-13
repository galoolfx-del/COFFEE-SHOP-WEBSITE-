import { qs } from '../utils/dom.js';
import { prefersReducedMotion } from '../utils/motion.js';

// A brief, tasteful loading sequence — hides once the page is ready,
// with a hard cap so a slow connection never traps the visitor behind it.
export function initPreloader() {
  const el = qs('#preloader');
  if (!el) return;

  if (prefersReducedMotion) {
    el.remove();
    document.body.classList.remove('is-loading');
    return;
  }

  const hide = () => {
    el.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
    setTimeout(() => el.remove(), 700);
  };

  const cap = setTimeout(hide, 1400);

  window.addEventListener('load', () => {
    clearTimeout(cap);
    setTimeout(hide, 350);
  });
}
