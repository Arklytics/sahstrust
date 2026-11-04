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
