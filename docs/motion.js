/* ============================================================
   Bonsai — motion.js
   Premium, subtle motion. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ----------------------------------------------------------
  // 1. Auto-tag major elements for reveal (so JSX doesn't need data-attrs)
  // ----------------------------------------------------------
  function autoTag() {
    // Each <section> gets revealed (children stagger via CSS)
    document.querySelectorAll('section').forEach((el) => {
      if (!el.hasAttribute('data-reveal') && !el.classList.contains('nav')) {
        el.setAttribute('data-reveal', 'section');
      }
    });

    // Cards in grids stagger individually
    const cardSelectors = [
      '.division-card',
      '.problem-card',
      '.service-card',
      '.industry-card',
      '.use-card',
      '.cap',
      '.process .step',
      '.essence-row',
      '.solutions-row',
      '.div-problem',
      '.div-service',
      '.package-card',
      '.cross-nav-card',
    ];
    cardSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', 'card');
          el.style.setProperty('--reveal-delay', (i % 8) * 60 + 'ms');
        }
      });
    });

    // Hero pieces stagger
    document.querySelectorAll('.hero h1, .hero p.lead, .hero .hero-ctas, .hero .hero-stats, .hero .eyebrow, .division-hero h1, .division-hero .division-tagline-hero, .division-hero p.lead, .division-hero .hero-ctas, .division-hero .division-stat-panel, .division-hero-mark, .division-hero .eyebrow').forEach((el, i) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'hero-item');
        el.style.setProperty('--reveal-delay', (i * 90) + 'ms');
      }
    });

    // Auto-mark numeric stat values for count-up
    document.querySelectorAll('.hero-stats .v, .case-stat .v, .use-stats .v, .kpi .value').forEach((el) => {
      const txt = el.textContent.trim();
      // Only count if it starts with a number (skip e.g. "Gs. 1.99MM" or ">2.5×" — those animate via fade)
      const match = txt.match(/^(\d+(?:[.,]\d+)?)(\s*[A-Za-z%]*)?$/);
      if (match && !el.hasAttribute('data-count')) {
        el.setAttribute('data-count', match[1]);
        el.setAttribute('data-count-suffix', match[2] || '');
        el.dataset.counted = 'pending';
      }
    });
  }

  // ----------------------------------------------------------
  // 2. Intersection observer — adds .in-view when element enters viewport
  // ----------------------------------------------------------
  function setupObserver() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Counter animation
            if (entry.target.hasAttribute('data-count') && entry.target.dataset.counted === 'pending') {
              animateCount(entry.target);
            }
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal], [data-count]').forEach((el) => io.observe(el));
  }

  // ----------------------------------------------------------
  // 3. Count-up animation
  // ----------------------------------------------------------
  function animateCount(el) {
    el.dataset.counted = 'done';
    if (reduce) return;
    const target = parseFloat(el.dataset.count.replace(',', '.'));
    const suffix = el.dataset.countSuffix || '';
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      el.textContent = v.toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }

  // ----------------------------------------------------------
  // 4. Smooth scroll for in-page anchors
  // ----------------------------------------------------------
  function smoothScroll() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  }

  // ----------------------------------------------------------
  // 4b. Analytics: dataLayer events on CTA clicks + scroll depth
  // ----------------------------------------------------------
  function setupAnalytics() {
    window.dataLayer = window.dataLayer || [];

    // CTA click events
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn, .nav-cta, .mobile-cta, .sticky-btn');
      if (!btn) return;
      const label = (btn.textContent || '').trim().slice(0, 60);
      const href = btn.getAttribute('href') || '';
      window.dataLayer.push({
        event: 'cta_click',
        cta_label: label,
        cta_href: href,
        cta_section: btn.closest('section')?.id || 'unknown',
      });
    });

    // Scroll depth: 25%, 50%, 75%, 100%
    const reached = new Set();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      [25, 50, 75, 100].forEach((mark) => {
        if (pct >= mark && !reached.has(mark)) {
          reached.add(mark);
          window.dataLayer.push({ event: 'scroll_depth', percent: mark });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Language change
    window.addEventListener('i18nchange', (e) => {
      window.dataLayer.push({ event: 'language_change', lang: e.detail.lang });
    });
  }

  // ----------------------------------------------------------
  // 5. Animate the OS preview chart line draw whenever it enters view
  // ----------------------------------------------------------
  function animateCharts() {
    document.querySelectorAll('.chart-svg').forEach((svg) => {
      svg.classList.add('chart-armed');
    });
  }

  // ----------------------------------------------------------
  // 6. Boot — wait for React to render first
  // ----------------------------------------------------------
  let booted = false;
  function boot() {
    if (booted) return;
    if (!document.querySelector('section')) return; // React hasn't mounted yet
    booted = true;
    autoTag();
    setupObserver();
    animateCharts();
    smoothScroll();
    setupAnalytics();

    // Re-scan periodically for late-mounted elements (e.g. tab changes in OS preview)
    const rescan = () => {
      autoTag();
      document.querySelectorAll('[data-reveal]:not(.in-view), [data-count]').forEach((el) => {
        if (!el.classList.contains('observed')) {
          el.classList.add('observed');
        }
      });
    };
    setTimeout(rescan, 800);
    setTimeout(rescan, 2000);
  }

  // Poll until React has rendered
  const pollStart = Date.now();
  const poll = setInterval(() => {
    if (document.querySelector('section') || Date.now() - pollStart > 5000) {
      clearInterval(poll);
      boot();
    }
  }, 60);

  // Also trigger on DOMContentLoaded fallback
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    setTimeout(boot, 100);
  }
})();

/* ============================================================
   Theme toggle — auto-injects a sun/moon button into .nav-inner
   on every page. Persists choice in localStorage('bonsai-theme').
   The no-flash <head> snippet has already set <html data-theme>
   before this script runs.
   ============================================================ */
