/* =============================================================
   Northwest University — Explorenu
   Front-end behavior (vanilla JS, no deps)
   ============================================================= */
(() => {
  'use strict';

  /* -----------------------------------------------------------
     Header shadow on scroll
     ----------------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-stuck');
    else header.classList.remove('is-stuck');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -----------------------------------------------------------
     Reveal on scroll
     ----------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));

  /* -----------------------------------------------------------
     Animated counters
     ----------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const to = parseInt(el.dataset.to, 10) || 0;
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const v = Math.round(to * (1 - Math.pow(1 - t, 3)));
        el.textContent = v;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = to;
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => countIO.observe(c));

  /* -----------------------------------------------------------
     Program data + tab filtering + card rendering
     TODO: replace descriptions + image filenames with real
     copy and licensed photography from the official NU media
     library. Current images are pulled from /assets/.
     ----------------------------------------------------------- */
  const PROGRAMS = [
    { title: 'Nursing (BSN)',           modality: 'On Campus', meta: 'Bachelor of Science · 4 yrs', desc: 'Start clinicals in your first semester. Graduate ready for the NCLEX with hundreds of hours of real patient care.', image: 'assets/student-1.jpg' },
    { title: 'Computer Science',       modality: 'On Campus', meta: 'BS · 4 yrs',                desc: 'Software, data, and AI coursework paired with internships at Seattle-area tech companies.', image: 'assets/student-2.jpg' },
    { title: 'Business',               modality: 'On Campus', meta: 'BS · 4 yrs',                desc: 'Marketing, finance, and management — taught by executives who still consult in the Seattle market.', image: 'assets/student-3.jpg' },
    { title: 'Music Production',       modality: 'On Campus', meta: 'BS · 4 yrs',                desc: 'Record in Creatio — our studio led by a Grammy-winning producer. Leave with credits, not just a degree.', image: 'assets/student-4.jpg' },
    { title: 'Psychology',             modality: 'On Campus', meta: 'BS · 4 yrs',                desc: 'Research from year one. Faculty mentoring on real studies — many students present at regional conferences.', image: 'assets/student-5.jpg' },
    { title: 'Physician Assistant Studies', modality: 'Graduate', meta: 'MS · 24 months',          desc: 'A focused medical curriculum with rotations across hospitals, clinics, and underserved communities.', image: 'assets/student-6.jpg' },
    { title: 'MBA',                    modality: 'Graduate',  meta: 'Master of Business · 18–24 mo', desc: 'Online or evening cohorts built for working professionals. Faith-integrated leadership curriculum.', image: 'assets/campus-1.jpg' },
    { title: 'Education (M.A.T.)',     modality: 'Graduate',  meta: 'Master of Arts in Teaching', desc: 'Become a licensed teacher in one year. STEM, ELL, and special education endorsements available.', image: 'assets/life-3.jpg' },
    { title: 'Online — General Studies', modality: 'Online',  meta: 'BS · Fully online',         desc: 'An asynchronous, accredited degree designed for working adults. Same faculty, same diploma.', image: 'assets/life-2.jpg' },
    { title: 'Online — RN to BSN',     modality: 'Online',    meta: 'BSN · Fully online',        desc: 'For licensed RNs. Finish in as few as 12 months while you keep working.', image: 'assets/life-1.jpg' },
    { title: 'Online — Ministry & Theology', modality: 'Online', meta: 'BA · Fully online',       desc: 'A flexible pathway for those called to vocational ministry or further seminary study.', image: 'assets/chapel-1.jpg' },
  ];

  const grid = document.getElementById('programGrid');
  const tabs = document.querySelectorAll('.program-tabs .tab');

  const renderPrograms = (modality) => {
    const list = PROGRAMS.filter((p) => p.modality === modality);
    grid.innerHTML = list.map((p) => `
      <article class="program-card">
        <div class="program-media" style="background-image:url('${p.image}')" role="img" aria-label="${p.title}"></div>
        <div class="program-body">
          <span class="program-meta">${p.meta}</span>
          <h3>${p.title}</h3>
          <p class="program-desc">${p.desc}</p>
          <a href="#request" class="program-cta" data-program="${p.title}">
            See this program
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </article>
    `).join('');
  };

  renderPrograms('On Campus');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      renderPrograms(tab.dataset.modality);
    });
  });

  /* Program card CTA -> scroll to form and prefill program */
  grid.addEventListener('click', (e) => {
    const a = e.target.closest('.program-cta');
    if (!a) return;
    e.preventDefault();
    const program = a.dataset.program;
    const select = document.getElementById('program');
    if (select) {
      const opt = Array.from(select.options).find((o) => o.value === program || o.textContent === program);
      if (opt) select.value = opt.value;
    }
    document.getElementById('request').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.getElementById('firstName')?.focus(), 600);
  });

  /* -----------------------------------------------------------
     Form validation + simulated submit (hero)
     ----------------------------------------------------------- */
  const form = document.getElementById('leadForm');
  const success = document.getElementById('formSuccess');

  const setError = (name, msg) => {
    const span = form.querySelector(`.err[data-for="${name}"]`);
    if (span) span.textContent = msg || '';
    const field = span?.closest('.field');
    if (field) field.classList.toggle('has-error', !!msg);
  };

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    ['firstName', 'lastName'].forEach((n) => {
      const v = form.elements[n].value.trim();
      if (!v) { setError(n, 'Required'); ok = false; } else setError(n, '');
    });

    const email = form.elements.email.value.trim();
    if (!email) { setError('email', 'Required'); ok = false; }
    else if (!emailRe.test(email)) { setError('email', 'Enter a valid email'); ok = false; }
    else setError('email', '');

    const program = form.elements.program.value;
    if (!program) { setError('program', 'Choose a program'); ok = false; }
    else setError('program', '');

    if (!form.elements.consent.checked) {
      setError('consent', 'Please agree to be contacted'); ok = false;
    } else setError('consent', '');

    if (!ok) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.classList.add('is-loading');
    btn.disabled = true;

    /* Simulated POST — wire to real endpoint later. */
    setTimeout(() => {
      btn.classList.remove('is-loading');
      btn.disabled = false;
      form.querySelectorAll('input,select,button').forEach((el) => { if (el.type !== 'submit') el.disabled = true; });
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  });

  form.addEventListener('input', (e) => {
    const name = e.target.name;
    if (!name) return;
    setError(name, '');
  }, true);

  /* -----------------------------------------------------------
     Mini form (final CTA)
     ----------------------------------------------------------- */
  const mini = document.getElementById('leadFormMini');
  const miniOk = document.getElementById('miniSuccess');
  mini.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = mini.elements.email.value.trim();
    const program = mini.elements.program.value;
    if (!emailRe.test(email) || !program) return;
    miniOk.hidden = false;
    mini.reset();
  });

  /* -----------------------------------------------------------
     Footer year
     ----------------------------------------------------------- */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* -----------------------------------------------------------
     Smooth scroll with sticky-header offset
     ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
