/* Expedición lunar: conduce un rover por la Luna y visita cinco objetos de las misiones de la NASA.
   Usa Three.js (la misma versión que las escenas de la biblioteca). */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, t) => a + (b - a) * t;

  const WORLD = 95;               // radio jugable
  const UNIT_M = 10;              // 1 unidad = 10 m (solo para mostrar)
  const SITES = [
    { id: 'eagle', name: 'Etapa de descenso del Eagle', x: 0, z: -30,
      fact: 'Apollo 11, 1969. La parte inferior del módulo lunar sirvió de plataforma de despegue y se quedó aquí, con una placa que dice «Vinimos en paz en nombre de toda la humanidad».' },
    { id: 'reflector', name: 'Retrorreflector láser', x: 14, z: -44,
      fact: 'Un panel de prismas que devuelve la luz de los láseres enviados desde la Tierra. Sigue funcionando sin energía y mide la distancia a la Luna con precisión de milímetros.' },
    { id: 'lrv', name: 'Rover Lunar (LRV)', x: -62, z: 18,
      fact: 'Tres de estos autos eléctricos quedaron en la Luna. Sus ruedas eran de malla de acero y la sonda LRO todavía fotografía sus huellas.' },
    { id: 'alsep', name: 'Estación científica ALSEP', x: 58, z: 34,
      fact: 'Sismómetros y otros instrumentos alimentados con plutonio-238. Midieron lunamotos durante casi 8 años, hasta 1977.' },
    { id: 'surveyor', name: 'Surveyor 3', x: 8, z: 70,
      fact: 'Aterrizó en 1967 rebotando tres veces. Dos años y medio después, los astronautas de Apollo 12 llegaron caminando y se llevaron su cámara.' },
  ];
  // Nombres y datos de los sitios en inglés y francés (el español está arriba)
  const SITES_I18N = {
    en: {
      eagle: ['Eagle descent stage', 'Apollo 11, 1969. The bottom part of the lunar module served as a launch pad and stayed here, with a plaque that says “We came in peace for all mankind.”'],
      reflector: ['Laser retroreflector', 'A panel of prisms that bounces back the light of lasers fired from Earth. It still works without power and measures the distance to the Moon to the millimeter.'],
      lrv: ['Lunar Roving Vehicle (LRV)', 'Three of these electric cars were left on the Moon. Their wheels were made of steel mesh and the LRO spacecraft still photographs their tracks.'],
      alsep: ['ALSEP science station', 'Seismometers and other instruments powered by plutonium-238. They measured moonquakes for almost 8 years, until 1977.'],
      surveyor: ['Surveyor 3', 'It landed in 1967, bouncing three times. Two and a half years later, the Apollo 12 astronauts walked over and took its camera.'],
    },
    fr: {
      eagle: ['Étage de descente de l’Eagle', 'Apollo 11, 1969. La partie basse du module lunaire a servi de rampe de lancement et est restée ici, avec une plaque qui dit « Nous sommes venus en paix au nom de toute l’humanité ».'],
      reflector: ['Rétroréflecteur laser', 'Un panneau de prismes qui renvoie la lumière des lasers tirés depuis la Terre. Il fonctionne encore sans énergie et mesure la distance de la Lune au millimètre près.'],
      lrv: ['Rover lunaire (LRV)', 'Trois de ces voitures électriques sont restées sur la Lune. Leurs roues étaient en treillis d’acier et la sonde LRO photographie encore leurs traces.'],
      alsep: ['Station scientifique ALSEP', 'Des sismomètres et d’autres instruments alimentés au plutonium 238. Ils ont mesuré des séismes lunaires pendant presque 8 ans, jusqu’en 1977.'],
      surveyor: ['Surveyor 3', 'Il s’est posé en 1967 en rebondissant trois fois. Deux ans et demi plus tard, les astronautes d’Apollo 12 sont venus à pied et ont emporté sa caméra.'],
    },
  };
  const I = window.I18N || { lang: 'es', t: (k) => k };
  const _t = (k, v) => I.t(k, v);
  const ES_SITES = SITES.map((s) => [s.name, s.fact]);
  function localizeSites() {
    const tr = SITES_I18N[I.lang];
    SITES.forEach((s, i) => { const v = (tr && tr[s.id]) || ES_SITES[i]; s.name = v[0]; s.fact = v[1]; });
  }
  localizeSites();
  addEventListener('langchange', localizeSites);

  const CRATERS = [
    [-30, -10, 11, 3.2], [35, -10, 14, 3.8], [-20, 50, 9, 2.6], [70, -50, 16, 4.5], [-70, -55, 18, 5],
    [40, 70, 8, 2.2], [-45, 75, 12, 3.4], [80, 5, 7, 2], [-85, -10, 9, 2.6], [20, 25, 6, 1.6],
    [-10, -70, 10, 2.8], [55, -80, 7, 2], [-55, -30, 5, 1.4], [30, 48, 4, 1.1],
  ];

  function height(x, z) {
    let h = 1.1 * Math.sin(x * 0.045) * Math.cos(z * 0.05) + 0.55 * Math.sin(x * 0.12 + z * 0.09) + 0.25 * Math.cos(x * 0.31 - z * 0.27);
    for (const [cx, cz, r, d] of CRATERS) {
      const q = Math.hypot(x - cx, z - cz) / r;
      if (q < 1) h -= d * (1 - q * q);               // cuenco
      else if (q < 1.6) h += d * 0.32 * Math.pow(Math.sin(((q - 1) / 0.6) * Math.PI), 2); // borde
    }
    // aplanar suavemente alrededor de cada sitio
    for (const s of SITES) {
      const q = Math.hypot(x - s.x, z - s.z);
      if (q < 9) { const k = (1 - q / 9) ** 2; h = lerp(h, s.h ?? h, k); }
    }
    return h;
  }

  // ---------- estado del juego ----------
  const keys = { fwd: 0, back: 0, left: 0, right: 0, boost: 0 };
  const G = { running: false, battery: 100, visited: new Set(), t: 0, speed: 0, yaw: 0, x: 0, z: 8, wheel: 0 };
  let T, renderer, scene, camera, sun, rover, wheels = [], cells = [], beacons = {}, toastTimer = 0, last = 0;

  function loadThree() {
    return new Promise((res, rej) => {
      if (window.THREE) return res();
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js';
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  const mat = (color, o = {}) => new T.MeshStandardMaterial(Object.assign({ color, roughness: 0.8, metalness: 0.1, flatShading: true }, o));
  function box(w, h, d, m) { const x = new T.Mesh(new T.BoxGeometry(w, h, d), m); x.castShadow = true; x.receiveShadow = true; return x; }
  function cyl(rt, rb, h, seg, m) { const x = new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg), m); x.castShadow = true; x.receiveShadow = true; return x; }

  // ---------- modelos ----------
  const GOLD = () => mat(0xc9a144, { metalness: 0.6, roughness: 0.4 });
  const SILVER = () => mat(0xbfc3c7, { metalness: 0.5, roughness: 0.5 });
  const DARK = () => mat(0x2a2d33, { roughness: 0.6 });

  function makeRover() {
    const g = new T.Group();
    const body = box(2.2, 0.6, 3, mat(0xe9e4d8)); body.position.y = 1.1; g.add(body);
    const deck = box(2.4, 0.08, 3.2, DARK()); deck.position.y = 1.44; g.add(deck);
    const panel = box(2.6, 0.06, 1.6, mat(0x1d3d78, { metalness: 0.4, roughness: 0.3 })); panel.position.set(0, 1.55, -0.6); g.add(panel);
    const mast = cyl(0.06, 0.06, 1.3, 6, SILVER()); mast.position.set(0.6, 2.1, 0.9); g.add(mast);
    const head = box(0.7, 0.3, 0.3, mat(0xe9e4d8)); head.position.set(0.6, 2.8, 0.9); g.add(head);
    const eye = box(0.18, 0.12, 0.05, mat(0x111111, { emissive: 0x4fb3ff, emissiveIntensity: 0.6 })); eye.position.set(0.6, 2.8, 1.07); g.add(eye);
    const dish = new T.Mesh(new T.SphereGeometry(0.45, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2.6), SILVER());
    dish.rotation.x = -0.9; dish.position.set(-0.7, 1.9, 0.4); dish.castShadow = true; g.add(dish);
    const wm = DARK();
    for (const [x, z] of [[-1.25, 1.1], [1.25, 1.1], [-1.25, 0], [1.25, 0], [-1.25, -1.1], [1.25, -1.1]]) {
      const w = cyl(0.42, 0.42, 0.35, 10, wm); w.rotation.z = Math.PI / 2; w.position.set(x, 0.42, z);
      g.add(w); wheels.push(w);
    }
    return g;
  }

  function makeEagle() {
    const g = new T.Group();
    const stage = cyl(1.8, 1.8, 1.5, 8, GOLD()); stage.position.y = 1.9; g.add(stage);
    const top = cyl(1.6, 1.8, 0.15, 8, SILVER()); top.position.y = 2.72; g.add(top);
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2 + Math.PI / 4;
      const leg = cyl(0.09, 0.09, 2.8, 6, SILVER());
      leg.position.set(Math.cos(a) * 2.2, 1.2, Math.sin(a) * 2.2);
      leg.rotation.set(Math.sin(a) * 0.45, 0, -Math.cos(a) * 0.45);
      g.add(leg);
      const pad = cyl(0.45, 0.5, 0.12, 10, SILVER()); pad.position.set(Math.cos(a) * 2.8, 0.06, Math.sin(a) * 2.8); g.add(pad);
    }
    const ladder = box(0.5, 1.6, 0.08, SILVER()); ladder.position.set(0, 1.0, 2.1); ladder.rotation.x = 0.35; g.add(ladder);
    const plaque = box(0.5, 0.35, 0.04, mat(0xd8d8d8, { metalness: 0.8 })); plaque.position.set(0, 1.9, 1.86); g.add(plaque);
    return g;
  }
  function makeReflector() {
    const g = new T.Group();
    const stand = box(0.15, 0.8, 0.15, SILVER()); stand.position.y = 0.4; g.add(stand);
    const p = new T.Group(); p.position.y = 0.9; p.rotation.x = -0.6; g.add(p);
    const frame = box(1.8, 0.1, 1.8, SILVER()); p.add(frame);
    const pm = mat(0x223344, { metalness: 0.9, roughness: 0.15 });
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
      const c = new T.Mesh(new T.CylinderGeometry(0.11, 0.11, 0.06, 8), pm); c.position.set(-0.7 + i * 0.28, 0.07, -0.7 + j * 0.28); p.add(c);
    }
    return g;
  }
  function makeLRV() {
    const g = new T.Group();
    const chassis = box(2, 0.15, 3.2, SILVER()); chassis.position.y = 0.85; g.add(chassis);
    const wm = DARK();
    for (const [x, z] of [[-1.1, 1.2], [1.1, 1.2], [-1.1, -1.2], [1.1, -1.2]]) {
      const w = cyl(0.45, 0.45, 0.3, 12, wm); w.rotation.z = Math.PI / 2; w.position.set(x, 0.45, z); g.add(w);
      const f = box(0.4, 0.06, 0.9, mat(0x8a7a52)); f.position.set(x, 0.95, z); g.add(f);
    }
    for (const x of [-0.45, 0.45]) {
      const seat = box(0.7, 0.08, 0.6, mat(0x4d6a8c)); seat.position.set(x, 1.05, 0); g.add(seat);
      const back = box(0.7, 0.6, 0.06, mat(0x4d6a8c)); back.position.set(x, 1.35, -0.3); g.add(back);
    }
    const console_ = box(0.6, 0.5, 0.2, DARK()); console_.position.set(0, 1.2, 0.8); g.add(console_);
    const pole = cyl(0.04, 0.04, 1.4, 6, SILVER()); pole.position.set(0, 1.6, 1.3); g.add(pole);
    const ant = new T.Mesh(new T.ConeGeometry(0.7, 0.3, 12, 1, true), mat(0xdedede, { side: T.DoubleSide })); ant.position.set(0, 2.4, 1.3); ant.rotation.x = Math.PI; g.add(ant);
    return g;
  }
  function makeALSEP() {
    const g = new T.Group();
    const central = box(1.2, 0.5, 0.9, GOLD()); central.position.y = 0.25; g.add(central);
    const sun_ = box(1.3, 0.05, 0.9, mat(0xeeeeee, { metalness: 0.7 })); sun_.position.set(0, 0.9, 0); g.add(sun_);
    for (const x of [-0.6, 0.6]) { const l = cyl(0.03, 0.03, 0.6, 4, SILVER()); l.position.set(x, 0.6, 0); g.add(l); }
    const rtg = cyl(0.25, 0.25, 0.9, 10, DARK()); rtg.position.set(2.2, 0.45, 0.6); g.add(rtg);
    for (let i = 0; i < 6; i++) { const fin = box(0.6, 0.85, 0.03, DARK()); fin.position.copy(rtg.position); fin.rotation.y = i * Math.PI / 6; g.add(fin); }
    const seis = cyl(0.3, 0.35, 0.5, 10, mat(0xd8d2c0)); seis.position.set(-2.4, 0.25, 1.2); g.add(seis);
    const ant = new T.Mesh(new T.ConeGeometry(0.35, 0.4, 10, 1, true), mat(0xdedede, { side: T.DoubleSide })); ant.position.set(0, 1.4, 0); ant.rotation.x = 0.4; g.add(ant);
    return g;
  }
  function makeSurveyor() {
    const g = new T.Group();
    const frame = cyl(0.9, 1.1, 1.0, 3, SILVER()); frame.position.y = 1.2; g.add(frame);
    for (let i = 0; i < 3; i++) {
      const a = i * Math.PI * 2 / 3;
      const leg = cyl(0.06, 0.06, 1.8, 5, SILVER()); leg.position.set(Math.cos(a) * 1.3, 0.75, Math.sin(a) * 1.3);
      leg.rotation.set(Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6); g.add(leg);
      const pad = cyl(0.3, 0.32, 0.1, 8, SILVER()); pad.position.set(Math.cos(a) * 1.8, 0.05, Math.sin(a) * 1.8); g.add(pad);
    }
    const mast = cyl(0.05, 0.05, 1.8, 5, SILVER()); mast.position.y = 2.5; g.add(mast);
    const sol = box(1.1, 0.04, 0.8, mat(0x1d3d78, { metalness: 0.4 })); sol.position.y = 3.3; sol.rotation.x = 0.5; g.add(sol);
    const cam = box(0.3, 0.5, 0.3, mat(0xe9e4d8)); cam.position.set(0.5, 1.9, 0.3); g.add(cam);
    return g;
  }
  const MAKERS = { eagle: makeEagle, reflector: makeReflector, lrv: makeLRV, alsep: makeALSEP, surveyor: makeSurveyor };

  // ---------- mundo ----------
  function buildWorld() {
    scene = new T.Scene();
    scene.background = new T.Color(0x05060a);
    scene.fog = new T.Fog(0x05060a, 70, 190);
    camera = new T.PerspectiveCamera(60, 1, 0.1, 600);

    scene.add(new T.HemisphereLight(0x8090b0, 0x2a2622, 0.35));
    sun = new T.DirectionalLight(0xfff4e0, 1.25);
    sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 120 });
    scene.add(sun); scene.add(sun.target);

    // estrellas
    const n = 2200, p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 0.9 + 0.08, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
      p.set([300 * s * Math.cos(a), 300 * u, 300 * s * Math.sin(a)], i * 3);
    }
    const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.BufferAttribute(p, 3));
    const st = new T.Points(sg, new T.PointsMaterial({ color: 0xffffff, size: 1.3, sizeAttenuation: false, fog: false }));
    scene.add(st);

    // la Tierra en el cielo
    const ec = document.createElement('canvas'); ec.width = 256; ec.height = 128;
    const x = ec.getContext('2d');
    x.fillStyle = '#2a5fae'; x.fillRect(0, 0, 256, 128);
    x.fillStyle = '#4f8a4a';
    for (let i = 0; i < 26; i++) { x.beginPath(); x.ellipse(Math.random() * 256, 20 + Math.random() * 88, 8 + Math.random() * 22, 5 + Math.random() * 12, Math.random() * 3, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = 'rgba(255,255,255,.75)';
    for (let i = 0; i < 40; i++) { x.beginPath(); x.ellipse(Math.random() * 256, Math.random() * 128, 6 + Math.random() * 18, 2 + Math.random() * 4, 0, 0, Math.PI * 2); x.fill(); }
    const earth = new T.Mesh(new T.SphereGeometry(9, 32, 20), new T.MeshBasicMaterial({ map: new T.CanvasTexture(ec), fog: false }));
    earth.position.set(-120, 95, -230); scene.add(earth);
    earth.userData.spin = true; G.earth = earth;

    // terreno
    for (const s of SITES) s.h = undefined;
    for (const s of SITES) s.h = height(s.x, s.z);
    let tg = new T.PlaneGeometry(240, 240, 170, 170); tg.rotateX(-Math.PI / 2);
    const pos = tg.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setY(i, height(pos.getX(i), pos.getZ(i)));
    tg = tg.toNonIndexed(); tg.computeVertexNormals();
    const col = new Float32Array(tg.attributes.position.count * 3);
    for (let i = 0; i < col.length; i += 9) { const f = 0.82 + Math.random() * 0.22; col.fill(f, i, i + 9); }
    tg.setAttribute('color', new T.BufferAttribute(col, 3));
    const ground = new T.Mesh(tg, mat(0x6f6b64, { vertexColors: true, roughness: 1, metalness: 0 }));
    ground.receiveShadow = true; scene.add(ground);

    // rocas
    const rg = new T.DodecahedronGeometry(1, 0), rm = mat(0x5f5b55);
    for (let i = 0; i < 160; i++) {
      const rx = (Math.random() - 0.5) * 200, rz = (Math.random() - 0.5) * 200;
      if (SITES.some((s) => Math.hypot(rx - s.x, rz - s.z) < 8) || Math.hypot(rx, rz - 8) < 8) continue;
      const r = new T.Mesh(rg, rm); const k = 0.2 + Math.random() ** 3 * 1.4;
      r.scale.set(k, k * (0.5 + Math.random() * 0.5), k * (0.7 + Math.random() * 0.6));
      r.rotation.set(Math.random() * 3, Math.random() * 3, 0);
      r.position.set(rx, height(rx, rz) + k * 0.2, rz); r.castShadow = true; r.receiveShadow = true;
      scene.add(r);
    }

    // sitios y faros
    const beamGeo = new T.CylinderGeometry(0.5, 0.5, 60, 12, 1, true);
    for (const s of SITES) {
      const m = MAKERS[s.id](); m.position.set(s.x, s.h, s.z); m.rotation.y = Math.random() * Math.PI * 2; scene.add(m);
      const beam = new T.Mesh(beamGeo, new T.MeshBasicMaterial({ color: 0xf0d28a, transparent: true, opacity: 0.18, depthWrite: false, side: T.DoubleSide, fog: false }));
      beam.position.set(s.x, s.h + 30, s.z); scene.add(beam);
      beacons[s.id] = beam;
    }

    // rover
    rover = makeRover(); scene.add(rover);
  }

  function placeCells() {
    for (const c of cells) scene.remove(c);
    cells = [];
    const geo = new T.OctahedronGeometry(0.6, 0);
    const m = new T.MeshStandardMaterial({ color: 0xf0d28a, emissive: 0xd9b25c, emissiveIntensity: 0.8, metalness: 0.3, roughness: 0.3, flatShading: true });
    let tries = 0;
    while (cells.length < 16 && tries++ < 500) {
      const a = Math.random() * Math.PI * 2, r = 12 + Math.random() * (WORLD - 16);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (SITES.some((s) => Math.hypot(x - s.x, z - s.z) < 6)) continue;
      if (cells.some((c) => Math.hypot(x - c.position.x, z - c.position.z) < 14)) continue;
      const c = new T.Mesh(geo, m); c.position.set(x, height(x, z) + 1.3, z); c.castShadow = true;
      c.userData.base = c.position.y; scene.add(c); cells.push(c);
    }
  }

  // ---------- interfaz ----------
  function toast(title, text, ms = 5500) {
    $('#toast-t').textContent = title; $('#toast-p').textContent = text;
    $('#toast').classList.add('on'); toastTimer = ms / 1000;
  }
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  function hud() {
    const b = Math.max(0, G.battery);
    $('#bat').textContent = `${Math.ceil(b)}%`;
    $('#bat-bar').style.width = `${b}%`;
    $('#battery').classList.toggle('low', b < 25);
    $('#sites').textContent = `${G.visited.size}/${SITES.length}`;
    $('#time').textContent = fmt(G.t);
    const left = SITES.filter((s) => !G.visited.has(s.id));
    if (!left.length) return;
    let best = left[0], bd = Infinity;
    for (const s of left) { const d = Math.hypot(s.x - G.x, s.z - G.z); if (d < bd) { bd = d; best = s; } }
    const ang = Math.atan2(best.x - G.x, best.z - G.z) - G.yaw;
    $('#arrow').style.transform = `rotate(${-ang}rad)`;
    $('#target').textContent = best.name;
    $('#dist').textContent = `${Math.round(bd * UNIT_M)} m`;
  }

  function reset() {
    Object.assign(G, { battery: 100, t: 0, speed: 0, yaw: Math.PI, x: 0, z: 8, wheel: 0 });
    G.visited = new Set();
    for (const s of SITES) { beacons[s.id].material.color.set(0xf0d28a); beacons[s.id].material.opacity = 0.18; }
    placeCells();
    $('#toast').classList.remove('on');
  }
  function begin() {
    reset();
    $('#panel-start').hidden = true; $('#panel-end').hidden = true; $('#compass').hidden = false;
    G.running = true; last = performance.now();
    toast(_t('ex.go'), _t('ex.gop'), 4000);
  }
  function end(won) {
    G.running = false;
    $('#compass').hidden = true;
    $('#end-k').textContent = _t(won ? 'ex.won.k' : 'ex.lost.k');
    $('#end-t').textContent = _t(won ? 'ex.won.t' : 'ex.lost.t');
    $('#end-p').textContent = won
      ? _t('ex.won.p', { n: SITES.length, t: fmt(G.t), b: Math.ceil(G.battery) })
      : _t('ex.lost.p', { v: G.visited.size, n: SITES.length });
    $('#panel-end').hidden = false;
    $('#again').focus({ preventScroll: true });
  }

  // ---------- bucle ----------
  const tmpV = () => new T.Vector3();
  let camPos, camLook;
  function step(dt) {
    const boost = keys.boost && G.battery > 5 ? 1.6 : 1;
    const vmax = 13 * boost;
    const acc = keys.fwd ? 14 : keys.back ? -18 : 0;
    G.speed += acc * dt * (keys.fwd ? boost : 1);
    if (!keys.fwd && !keys.back) G.speed *= Math.pow(0.25, dt);
    G.speed = clamp(G.speed, -6, vmax);
    const turn = (keys.left ? 1 : 0) - (keys.right ? 1 : 0);
    G.yaw += turn * dt * (1.4 + Math.min(Math.abs(G.speed), 8) * 0.08) * (G.speed < -0.2 ? -1 : 1);

    let nx = G.x + Math.sin(G.yaw) * G.speed * dt, nz = G.z + Math.cos(G.yaw) * G.speed * dt;
    // los sitios son obstáculos
    for (const s of SITES) {
      const d = Math.hypot(nx - s.x, nz - s.z), r = 3.4;
      if (d < r) { nx = s.x + (nx - s.x) / d * r; nz = s.z + (nz - s.z) / d * r; G.speed *= 0.5; }
    }
    // borde del mapa
    const rd = Math.hypot(nx, nz);
    if (rd > WORLD) { nx *= WORLD / rd; nz *= WORLD / rd; G.speed *= 0.6; }
    G.x = nx; G.z = nz;

    // batería
    G.battery -= dt * (0.55 + 1.1 * Math.abs(G.speed) / 13 * boost);

    // celdas solares
    for (let i = cells.length - 1; i >= 0; i--) {
      const c = cells[i];
      c.rotation.y += dt * 2; c.position.y = c.userData.base + Math.sin(G.t * 3 + i) * 0.25;
      if (Math.hypot(c.position.x - G.x, c.position.z - G.z) < 2.2) {
        scene.remove(c); cells.splice(i, 1);
        G.battery = Math.min(100, G.battery + 20);
        if (!$('#toast').classList.contains('on') || toastTimer < 2) toast(_t('ex.cell'), _t('ex.cellp'), 1500);
      }
    }
    // sitios
    for (const s of SITES) {
      if (G.visited.has(s.id)) continue;
      if (Math.hypot(s.x - G.x, s.z - G.z) < 7) {
        G.visited.add(s.id);
        G.battery = Math.min(100, G.battery + 15);
        beacons[s.id].material.color.set(0x7fd0ae); beacons[s.id].material.opacity = 0.08;
        toast(s.name, s.fact, 7000);
      }
    }
    G.t += dt;
    if (G.visited.size === SITES.length) end(true);
    else if (G.battery <= 0) { G.battery = 0; end(false); }
  }

  function place(dt) {
    // altura e inclinación del rover según el terreno
    const y = height(G.x, G.z);
    const fx = Math.sin(G.yaw), fz = Math.cos(G.yaw);
    const hf = height(G.x + fx * 1.3, G.z + fz * 1.3), hb = height(G.x - fx * 1.3, G.z - fz * 1.3);
    const hl = height(G.x + fz * 1.2, G.z - fx * 1.2), hr = height(G.x - fz * 1.2, G.z + fx * 1.2);
    rover.position.set(G.x, y, G.z);
    rover.rotation.set(0, 0, 0);
    rover.rotation.order = 'YXZ';
    rover.rotation.y = G.yaw;
    rover.rotation.x = -Math.atan2(hf - hb, 2.6);
    rover.rotation.z = Math.atan2(hl - hr, 2.4);
    G.wheel += G.speed * dt / 0.42;
    for (const w of wheels) w.rotation.x = G.wheel;

    // cámara de persecución
    const want = new T.Vector3(G.x - fx * 10, y + 5, G.z - fz * 10);
    const gh = height(want.x, want.z) + 2;
    if (want.y < gh) want.y = gh;
    const look = new T.Vector3(G.x + fx * 3, y + 1.5, G.z + fz * 3);
    if (!camPos) { camPos = want.clone(); camLook = look.clone(); }
    camPos.lerp(want, 0.08); camLook.lerp(look, 0.15);
    camera.position.copy(camPos); camera.lookAt(camLook);

    sun.position.set(G.x + 40, y + 60, G.z + 25);
    sun.target.position.set(G.x, y, G.z);
  }

  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000 || 0); last = now;
    if (G.running) step(dt);
    else { G.yaw += dt * 0.15; } // vista giratoria en los menús
    if (toastTimer > 0) { toastTimer -= dt; if (toastTimer <= 0) $('#toast').classList.remove('on'); }
    for (const id in beacons) beacons[id].rotation.y += dt;
    G.earth.rotation.y += dt * 0.05;
    place(dt); hud();
    renderer.render(scene, camera);
  }

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.fov = w < h ? 72 : 60; camera.updateProjectionMatrix();
  }

  // ---------- controles ----------
  const MAP = { KeyW: 'fwd', ArrowUp: 'fwd', KeyS: 'back', ArrowDown: 'back', KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right', Space: 'boost', ShiftLeft: 'boost' };
  addEventListener('keydown', (e) => { const k = MAP[e.code]; if (k) { keys[k] = 1; if (G.running) e.preventDefault(); } });
  addEventListener('keyup', (e) => { const k = MAP[e.code]; if (k) keys[k] = 0; });
  addEventListener('blur', () => { for (const k in keys) keys[k] = 0; });
  document.querySelectorAll('.pad button').forEach((b) => {
    const k = b.dataset.k;
    const on = (e) => { e.preventDefault(); keys[k] = 1; b.classList.add('on'); };
    const off = () => { keys[k] = 0; b.classList.remove('on'); };
    b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off);
    b.addEventListener('pointercancel', off); b.addEventListener('pointerleave', off);
    b.addEventListener('contextmenu', (e) => e.preventDefault());
  });
  $('#play').addEventListener('click', begin);
  $('#again').addEventListener('click', begin);

  // ---------- arranque ----------
  loadThree().then(() => {
    T = window.THREE;
    renderer = new T.WebGLRenderer({ canvas: $('#c'), antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.outputEncoding = T.sRGBEncoding;
    buildWorld(); reset();
    addEventListener('resize', resize); resize();
    requestAnimationFrame(frame);
    window.__EXP = G;
  }).catch(() => { $('#err').hidden = false; $('#panel-start').hidden = true; });
})();
