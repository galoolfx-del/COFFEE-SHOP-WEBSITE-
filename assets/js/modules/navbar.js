import { qs, qsa, on } from '../utils/dom.js';
import { rafThrottle } from '../utils/debounce.js';

export function initNavbar() {
  const header = qs('#siteHeader');
  const burger = qs('#burger');
  const navLinks = qs('#navLinks');
  const progress = qs('#scroll-progress');
  const backToTop = qs('#back-to-top');
  if (!header) return;

  let lastY = window.scrollY;

  const onScroll = rafThrottle(() => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    header.classList.toggle('is-scrolled', y > 12);

    // Hide on scroll down past the header, reveal on scroll up.
    if (y > lastY && y > header.offsetHeight * 1.5) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }
    lastY = y;

    if (progress) {
      const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
      progress.style.width = `${pct}%`;
    }

    if (backToTop) backToTop.classList.toggle('is-visible', y > 600);
  });

  on(window, 'scroll', onScroll, { passive: true });

  // Mobile menu toggle
  if (burger && navLinks) {
    on(burger, 'click', () => {
      const open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    qsa('a', navLinks).forEach((link) =>
      on(link, 'click', () => {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-active');
      })
    );
  }

  // Active link highlighting based on current page
  const current = location.pathname.split('/').pop() || 'index.html';
  qsa('[data-nav]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Back to top action
  if (backToTop) {
    on(backToTop, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
