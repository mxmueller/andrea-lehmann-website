(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Jahr im Footer */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Header-Schatten beim Scrollen */
  var header = document.querySelector('.site-header');
  function onScrollHeader() { if (header) header.classList.toggle('scrolled', window.scrollY > 10); }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* Mobiles Menü */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  function closeNav() {
    root.classList.remove('nav-open');
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Menü öffnen'); }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = root.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1000) closeNav(); });
  }

  /* Aktiven Menüpunkt markieren */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function markActive() {
    var pos = window.scrollY + window.innerHeight * 0.35;
    var idx = -1;
    targets.forEach(function (t, i) { if (t && t.offsetTop <= pos) idx = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === idx); });
  }

  /* Scroll-Animation */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  items.forEach(function (el) {
    var i = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.transitionDelay = Math.min(i, 3) * 0.12 + 's';
  });
  function revealAll() { items.forEach(function (el) { el.classList.add('is-visible'); }); items = []; }
  function checkReveal() {
    var h = window.innerHeight;
    items = items.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < h * 0.92) { el.classList.add('is-visible'); return false; }
      return true;
    });
  }
  if (reduce) revealAll();
  window.addEventListener('beforeprint', revealAll);

  /* Parallax im Kontaktbild */
  var ctaImg = document.querySelector('.cta-img');
  function parallax() {
    if (!ctaImg || reduce) return;
    var r = ctaImg.parentElement.getBoundingClientRect();
    var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
    p = Math.max(-1, Math.min(1, p));
    ctaImg.style.transform = 'translate3d(0,' + (p * -8).toFixed(2) + '%,0)';
  }

  var ticking = false;
  function onFrame() { checkReveal(); markActive(); parallax(); ticking = false; }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('load', request);
  requestAnimationFrame(function () { requestAnimationFrame(onFrame); });

  /* Slider */
  document.querySelectorAll('[data-slider]').forEach(function (s) {
    var slides = s.querySelectorAll('.slide');
    var count = s.querySelector('.count b');
    var cur = 0, timer;
    function show(n) {
      slides.forEach(function (x) { x.classList.remove('is-active'); });
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('is-active');
      if (count) count.textContent = cur + 1;
    }
    function auto() {
      clearInterval(timer);
      if (!reduce) timer = setInterval(function () { show(cur + 1); }, 6000);
    }
    s.querySelector('.next').addEventListener('click', function () { show(cur + 1); auto(); });
    s.querySelector('.prev').addEventListener('click', function () { show(cur - 1); auto(); });
    show(0); auto();
  });
})();
