const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#appointment-date').min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const submitButton = form.querySelector('button[type="submit"]');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  status.textContent = '';
  status.className = 'form-status';
  if (!window.emailjs) {
    status.textContent = 'The form is unavailable right now. Please call or email us directly.';
    status.classList.add('error');
    return;
  }
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  try {
    await emailjs.sendForm('service_ud7g4vt', 'template_qw69fcc', form, { publicKey: 'FO3VbMBV-la7xfixE' });
    status.textContent = 'Thanks! Your request has been sent. We will be in touch soon.';
    status.classList.add('success');
    form.reset();
  } catch (error) {
    status.textContent = 'We could not send your request. Please try again or call us at (248) 420-8594.';
    status.classList.add('error');
    console.error('Contact request failed:', error);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send request <span aria-hidden="true">↗</span>';
  }
});
