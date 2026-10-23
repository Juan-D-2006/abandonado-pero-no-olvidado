/* Escenas 3D (Three.js) que acompañan a algunos libros.
   Cada escena cuenta la historia del objeto en un bucle, sincronizada con un texto.
   window.SCENES[slug] = (THREE) => ({ scene, camera, duration, phases, update(t, dt), dispose? }) */
(() => {
  'use strict';
  const S = {};
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const inOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  // ---------- utilidades comunes ----------
  const mat = (T, color, o = {}) => new T.MeshStandardMaterial(Object.assign({ color, roughness: 0.85, metalness: 0.08, flatShading: true }, o));
  const mesh = (T, geo, m, cast = true) => { const x = new T.Mesh(geo, m); x.castShadow = cast; x.receiveShadow = true; return x; };

  function canvasTex(T, w, h, draw) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new T.CanvasTexture(c); t.anisotropy = 4; return t;
  }
  function stars(T, n = 1800, r = 220, size = 1.4) {
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
      p.set([r * s * Math.cos(a), r * u, r * s * Math.sin(a)], i * 3);
    }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3));
    return new T.Points(g, new T.PointsMaterial({ color: 0xffffff, size, sizeAttenuation: false, transparent: true, opacity: 0.85, depthWrite: false }));
  }
  function terrain(T, h, color, size = 80, seg = 110) {
    let g = new T.PlaneGeometry(size, size, seg, seg); g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) p.setY(i, h(p.getX(i), p.getZ(i)));
    g = g.toNonIndexed(); g.computeVertexNormals();
    const col = new Float32Array(g.attributes.position.count * 3);
    for (let i = 0; i < col.length; i += 9) { const f = 0.88 + Math.random() * 0.2; col.fill(f, i, i + 9); }
    g.setAttribute('color', new T.BufferAttribute(col, 3));
    const m = mesh(T, g, mat(T, color, { vertexColors: true }), false);
    return m;
  }
  function rocks(T, scene, h, n, color, spread = 30, avoid = () => false) {
    const geo = new T.DodecahedronGeometry(1, 0); const m = mat(T, color);
    for (let i = 0; i < n; i++) {
      const x = (Math.random() - 0.5) * spread * 2, z = (Math.random() - 0.5) * spread * 2;
      if (avoid(x, z)) continue;
      const s = 0.05 + Math.pow(Math.random(), 3) * 0.45;
      const r = mesh(T, geo, m); r.scale.set(s, s * (0.5 + Math.random() * 0.5), s * (0.7 + Math.random() * 0.5));
      r.position.set(x, h(x, z) + s * 0.25, z); r.rotation.set(Math.random() * 3, Math.random() * 3, 0); scene.add(r);
    }
  }
  // Sistema de partículas simple (polvo, chispas)
  function particles(T, max, color, size, opacity = 0.8, additive = false) {
    const pos = new Float32Array(max * 3).fill(-999); const vel = new Float32Array(max * 3); const life = new Float32Array(max);
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(pos, 3));
    const pts = new T.Points(g, new T.PointsMaterial({ color, size, transparent: true, opacity, depthWrite: false, blending: additive ? T.AdditiveBlending : T.NormalBlending }));
    pts.frustumCulled = false;
    let k = 0;
    return {
      obj: pts,
      emit(x, y, z, vx, vy, vz, l) { const i = k++ % max; pos.set([x, y, z], i * 3); vel.set([vx, vy, vz], i * 3); life[i] = l; },
      update(dt, gravity = 0, drag = 0.6) {
        for (let i = 0; i < max; i++) {
          if (life[i] <= 0) continue;
          life[i] -= dt;
          if (life[i] <= 0) { pos[i * 3 + 1] = -999; continue; }
          vel[i * 3 + 1] -= gravity * dt;
          const d = Math.exp(-drag * dt); vel[i * 3] *= d; vel[i * 3 + 2] *= d;
          pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] += vel[i * 3 + 1] * dt; pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
        }
        g.attributes.position.needsUpdate = true;
      },
      clear() { life.fill(0); pos.fill(-999); g.attributes.position.needsUpdate = true; },
    };
  }
  function label(T, text, color = '#f0d491', scale = 1) {
    const tex = canvasTex(T, 512, 128, (c, w, h) => {
      c.font = '600 54px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillStyle = 'rgba(10,12,18,.55)'; const tw = c.measureText(text).width + 48;
      c.beginPath(); c.roundRect((w - tw) / 2, 18, tw, h - 36, 40); c.fill();
      c.fillStyle = color; c.fillText(text, w / 2, h / 2 + 2);
    });
    const s = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    s.scale.set(4 * scale, 1 * scale, 1); return s;
  }
  function place(obj, h, x, z, yOff, heading = 0) {
    const y = h(x, z) + yOff;
    const pitch = Math.atan2(h(x + 0.45, z) - h(x - 0.45, z), 0.9);
    const roll = Math.atan2(h(x, z + 0.35) - h(x, z - 0.35), 0.7);
    obj.position.set(x, y, z);
    obj.rotation.set(-roll, heading, pitch, 'YXZ');
  }
  function follow(cam, look, pos, target, dt, k = 2.2) {
    const a = 1 - Math.exp(-dt * k);
    cam.position.lerp(pos, a); look.lerp(target, a); cam.lookAt(look); cam.userData.look = look;
  }
  function setupLights(T, scene, { sun = 0xffffff, sunI = 1.6, sky = 0xffffff, ground = 0x444444, hemiI = 0.5, dir = [6, 9, 4], shadowSize = 14 }) {
    const hemi = new T.HemisphereLight(sky, ground, hemiI); scene.add(hemi);
    const d = new T.DirectionalLight(sun, sunI); d.position.set(...dir); d.castShadow = true;
    d.shadow.mapSize.set(1024, 1024); const c = d.shadow.camera; c.left = c.bottom = -shadowSize; c.right = c.top = shadowSize; c.near = 0.5; c.far = 60;
    d.shadow.bias = -0.0008; scene.add(d); scene.add(d.target);
    return { hemi, sun: d };
  }

  // ---------- modelos ----------
  function wheel(T, r, w, color, spokes = 6) {
    const g = new T.Group();
    const tire = mesh(T, new T.CylinderGeometry(r, r, w, 18), mat(T, color, { roughness: 0.7, metalness: 0.4 }));
    tire.rotation.x = Math.PI / 2; g.add(tire);
    const sm = mat(T, 0x2a2622);
    for (let i = 0; i < spokes; i++) { // relieve para que se note el giro
      const s = mesh(T, new T.BoxGeometry(r * 0.22, w * 1.05, r * 0.08), sm, false);
      const a = (i / spokes) * Math.PI * 2; s.position.set(Math.cos(a) * r * 0.98, Math.sin(a) * r * 0.98, 0); s.rotation.set(Math.PI / 2, 0, a); g.add(s);
    }
    return g;
  }
  // Rover MER (Spirit / Opportunity) o, en grande y blanco, Perseverance
  function makeMER(T, { body = 0xbfa36a, deck = 0x1c2743, scale = 1, white = false } = {}) {
    const g = new T.Group();
    const metal = mat(T, white ? 0xe9e6df : 0x8b8478, { metalness: 0.5, roughness: 0.5 });
    const b = mesh(T, new T.BoxGeometry(0.95, 0.34, 0.7), mat(T, white ? 0xf2f0ea : body, { metalness: 0.3, roughness: 0.55 }));
    b.position.y = 0.42; g.add(b);
    if (!white) {
      const panel = mesh(T, new T.BoxGeometry(1.5, 0.035, 1.25), mat(T, deck, { metalness: 0.6, roughness: 0.35 }));
      panel.position.y = 0.62; g.add(panel);
      for (const s of [-1, 1]) { const wing = mesh(T, new T.BoxGeometry(0.75, 0.03, 0.5), mat(T, deck, { metalness: 0.6, roughness: 0.35 })); wing.position.set(-0.2, 0.61, s * 0.85); wing.rotation.x = s * 0.08; g.add(wing); }
    } else {
      const rtg = mesh(T, new T.CylinderGeometry(0.13, 0.16, 0.45, 8), mat(T, 0x55524c)); rtg.rotation.z = 1.0; rtg.position.set(-0.6, 0.55, 0); g.add(rtg);
      const arm = mesh(T, new T.BoxGeometry(0.5, 0.06, 0.06), metal); arm.position.set(0.68, 0.36, 0.2); g.add(arm);
    }
    const mast = mesh(T, new T.CylinderGeometry(0.025, 0.03, 0.62, 8), metal); mast.position.set(0.36, 0.92, 0.22); g.add(mast);
    const head = new T.Group(); head.position.set(0.36, 1.25, 0.22); g.add(head);
    const hb = mesh(T, new T.BoxGeometry(0.12, 0.1, 0.28), mat(T, white ? 0xdedbd2 : 0xc9c1ae, { metalness: 0.3 })); head.add(hb);
    for (const s of [-1, 1]) { const lens = mesh(T, new T.CylinderGeometry(0.03, 0.03, 0.05, 10), mat(T, 0x111111, { metalness: 0.8, roughness: 0.2 })); lens.rotation.z = Math.PI / 2; lens.position.set(0.07, 0, s * 0.08); head.add(lens); }
    const dish = mesh(T, new T.CylinderGeometry(0.14, 0.14, 0.03, 16), metal); dish.position.set(-0.15, 0.8, -0.25); dish.rotation.set(0.4, 0, 0.5); g.add(dish);
    const wheels = [];
    const wr = 0.13;
    [[-0.5, 0.48], [0.02, 0.5], [0.52, 0.48]].forEach(([x], i) => {
      for (const s of [-1, 1]) {
        const w = wheel(T, wr, 0.11, white ? 0x9a958c : 0x7d776c); w.position.set(x, wr, s * 0.5); g.add(w); wheels.push(w);
        const leg = mesh(T, new T.BoxGeometry(0.05, 0.28, 0.04), metal); leg.position.set(x, 0.27, s * 0.42); leg.rotation.z = i === 1 ? 0 : (i === 0 ? 0.35 : -0.35); g.add(leg);
      }
    });
    const rocker = mesh(T, new T.BoxGeometry(1.1, 0.05, 0.04), metal); rocker.position.set(0, 0.36, 0.43); g.add(rocker);
    const rocker2 = rocker.clone(); rocker2.position.z = -0.43; g.add(rocker2);
    g.scale.setScalar(scale);
    return { group: g, wheels, head, wr: wr * scale };
  }
  function astronaut(T) {
    const g = new T.Group();
    const suit = mat(T, 0xe8e6e0, { roughness: 0.9 });
    const body = mesh(T, new T.CapsuleGeometry(0.15, 0.32, 4, 10), suit); body.position.y = 0.62; g.add(body);
    const pack = mesh(T, new T.BoxGeometry(0.2, 0.32, 0.26), suit); pack.position.set(-0.16, 0.7, 0); g.add(pack);
    const helmet = mesh(T, new T.SphereGeometry(0.13, 16, 12), suit); helmet.position.y = 1.0; g.add(helmet);
    const visor = mesh(T, new T.SphereGeometry(0.105, 16, 12, -Math.PI / 2, Math.PI, 0.5, 1.6), mat(T, 0xc89a2e, { metalness: 0.9, roughness: 0.15, flatShading: false }));
    visor.position.set(0.04, 1.0, 0); visor.rotation.y = Math.PI / 2; g.add(visor);
    const legs = [];
    for (const s of [-1, 1]) { const l = mesh(T, new T.CapsuleGeometry(0.06, 0.28, 3, 8), suit); l.position.set(0, 0.25, s * 0.08); g.add(l); legs.push(l); }
    return { group: g, legs };
  }
  function lunarModule(T) {
    const g = new T.Group();
    const foil = mat(T, 0xc9a24a, { metalness: 0.75, roughness: 0.35 });
    const descent = new T.Group(); g.add(descent);
    const base = mesh(T, new T.CylinderGeometry(0.9, 0.9, 0.75, 8), foil); base.position.y = 1.05; descent.add(base);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const leg = mesh(T, new T.CylinderGeometry(0.035, 0.035, 1.5, 6), mat(T, 0xb9b4a8, { metalness: 0.6 }));
      leg.position.set(Math.cos(a) * 1.1, 0.65, Math.sin(a) * 1.1); leg.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5); descent.add(leg);
      const pad = mesh(T, new T.CylinderGeometry(0.18, 0.2, 0.05, 12), mat(T, 0xb9b4a8, { metalness: 0.6 })); pad.position.set(Math.cos(a) * 1.45, 0.03, Math.sin(a) * 1.45); descent.add(pad);
    }
    const ascent = new T.Group(); ascent.position.y = 1.43; g.add(ascent);
    const cab = mesh(T, new T.CylinderGeometry(0.62, 0.7, 0.75, 7), mat(T, 0xa9a9a4, { metalness: 0.5, roughness: 0.5 })); cab.position.y = 0.38; ascent.add(cab);
    const win = mesh(T, new T.BoxGeometry(0.05, 0.18, 0.35), mat(T, 0x1a1d26, { metalness: 0.9, roughness: 0.1 })); win.position.set(0.62, 0.5, 0); ascent.add(win);
    const ant = mesh(T, new T.CylinderGeometry(0.16, 0.16, 0.03, 12), mat(T, 0xe6e3dc)); ant.position.set(-0.3, 0.95, 0.3); ant.rotation.x = 0.7; ascent.add(ant);
    return { group: g, descent, ascent };
  }
  function earthTex(T) {
    return canvasTex(T, 512, 256, (c, w, h) => {
      c.fillStyle = '#1f5aa8'; c.fillRect(0, 0, w, h);
      for (let i = 0; i < 26; i++) { c.fillStyle = Math.random() < 0.6 ? '#3f7d3a' : '#9b8a5a'; c.beginPath(); c.ellipse(Math.random() * w, h * 0.2 + Math.random() * h * 0.6, 18 + Math.random() * 40, 10 + Math.random() * 24, Math.random() * 3, 0, 7); c.fill(); }
      c.fillStyle = 'rgba(255,255,255,.75)';
      for (let i = 0; i < 60; i++) { c.beginPath(); c.ellipse(Math.random() * w, Math.random() * h, 10 + Math.random() * 40, 3 + Math.random() * 7, 0, 0, 7); c.fill(); }
      c.fillRect(0, 0, w, 14); c.fillRect(0, h - 14, w, 14);
    });
  }
  function moonEnv(T, scene, seed = 0) {
    scene.background = new T.Color(0x05060a);
    scene.add(stars(T, 1500, 200, 1.3));
    const craters = [[4, -3, 2.4, 0.5], [-6, 4, 3.2, 0.7], [9, 6, 1.6, 0.35], [-10, -8, 4, 0.8], [2, 9, 2, 0.4], [-3, -10, 1.4, 0.3]];
    const h = (x, z) => {
      let y = 0.18 * Math.sin(x * 0.15 + seed) * Math.cos(z * 0.13) + 0.04 * Math.sin(x * 1.3 + z * 0.9);
      for (const [cx, cz, r, d] of craters) { const q = Math.hypot(x - cx, z - cz) / r; if (q < 1.35) y += q < 1 ? -d * (1 - q * q) : d * 0.35 * Math.sin((q - 1) / 0.35 * Math.PI); }
      return y;
    };
    scene.add(terrain(T, h, 0x76736c));
    const earth = new T.Mesh(new T.SphereGeometry(3.4, 32, 24), new T.MeshStandardMaterial({ map: earthTex(T), roughness: 1 }));
    earth.position.set(-38, 26, -60); scene.add(earth);
    const L = setupLights(T, scene, { sun: 0xfffaf0, sunI: 1.7, sky: 0x8090b0, ground: 0x151515, hemiI: 0.12, dir: [8, 6, 5] });
    return { h, earth, L };
  }
  function marsEnv(T, scene, seed = 0) {
    scene.background = new T.Color(0xb7835a);
    scene.fog = new T.Fog(0xb7835a, 12, 42);
    const h = (x, z) => 0.38 * Math.sin(x * 0.17 + seed) * Math.cos(z * 0.2) + 0.12 * Math.sin(x * 0.7 + z * 0.4 + seed) + 0.04 * Math.sin(x * 2.3) * Math.cos(z * 1.9);
    scene.add(terrain(T, h, 0x9c4a28));
    const L = setupLights(T, scene, { sun: 0xffe0bd, sunI: 1.45, sky: 0xe0a878, ground: 0x4a2414, hemiI: 0.38, dir: [7, 9, 3] });
    return { h, L };
  }
  function spaceEnv(T, scene) {
    scene.background = new T.Color(0x03040a);
    scene.add(stars(T, 2600, 260, 1.4));
    // franja tenue de la Vía Láctea
    const n = 2500, p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, r = 250, y = (Math.random() - 0.5) * 30; p.set([Math.cos(a) * r, y + Math.sin(a) * 60, Math.sin(a) * r], i * 3); }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3));
    scene.add(new T.Points(g, new T.PointsMaterial({ color: 0x9fb0ff, size: 1, sizeAttenuation: false, transparent: true, opacity: 0.35, depthWrite: false })));
    const hemi = new T.HemisphereLight(0x8899cc, 0x111118, 0.35); scene.add(hemi);
    const sun = new T.DirectionalLight(0xfff4e0, 2.0); sun.position.set(-10, 4, 8); scene.add(sun);
    return { sun, hemi };
  }

  // =====================================================================
  //  MARTE · Spirit
  // =====================================================================
  S['spirit'] = (T) => {
    const scene = new T.Scene();
    const env = marsEnv(T, scene, 0.4);
    const { h } = env;
    rocks(T, scene, h, 120, 0x6b3524, 26, (x, z) => Math.abs(z) < 1.4 && x > -9 && x < 3);
    const R = makeMER(T); scene.add(R.group);
    const camera = new T.PerspectiveCamera(42, 1, 0.1, 400);
    const look = new T.Vector3(-4, 0.4, 0); camera.position.set(-8, 2.4, 4.5);
    const trailM = new T.MeshStandardMaterial({ color: 0xf7f4ec, emissive: 0xfff8e8, emissiveIntensity: 0.3, roughness: 0.9 });
    const trailG = new T.BoxGeometry(0.12, 0.03, 0.16);
    const trail = []; let lastTrailX = null;
    const dust = particles(T, 260, 0xd9a476, 0.06, 0.75); scene.add(dust.obj);
    const BROKEN = 5; // rueda delantera derecha
    let prevT = 0, frozenAngle = 0;
    const xAt = (t) => (t < 7 ? -7 + 7 * inOut(t / 7) : t < 14 ? -4.2 * inOut((t - 7) / 7) : -4.2);
    const phases = [
      { t: 0, y: '2004', text: 'Spirit aterriza en el cráter Gusev y empieza a explorar. Su misión debía durar 90 días.' },
      { t: 7, y: '2006', text: 'Se traba su rueda delantera derecha. El equipo decide manejarlo marcha atrás, arrastrándola.' },
      { t: 14, y: 'Descubrimiento', text: 'La rueda arrastrada raspa el suelo y deja al aire sílice blanca: señal de antiguas aguas termales.' },
      { t: 18.5, y: '2009', text: 'Queda atrapado en la arena blanda de Troy. Sus ruedas giran, pero ya no avanza.' },
      { t: 24, y: '2010', text: 'Llega el invierno marciano. Spirit deja de responder después de más de 6 años.' },
    ];
    function reset() { trail.forEach((m) => scene.remove(m)); trail.length = 0; lastTrailX = null; dust.clear(); }
    function update(t, dt) {
      if (t < prevT) reset(); prevT = t;
      const x = xAt(t);
      let sink = t > 18.5 ? -0.1 * smooth(18.5, 24, t) : 0;
      const jitter = t > 18.5 && t < 24 ? Math.sin(t * 40) * 0.006 : 0;
      place(R.group, h, x, 0, sink + 0.005 + Math.abs(Math.sin(t * 7)) * 0.008 + jitter);
      // giro de ruedas
      const base = (x + 7) / R.wr;
      const spinExtra = t > 18.5 && t < 24 ? (t - 18.5) * 9 : 0;
      if (t < 7) frozenAngle = base;
      R.wheels.forEach((w, i) => { w.rotation.z = -(i === BROKEN && t >= 7 ? frozenAngle : base + spinExtra); });
      R.wheels[BROKEN].children[0].material.color.setHex(t >= 7 ? 0x9a5a48 : 0x7d776c);
      R.head.rotation.y = 0.6 * Math.sin(t * 0.5);
      R.head.rotation.z = t > 24 ? -0.35 * smooth(24, 26, t) : 0.08 * Math.sin(t * 0.8);
      // rastro de sílice mientras arrastra la rueda
      if (t >= 7 && t < 14) {
        const wp = new T.Vector3(); R.wheels[BROKEN].getWorldPosition(wp);
        if (lastTrailX === null || Math.abs(wp.x - lastTrailX) > 0.07) {
          const m = new T.Mesh(trailG, trailM); m.position.set(wp.x, h(wp.x, wp.z) + 0.01, wp.z); m.rotation.y = Math.random() * 0.4; m.receiveShadow = true;
          scene.add(m); trail.push(m); lastTrailX = wp.x;
        }
      }
      trailM.emissiveIntensity = t >= 14 && t < 18.5 ? 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 5)) : 0.3;
      // polvo al quedar atascado
      if (t > 18.5 && t < 24) for (const w of R.wheels) { if (Math.random() < 0.35) { const p = new T.Vector3(); w.getWorldPosition(p); dust.emit(p.x, p.y - 0.05, p.z, (Math.random() - 0.5) * 0.6, 0.4 + Math.random() * 0.5, (Math.random() - 0.5) * 0.6, 1.2); } }
      dust.update(dt, 1.2, 1.2);
      // el invierno oscurece la escena
      const night = smooth(24, 26.5, t) * (1 - smooth(27.5, 28, t));
      env.L.sun.intensity = lerp(1.45, 0.22, night); env.L.hemi.intensity = lerp(0.38, 0.14, night);
      scene.background.setHex(0xb7835a).lerp(new T.Color(0x3a2a2a), night); scene.fog.color.copy(scene.background);
      // cámara
      const rp = R.group.position;
      let cp, tg;
      if (t < 14) { cp = new T.Vector3(rp.x - 2.8, rp.y + 1.6, 3.4); tg = new T.Vector3(rp.x + 0.4, rp.y + 0.35, 0); }
      else if (t < 18.5) { cp = new T.Vector3(-0.6, h(-1.5, 0.5) + 1.0, 2.2); tg = new T.Vector3(-2.3, h(-2.3, 0.5), 0.4); }
      else { cp = new T.Vector3(rp.x + 3.2, rp.y + 1.7, 3.9); tg = new T.Vector3(rp.x, rp.y + 0.3, 0); }
      follow(camera, look, cp, tg, dt, 1.6);
    }
    return { scene, camera, duration: 28, phases, update };
  };

  // =====================================================================
  //  MARTE · Ingenuity
  // =====================================================================
  function makeHeli(T) {
    const g = new T.Group();
    const body = mesh(T, new T.BoxGeometry(0.16, 0.13, 0.16), mat(T, 0xd8c7a4, { metalness: 0.3 })); body.position.y = 0.26; g.add(body);
    const foil = mesh(T, new T.BoxGeometry(0.17, 0.04, 0.17), mat(T, 0xc9a24a, { metalness: 0.8, roughness: 0.3 })); foil.position.y = 0.2; g.add(foil);
    const legM = mat(T, 0x9fb3c8, { metalness: 0.5 });
    for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2 + Math.PI / 4; const l = mesh(T, new T.CylinderGeometry(0.008, 0.008, 0.34, 5), legM); l.position.set(Math.cos(a) * 0.13, 0.13, Math.sin(a) * 0.13); l.rotation.set(Math.sin(a) * 0.55, 0, -Math.cos(a) * 0.55); g.add(l); }
    const mast = mesh(T, new T.CylinderGeometry(0.012, 0.012, 0.42, 6), legM); mast.position.y = 0.52; g.add(mast);
    const bladeM = mat(T, 0x3b3f46, { metalness: 0.3 });
    const rotors = [];
    for (const yy of [0.5, 0.62]) {
      const r = new T.Group(); r.position.y = yy; g.add(r);
      for (const s of [-1, 1]) { const b = mesh(T, new T.BoxGeometry(0.6, 0.008, 0.05), bladeM); b.position.x = s * 0.3; r.add(b); }
      rotors.push(r);
    }
    const blur = new T.Mesh(new T.CircleGeometry(0.6, 32), new T.MeshBasicMaterial({ color: 0x2a2a30, transparent: true, opacity: 0, depthWrite: false, side: T.DoubleSide }));
    blur.rotation.x = -Math.PI / 2; blur.position.y = 0.56; g.add(blur);
    const panel = mesh(T, new T.BoxGeometry(0.22, 0.01, 0.12), mat(T, 0x1c2743, { metalness: 0.6, emissive: 0x3a7bff, emissiveIntensity: 0 })); panel.position.y = 0.74; g.add(panel);
    return { group: g, rotors, blur, panel };
  }
  S['ingenuity'] = (T) => {
    const scene = new T.Scene();
    const env = marsEnv(T, scene, 2.1); const { h } = env;
    rocks(T, scene, h, 140, 0x6b3524, 26, (x, z) => Math.abs(z) < 1.2 && x > -3 && x < 12);
    const P = makeMER(T, { white: true, scale: 1.7 }); scene.add(P.group);
    const H = makeHeli(T); scene.add(H.group);
    const tip = mesh(T, new T.BoxGeometry(0.14, 0.008, 0.05), mat(T, 0x3b3f46)); tip.visible = false; scene.add(tip);
    const dust = particles(T, 400, 0xd8a273, 0.05, 0.7); scene.add(dust.obj);
    const camera = new T.PerspectiveCamera(42, 1, 0.05, 400);
    const look = new T.Vector3(0, 0.4, 0); camera.position.set(-2, 1.6, 3.2);
    let prevT = 0, spin = 0, tipVel = 0;
    const phases = [
      { t: 0, y: '2021', text: 'Ingenuity viaja escondido bajo la panza del rover Perseverance.' },
      { t: 6, y: '19 abr 2021', text: 'Primer vuelo con motor en otro planeta: sube 3 metros durante 39 segundos.' },
      { t: 11.5, y: 'Vuelo', text: (t) => `Debía volar 5 veces… vuelo n.º ${Math.min(72, 2 + Math.floor(70 * smooth(11.5, 18, t)))}` },
      { t: 18, y: 'Ene 2024', text: 'En el vuelo 72 se rompe un aspa. Ingenuity descansa en Valinor Hills, guardando datos.' },
    ];
    // trayectoria del helicóptero: [inicio, fin, x0, x1, altura]
    const X0 = -1.5 + 3.2 * 0.35;
    const hops = [[6.6, 10.8, X0, X0, 1.6], [11.6, 13.6, X0, 2.2, 1.1], [13.8, 15.8, 2.2, 4.6, 1.2], [16.0, 18.0, 4.6, 7.0, 1.0], [18.2, 20.2, 7.0, 8.6, 0.9]];
    function heliPos(t) {
      if (t < 3.2) { const px = -1.5 + t * 0.35; return { x: px, y: h(px, 0) + 0.32 - 0.3 * smooth(2.4, 3.2, t), z: 0, air: 0 }; }
      if (t < 6.6) return { x: X0, y: h(X0, 0), z: 0, air: 0 };
      for (const [a, b, x0, x1, alt] of hops) {
        if (t >= a && t <= b) {
          const k = (t - a) / (b - a);
          const up = smooth(0, 0.25, k) * (1 - smooth(0.75, 1, k));
          const xx = lerp(x0, x1, smooth(0.2, 0.8, k));
          return { x: xx, y: h(xx, 0) + up * alt + Math.sin(t * 3) * 0.02 * up, z: Math.sin(t * 1.3) * 0.08 * up, air: up };
        }
      }
      let lx = X0; for (const hp of hops) if (t > hp[1]) lx = hp[3];
      return { x: lx, y: h(lx, 0), z: 0, air: 0 };
    }
    function update(t, dt) {
      if (t < prevT) { dust.clear(); tip.visible = false; spin = 0; } prevT = t;
      // Perseverance: se aleja después de soltarlo
      const px = t < 3.2 ? -1.5 + t * 0.35 : -1.5 + 3.2 * 0.35 - 0.6 * inOut(clamp((t - 3.4) / 3, 0, 1)) * 3.2;
      place(P.group, h, px, 0, 0.01);
      P.wheels.forEach((w) => (w.rotation.z = -(px + 1.5) / P.wr));
      P.head.rotation.y = 0.6 * Math.sin(t * 0.4) + (t > 6 ? -0.8 : 0);
      const hp = heliPos(t);
      H.group.position.set(hp.x, hp.y, hp.z);
      H.group.rotation.z = hp.air * Math.sin(t * 2.2) * 0.05 - (t > 20.2 ? 0.14 * smooth(20.2, 20.6, t) : 0);
      // rotores
      const target = t > 6 && t < 20.4 ? 1 : t >= 20.4 ? Math.max(0, 1 - (t - 20.4) / 1.5) : 0;
      spin = lerp(spin, target, 1 - Math.exp(-dt * 2.5));
      H.rotors[0].rotation.y += spin * dt * 40; H.rotors[1].rotation.y -= spin * dt * 40;
      H.blur.material.opacity = 0.35 * clamp((spin - 0.4) / 0.6, 0, 1);
      // aspa rota
      if (t > 20.2 && !tip.visible) { tip.visible = true; const wp = new T.Vector3(); H.rotors[1].getWorldPosition(wp); tip.position.set(wp.x + 0.5, wp.y, wp.z); tipVel = 0.6; }
      if (tip.visible) { tipVel -= 3.7 * dt; tip.position.y = Math.max(h(tip.position.x, tip.position.z) + 0.01, tip.position.y + tipVel * dt); tip.position.x += dt * 0.4 * (tipVel > -1 ? 1 : 0); tip.rotation.z += dt * 3 * (tip.position.y > h(tip.position.x, 0) + 0.02 ? 1 : 0); }
      // polvo bajo los rotores cerca del suelo
      const ground = h(hp.x, 0);
      if (spin > 0.5 && hp.y - ground < 0.9) for (let i = 0; i < 6; i++) { const a = Math.random() * 6.28; dust.emit(hp.x + Math.cos(a) * 0.2, ground + 0.03, hp.z + Math.sin(a) * 0.2, Math.cos(a) * 1.4, 0.15 + Math.random() * 0.2, Math.sin(a) * 1.4, 0.9); }
      dust.update(dt, 0.6, 1.6);
      H.panel.material.emissiveIntensity = t > 21.5 ? (Math.sin(t * 3) > 0.6 ? 0.9 : 0.05) : 0;
      // cámara
      const hpv = new T.Vector3(hp.x, hp.y, hp.z);
      const cp = t < 6 ? new T.Vector3(px - 2.4, h(px, 0) + 2.0, 5.0) : new T.Vector3(hp.x - 1.9, Math.max(hp.y, ground) + 0.9, 2.6);
      follow(camera, look, cp, t < 6 ? new T.Vector3(px + 0.2, h(px, 0) + 0.4, 0) : hpv.add(new T.Vector3(0.3, 0.3, 0)), dt, 1.8);
    }
    return { scene, camera, duration: 25, phases, update };
  };

  // =====================================================================
  //  LUNA · Rover Lunar (LRV)
  // =====================================================================
  function makeLRV(T) {
    const g = new T.Group();
    const silver = mat(T, 0xbdb8ad, { metalness: 0.6, roughness: 0.45 });
    const center = new T.Group(); g.add(center);
    const chassis = mesh(T, new T.BoxGeometry(0.9, 0.07, 1.0), silver); chassis.position.y = 0.42; center.add(chassis);
    const seatM = mat(T, 0x6b6e78, { roughness: 0.9 });
    for (const s of [-1, 1]) { const seat = mesh(T, new T.BoxGeometry(0.34, 0.05, 0.34), seatM); seat.position.set(-0.05, 0.5, s * 0.22); center.add(seat); const back = mesh(T, new T.BoxGeometry(0.04, 0.3, 0.34), seatM); back.position.set(-0.22, 0.64, s * 0.22); center.add(back); }
    const consoleB = mesh(T, new T.BoxGeometry(0.1, 0.25, 0.18), silver); consoleB.position.set(0.32, 0.6, 0); center.add(consoleB);
    const pole = mesh(T, new T.CylinderGeometry(0.012, 0.012, 0.7, 6), silver); pole.position.set(0.42, 0.85, 0.32); center.add(pole);
    const umb = mesh(T, new T.ConeGeometry(0.34, 0.12, 20, 1, true), mat(T, 0xece9e1, { side: T.DoubleSide })); umb.position.set(0.46, 1.22, 0.32); umb.rotation.z = -0.5; center.add(umb);
    const front = new T.Group(); front.position.set(0.45, 0.42, 0); g.add(front);
    const rear = new T.Group(); rear.position.set(-0.45, 0.42, 0); g.add(rear);
    const fc = mesh(T, new T.BoxGeometry(0.75, 0.06, 0.9), silver); fc.position.x = 0.37; front.add(fc);
    const rc = mesh(T, new T.BoxGeometry(0.75, 0.06, 0.9), silver); rc.position.x = -0.37; rear.add(rc);
    const fender = mat(T, 0x2f5f8a, { roughness: 0.6 });
    const wheels = [];
    for (const [grp, x] of [[front, 0.6], [rear, -0.6]]) for (const s of [-1, 1]) {
      const w = wheel(T, 0.22, 0.17, 0xc8c0ae, 10); w.position.set(x, -0.2, s * 0.62); grp.add(w); wheels.push(w);
      const f = mesh(T, new T.BoxGeometry(0.5, 0.03, 0.22), fender); f.position.set(x, 0.05, s * 0.62); grp.add(f);
    }
    return { group: g, front, rear, wheels, center };
  }
  S['rover-lunar-lrv'] = (T) => {
    const scene = new T.Scene();
    const env = moonEnv(T, scene, 0.3); const { h } = env;
    rocks(T, scene, h, 90, 0x6f6c66, 26, (x, z) => Math.hypot(x + 3, z + 2.5) < 3);
    const LM = lunarModule(T); LM.group.position.set(-3, h(-3, -2.5), -2.5); scene.add(LM.group);
    const V = makeLRV(T); scene.add(V.group);
    const A1 = astronaut(T), A2 = astronaut(T);
    for (const [a, s] of [[A1, -1], [A2, 1]]) { a.group.scale.setScalar(0.75); a.group.position.set(-0.05, 0.12, s * 0.22); a.legs.forEach((l) => { l.rotation.z = 1.4; l.position.x = 0.15; }); V.center.add(a.group); }
    const dust = particles(T, 500, 0xb8b4aa, 0.045, 0.85); scene.add(dust.obj);
    const flame = particles(T, 200, 0xffd9a0, 0.09, 0.9, true); scene.add(flame.obj);
    const flash = new T.PointLight(0xffc880, 0, 12); scene.add(flash);
    const trackM = new T.MeshStandardMaterial({ color: 0x5c5a55, roughness: 1 }); const trackG = new T.PlaneGeometry(0.12, 0.16);
    const tracks = []; let lastTrack = null;
    const camera = new T.PerspectiveCamera(42, 1, 0.1, 400);
    const look = new T.Vector3(-1, 0.6, -1); camera.position.set(1.5, 2.2, 4);
    // recorrido en forma de curva
    const path = (u) => new T.Vector3(-1.2 + Math.sin(u * 2.4) * 4.5 + u * 3, 0, -0.4 + (1 - Math.cos(u * 2.4)) * 2.2);
    let prevT = 0;
    const phases = [
      { t: 0, y: '1971', text: 'El rover viaja plegado junto al módulo lunar. Los astronautas lo despliegan tirando de unas cintas.' },
      { t: 5, y: 'Apollo 15-17', text: 'Con él recorren kilómetros buscando rocas antiguas. En la Luna todo pesa seis veces menos.' },
      { t: 14, y: 'Despedida', text: 'Al irse, lo dejan estacionado. Su cámara, controlada desde la Tierra, filma el despegue.' },
      { t: 19, y: 'Hoy', text: 'Tres rovers siguen allí. Sin viento ni lluvia, sus huellas no se borran.' },
    ];
    function reset() { tracks.forEach((m) => scene.remove(m)); tracks.length = 0; lastTrack = null; dust.clear(); flame.clear(); LM.ascent.position.y = 1.43; }
    function update(t, dt) {
      if (t < prevT) reset(); prevT = t;
      // desplegado
      const unfold = smooth(0.8, 4.2, t);
      V.front.rotation.z = lerp(1.45, 0, unfold); V.rear.rotation.z = lerp(-1.45, 0, unfold);
      const show = smooth(4.6, 5.4, t) * (1 - smooth(13.8, 14.4, t));
      A1.group.visible = A2.group.visible = show > 0.02; A1.group.scale.setScalar(0.75 * Math.max(show, 0.01)); A2.group.scale.setScalar(0.75 * Math.max(show, 0.01));
      // conducción
      const u = clamp((t - 5) / 9, 0, 1), ue = inOut(u);
      const p = path(ue), p2 = path(Math.min(1, ue + 0.01));
      const heading = -Math.atan2(p2.z - p.z, p2.x - p.x);
      const bounce = t > 5 && t < 14 ? Math.max(0, Math.sin(t * 4.5)) * 0.09 : 0; // saltitos lentos de baja gravedad
      place(V.group, h, p.x, p.z, 0.2 + bounce, heading);
      const dist = ue * 18;
      V.wheels.forEach((w) => (w.rotation.z = -dist / 0.22));
      if (t > 5 && t < 14) {
        // huellas y polvo en arcos lentos (gravedad lunar 1,62)
        if (!lastTrack || lastTrack.distanceTo(p) > 0.16) for (const s of [-1, 1]) {
          const off = new T.Vector3(0, 0, s * 0.62).applyAxisAngle(new T.Vector3(0, 1, 0), heading);
          const m = new T.Mesh(trackG, trackM); m.rotation.x = -Math.PI / 2; m.rotation.z = heading; m.position.set(p.x + off.x, h(p.x + off.x, p.z + off.z) + 0.012, p.z + off.z); scene.add(m); tracks.push(m); lastTrack = p.clone();
        }
        for (const w of [V.wheels[2], V.wheels[3]]) if (Math.random() < 0.7) {
          const wp = new T.Vector3(); w.getWorldPosition(wp);
          const back = new T.Vector3(-1, 0, 0).applyAxisAngle(new T.Vector3(0, 1, 0), heading);
          dust.emit(wp.x, wp.y, wp.z, back.x * (0.6 + Math.random() * 0.5), 0.9 + Math.random() * 0.7, back.z * 0.8 + (Math.random() - 0.5) * 0.3, 2.2);
        }
      }
      dust.update(dt, 1.62, 0.05);
      // despegue de la etapa de ascenso
      const launch = t - 15.2;
      if (launch > 0) {
        LM.ascent.position.y = 1.43 + 0.5 * 1.8 * launch * launch;
        const base = new T.Vector3(); LM.ascent.getWorldPosition(base);
        for (let i = 0; i < 5; i++) flame.emit(base.x + (Math.random() - 0.5) * 0.3, base.y, base.z + (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 1.5, -2 - Math.random() * 2, (Math.random() - 0.5) * 1.5, 0.5);
        flash.position.set(base.x, base.y, base.z); flash.intensity = launch < 0.4 ? 6 * (1 - launch / 0.4) + 1.5 : Math.max(0, 1.5 - (launch - 0.4));
      } else flash.intensity = 0;
      flame.update(dt, 0, 0.5);
      // cámara
      const vp = V.group.position;
      let cp, tg;
      if (t < 5) { cp = new T.Vector3(vp.x + 3.2, vp.y + 1.9, vp.z + 3.4); tg = new T.Vector3(vp.x - 0.9, vp.y + 0.4, vp.z - 0.9); }
      else if (t < 14) { const side = new T.Vector3(-0.5, 0, 1).applyAxisAngle(new T.Vector3(0, 1, 0), heading).multiplyScalar(4.4); cp = vp.clone().add(side).add(new T.Vector3(0, 1.9, 0)); tg = vp.clone().add(new T.Vector3(0, 0.4, 0)); }
      else if (t < 19) { cp = new T.Vector3(vp.x + 2.5, vp.y + 1.2, vp.z + 2.8); tg = new T.Vector3(-3, h(-3, -2.5) + 1.5 + Math.max(0, launch) * 1.2, -2.5); }
      else { const a = 0.6 + (t - 19) * 0.3; cp = new T.Vector3(vp.x + Math.cos(a) * 5.8, vp.y + 2.8, vp.z + Math.sin(a) * 5.8); tg = vp.clone().add(new T.Vector3(-1, 0.2, -1)); }
      follow(camera, look, cp, tg, dt, 1.5);
    }
    return { scene, camera, duration: 26, phases, update };
  };

  // =====================================================================
  //  LUNA · Retrorreflectores láser
  // =====================================================================
  S['retrorreflectores-apollo'] = (T) => {
    const scene = new T.Scene();
    const env = moonEnv(T, scene, 1.7); const { h, earth } = env;
    earth.position.set(-7, 9.5, -15); earth.scale.setScalar(0.55);
    rocks(T, scene, h, 70, 0x6f6c66, 22, (x, z) => Math.hypot(x, z) < 2.2);
    const LM = lunarModule(T); LM.group.position.set(5, h(5, -5), -5); LM.group.scale.setScalar(0.9); scene.add(LM.group);
    // panel retrorreflector
    const panel = new T.Group(); scene.add(panel);
    const frame = mesh(T, new T.BoxGeometry(0.9, 0.06, 0.7), mat(T, 0xc2bcae, { metalness: 0.6, roughness: 0.4 })); panel.add(frame);
    const legM = mat(T, 0xb0aa9c, { metalness: 0.5 });
    for (const [x, z] of [[-0.35, -0.25], [0.35, -0.25], [-0.35, 0.25], [0.35, 0.25]]) { const l = mesh(T, new T.CylinderGeometry(0.02, 0.02, 0.3, 6), legM); l.position.set(x, -0.15, z); panel.add(l); }
    const cubeM = new T.MeshStandardMaterial({ color: 0x9fb5c9, metalness: 0.95, roughness: 0.08, emissive: 0x66ff99, emissiveIntensity: 0 });
    const cubes = new T.InstancedMesh(new T.CylinderGeometry(0.03, 0.03, 0.03, 6), cubeM, 100);
    const d = new T.Object3D(); let ci = 0;
    for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) { d.position.set(-0.36 + i * 0.08, 0.04, -0.27 + j * 0.06); d.updateMatrix(); cubes.setMatrixAt(ci++, d.matrix); }
    panel.add(cubes); panel.rotation.z = 0.35;
    const A = astronaut(T); scene.add(A.group);
    const panelHome = new T.Vector3(0, h(0, 0) + 0.32, 0);
    // haz láser
    const beamM = new T.MeshBasicMaterial({ color: 0x5dff8a, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false });
    const beam = new T.Mesh(new T.CylinderGeometry(0.02, 0.06, 1, 8, 1, true), beamM); scene.add(beam);
    const pulse = new T.Mesh(new T.SphereGeometry(0.12, 12, 10), new T.MeshBasicMaterial({ color: 0xb6ffca, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false })); scene.add(pulse);
    const glow = new T.PointLight(0x5dff8a, 0, 4); glow.position.copy(panelHome).add(new T.Vector3(0, 0.3, 0)); scene.add(glow);
    const tag = label(T, '+3,8 cm por año', '#b6ffca', 0.9); tag.visible = false; scene.add(tag);
    const earthPt = earth.position.clone().add(new T.Vector3(0.9, -1.5, 0.9));
    const camera = new T.PerspectiveCamera(42, 1, 0.1, 400);
    const look = new T.Vector3(0, 0.5, 0); camera.position.set(3, 1.6, 3.5);
    const phases = [
      { t: 0, y: '1969', text: 'Armstrong y Aldrin colocan en la Luna un panel con 100 prismas de vidrio.' },
      { t: 5.5, y: 'Desde la Tierra', text: 'Un observatorio dispara un rayo láser hacia el panel.' },
      { t: 10.5, y: '2,5 segundos', text: 'Los prismas devuelven la luz justo hacia donde vino: ida y vuelta en 2,5 segundos.' },
      { t: 15.5, y: 'Hoy', text: 'Midiendo ese tiempo se descubrió que la Luna se aleja 3,8 cm cada año. ¡Sigue funcionando!' },
    ];
    function update(t, dt) {
      // el astronauta trae el panel y lo deja
      const walk = smooth(0, 3.2, t);
      const ax = lerp(-3.2, -0.7, walk), az = lerp(1.6, 0.4, walk);
      const back = smooth(4, 5.5, t);
      const fx = lerp(ax, -1.6, back), fz = lerp(az, 1.4, back);
      A.group.position.set(fx, h(fx, fz) + Math.abs(Math.sin(t * 4.2)) * 0.12 * (walk < 1 || (back > 0 && back < 1) ? 1 : 0), fz);
      A.group.rotation.y = back > 0 ? -2.2 : -0.45;
      A.legs[0].rotation.z = Math.sin(t * 8.4) * 0.35 * (walk < 1 ? 1 : 0); A.legs[1].rotation.z = -A.legs[0].rotation.z;
      const set = smooth(3.0, 4.2, t);
      if (set < 1) panel.position.set(lerp(ax + 0.45, panelHome.x, set), lerp(h(ax, az) + 0.75, panelHome.y, set), lerp(az - 0.25, panelHome.z, set));
      else panel.position.copy(panelHome);
      // láser
      const on = smooth(5.5, 6.5, t);
      const top = earthPt, bot = panelHome.clone().add(new T.Vector3(0, 0.05, 0));
      const mid = top.clone().add(bot).multiplyScalar(0.5), len = top.distanceTo(bot);
      beam.position.copy(mid); beam.scale.set(1, len, 1); beam.lookAt(top); beam.rotateX(Math.PI / 2);
      beamM.opacity = 0.35 * on;
      // pulsos: bajan y suben cada 2,5 s
      let k = -1, hit = 0;
      if (t > 6.5) {
        const cyc = ((t - 6.5) % 2.5) / 2.5; // 0..1
        const down = cyc < 0.5; k = down ? cyc * 2 : 1 - (cyc - 0.5) * 2;
        pulse.position.copy(top).lerp(bot, k); pulse.material.opacity = 0.9;
        hit = Math.max(0, 1 - Math.abs(cyc - 0.5) * 8);
      } else pulse.material.opacity = 0;
      cubeM.emissiveIntensity = hit * 1.6; glow.intensity = hit * 3;
      tag.visible = t > 15.5; tag.position.copy(panelHome).add(new T.Vector3(0.6, 1.5, 0.4));
      tag.material.opacity = smooth(15.5, 16.5, t);
      // cámara
      let cp, tg;
      if (t < 5.5) { cp = new T.Vector3(1.8, h(0, 0) + 1.3, 3.0); tg = new T.Vector3(-0.8, 0.5, 0.4); }
      else if (t < 15.5) { cp = new T.Vector3(3.6, h(0, 0) + 1.2, 5.2); tg = new T.Vector3(-2.2, 3.4, -5); }
      else { cp = new T.Vector3(4.2, 1.8, 6.4); tg = new T.Vector3(-2.2, 3.2, -5); }
      follow(camera, look, cp, tg, dt, 1.4);
    }
    return { scene, camera, duration: 22, phases, update };
  };

  // =====================================================================
  //  ESPACIO · Voyager 1
  // =====================================================================
  function bandTex(T, cols, spot) {
    return canvasTex(T, 512, 256, (c, w, h) => {
      let y = 0;
      while (y < h) { const bh = 6 + Math.random() * 18; c.fillStyle = cols[Math.floor(Math.random() * cols.length)]; c.beginPath(); c.moveTo(0, y); for (let x = 0; x <= w; x += 16) c.lineTo(x, y + Math.sin(x * 0.05 + y) * 2); c.lineTo(w, y + bh); c.lineTo(0, y + bh); c.fill(); y += bh; }
      if (spot) { c.fillStyle = '#b5533a'; c.beginPath(); c.ellipse(w * 0.62, h * 0.64, 26, 12, 0, 0, 7); c.fill(); }
    });
  }
  function makeVoyager(T) {
    const g = new T.Group();
    const silver = mat(T, 0xc9c6bd, { metalness: 0.7, roughness: 0.35 });
    const bus = mesh(T, new T.CylinderGeometry(0.55, 0.55, 0.35, 10), mat(T, 0x8a7a55, { metalness: 0.6 })); g.add(bus);
    const dish = mesh(T, new T.SphereGeometry(1.8, 32, 12, 0, Math.PI * 2, 0, 0.55), mat(T, 0xf3f1ea, { side: T.DoubleSide, flatShading: false, roughness: 0.5 }));
    dish.rotation.x = Math.PI; dish.position.y = 1.85; g.add(dish);
    const feed = mesh(T, new T.CylinderGeometry(0.03, 0.03, 0.9, 6), silver); feed.position.y = 0.62; g.add(feed);
    const boomM = silver;
    const rtgBoom = mesh(T, new T.CylinderGeometry(0.03, 0.03, 2.2, 6), boomM); rtgBoom.rotation.z = Math.PI / 2; rtgBoom.position.set(-1.5, -0.1, 0); g.add(rtgBoom);
    for (let i = 0; i < 3; i++) { const r = mesh(T, new T.CylinderGeometry(0.12, 0.12, 0.3, 10), mat(T, 0x45423c, { metalness: 0.4 })); r.rotation.z = Math.PI / 2; r.position.set(-1.7 - i * 0.33, -0.1, 0); g.add(r); }
    const sciBoom = mesh(T, new T.CylinderGeometry(0.03, 0.03, 2.0, 6), boomM); sciBoom.rotation.z = Math.PI / 2; sciBoom.position.set(1.4, -0.05, 0); g.add(sciBoom);
    const platform = new T.Group(); platform.position.set(2.4, -0.05, 0); g.add(platform);
    const pb = mesh(T, new T.BoxGeometry(0.35, 0.3, 0.3), mat(T, 0x2b2b2b, { metalness: 0.5 })); platform.add(pb);
    const cam = mesh(T, new T.CylinderGeometry(0.06, 0.06, 0.3, 10), mat(T, 0x111111, { metalness: 0.8 })); cam.rotation.z = Math.PI / 2; cam.position.set(0.25, 0.05, 0.08); platform.add(cam);
    const mag = mesh(T, new T.CylinderGeometry(0.012, 0.012, 9, 4), mat(T, 0xa9a59a)); mag.rotation.x = Math.PI / 2; mag.position.set(0, -0.1, -4.6); g.add(mag);
    const record = mesh(T, new T.CylinderGeometry(0.18, 0.18, 0.02, 24), mat(T, 0xd9b25c, { metalness: 1, roughness: 0.2, flatShading: false })); record.rotation.x = Math.PI / 2; record.position.set(0, 0, 0.56); g.add(record);
    const leds = [];
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; const l = new T.Mesh(new T.SphereGeometry(0.04, 8, 6), new T.MeshBasicMaterial({ color: 0x7fd0ae })); l.position.set(Math.cos(a) * 0.57, -0.08, Math.sin(a) * 0.57); g.add(l); leds.push(l); }
    return { group: g, platform, leds };
  }
  S['voyager-1'] = (T) => {
    const scene = new T.Scene();
    const env = spaceEnv(T, scene);
    const V = makeVoyager(T); V.group.scale.setScalar(0.6); scene.add(V.group);
    const earth = new T.Mesh(new T.SphereGeometry(1.2, 32, 24), new T.MeshStandardMaterial({ map: earthTex(T), roughness: 1 })); scene.add(earth);
    const jup = new T.Mesh(new T.SphereGeometry(7, 48, 32), new T.MeshStandardMaterial({ map: bandTex(T, ['#c9a77d', '#e8d6b4', '#a8754b', '#d9bf97', '#f1e4cb'], true), roughness: 1 })); scene.add(jup);
    const sat = new T.Group(); scene.add(sat);
    sat.add(new T.Mesh(new T.SphereGeometry(5, 48, 32), new T.MeshStandardMaterial({ map: bandTex(T, ['#e3cfa0', '#d1b781', '#efe0bd', '#c7aa72']), roughness: 1 })));
    const ringG = new T.RingGeometry(6.2, 11, 96, 1); const rp = ringG.attributes.position, ruv = ringG.attributes.uv;
    for (let i = 0; i < rp.count; i++) { const r = Math.hypot(rp.getX(i), rp.getY(i)); ruv.setXY(i, (r - 6.2) / 4.8, 0.5); }
    const ringTex = canvasTex(T, 512, 8, (c, w) => { for (let x = 0; x < w; x++) { const a = 0.25 + 0.6 * Math.abs(Math.sin(x * 0.09) * Math.sin(x * 0.023)); c.fillStyle = x > w * 0.6 && x < w * 0.66 ? 'rgba(0,0,0,0)' : `rgba(226,205,160,${a})`; c.fillRect(x, 0, 1, 8); } });
    const ring = new T.Mesh(ringG, new T.MeshBasicMaterial({ map: ringTex, transparent: true, side: T.DoubleSide, depthWrite: false })); ring.rotation.x = -Math.PI / 2 + 0.45; sat.add(ring);
    const titan = new T.Mesh(new T.SphereGeometry(0.6, 20, 14), mat(T, 0xd39b4a, { flatShading: false })); sat.add(titan);
    const dot = new T.Mesh(new T.SphereGeometry(0.11, 10, 8), new T.MeshBasicMaterial({ color: 0x8fc2ff })); scene.add(dot);
    const ringPulse = new T.Mesh(new T.RingGeometry(0.3, 0.36, 48), new T.MeshBasicMaterial({ color: 0x7fb6ff, transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false })); scene.add(ringPulse);
    const helio = new T.Mesh(new T.SphereGeometry(30, 40, 28), new T.MeshBasicMaterial({ color: 0x5fb0ff, transparent: true, opacity: 0.13, side: T.DoubleSide, depthWrite: false, wireframe: true, blending: T.AdditiveBlending })); scene.add(helio);
    const wind = particles(T, 500, 0xffd58a, 0.06, 0.6, true); scene.add(wind.obj);
    const camera = new T.PerspectiveCamera(45, 1, 0.1, 800);
    const look = new T.Vector3(); camera.position.set(4, 1.5, 6);
    let prevT = 0;
    const phases = [
      { t: 0, y: '1977', text: 'Voyager 1 deja la Tierra rumbo a los planetas gigantes.' },
      { t: 5, y: '1979', text: 'Pasa junto a Júpiter y descubre volcanes activos en su luna Ío.' },
      { t: 11, y: '1980', text: 'Visita Saturno y estudia la atmósfera de Titán, su luna más grande.' },
      { t: 16, y: '1990', text: 'Gira su cámara y fotografía la Tierra: un «pálido punto azul» a 6.000 millones de km.' },
      { t: 21, y: '2012', text: 'Cruza la burbuja del Sol y entra al espacio interestelar.' },
      { t: 26, y: 'Hoy', text: 'A casi un día-luz de casa, solo 2 de sus 10 instrumentos siguen encendidos.' },
    ];
    function update(t, dt) {
      if (t < prevT) wind.clear(); prevT = t;
      V.group.rotation.y = Math.sin(t * 0.2) * 0.08 + (t > 16 ? Math.PI * inOut(smooth(16, 18, t)) : 0) - (t > 20 ? Math.PI * inOut(smooth(20, 21.5, t)) : 0);
      V.group.rotation.z = Math.sin(t * 0.33) * 0.04;
      // el "movimiento" lo hacen los astros, la cámara sigue a la sonda
      earth.position.set(-1.5, -1.2, 4 - t * 2.2); earth.rotation.y += dt * 0.5; earth.visible = t < 6;
      const jz = lerp(-60, 50, smooth(4.5, 11.5, t)); jup.position.set(10, -1, jz); jup.rotation.y += dt * 0.25; jup.visible = t > 4 && t < 12;
      const sz = lerp(-60, 50, smooth(10.5, 16.5, t)); sat.position.set(-10, 1.5, sz); sat.rotation.y += dt * 0.1; sat.visible = t > 10 && t < 17;
      titan.position.set(Math.cos(t * 0.8) * 14, 0, Math.sin(t * 0.8) * 14);
      V.platform.rotation.y = t > 4.5 && t < 11.5 ? -0.6 * Math.sin((t - 4.5) / 7 * Math.PI) : t > 10.5 && t < 16.5 ? 0.6 * Math.sin((t - 10.5) / 6 * Math.PI) : 0;
      dot.visible = ringPulse.visible = t > 16.5 && t < 21;
      dot.position.set(0.2, -0.3, 7); ringPulse.position.copy(dot.position); ringPulse.lookAt(camera.position);
      const rr = ((t - 16.5) % 1.4) / 1.4; ringPulse.scale.setScalar(1 + rr * 2.5); ringPulse.material.opacity = (1 - rr) * 0.9;
      // heliopausa: una cúpula que la sonda atraviesa
      helio.visible = t > 20 && t < 26;
      helio.position.set(0, 0, lerp(-58, 30, smooth(20.5, 24.5, t)));
      if (t < 22.5) for (let i = 0; i < 4; i++) wind.emit((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8, -12 + Math.random() * 4, 0, 0, 7 + Math.random() * 3, 3);
      wind.update(dt, 0, 0);
      // instrumentos que se apagan
      const off = t > 26 ? Math.min(8, Math.floor((t - 26.3) / 0.45) + 1) : 0;
      V.leds.forEach((l, i) => l.material.color.setHex(i < off ? 0x2a2f33 : 0x7fd0ae));
      // cámara
      const a = t * 0.12;
      let cp = new T.Vector3(Math.cos(a) * 4.5 + 1, 1.4 + Math.sin(t * 0.2) * 0.4, Math.sin(a) * 2 + 4.8);
      let tg = new T.Vector3(0.3, 0.2, 0);
      if (t > 4.5 && t < 11.5) { cp = new T.Vector3(-3.5, 1.6, 5); tg = new T.Vector3(3, 0, -2); }
      if (t > 10.5 && t < 16.5) { cp = new T.Vector3(3.8, 1.4, 5); tg = new T.Vector3(-3, 0.5, -2); }
      if (t > 16.5 && t < 21) { cp = new T.Vector3(1.4, 1.0, -3.4); tg = new T.Vector3(0.2, -0.2, 4); }
      if (t > 25.5) { cp = new T.Vector3(1.6, 0.9, 2.6); tg = new T.Vector3(0, 0, 0); }
      follow(camera, look, cp, tg, dt, 1.3);
    }
    return { scene, camera, duration: 31, phases, update };
  };

  // =====================================================================
  //  ESPACIO · New Horizons
  // =====================================================================
  function plutoTex(T) {
    return canvasTex(T, 1024, 512, (c, w, h) => {
      c.fillStyle = '#b89a7c'; c.fillRect(0, 0, w, h);
      for (let i = 0; i < 70; i++) { c.fillStyle = Math.random() < 0.5 ? 'rgba(120,70,45,.5)' : 'rgba(220,200,175,.4)'; c.beginPath(); c.ellipse(Math.random() * w, Math.random() * h, 20 + Math.random() * 70, 10 + Math.random() * 30, Math.random() * 3, 0, 7); c.fill(); }
      c.fillStyle = 'rgba(90,45,30,.75)'; c.fillRect(0, h * 0.55, w, h * 0.08);
      // el «corazón» (Tombaugh Regio)
      const cx = w * 0.5, cy = h * 0.48, s = 95;
      c.fillStyle = '#f6efe4'; c.beginPath();
      c.moveTo(cx, cy + s * 0.9); c.bezierCurveTo(cx - s * 1.6, cy, cx - s * 0.9, cy - s * 1.1, cx, cy - s * 0.35);
      c.bezierCurveTo(cx + s * 0.9, cy - s * 1.1, cx + s * 1.6, cy, cx, cy + s * 0.9); c.fill();
    });
  }
  function makeNH(T) {
    const g = new T.Group();
    const body = mesh(T, new T.CylinderGeometry(0.6, 0.6, 0.35, 3), mat(T, 0xc9a24a, { metalness: 0.8, roughness: 0.3 })); g.add(body);
    const dish = mesh(T, new T.SphereGeometry(1.0, 28, 10, 0, Math.PI * 2, 0, 0.6), mat(T, 0xf3f1ea, { side: T.DoubleSide, flatShading: false }));
    dish.rotation.x = Math.PI; dish.position.y = 1.1; g.add(dish);
    const rtg = mesh(T, new T.CylinderGeometry(0.1, 0.12, 0.9, 8), mat(T, 0x45423c)); rtg.rotation.z = 1.1; rtg.position.set(-0.75, -0.1, 0.25); g.add(rtg);
    const cam = mesh(T, new T.CylinderGeometry(0.08, 0.08, 0.25, 10), mat(T, 0x1c1c1c, { metalness: 0.8 })); cam.rotation.x = Math.PI / 2; cam.position.set(0.25, 0, 0.45); g.add(cam);
    return g;
  }
  S['new-horizons'] = (T) => {
    const scene = new T.Scene(); spaceEnv(T, scene);
    const NH = makeNH(T); NH.scale.setScalar(0.7); scene.add(NH);
    const pluto = new T.Mesh(new T.SphereGeometry(5, 64, 40), new T.MeshStandardMaterial({ map: plutoTex(T), roughness: 1 })); scene.add(pluto);
    const haze = new T.Mesh(new T.SphereGeometry(5.25, 48, 32), new T.MeshBasicMaterial({ color: 0x6ea8ff, transparent: true, opacity: 0.12, side: T.BackSide, depthWrite: false })); pluto.add(haze);
    const charon = new T.Mesh(new T.SphereGeometry(2.4, 40, 28), mat(T, 0x8c8a86, { flatShading: false })); scene.add(charon);
    const arro = new T.Group(); scene.add(arro);
    const am = mat(T, 0xa0563c, { roughness: 1 });
    const l1 = mesh(T, new T.SphereGeometry(1.2, 20, 14), am); l1.scale.set(1.2, 0.75, 1); arro.add(l1);
    const l2 = mesh(T, new T.SphereGeometry(0.85, 20, 14), am); l2.scale.set(1, 0.7, 1); l2.position.x = 1.85; arro.add(l2);
    const kb = new T.InstancedMesh(new T.DodecahedronGeometry(0.25, 0), mat(T, 0x8e8478), 120); scene.add(kb);
    const kbData = Array.from({ length: 120 }, () => [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 14, -40 + Math.random() * 80, 0.3 + Math.random() * 1.5, Math.random() * 6]);
    const streak = particles(T, 400, 0xcfe0ff, 0.05, 0.8, true); scene.add(streak.obj);
    const camera = new T.PerspectiveCamera(45, 1, 0.1, 800); const look = new T.Vector3(); camera.position.set(3, 1, 5);
    const o = new T.Object3D(); let prevT = 0;
    const phases = [
      { t: 0, y: '2006', text: 'New Horizons despega: la nave más rápida lanzada desde la Tierra hasta ese momento.' },
      { t: 5, y: '2015', text: 'Tras 9 años y medio llega a Plutón y descubre un enorme «corazón» de hielo.' },
      { t: 13, y: '2019', text: 'Visita Arrokoth, una roca helada con forma de muñeco de nieve.' },
      { t: 19, y: 'Hoy', text: 'Sigue activa, explorando el cinturón de Kuiper en los confines del sistema solar.' },
    ];
    function update(t, dt) {
      if (t < prevT) streak.clear(); prevT = t;
      NH.rotation.set(Math.sin(t * 0.4) * 0.05, Math.sin(t * 0.2) * 0.2 + (t > 7 && t < 12 ? 0.9 * Math.sin((t - 7) / 5 * Math.PI) : 0), Math.sin(t * 0.3) * 0.04);
      if (t < 5) { NH.position.set(Math.sin(t * 30) * 0.01, Math.cos(t * 27) * 0.01, 0); for (let i = 0; i < 10; i++) streak.emit((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, -10, 0, 0, 30 + Math.random() * 10, 0.7); }
      else NH.position.set(0, 0, 0);
      streak.update(dt, 0, 0);
      const pz = lerp(-70, 40, smooth(4.5, 13.5, t)); pluto.position.set(-7, -1, pz); pluto.rotation.y = -1.08 + (t - 9) * 0.08; pluto.visible = t > 4 && t < 14;
      charon.position.set(-7 + Math.cos(t * 0.5) * 16, 0.5, pz + Math.sin(t * 0.5) * 16); charon.visible = pluto.visible;
      const az = lerp(-50, 30, smooth(12.5, 19.5, t)); arro.position.set(5, 0.5, az); arro.rotation.set(t * 0.2, t * 0.15, 0.3); arro.visible = t > 12 && t < 20;
      kb.visible = t > 18.5;
      kbData.forEach((k, i) => { o.position.set(k[0], k[1], ((k[2] + t * 3 + 40) % 80) - 40); o.rotation.set(k[4] + t * 0.3, k[4], 0); o.scale.setScalar(k[3]); o.updateMatrix(); kb.setMatrixAt(i, o.matrix); });
      kb.instanceMatrix.needsUpdate = true;
      let cp = new T.Vector3(3.2, 1.2, 4.2), tg = new T.Vector3(0, 0, 0);
      if (t > 5 && t < 13.5) { cp = new T.Vector3(4, 1.8, 6); tg = new T.Vector3(-4, -0.5, Math.min(0, pz) * 0.3); }
      if (t > 13 && t < 19.5) { cp = new T.Vector3(-3, 1.2, 5); tg = new T.Vector3(3, 0.3, Math.min(0, az) * 0.3); }
      if (t > 19.5) { const a = t * 0.2; cp = new T.Vector3(Math.cos(a) * 7.5, 2, Math.sin(a) * 7.5); }
      follow(camera, look, cp, tg, dt, 1.3);
    }
    return { scene, camera, duration: 24, phases, update };
  };

  window.SCENES = S;
})();
