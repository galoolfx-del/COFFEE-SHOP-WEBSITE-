// Small DOM helpers used across modules.
export const qs = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const on = (el, evt, handler, opts) => {
  if (!el) return;
  el.addEventListener(evt, handler, opts);
};
