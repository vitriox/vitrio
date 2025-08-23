(() => {
  // Progress bar u góry
  const prog = document.querySelector('.progress');
  const onscroll = () => {
    const p = scrollY / ((document.body.scrollHeight - innerHeight) || 1);
    prog && (prog.style.transform = `scaleX(${p})`);
  };
  addEventListener('scroll', onscroll, { passive: true }); onscroll();

  // Nawigacja (mobile)
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu') || document.querySelector('.nav');
  toggle?.addEventListener('click', () => {
    const exp = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!exp));
    nav?.classList.toggle('open');
  });

  // --- WIDEO HERO: skalowanie sekcji z iframe Vimeo ---
  const sec   = document.querySelector('.video-hero');
  const media = sec?.querySelector('.video-hero__media');

  if (sec && media) {
    let ticking = false;

    const recalc = () => {
      const r = sec.getBoundingClientRect();
      const total  = Math.max(r.height - window.innerHeight, 0);
      const passed = Math.min(Math.max(-r.top, 0), total);
      const t = total > 0 ? (passed / total) : 0; // 0..1
      const scale = 1 - 0.35 * t;                 // 1 -> 0.65
      media.style.setProperty('--scale', scale.toFixed(4));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(recalc);
      }
    };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', recalc);
    recalc();
  }

  // Proste filtry portfolio (jeśli używasz na podstronie)
  const filterBtns = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    const val = btn.dataset.filter;
    document.querySelectorAll('.filters .btn').forEach(b => b.classList.toggle('active', b === btn));
    items.forEach(el => {
      const tags = (el.dataset.tags || '').split(',').map(s => s.trim());
      el.style.display = (val === 'all' || tags.includes(val)) ? '' : 'none';
    });
  }));
})();
