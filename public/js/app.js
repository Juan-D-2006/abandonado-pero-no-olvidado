/* Abandonado pero no olvidado — lógica de la biblioteca
   1) Carga los libros desde Supabase (o datos locales si no hay conexión)
   2) Dibuja los estantes
   3) Anima: sacar el libro del estante → abrir → pasar páginas → devolver
*/
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

  const LOCATIONS = {
    luna: { title: 'La Luna', note: 'A 384.000 km de casa' },
    marte: { title: 'Marte', note: 'Entre 55 y 400 millones de km' },
    espacio: { title: 'Espacio profundo', note: 'Más allá de los planetas' },
  };
  const STATUS = {
    activo: { label: 'Sigue funcionando', text: 'Esta máquina todavía trabaja y envía datos o presta servicio.' },
    parcial: { label: 'Funciona a medias', text: 'Sigue viva, pero con menos energía o menos instrumentos que al inicio.' },
    espera: { label: 'Esperando regreso', text: 'Fue dejada a propósito, guardada para una misión futura.' },
    inactivo: { label: 'En reposo', text: 'Terminó su trabajo y descansa donde la dejaron.' },
    perdido: { label: 'Señal perdida', text: 'Dejó de responder y la NASA dio por terminada su misión.' },
    impacto: { label: 'Impacto planeado', text: 'Terminó su misión chocando a propósito para obtener datos.' },
  };
  const KIND = { rover: 'Rover', lander: 'Módulo de aterrizaje', orbiter: 'Orbitador', probe: 'Sonda', reflector: 'Experimento pasivo', instrument: 'Estación científica', impactor: 'Impactador', helicopter: 'Helicóptero', depot: 'Depósito de muestras' };
  // Telas de encuadernación por estante
  const CLOTH = {
    luna: ['#3f4b5e', '#56617a', '#2f3a4c', '#4a5a6a', '#6a6f80'],
    marte: ['#7a2e1f', '#8e4325', '#5f2519', '#9b5a2f', '#6e3a22'],
    espacio: ['#1f2b47', '#203d3c', '#3a2f57', '#173450', '#2c2a40'],
  };

  const state = { books: [], loc: 'todo', q: '', statuses: new Set(), client: null, source: 'local' };

  // ---------- util ----------
  const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const icon = (name) => (window.ICONS && ICONS[name]) || ICONS.probe;
  $$('[data-icon]').forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // ---------- datos ----------
  async function loadSupabase() {
    const cfg = window.APP_CONFIG || {};
    if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) return null;
    if (!window.supabase) {
      await new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
        s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    state.client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    const { data, error } = await state.client.from('hardware').select('*').order('year');
    if (error) throw error;
    return data;
  }

  async function init() {
    let books = null;
    try {
      books = await loadSupabase();
      if (books) state.source = 'supabase';
    } catch (err) {
      console.warn('Supabase no respondió, uso datos locales:', err);
      state.source = 'fallback';
    }
    state.books = (books && books.length ? books : window.HARDWARE_LOCAL || []).slice().sort((a, b) => a.year - b.year);
    $('#source-label').textContent = state.source === 'supabase' ? 'Supabase (en vivo)' : state.source === 'fallback' ? 'copia local (Supabase no respondió)' : 'copia local (modo demostración)';
    renderLegend();
    renderShelves();
    applyFilters();
    openFromHash();
  }

  // ---------- estantes ----------
  function renderLegend() {
    const counts = {};
    state.books.forEach((b) => (counts[b.status] = (counts[b.status] || 0) + 1));
    $('#legend').innerHTML = Object.entries(STATUS)
      .filter(([k]) => counts[k])
      .map(([k, v]) => `<button type="button" class="chip" data-status="${k}" aria-pressed="false"><i class="dot s-${k}"></i>${v.label}<span class="n">${counts[k]}</span></button>`)
      .join('');
  }

  function spineHTML(b, i) {
    const h = hash(b.slug);
    const cloth = CLOTH[b.location][h % CLOTH[b.location].length];
    const height = 80 + (h % 21); // 80–100 % del estante
    const width = 54 + ((h >> 3) % 26) + Math.min(20, Math.floor(b.name.length / 2.2));
    return `<button type="button" class="spine" data-slug="${esc(b.slug)}" style="--cloth:${cloth};--h:${height}%;--w:${width}px;--i:${i}" aria-label="${esc(b.name)}, ${esc(b.mission)}. ${STATUS[b.status].label}">
      <span class="band s-${b.status}"></span>
      <span class="spine-title">${esc(b.name)}</span>
      <span class="spine-year">${b.year}</span>
      <span class="spine-icon">${icon(b.kind)}</span>
    </button>`;
  }

  function renderShelves() {
    const groups = Object.keys(LOCATIONS).map((loc) => [loc, state.books.filter((b) => b.location === loc)]);
    let i = 0;
    $('#bookcase').innerHTML = groups.map(([loc, list]) => `
      <section class="shelf" data-location="${loc}" aria-labelledby="sh-${loc}">
        <div class="plaque">
          <h2 id="sh-${loc}">${LOCATIONS[loc].title}</h2>
          <p><span class="count">${list.length}</span> volúmenes · ${LOCATIONS[loc].note}</p>
        </div>
        <div class="shelf-row">${list.map((b) => spineHTML(b, i++)).join('')}<span class="bookend" aria-hidden="true"></span><a class="ghost" href="#sugerir" data-suggest="${loc}"><span>Propón un libro</span></a></div>
        <div class="board" aria-hidden="true"></div>
      </section>`).join('');
  }

  function matches(b) {
    if (state.statuses.size && !state.statuses.has(b.status)) return false;
    if (!state.q) return true;
    const hay = `${b.name} ${b.mission} ${b.place} ${KIND[b.kind] || ''} ${b.story} ${b.science}`.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return hay.includes(state.q);
  }

  function applyFilters() {
    let shown = 0;
    $$('.shelf').forEach((sh) => {
      const visibleShelf = state.loc === 'todo' || state.loc === sh.dataset.location;
      sh.hidden = !visibleShelf;
      let n = 0;
      $$('.spine', sh).forEach((sp) => {
        const ok = matches(state.books.find((b) => b.slug === sp.dataset.slug));
        sp.classList.toggle('is-dim', !ok);
        sp.classList.toggle('is-hit', ok && (state.q || state.statuses.size) ? true : false);
        sp.tabIndex = ok ? 0 : -1;
        if (ok) n++;
      });
      $('.count', sh).textContent = n;
      if (visibleShelf) shown += n;
    });
    const empty = $('#empty');
    empty.hidden = shown > 0;
    if (!shown) empty.textContent = state.q ? `Ningún libro coincide con «${$('#q').value.trim()}». Prueba con otra palabra o quita los filtros.` : 'No hay libros con esos filtros. Quita alguno para ver más.';
  }

  // Controles
  $('.segmented').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-loc]');
    if (!btn) return;
    state.loc = btn.dataset.loc;
    $$('.segmented [data-loc]').forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
    applyFilters();
  });
  $('#q').addEventListener('input', (e) => {
    state.q = e.target.value.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    applyFilters();
  });
  $('#legend').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-status]');
    if (!chip) return;
    const s = chip.dataset.status;
    state.statuses.has(s) ? state.statuses.delete(s) : state.statuses.add(s);
    chip.setAttribute('aria-pressed', String(state.statuses.has(s)));
    applyFilters();
  });
  $('#bookcase').addEventListener('click', (e) => {
    const g = e.target.closest('.ghost');
    if (g) { $('#suggest-form select[name=ubicacion]').value = g.dataset.suggest; setTimeout(() => $('#suggest-form input[name=objeto]').focus({ preventScroll: true }), 500); return; }
    const sp = e.target.closest('.spine');
    if (sp && !sp.classList.contains('is-dim')) openBook(sp.dataset.slug, sp);
  });

  // ---------- páginas ----------
  function pagesFor(b) {
    const st = STATUS[b.status];
    const sources = (b.sources || []).map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}<span class="ext">${ICONS.link}</span></a></li>`).join('');
    const stats = (b.stats || []).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    return [
      // 0 · portada
      `<div class="cover" style="--cloth:${CLOTH[b.location][hash(b.slug) % CLOTH[b.location].length]}">
        <div class="cover-frame">
          <div class="cover-art">${icon(b.kind)}</div>
          <h2 class="cover-title">${esc(b.name)}</h2>
          <p class="cover-mission">${esc(b.mission)}</p>
          <p class="cover-year">${LOCATIONS[b.location].title} · ${b.year}</p>
        </div>
        <span class="ribbon s-${b.status}" aria-hidden="true"></span>
      </div>`,
      // 1 · ficha
      `<div class="page">
        <h3 class="p-h">Ficha del objeto</h3>
        <dl class="facts">
          <div><dt>Tipo</dt><dd>${esc(KIND[b.kind] || b.kind)}</dd></div>
          <div><dt>Misión</dt><dd>${esc(b.mission)}</dd></div>
          <div><dt>Lugar</dt><dd>${esc(b.place)}</dd></div>
          <div><dt>Llegó</dt><dd>${esc(b.arrived)}</dd></div>
          <div><dt>Último registro</dt><dd>${esc(b.ended)}</dd></div>
        </dl>
        <p class="stamp s-${b.status}">${st.label}</p>
        <dl class="stats">${stats}</dl>
      </div>`,
      // 2 · historia
      `<div class="page"><h3 class="p-h">La historia</h3><p class="prose dropcap">${esc(b.story)}</p></div>`,
      // 3 · ciencia
      `<div class="page"><h3 class="p-h">La ciencia que hizo posible</h3><p class="prose">${esc(b.science)}</p></div>`,
      // 4 · hoy
      `<div class="page"><h3 class="p-h">¿Cómo está hoy?</h3><p class="prose">${esc(b.today)}</p>
        <div class="status-note"><p class="stamp s-${b.status}">${st.label}</p><p>${st.text}</p></div></div>`,
      // 5 · dato curioso
      `<div class="page page-fun"><div class="fun-art">${icon(b.kind)}</div><h3 class="p-h">Dato curioso</h3><p class="prose">${esc(b.fun || '')}</p></div>`,
      // 6 · fuentes
      `<div class="page"><h3 class="p-h">Para seguir leyendo</h3><ul class="sources">${sources}</ul>
        <p class="hint">Todos los enlaces llevan a archivos públicos de la NASA o de instituciones científicas.</p>
        <button type="button" class="btn-return" data-close>Devolver al estante</button></div>`,
      // 7 · contraportada
      `<div class="cover back" style="--cloth:${CLOTH[b.location][hash(b.slug) % CLOTH[b.location].length]}">
        <div class="cover-frame"><div class="cover-art small">${icon(b.kind)}</div><p class="back-note">Biblioteca de objetos<br>abandonados pero no olvidados</p></div>
      </div>`,
    ];
  }
  const PAGE_NAMES = ['Portada', 'Ficha', 'La historia', 'La ciencia', '¿Cómo está hoy?', 'Dato curioso', 'Para seguir leyendo', 'Contraportada'];

  // ---------- lector ----------
  const reader = $('#reader');
  const bookEl = $('#book');
  const flyLayer = $('#fly-layer');
  const R = { open: false, busy: false, book: null, spine: null, leaves: [], flipped: 0, side: 'right', L: 0, W: 0, H: 0, single: false };

  function measure() {
    const vw = innerWidth, vh = innerHeight;
    R.single = vw < 760;
    const maxH = vh - (R.single ? 150 : 170);
    R.W = Math.floor(R.single ? Math.min(vw - 32, maxH / 1.42, 460) : Math.min(440, (vw - 160) / 2, maxH / 1.42));
    R.H = Math.floor(R.W * 1.42);
    bookEl.style.setProperty('--W', R.W + 'px');
    bookEl.style.setProperty('--H', R.H + 'px');
  }

  function buildBook(b) {
    const faces = pagesFor(b);
    R.L = faces.length / 2;
    bookEl.innerHTML = '';
    R.leaves = [];
    for (let i = 0; i < R.L; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.innerHTML = `<div class="face front">${faces[i * 2]}<span class="folio">${i * 2 || ''}</span></div><div class="face back">${faces[i * 2 + 1]}<span class="folio">${i * 2 + 1 < faces.length - 1 ? i * 2 + 1 : ''}</span></div>`;
      bookEl.appendChild(leaf);
      R.leaves.push(leaf);
    }
  }

  function bookOffset() {
    if (R.single) {
      if (R.flipped === 0) return -R.W / 2;
      return R.side === 'left' ? R.W / 2 : -R.W / 2;
    }
    if (R.flipped === 0) return -R.W / 2;
    if (R.flipped === R.L) return R.W / 2;
    return 0;
  }

  function layout(turning = -1) {
    R.leaves.forEach((leaf, i) => {
      const isFlipped = i < R.flipped;
      leaf.classList.toggle('flipped', isFlipped);
      leaf.style.zIndex = i === turning ? 200 : isFlipped ? i + 1 : R.L - i + 1;
      leaf.inert = !(isFlipped ? i === R.flipped - 1 : i === R.flipped);
    });
    bookEl.style.transform = `translateX(${bookOffset()}px)`;
    const face = currentFace();
    $('#page-label').textContent = `${PAGE_NAMES[face] || ''} · ${face + 1} / ${R.L * 2}`;
    $('#prev').disabled = R.flipped === 0;
    $('#next').disabled = R.flipped === R.L || (R.single && R.flipped === R.L);
  }
  function currentFace() {
    if (R.flipped === 0) return 0;
    if (R.single) return R.side === 'left' ? R.flipped * 2 - 1 : R.flipped * 2;
    return R.flipped * 2 - 1;
  }

  function turn(dir) {
    if (!R.open || R.busy) return;
    let leafIdx = -1;
    if (R.single) {
      if (dir > 0) {
        if (R.flipped === R.L) return;
        if (R.flipped > 0 && R.side === 'left') { R.side = 'right'; layout(); return; }
        leafIdx = R.flipped; R.flipped++; R.side = 'left';
      } else {
        if (R.flipped === 0) return;
        if (R.side === 'right') { R.side = 'left'; layout(); return; }
        R.flipped--; leafIdx = R.flipped; R.side = 'right';
      }
    } else {
      if (dir > 0 && R.flipped < R.L) { leafIdx = R.flipped; R.flipped++; }
      else if (dir < 0 && R.flipped > 0) { R.flipped--; leafIdx = R.flipped; }
      else return;
    }
    const leaf = R.leaves[leafIdx];
    leaf.classList.remove('turning'); void leaf.offsetWidth; leaf.classList.add('turning');
    layout(leafIdx);
    clearTimeout(leaf._t);
    leaf._t = setTimeout(() => { leaf.classList.remove('turning'); layout(); }, 950);
  }

  // Transformación del "libro volador" para que su lomo coincida con el lomo del estante
  function spineTransform(rect, T) {
    const boxLeft = innerWidth / 2 - R.W / 2;
    const boxTop = innerHeight / 2 - R.H / 2 - (R.single ? 30 : 34);
    const s = rect.height / R.H;
    const ax = rect.width / T;
    const dx = rect.left + rect.width / 2 - boxLeft;
    const dy = rect.top + rect.height / 2 - (boxTop + R.H / 2);
    return { boxLeft, boxTop, from: `translate3d(${dx}px, ${dy}px, ${T / 2}px) scale3d(${ax}, ${s}, ${s}) rotateY(90deg)`, pulled: `translate3d(${dx}px, ${dy - 6}px, ${T / 2 + 90}px) scale3d(${ax}, ${s}, ${s}) rotateY(90deg)` };
  }

  function makeFlyer(b, spine, T) {
    const cloth = getComputedStyle(spine).getPropertyValue('--cloth');
    const fly = document.createElement('div');
    fly.className = 'flyer';
    fly.style.cssText = `width:${R.W}px;height:${R.H}px;--T:${T}px;--cloth:${cloth};transform-origin:0px ${R.H / 2}px ${-T / 2}px`;
    fly.innerHTML = `<div class="fly-front">${pagesFor(b)[0]}</div><div class="fly-spine">${spine.innerHTML}</div><div class="fly-back"></div><div class="fly-pages"></div>`;
    flyLayer.appendChild(fly);
    return fly;
  }

  async function openBook(slug, spine) {
    if (R.open || R.busy) return;
    const b = state.books.find((x) => x.slug === slug);
    if (!b) return;
    R.busy = true; R.book = b; R.spine = spine; R.flipped = 0; R.side = 'right';
    measure();
    buildBook(b);
    document.documentElement.classList.add('reading');
    reader.hidden = false;
    reader.classList.add('is-entering');
    layout();
    bookEl.style.visibility = 'hidden';
    history.replaceState(null, '', '#' + slug);

    const rect = spine.getBoundingClientRect();
    const T = 30;
    const t = spineTransform(rect, T);
    bookEl.parentElement.style.setProperty('--top', t.boxTop + 'px');

    if (reduceMotion.matches || !spine.isConnected || rect.width === 0) {
      reader.classList.add('is-open'); reader.classList.remove('is-entering');
      bookEl.style.visibility = '';
      await wait(60);
    } else {
      const fly = makeFlyer(b, spine, T);
      fly.style.left = t.boxLeft + 'px'; fly.style.top = t.boxTop + 'px';
      spine.classList.add('is-out');
      const anim = fly.animate([
        { transform: t.from, offset: 0 },
        { transform: t.pulled, offset: 0.24, easing: EASE_OUT },
        { transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateY(0deg)', offset: 1 },
      ], { duration: 1050, easing: 'cubic-bezier(0.33, 0, 0.2, 1)', fill: 'forwards' });
      setTimeout(() => reader.classList.add('is-open'), 220);
      await anim.finished;
      bookEl.style.visibility = '';
      reader.classList.remove('is-entering');
      fly.remove();
    }
    R.open = true; R.busy = false;
    await wait(reduceMotion.matches ? 0 : 140);
    turn(1); // abre la portada
    $('#next').focus({ preventScroll: true });
  }

  async function closeBook() {
    if (!R.open || R.busy) return;
    R.busy = true;
    const spine = R.spine && R.spine.isConnected ? R.spine : $(`.spine[data-slug="${R.book.slug}"]`);
    // Cierra el libro pasando las hojas hacia atrás
    if (R.flipped > 0) {
      const n = R.flipped;
      bookEl.classList.add('closing');
      for (let i = n - 1; i >= 0; i--) {
        R.flipped = i; R.side = 'right';
        layout(i);
        if (!reduceMotion.matches) await wait(70);
      }
      await wait(reduceMotion.matches ? 0 : 620);
      bookEl.classList.remove('closing');
    }
    history.replaceState(null, '', location.pathname + location.search);
    const rect = spine ? spine.getBoundingClientRect() : null;
    if (reduceMotion.matches || !rect || rect.width === 0) {
      reader.classList.remove('is-open');
      await wait(200);
    } else {
      const T = 30;
      const t = spineTransform(rect, T);
      const fly = makeFlyer(R.book, spine, T);
      fly.style.left = t.boxLeft + 'px'; fly.style.top = t.boxTop + 'px';
      bookEl.style.visibility = 'hidden';
      reader.classList.remove('is-open');
      const anim = fly.animate([
        { transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateY(0deg)', offset: 0 },
        { transform: t.pulled, offset: 0.78, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' },
        { transform: t.from, offset: 1 },
      ], { duration: 760, easing: 'cubic-bezier(0.5, 0, 0.3, 1)', fill: 'forwards' });
      await anim.finished;
      fly.remove();
    }
    spine && spine.classList.remove('is-out');
    reader.hidden = true;
    bookEl.style.visibility = '';
    document.documentElement.classList.remove('reading');
    R.open = false; R.busy = false;
    spine && spine.focus({ preventScroll: true });
  }

  // Eventos del lector
  $('#next').addEventListener('click', () => turn(1));
  $('#prev').addEventListener('click', () => turn(-1));
  reader.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) return closeBook();
    if (e.target.closest('a, button')) return;
    const leaf = e.target.closest('.leaf');
    if (!leaf) return;
    leaf.classList.contains('flipped') ? turn(-1) : turn(1);
  });
  document.addEventListener('keydown', (e) => {
    if (!R.open) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); turn(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); turn(-1); }
    else if (e.key === 'Escape') { e.preventDefault(); closeBook(); }
    else if (e.key === 'Tab') { // mantener el foco dentro del lector
      const f = $$('button:not([disabled]), a[href]', reader).filter((el) => !el.closest('[inert]') && el.offsetParent);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // Deslizar con el dedo
  let touchX = null;
  $('#stage').addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
  $('#stage').addEventListener('touchend', (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) turn(dx < 0 ? 1 : -1);
    touchX = null;
  });
  addEventListener('resize', () => {
    if (!R.open) return;
    measure();
    const top = innerHeight / 2 - R.H / 2 - (R.single ? 30 : 34);
    bookEl.parentElement.style.setProperty('--top', top + 'px');
    if (R.single && R.flipped > 0 && R.flipped < R.L && !R.side) R.side = 'left';
    layout();
  });

  function openFromHash() {
    const slug = decodeURIComponent(location.hash.slice(1));
    const sp = slug && $(`.spine[data-slug="${CSS.escape(slug)}"]`);
    if (sp) setTimeout(() => { sp.scrollIntoView({ block: 'center' }); openBook(slug, sp); }, 500);
  }

  // ---------- sugerencias ----------
  $('#suggest-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const msg = $('#form-msg');
    const btn = $('button[type=submit]', form);
    const data = Object.fromEntries(new FormData(form));
    msg.className = 'form-msg';
    if (!data.objeto || data.objeto.trim().length < 2) {
      msg.textContent = 'Escribe el nombre del objeto o de la misión (al menos 2 letras).';
      msg.classList.add('is-error');
      form.objeto.focus();
      return;
    }
    if (!state.client) {
      msg.textContent = 'Modo demostración: conecta Supabase (ver README) para guardar sugerencias.';
      msg.classList.add('is-warn');
      return;
    }
    btn.disabled = true; btn.textContent = 'Enviando…';
    const { error } = await state.client.from('sugerencias').insert({
      objeto: data.objeto.trim(), ubicacion: data.ubicacion, motivo: data.motivo?.trim() || null, autor: data.autor?.trim() || null,
    });
    btn.disabled = false; btn.textContent = 'Enviar sugerencia';
    if (error) {
      msg.textContent = 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.';
      msg.classList.add('is-error');
      console.error(error);
    } else {
      msg.textContent = `¡Gracias! «${data.objeto.trim()}» quedó anotado en el libro de sugerencias.`;
      msg.classList.add('is-ok');
      form.reset();
    }
  });

  init();
})();
