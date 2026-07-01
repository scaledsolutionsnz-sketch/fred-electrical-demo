// Fred Electrical — shared interactions
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intro overlay
  var intro = document.querySelector('.intro');
  if (intro) {
    var hide = function () { intro.classList.add('done'); };
    if (reduce) { hide(); }
    else { window.addEventListener('load', function () { setTimeout(hide, 1250); }); setTimeout(hide, 2600); }
  }

  // Sticky nav state
  var nav = document.querySelector('.nav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') links.classList.remove('open'); });
  }

  // Hero slideshow
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1 && !reduce) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 5600);
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
