/* Sopa de letras: palabras de la biblioteca colocadas al azar en 8 direcciones. */
(() => {
  'use strict';
  const N = 14;          // tamaño de la cuadrícula
  const PICK = 10;       // palabras por partida

  const tr = (window.I18N && I18N.tr) || ((es) => es);
  const EN = !!(window.I18N && I18N.lang === 'en');
  const WHERE = { luna: tr('Luna', 'Moon'), marte: tr('Marte', 'Mars'), espacio: tr('Espacio profundo', 'Deep space') };

  // [palabra en español, palabra en inglés, lugar, dato en español, dato en inglés] (sin tildes, en mayúsculas)
  const POOL = [
    ['VOYAGER', 'VOYAGER', 'espacio', 'Las Voyager 1 y 2 salieron en 1977 y hoy viajan por el espacio interestelar con un disco de oro a bordo.', 'Voyager 1 and 2 left in 1977 and now travel through interstellar space with a golden record on board.'],
    ['PIONEER', 'PIONEER', 'espacio', 'Pioneer 10 fue la primera nave en cruzar el cinturón de asteroides. Su última señal llegó en 2003.', 'Pioneer 10 was the first spacecraft to cross the asteroid belt. Its last signal arrived in 2003.'],
    ['PLUTON', 'PLUTO', 'espacio', 'New Horizons pasó junto a Plutón en 2015 y lleva cenizas de Clyde Tombaugh, quien lo descubrió.', 'New Horizons flew past Pluto in 2015 and carries ashes of Clyde Tombaugh, who discovered it.'],
    ['ARROKOTH', 'ARROKOTH', 'espacio', 'En 2019 New Horizons visitó Arrokoth, el objeto más lejano jamás explorado de cerca.', 'In 2019 New Horizons visited Arrokoth, the most distant object ever explored up close.'],
    ['SPIRIT', 'SPIRIT', 'marte', 'Spirit debía durar 90 días y trabajó más de 6 años en el cráter Gusev.', 'Spirit was meant to last 90 days and worked for more than 6 years in Gusev Crater.'],
    ['OPPORTUNITY', 'OPPORTUNITY', 'marte', 'Opportunity recorrió 45 km en Marte durante más de 14 años.', 'Opportunity drove 45 km on Mars over more than 14 years.'],
    ['SOJOURNER', 'SOJOURNER', 'marte', 'Sojourner, de solo 10,6 kg, fue el primer rover en Marte (1997). Su nombre lo propuso una niña de 12 años.', 'Sojourner, weighing just 10.6 kg, was the first rover on Mars (1997). A 12-year-old girl suggested its name.'],
    ['VIKING', 'VIKING', 'marte', 'Viking 1 tomó las primeras fotos a color desde la superficie de Marte en 1976.', 'Viking 1 took the first color photos from the surface of Mars in 1976.'],
    ['PHOENIX', 'PHOENIX', 'marte', 'Phoenix encontró hielo de agua en el ártico marciano y lleva un DVD con libros sobre Marte.', 'Phoenix found water ice in the Martian arctic and carries a DVD of books about Mars.'],
    ['INSIGHT', 'INSIGHT', 'marte', 'InSight escuchó 1.319 martemotos durante cuatro años en Elysium Planitia.', 'InSight listened to 1,319 marsquakes over four years in Elysium Planitia.'],
    ['INGENUITY', 'INGENUITY', 'marte', 'Ingenuity planeaba 5 vuelos y logró 72: el primer helicóptero en otro planeta.', 'Ingenuity planned 5 flights and made 72: the first helicopter on another planet.'],
    ['MAVEN', 'MAVEN', 'marte', 'MAVEN estudió hacia dónde se fue el aire de Marte durante 11 años en órbita.', 'MAVEN spent 11 years in orbit studying where the air of Mars went.'],
    ['JEZERO', 'JEZERO', 'marte', 'En el cráter Jezero quedaron Ingenuity y el depósito de muestras Three Forks.', 'Ingenuity and the Three Forks sample depot were left in Jezero Crater.'],
    ['EAGLE', 'EAGLE', 'luna', 'El Eagle de Apollo 11 aterrizó en el Mar de la Tranquilidad en 1969. Su etapa de descenso sigue allí.', 'Apollo 11\'s Eagle landed in the Sea of Tranquility in 1969. Its descent stage is still there.'],
    ['APOLLO', 'APOLLO', 'luna', 'Las misiones Apollo dejaron rovers, sismómetros, reflectores y más de 100 objetos en la Luna.', 'The Apollo missions left rovers, seismometers, reflectors and more than 100 objects on the Moon.'],
    ['SURVEYOR', 'SURVEYOR', 'luna', 'Surveyor 3 rebotó tres veces al aterrizar y fue visitado por astronautas de Apollo 12.', 'Surveyor 3 bounced three times on landing and was visited by the Apollo 12 astronauts.'],
    ['LCROSS', 'LCROSS', 'luna', 'LCROSS chocó a propósito contra el cráter Cabeus en 2009 y así se confirmó agua en la Luna.', 'LCROSS crashed into Cabeus Crater on purpose in 2009, confirming water on the Moon.'],
    ['ROVER', 'ROVER', 'luna', 'Tres Rovers Lunares (LRV) siguen estacionados donde los dejaron las tripulaciones de Apollo.', 'Three Lunar Roving Vehicles (LRV) are still parked where the Apollo crews left them.'],
    ['ALSEP', 'ALSEP', 'luna', 'Las estaciones ALSEP midieron lunamotos durante casi 8 años con energía de plutonio.', 'The ALSEP stations measured moonquakes for almost 8 years, powered by plutonium.'],
    ['REFLECTOR', 'REFLECTOR', 'luna', 'Los retrorreflectores láser de Apollo siguen funcionando: miden la distancia a la Luna con precisión de milímetros.', 'The Apollo laser retroreflectors still work: they measure the distance to the Moon to the millimeter.'],
    ['CABEUS', 'CABEUS', 'luna', 'Cabeus es el cráter del polo sur lunar donde impactó LCROSS buscando hielo.', 'Cabeus is the crater at the lunar south pole where LCROSS crashed looking for ice.'],
    ['LUNA', 'MOON', 'luna', 'Seis etapas de descenso de Apollo siguen sobre la superficie lunar.', 'Six Apollo descent stages are still on the lunar surface.'],
    ['MARTE', 'MARS', 'marte', 'En Marte descansan landers, rovers, un helicóptero y diez tubos con muestras.', 'Landers, rovers, a helicopter and ten sample tubes rest on Mars.'],
  ].map(([es, en, where, fes, fen]) => [EN ? en : es, WHERE[where], EN ? fen : fes]);

  const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];
  const ABC = EN ? 'ABCDEFGHIJKLMNOPRSTUVWYZ' : 'ABCDEFGHIJKLMNOPRSTUVYZ';
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
    factEl.innerHTML = tr('<strong>¿Listo?</strong>Encuentra la primera palabra para leer su ficha.', '<strong>Ready?</strong>Find the first word to read its card.');
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
      factEl.innerHTML = tr(`<strong>¡Sopa completa!</strong>Encontraste las ${placed.length} palabras en ${$('#time').textContent}. Pulsa «Nueva sopa» para otra ronda con palabras distintas.`, `<strong>Puzzle complete!</strong>You found all ${placed.length} words in ${$('#time').textContent}. Press “New puzzle” for another round with different words.`);
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
