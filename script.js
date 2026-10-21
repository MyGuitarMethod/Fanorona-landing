'use strict';
const nav = document.querySelector('#navigation');
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', event => { if (event.target.closest('a')) { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); } });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); } });

const characters = {
  finn: { image: 'portrait-finn', name: 'Finn Oakley', title: 'Tavern Regular', chapter: 'YOUR FIRST OPPONENT', description: 'A friendly face and your first teacher. Learn the rules together before taking him on by yourself.', alt: 'Finn Oakley welcoming a challenger at a candlelit tavern table', position: '75% 40%' },
  nerissa: { image: 'portrait-nerissa', name: 'Nerissa Pearlwave', title: 'Keeper of the Reef', chapter: 'A CHALLENGER FROM THE REEF', description: 'Trade the tavern for the sea. Nerissa brings a different world to the table, with a board and pieces inspired by pearl, shells and coral.', alt: 'Nerissa Pearlwave, a mermaid beside her ocean-inspired Fanorona board', position: '42% 30%' },
  alaric: { image: 'portrait-alaric', name: 'King Alaric Auremont', title: 'The Diamond King', chapter: 'THE FINAL CHAPTER', description: 'The royal end of your campaign. Bring everything you have learned to a final opponent and a board worthy of the throne.', alt: 'King Alaric Auremont at an ornate crystalline Fanorona board in his royal court', position: '75% 40%' }
};
document.querySelectorAll('[data-character]').forEach(button => button.addEventListener('click', () => {
  const c = characters[button.dataset.character];
  document.querySelector('.character-showcase').dataset.preview = button.dataset.character;
  document.querySelectorAll('[data-character]').forEach(other => { const active = other === button; other.classList.toggle('active', active); other.setAttribute('aria-pressed', String(active)); });
  const image = document.querySelector('#character-image'); image.src = `assets/${c.image}.webp`; image.alt = c.alt; image.style.objectPosition = c.position;
  document.querySelector('#character-name').textContent = c.name; document.querySelector('#character-title').textContent = c.title; document.querySelector('#character-chapter').textContent = c.chapter; document.querySelector('#character-description').textContent = c.description;
}));

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) { tabs.forEach(other => { const selected = other === tab; other.setAttribute('aria-selected', String(selected)); other.tabIndex = selected ? 0 : -1; document.getElementById(other.getAttribute('aria-controls')).hidden = !selected; }); }
tabs.forEach((tab, index) => { tab.addEventListener('click', () => selectTab(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length]; if (event.key === 'ArrowLeft') next = tabs[(index + tabs.length - 1) % tabs.length]; if (event.key === 'Home') next = tabs[0]; if (event.key === 'End') next = tabs.at(-1); if (next) { event.preventDefault(); selectTab(next); next.focus(); } }); });

const lightbox = document.querySelector('#lightbox');
let opener;
document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  const image = document.querySelector('#lightbox-image'); image.src = button.dataset.lightbox; image.alt = button.querySelector('img').alt;
  document.querySelector('#lightbox-caption').textContent = button.dataset.caption;
  lightbox.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) { const r = lightbox.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) lightbox.close(); } });
lightbox.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
