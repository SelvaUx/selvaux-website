/* ═══════════════════════════════════════
   SELVAUX — SHARED JS
   Custom cursor, icon canvas, typewriter,
   counters, scroll reveal, mobile menu
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR TRAIL ── */
  const cursor = document.querySelector('.cursor-dot');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animateCursor() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(animateCursor);
    })();
    document.querySelectorAll('a, button, .project-card, .lab-card, .tag, .chip, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  /* ── FLOATING ICON CANVAS ── */
  const canvas = document.getElementById('icon-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    const icons = [];
    const shapes = [
      // Code bracket </>
      (ctx, s) => {
        ctx.lineWidth = 2;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        ctx.moveTo(-s*0.5, -s*0.3); ctx.lineTo(-s*0.8, 0); ctx.lineTo(-s*0.5, s*0.3);
        ctx.moveTo(s*0.5, -s*0.3); ctx.lineTo(s*0.8, 0); ctx.lineTo(s*0.5, s*0.3);
        ctx.moveTo(-s*0.15, s*0.4); ctx.lineTo(s*0.15, -s*0.4);
        ctx.stroke();
      },
      // Circle
      (ctx, s) => { ctx.beginPath(); ctx.arc(0, 0, s*0.4, 0, Math.PI*2); ctx.fill(); },
      // Diamond
      (ctx, s) => {
        ctx.beginPath();
        ctx.moveTo(0, -s*0.5); ctx.lineTo(s*0.35, 0);
        ctx.lineTo(0, s*0.5); ctx.lineTo(-s*0.35, 0); ctx.closePath(); ctx.fill();
      },
      // Cross +
      (ctx, s) => {
        ctx.fillRect(-s*0.07, -s*0.35, s*0.14, s*0.7);
        ctx.fillRect(-s*0.35, -s*0.07, s*0.7, s*0.14);
      },
      // Triangle
      (ctx, s) => {
        ctx.beginPath();
        ctx.moveTo(0, -s*0.4); ctx.lineTo(s*0.35, s*0.3);
        ctx.lineTo(-s*0.35, s*0.3); ctx.closePath(); ctx.fill();
      },
    ];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnIcon() {
      const t = Math.random();
      const x = t > 0.3 && t < 0.5 ? 0.3 * W : t > 0.5 && t < 0.7 ? 0.7 * W : t * W;
      icons.push({
        x, y: H + 20,
        vy: -(Math.random() * 0.4 + 0.15),
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 0.5,
        scale: Math.random() * 12 + 10,
        opacity: Math.random() * 0.06 + 0.02,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        drift: (Math.random() - 0.5) * 0.15,
      });
    }

    // Seed initial icons
    for (let i = 0; i < 25; i++) {
      const icon = {
        x: Math.random() * W, y: Math.random() * H,
        vy: -(Math.random() * 0.4 + 0.15),
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 0.5,
        scale: Math.random() * 12 + 10,
        opacity: Math.random() * 0.06 + 0.02,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        drift: (Math.random() - 0.5) * 0.15,
      };
      icons.push(icon);
    }

    function drawIcons() {
      ctx.clearRect(0, 0, W, H);
      if (Math.random() > 0.96 && icons.length < 50) spawnIcon();

      for (let i = icons.length - 1; i >= 0; i--) {
        const ic = icons[i];
        ic.y += ic.vy;
        ic.x += ic.drift;
        ic.rotation += ic.vr;
        if (ic.y < -30) { icons.splice(i, 1); continue; }

        ctx.save();
        ctx.translate(ic.x, ic.y);
        ctx.rotate(ic.rotation * Math.PI / 180);
        ctx.globalAlpha = ic.opacity;
        ctx.fillStyle = '#F54142';
        ic.shape(ctx, ic.scale);
        ctx.restore();
      }
      requestAnimationFrame(drawIcons);
    }
    drawIcons();
  }

  /* ── TYPEWRITER ── */
  const twEl = document.getElementById('typewriter-text');
  if (twEl) {
    const lines = JSON.parse(twEl.dataset.lines || '[]');
    let li = 0, ci = 0, del = false;
    function tick() {
      const cur = lines[li] || '';
      twEl.textContent = cur.slice(0, ci);
      if (!del) {
        if (ci < cur.length) { ci++; setTimeout(tick, 60); }
        else { del = true; setTimeout(tick, 2000); }
      } else {
        if (ci > 0) { ci--; setTimeout(tick, 35); }
        else { del = false; li = (li + 1) % lines.length; setTimeout(tick, 400); }
      }
    }
    if (lines.length) tick();
  }

  /* ── COUNTER ANIMATION ── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let started = false;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        const dur = 1500, start = performance.now();
        (function step(now) {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left, .skill-card, .project-card').forEach(el => revealObs.observe(el));

  /* ── MOBILE MENU ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── PROJECT FILTERS (projects page) ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.filterable');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        projectCards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }
});
