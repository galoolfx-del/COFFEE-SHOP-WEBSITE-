import { qs, qsa, on } from '../utils/dom.js';
import { prefersReducedMotion } from '../utils/motion.js';

// Intercepts same-origin internal links to play a brief overlay wipe before
// navigating, so moving between pages feels like one continuous site
// rather than a hard reload. Falls back to instant navigation everywhere
// unsupported (new tabs, external links, reduced motion).
export function initPageTransition() {
  const overlay = qs('#page-transition');
  if (!overlay || prefersReducedMotion) return;

  qsa('a[href]').forEach((link) => {
    const url = link.getAttribute('href');
    if (!url || url.startsWith('#') || url.startsWith('http') || url.startsWith('mailto:')) return;
    if (link.target === '_blank') return;

    on(link, 'click', (e) => {
      e.preventDefault();
      overlay.classList.add('is-active');
      overlay.style.transform = 'scaleY(1)';
      setTimeout(() => {
        window.location.href = url;
      }, 420);
    });
  });

  // Reveal the incoming page smoothly rather than snapping to view.
  overlay.style.transformOrigin = 'top';
  overlay.style.transform = 'scaleY(0)';
}
