import { qs, qsa, on } from '../utils/dom.js';

// The Craft page's content: things Ember & Oak actually does, grouped so
// the tab filter has real meaning rather than arbitrary categories.
const CRAFT_ITEMS = [
  { category: 'sourcing', title: 'Direct-Trade Relationships', desc: 'We buy direct from three family farms in Yirgacheffe, Huila and Marcala — same growers, every harvest.' },
  { category: 'sourcing', title: 'Single-Origin Focus', desc: 'No pre-blended house filler. Every bag on our shelf names its farm, altitude and processing method.' },
  { category: 'roasting', title: 'Small-Batch Drum Roasting', desc: '12kg batches, roasted twice weekly, so beans never sit longer than 10 days before they reach a cup.' },
  { category: 'roasting', title: 'Roast Profiling by Origin', desc: 'Each origin gets its own curve — we chase the bean\u2019s own character, not one house roast for everything.' },
  { category: 'brewing', title: 'Precision Espresso Dialing', desc: 'Shots are dialed in every morning against that day\u2019s humidity and bean age, not left on autopilot.' },
  { category: 'brewing', title: 'Pour-Over Bar', desc: 'V60, Kalita and Chemex available on request, brewed to order at the counter, not batch-held.' },
  { category: 'service', title: 'Latte Art Training', desc: 'Every barista trains to a rosetta-and-heart standard before working the bar solo.' },
  { category: 'service', title: 'Seasonal Menu Development', desc: 'New seasonal drinks are tested in-house for a month before they ever reach the printed menu.' },
];

function renderCraftGrid(grid) {
  grid.innerHTML = CRAFT_ITEMS.map(
    (item) => `
    <div class="skill-card glass reveal is-visible" data-tilt data-category="${item.category}">
      <span class="skill-cat">${item.category}</span>
      <h4>${item.title}</h4>
      <p>${item.desc}</p>
    </div>`
  ).join('');
}

// Filters .skill-card (or any [data-category]) items by the active tab.
export function initTabs() {
  const tabs = qsa('.skill-tab');
  const grid = qs('#skillsGrid');
  if (!tabs.length || !grid) return;

  if (!grid.children.length) renderCraftGrid(grid);

  tabs.forEach((tab) => {
    on(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      qsa('.skill-card', grid).forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
      });
    });
  });
}
