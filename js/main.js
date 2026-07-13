// Ember & Oak — main entry point.
// Each concern lives in its own module under ./modules; this file only
// wires them up in the right order. Native ES modules — no build step,
// so any file here can be opened and edited directly.

import { initPreloader } from './modules/preloader.js';
import { initNavbar } from './modules/navbar.js';
import { initCursor } from './modules/cursor.js';
import { initReveal } from './modules/reveal.js';
import { initCounters } from './modules/counters.js';
import { initTilt } from './modules/tilt.js';
import { initTabs } from './modules/tabs.js';
import { initForms } from './modules/forms.js';
import { initClipboard } from './modules/clipboard.js';
import { initPageTransition } from './modules/pageTransition.js';

function init() {
  initPreloader();
  initNavbar();
  initCursor();
  initTabs();       // renders Craft grid before reveal/tilt observe it
  initReveal();
  initCounters();
  initTilt();
  initForms();
  initClipboard();
  initPageTransition();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
