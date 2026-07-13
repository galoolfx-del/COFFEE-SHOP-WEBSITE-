import { qs, qsa, on } from '../utils/dom.js';

export function initClipboard() {
  const toast = qs('#copyToast');

  qsa('[data-copy]').forEach((el) => {
    on(el, 'click', async () => {
      const value = el.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // Clipboard API unavailable (e.g. insecure context) — fail silently,
        // the value is still visible in the card for manual copy.
      }
      if (toast) {
        toast.classList.add('is-visible');
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
      }
    });
  });
}
