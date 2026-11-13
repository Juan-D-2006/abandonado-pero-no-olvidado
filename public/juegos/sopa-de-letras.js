/* Sopa de letras: palabras de la biblioteca colocadas al azar en 8 direcciones. */
(() => {
  'use strict';
  const N = 14;          // tamaño de la cuadrícula
  const PICK = 10;       // palabras por partida

  // Palabra (sin tildes, en mayúsculas), dónde está y un dato breve.
  const POOL = [
    ['VOYAGER', 'Espacio profundo', 'Las Voyager 1 y 2 salieron en 1977 y hoy viajan por el espacio interestelar con un disco de oro a bordo.'],
    ['PIONEER', 'Espacio profundo', 'Pioneer 10 fue la primera nave en cruzar el cinturón de asteroides. Su última señal llegó en 2003.'],
    ['PLUTON', 'Espacio profundo', 'New Horizons pasó junto a Plutón en 2015 y lleva cenizas de Clyde Tombaugh, quien lo descubrió.'],
    ['ARROKOTH', 'Espacio profundo', 'En 2019 New Horizons visitó Arrokoth, el objeto más lejano jamás explorado de cerca.'],
    ['SPIRIT', 'Marte', 'Spirit debía durar 90 días y trabajó más de 6 años en el cráter Gusev.'],
    ['OPPORTUNITY', 'Marte', 'Opportunity recorrió 45 km en Marte durante más de 14 años.'],
    ['SOJOURNER', 'Marte', 'Sojourner, de solo 10,6 kg, fue el primer rover en Marte (1997). Su nombre lo propuso una niña de 12 años.'],
    ['VIKING', 'Marte', 'Viking 1 tomó las primeras fotos a color desde la superficie de Marte en 1976.'],
    ['PHOENIX', 'Marte', 'Phoenix encontró hielo de agua en el ártico marciano y lleva un DVD con libros sobre Marte.'],
    ['INSIGHT', 'Marte', 'InSight escuchó 1.319 martemotos durante cuatro años en Elysium Planitia.'],
    ['INGENUITY', 'Marte', 'Ingenuity planeaba 5 vuelos y logró 72: el primer helicóptero en otro planeta.'],
    ['MAVEN', 'Marte', 'MAVEN estudió hacia dónde se fue el aire de Marte durante 11 años en órbita.'],
    ['JEZERO', 'Marte', 'En el cráter Jezero quedaron Ingenuity y el depósito de muestras Three Forks.'],
    ['EAGLE', 'Luna', 'El Eagle de Apollo 11 aterrizó en el Mar de la Tranquilidad en 1969. Su etapa de descenso sigue allí.'],
    ['APOLLO', 'Luna', 'Las misiones Apollo dejaron rovers, sismómetros, reflectores y más de 100 objetos en la Luna.'],
    ['SURVEYOR', 'Luna', 'Surveyor 3 rebotó tres veces al aterrizar y fue visitado por astronautas de Apollo 12.'],
    ['LCROSS', 'Luna', 'LCROSS chocó a propósito contra el cráter Cabeus en 2009 y así se confirmó agua en la Luna.'],
    ['ROVER', 'Luna', 'Tres Rovers Lunares (LRV) siguen estacionados donde los dejaron las tripulaciones de Apollo.'],
    ['ALSEP', 'Luna', 'Las estaciones ALSEP midieron lunamotos durante casi 8 años con energía de plutonio.'],
    ['REFLECTOR', 'Luna', 'Los retrorreflectores láser de Apollo siguen funcionando: miden la distancia a la Luna con precisión de milímetros.'],
    ['CABEUS', 'Luna', 'Cabeus es el cráter del polo sur lunar donde impactó LCROSS buscando hielo.'],
    ['LUNA', 'Luna', 'Seis etapas de descenso de Apollo siguen sobre la superficie lunar.'],
    ['MARTE', 'Marte', 'En Marte descansan landers, rovers, un helicóptero y diez tubos con muestras.'],
  ];

  const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];
  const ABC = 'ABCDEFGHIJKLMNOPRSTUVYZ';
  const $ = (s) => document.querySelector(s);
  const gridEl = $('#grid'), wordsEl = $('#words'), factEl = $('#fact');

  let grid, placed, found, cells, t0, timer, done;

  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function tryPlace(word) {
    for (let attempt = 0; attempt < 300; attempt++) {
      const [dr, dc] = DIRS[Math.random() * DIRS.length | 0];
      const r0 = Math.random() * N | 0, c0 = Math.random() * N | 0;
      const r1 = r0 + dr * (word.length - 1), c1 = c0 + dc * (word.length - 1);
      if (r1 < 0 || r1 >= N || c1 < 0 || c1 >= N) continue;
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const ch = grid[r0 + dr * i][c0 + dc * i];
        if (ch && ch !== word[i]) { ok = false; break; }
      }
      if (!ok) continue;
      const path = [];
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dr * i, c = c0 + dc * i;
        grid[r][c] = word[i]; path.push(r * N + c);
      }
      return path;
    }
    return null;
  }

  function build() {
    for (let tries = 0; tries < 20; tries++) {
      grid = Array.from({ length: N }, () => Array(N).fill(''));
      placed = [];
      // primero las largas: es más fácil acomodarlas
      const pick = shuffle(POOL.slice()).slice(0, PICK).sort((a, b) => b[0].length - a[0].length);
      let ok = true;
      for (const [w, where, fact] of pick) {
        const path = tryPlace(w);
        if (!path) { ok = false; break; }
        placed.push({ w, where, fact, path, key: path.join(',') });
      }
      if (ok) break;
    }
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!grid[r][c]) grid[r][c] = ABC[Math.random() * ABC.length | 0];
    placed.sort((a, b) => a.w.localeCompare(b.w));
  }

  function render() {
    gridEl.style.setProperty('--n', N);
    gridEl.innerHTML = '';
    cells = [];
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const d = document.createElement('div');
      d.className = 'cell'; d.textContent = grid[r][c];
      d.dataset.i = r * N + c; d.setAttribute('role', 'gridcell');
      gridEl.appendChild(d); cells.push(d);
    }
    wordsEl.innerHTML = placed.map((p, i) => `<li data-w="${i}"><span>${p.w}</span><small>${p.where}</small></li>`).join('');
    updateCount();
  }

  function updateCount() { $('#found').textContent = `${found.size}/${placed.length}`; }

  function tick() {
    const s = Math.floor((Date.now() - t0) / 1000);
    $('#time').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

  function newGame() {
    found = new Set(); done = false;
    build(); render();
    factEl.innerHTML = '<strong>¿Listo?</strong>Encuentra la primera palabra para leer su ficha.';
    clearInterval(timer); t0 = Date.now(); tick(); timer = setInterval(tick, 1000);
  }

  // ---------- selección con puntero (ratón y táctil) ----------
  let start = null, sel = [];
  const cellAt = (x, y) => { const el = document.elementFromPoint(x, y); return el && el.classList.contains('cell') ? +el.dataset.i : null; };
  function line(a, b) {
    const ar = a / N | 0, ac = a % N, br = b / N | 0, bc = b % N;
    const dr = Math.sign(br - ar), dc = Math.sign(bc - ac);
    const len = Math.max(Math.abs(br - ar), Math.abs(bc - ac));
    // solo líneas rectas: horizontal, vertical o diagonal exacta
    if (!(ar === br || ac === bc || Math.abs(br - ar) === Math.abs(bc - ac))) return null;
    const out = [];
    for (let i = 0; i <= len; i++) out.push((ar + dr * i) * N + (ac + dc * i));
    return out;
  }
  function paint(list) {
    sel.forEach((i) => cells[i].classList.remove('sel'));
    sel = list || [];
    sel.forEach((i) => cells[i].classList.add('sel'));
  }
  gridEl.addEventListener('pointerdown', (e) => {
    const i = cellAt(e.clientX, e.clientY); if (i == null || done) return;
    e.preventDefault(); start = i; paint([i]);
  });
  window.addEventListener('pointermove', (e) => {
    if (start == null) return;
    const i = cellAt(e.clientX, e.clientY); if (i == null) return;
    const l = line(start, i); if (l) paint(l);
  });
  window.addEventListener('pointerup', () => {
    if (start == null) return;
    start = null;
    check(sel.slice());
    paint([]);
  });

  function check(list) {
    if (list.length < 2) return;
    const fwd = list.join(','), rev = list.slice().reverse().join(',');
    const idx = placed.findIndex((p, k) => !found.has(k) && (p.key === fwd || p.key === rev));
    if (idx < 0) return;
    found.add(idx);
    const p = placed[idx];
    p.path.forEach((i) => cells[i].classList.add('found'));
    wordsEl.querySelector(`[data-w="${idx}"]`).classList.add('done');
    factEl.innerHTML = `<strong>${p.w.charAt(0) + p.w.slice(1).toLowerCase()} · ${p.where}</strong>${p.fact}`;
    updateCount();
    if (found.size === placed.length) {
      done = true; clearInterval(timer);
      factEl.innerHTML = `<strong>¡Sopa completa!</strong>Encontraste las ${placed.length} palabras en ${$('#time').textContent}. Pulsa «Nueva sopa» para otra ronda con palabras distintas.`;
    }
  }

  $('#hint').addEventListener('click', () => {
    const left = placed.map((p, k) => k).filter((k) => !found.has(k));
    if (!left.length) return;
    const p = placed[left[Math.random() * left.length | 0]];
    const c = cells[p.path[0]];
    c.classList.remove('hint'); void c.offsetWidth; c.classList.add('hint');
    t0 -= 10000; tick(); // la pista cuesta 10 segundos
  });
  $('#new').addEventListener('click', newGame);

  newGame();
})();
