// ============================================
// Portfolio — Marie Aymeric Dyomenin
// Petites animations JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // Année du footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 1. Apparition des éléments au défilement
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach((el, i) => {
      // Léger décalage entre les éléments d'une même rangée
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
      observer.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // 2. Barre de progression, ombre du header, bouton retour en haut
  const progress = document.getElementById('scrollProgress');
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && height > 0) {
      progress.style.width = (scrollTop / height) * 100 + '%';
    }
    if (header) header.classList.toggle('scrolled', scrollTop > 20);
    if (backToTop) backToTop.classList.toggle('show', scrollTop > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Lien de navigation actif selon la section visible
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  // 4. Fermer le menu mobile après un clic sur un lien
  const menu = document.getElementById('navMenu');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

});