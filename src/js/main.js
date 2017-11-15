((() => {
  'use strict';
  
  const root = document.documentElement;
  const body = document.body;
  const hamburger = document.getElementById('nav__hamburger');
  const nav = document.getElementById('nav')

  hamburger.addEventListener('click', () => {
    root.classList.toggle('locked');
    nav.classList.toggle('nav--open');
  });

  body.addEventListener('scroll', () => {
    console.log('scroll!');
  });
})());