(function () {
  const TOGGLE_HTML = `
    <button class="theme-toggle" type="button" aria-label="Cambiar tema" title="Cambiar tema">
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"/></svg>
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="M5.6 5.6l1.4 1.4"/><path d="M17 17l1.4 1.4"/><path d="M5.6 18.4 7 17"/><path d="M17 7l1.4-1.4"/></svg>
    </button>
  `;

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#08110D' : '#0F2D20');
    document.querySelectorAll('.theme-toggle').forEach((b) => {
      b.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  function wire(btn) {
    if (btn.__themeWired) return;
    btn.__themeWired = true;
    btn.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('bonsai-theme', next); } catch (e) {}
      applyTheme(next);
    });
  }

  function inject() {
    // Inject into every .nav-inner that doesn't already have a toggle.
    document.querySelectorAll('.nav-inner').forEach((inner) => {
      if (inner.querySelector('.theme-toggle')) {
        wire(inner.querySelector('.theme-toggle'));
        return;
      }
      const cta = inner.querySelector('.nav-cta');
      const burger = inner.querySelector('.nav-burger');
      const tmp = document.createElement('template');
      tmp.innerHTML = TOGGLE_HTML.trim();
      const btn = tmp.content.firstElementChild;
      // Insert just before nav-cta (preferred) or burger, else append.
      const anchor = cta || burger;
      if (anchor) {
        anchor.parentNode.insertBefore(btn, anchor);
      } else {
        inner.appendChild(btn);
      }
      wire(btn);
    });
    // Also wire any pre-existing toggles (e.g. handwritten ones).
    document.querySelectorAll('.theme-toggle').forEach(wire);
    applyTheme(currentTheme());
  }

  // Initial run + react to JSX-rendered navs that appear later.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
  // Poll briefly for late-rendered React navs.
  let tries = 0;
  const poll = setInterval(() => {
    tries++;
    inject();
    if (tries > 30) clearInterval(poll); // ~3s
  }, 100);
})();
