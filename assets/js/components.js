
(() => {
  // progress
  const prog = document.querySelector('.progress');
  const onscroll = () => {
    const p = scrollY / ((document.body.scrollHeight - innerHeight) || 1);
    prog && (prog.style.transform = `scaleX(${p})`);
  };
  addEventListener('scroll', onscroll, {passive:true}); onscroll();

  // nav toggle (mobile)
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu') || document.querySelector('.nav');
  toggle?.addEventListener('click', () => {
    const exp = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!exp));
    nav?.classList.toggle('open');
  });

  // video shrink lower section
  const sec = document.querySelector('.video-hero');
  const pin = document.querySelector('.video-hero__pin');
  const vid = pin?.querySelector('video');
  if (sec && pin && vid) {
    const update = () => {
      const r = sec.getBoundingClientRect();
      const total = r.height - innerHeight;
      const passed = Math.min(Math.max(-r.top, 0), total);
      const t = total>0 ? passed/total : 0;
      const scale = 1 - 0.3*t; // 1 -> 0.7
      vid.style.transform = `scale(${scale})`;
    };
    addEventListener('scroll', update, {passive:true});
    addEventListener('resize', update);
    update();
  }

  // simple filters
  const filterBtns = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    const val = btn.dataset.filter;
    document.querySelectorAll('.filters .btn').forEach(b=>b.classList.toggle('active', b===btn));
    items.forEach(el => {
      const tags = (el.dataset.tags || '').split(',').map(s=>s.trim());
      el.style.display = (val==='all' || tags.includes(val)) ? '' : 'none';
    });
  }));
})();
