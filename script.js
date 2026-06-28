/* ============================================================
   LINOVRI ARMEZA PRATAMA — Shared Portfolio JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── AOS INIT ──────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 680, easing: 'ease-out-cubic', once: true, offset: 55 });
  }

  // ── CUSTOM CURSOR ─────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (cursor && ring && window.innerWidth > 760) {
    let mx = -999, my = -999, rx = -999, ry = -999;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      if (!cursor.classList.contains('visible')) {
        cursor.classList.add('visible');
        ring.classList.add('visible');
      }
    });

    (function animRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    const hoverEls = document.querySelectorAll('a, button, [data-tilt], .exp-card, .proj-card, .cert-card, .comp-card, .tl-card, .nav-card, .featured-proj');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ── SCROLL PROGRESS ───────────────────────────────────────
  const bar = document.getElementById('scroll-progress');
  const nav = document.getElementById('navbar');
  const btt = document.getElementById('btt');
  const hbg = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-menu');

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const pct = (currentY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (bar) bar.style.width = pct + '%';
    if (nav) {
      nav.classList.toggle('scrolled', currentY > 50);
      if (currentY > lastScrollY && currentY > 120) {
        nav.classList.add('nav-hidden');
        if (mob && mob.classList.contains('open')) {
          mob.classList.remove('open');
          if (hbg) hbg.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
      } else {
        nav.classList.remove('nav-hidden');
      }
      lastScrollY = currentY;
    }
    if (btt) btt.classList.toggle('show', currentY > 380);
  }, { passive: true });

  // ── BACK TO TOP ───────────────────────────────────────────
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── ACTIVE NAV LINK ───────────────────────────────────────
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── MOBILE MENU ───────────────────────────────────────────
  if (hbg && mob) {
    hbg.addEventListener('click', () => {
      mob.classList.toggle('open');
      const spans = hbg.querySelectorAll('span');
      if (mob.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mob.classList.remove('open');
      hbg.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }));
  }

  // ── VANILLA TILT (if present) ─────────────────────────────
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 7, speed: 400, glare: true, 'max-glare': 0.12
    });
  }

  // ── COUNTER ANIMATION ─────────────────────────────────────
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const run = el => {
      const target = +el.dataset.target;
      let current = 0;
      const step = target / 55;
      const iv = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(iv); }
        el.textContent = Math.floor(current);
      }, 22);
    };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { counters.forEach(run); obs.disconnect(); } });
    }, { threshold: 0.5 });
    obs.observe(counters[0].closest('.hero-stats') || counters[0]);
  }

});
