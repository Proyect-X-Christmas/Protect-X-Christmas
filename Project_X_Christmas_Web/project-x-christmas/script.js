'use strict';
// Navegación móvil accesible; los enlaces funcionan incluso sin JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}
menuButton.addEventListener('click', () => {
  const opened = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.setAttribute('aria-label', opened ? 'Cerrar menú' : 'Abrir menú');
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });
const dialog = document.querySelector('#map-dialog');
const openMap = document.querySelector('#open-map');
const closeMap = document.querySelector('#close-map');
openMap.addEventListener('click', () => {
  if (typeof dialog.showModal !== 'function') {
    window.open('assets/croquis-interno.jpeg', '_blank', 'noopener,noreferrer');
    return;
  }
  dialog.showModal();
  document.body.classList.add('modal-open');
  closeMap.focus();
});
closeMap.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  openMap.focus();
});
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
