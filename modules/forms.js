import { qs, qsa, on } from '../utils/dom.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(row) {
  const input = qs('input, textarea', row);
  if (!input) return true;
  const value = input.value.trim();
  let valid = true;

  if (input.required && !value) valid = false;
  if (input.type === 'email' && value && !EMAIL_RE.test(value)) valid = false;

  row.classList.toggle('has-error', !valid);
  return valid;
}

export function initForms() {
  const form = qs('#contactForm');
  if (!form) return;

  const rows = qsa('.form-row', form);
  const submitBtn = qs('.submit-state', form);
  const successMsg = qs('#formSuccess', form);

  rows.forEach((row) => {
    const input = qs('input, textarea', row);
    on(input, 'blur', () => validateField(row));
    on(input, 'input', () => {
      if (row.classList.contains('has-error')) validateField(row);
    });
  });

  on(form, 'submit', (e) => {
    e.preventDefault();
    const allValid = rows.map(validateField).every(Boolean);
    if (!allValid) {
      qs('.has-error input, .has-error textarea', form)?.focus();
      return;
    }

    if (submitBtn) submitBtn.dataset.state = 'loading';

    const name = qs('#cf-name', form)?.value ?? '';
    const email = qs('#cf-email', form)?.value ?? '';
    const message = qs('#cf-message', form)?.value ?? '';

    const subject = encodeURIComponent(`Reservation / inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    setTimeout(() => {
      window.location.href = `mailto:hello@emberandoak.coffee?subject=${subject}&body=${body}`;
      if (submitBtn) delete submitBtn.dataset.state;
      successMsg?.classList.add('is-visible');
      form.reset();
    }, 500);
  });
}
