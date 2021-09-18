function openNav() {
  document.querySelector('.chat__sidebar').style.width = '100%';
  document.querySelector('.chat__main').style.display = 'none';
}

function closeNav() {
  document.querySelector('.chat__sidebar').style.width = '0';
  document.querySelector('.chat__main').style.display = 'flex';
}

// const toggle = (elem) => {
//   elem.classList.toggle('hidden');
// };
// toggle(document.querySelector('.btn'));

// const openNav = document.querySelector('#openNav');
// openNav.classList.remove('hidden');

// const closeNav = document.querySelector('#closeNav')
// closeNav.classList.add('hidden')
