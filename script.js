// Small progressive enhancement: the page works without JavaScript too.
document.getElementById('year').textContent = new Date().getFullYear();

// Close the mobile menu after a visitor chooses a section.
document.querySelectorAll('#mainNav .nav-link, #mainNav .nav-donate').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mainNav');
    if (menu.classList.contains('show') && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Manual rotation gives visitors time to read each campaign poster.
const slider = document.querySelector('.campaign-slider');
if (slider) {
  const slides = [...slider.querySelectorAll('.campaign-slide')];
  const dots = [...slider.querySelectorAll('.slider-dots button')];
  let current = 0;
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    slider.querySelector('.slider-status').textContent = `Campaign ${current + 1} of ${slides.length}`;
  }
  slider.querySelector('.slider-controls').hidden = false;
  slider.querySelector('.slider-prev').addEventListener('click', () => showSlide(current - 1));
  slider.querySelector('.slider-next').addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  slider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let touchStart = null;
  slider.addEventListener('touchstart', (event) => {
    touchStart = event.touches.length === 1 ? event.touches[0] : null;
  }, { passive: true });
  slider.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.clientX;
    const dy = event.changedTouches[0].clientY - touchStart.clientY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showSlide(current + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  slider.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
}
