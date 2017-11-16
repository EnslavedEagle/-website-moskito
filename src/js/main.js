(() => {
  'use strict';
  
  const root = document.documentElement;
  const body = document.body;
  const hamburger = document.getElementById('nav__hamburger');
  const nav = document.getElementById('main-navigation')
  const navLinks = document.querySelectorAll('.nav a');

  let scrollTimeout = null;
  function stickyNav() {
    scrollTimeout = setTimeout(() => {
      clearTimeout(scrollTimeout);
      if (root.scrollTop > 0) {
        nav.classList.remove('nav--sticky');
      } else {
        nav.classList.add('nav--sticky');
      }
    }, 100);
  }

  function toggleNavigation() {
    root.classList.toggle('locked');
    nav.classList.toggle('nav--open');
  }

  hamburger.addEventListener('click', toggleNavigation, false);

  document.addEventListener('scroll', stickyNav, false);
  stickyNav();

  for (let i = 0, len = navLinks.length; i < len; i++) {
    (function(i) {
      navLinks[i].addEventListener('click', toggleNavigation, false);
    }(i));
  }
})();