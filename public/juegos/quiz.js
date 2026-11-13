/* Quiz: 10 preguntas al azar de un banco basado en data/hardware.json. */
(() => {
  'use strict';
  const ROUND = 10;

  // [lugar, pregunta, respuesta correcta, [incorrectas], explicación]
  const BANK = [
    ['Luna', '¿Cuántos Rovers Lunares (LRV) quedaron estacionados en la Luna?', '3', ['1', '6', 'Ninguno: volvieron a la Tierra'],
      'Apollo 15, 16 y 17 llevaron un rover cada una. No había espacio para traerlos, así que los tres siguen allí.'],
    ['Luna', '¿De qué estaban hechas las ruedas del Rover Lunar?', 'Malla de acero con placas de titanio', ['Goma inflable', 'Madera reforzada', 'Plástico flexible'],
      'El caucho se habría dañado con el frío y el calor extremos, así que se usó una malla de alambre de acero.'],
    ['Luna', '¿Qué experimento de Apollo sigue funcionando hoy, sin necesitar energía?', 'Los retrorreflectores láser', ['Los sismómetros ALSEP', 'El Rover Lunar', 'La cámara del Surveyor 3'],
      'Son prismas que devuelven la luz de un láser enviado desde la Tierra. Así se mide la distancia a la Luna con precisión de milímetros.'],
    ['Luna', '¿En qué lugar aterrizó el Eagle de Apollo 11?', 'Mar de la Tranquilidad', ['Océano de las Tormentas', 'Cráter Cabeus', 'Taurus-Littrow'],
      'El 20 de julio de 1969. Su etapa de descenso sigue allí con una placa que dice «Vinimos en paz en nombre de toda la humanidad».'],
    ['Luna', '¿Qué fuente de energía usaban las estaciones científicas ALSEP?', 'Plutonio-238', ['Paneles solares', 'Baterías recargables', 'Viento lunar'],
      'Un generador de plutonio-238 les permitió medir lunamotos durante casi 8 años, hasta 1977.'],
    ['Luna', '¿Qué hizo LCROSS en 2009?', 'Chocó contra un cráter para buscar agua', ['Aterrizó suavemente en el polo norte', 'Trajo rocas a la Tierra', 'Fotografió el lado oculto'],
      'Chocó a propósito contra el cráter Cabeus. La nube de polvo que levantó confirmó que había agua congelada.'],
    ['Luna', '¿Qué nave fue visitada por astronautas de Apollo 12, dos años y medio después de aterrizar?', 'Surveyor 3', ['Viking 1', 'LRO', 'Pioneer 10'],
      'Los astronautas le quitaron piezas, como su cámara, que hoy está en el Museo Nacional del Aire y el Espacio.'],
    ['Luna', '¿Qué sonda ha fotografiado desde la órbita los seis sitios de aterrizaje Apollo?', 'Lunar Reconnaissance Orbiter (LRO)', ['MAVEN', 'Voyager 2', 'Phoenix'],
      'LRO lleva más de 17 años en órbita lunar. En sus fotos todavía se ven las huellas de los astronautas y las ruedas del rover.'],
    ['Marte', '¿Cuántos días debían durar las misiones de Spirit y Opportunity?', '90 días', ['7 días', '1 año', '10 años'],
      'Spirit trabajó más de 6 años y Opportunity más de 14. ¡Superaron por mucho lo planeado!'],
    ['Marte', '¿Cuántos vuelos logró Ingenuity en Marte?', '72', ['5', '12', '200'],
      'Estaba planeado para 5 vuelos de prueba. Fue el primer helicóptero en volar en otro planeta.'],
    ['Marte', '¿Qué lleva Ingenuity a bordo como homenaje?', 'Un trocito de tela del avión de los hermanos Wright', ['Una foto de la Luna', 'Un disco de oro', 'Semillas de la Tierra'],
      'Dos primeros vuelos, uno en la Tierra y otro en Marte, conectados por más de un siglo.'],
    ['Marte', '¿Quién propuso el nombre «Sojourner»?', 'Una niña de 12 años en un concurso escolar', ['El director de la NASA', 'Un astronauta de Apollo', 'Un programa de computadora'],
      'Valerie Ambroise lo eligió en honor a Sojourner Truth, luchadora por los derechos civiles.'],
    ['Marte', '¿Qué encontró Phoenix en el ártico marciano?', 'Hielo de agua', ['Fósiles', 'Un lago líquido', 'Oro'],
      'Al raspar el suelo apareció hielo que luego se evaporó. Además lleva un DVD con novelas y arte sobre Marte.'],
    ['Marte', '¿Qué medía InSight en Marte?', 'Martemotos (sismos de Marte)', ['La temperatura del Sol', 'La velocidad de los rovers', 'Señales de radio de la Tierra'],
      'Detectó 1.319 martemotos, el mayor de magnitud 4,7, para entender cómo es el interior del planeta.'],
    ['Marte', '¿Cuántos tubos con muestras dejó Perseverance en el depósito Three Forks?', '10', ['2', '43', '100'],
      'Están ordenados en zigzag en el cráter Jezero, esperando que alguna misión futura los traiga a la Tierra.'],
    ['Marte', '¿Qué pregunta intentaba responder MAVEN?', '¿Hacia dónde se fue el aire de Marte?', ['¿Hay vida en Marte?', '¿Cuánto pesa Marte?', '¿Por qué Marte es rojo?'],
      'Estudió la atmósfera alta durante 11 años y mostró cómo el viento solar arrancó gran parte del aire del planeta.'],
    ['Marte', '¿Qué nave tomó las primeras fotos a color desde la superficie de Marte?', 'Viking 1', ['Sojourner', 'Spirit', 'Mars Pathfinder'],
      'Aterrizó en Chryse Planitia en 1976 y trabajó más de 6 años.'],
    ['Espacio profundo', '¿Qué llevan a bordo las sondas Voyager?', 'Un disco de oro con sonidos y saludos de la Tierra', ['Una bandera gigante', 'Un telescopio de repuesto', 'Muestras de suelo lunar'],
      'Tiene saludos en 55 idiomas, música y sonidos como la lluvia o el latido de un corazón.'],
    ['Espacio profundo', '¿Cuál es la única nave que ha visitado Urano y Neptuno?', 'Voyager 2', ['Voyager 1', 'Pioneer 10', 'New Horizons'],
      'Voyager 2 visitó cuatro planetas y entró al espacio interestelar en 2018.'],
    ['Espacio profundo', '¿Cómo se llama la famosa foto de la Tierra que tomó Voyager 1 en 1990?', 'El pálido punto azul', ['La canica azul', 'Salida de la Tierra', 'El ojo del universo'],
      'Desde 6.000 millones de km, la Tierra se ve como un puntito diminuto en un rayo de luz.'],
    ['Espacio profundo', '¿Qué fue lo primero que logró Pioneer 10?', 'Cruzar el cinturón de asteroides', ['Aterrizar en Júpiter', 'Llegar a Plutón', 'Dar la vuelta al Sol'],
      'Visitó Júpiter en 1973 y siguió hacia la estrella Aldebarán, a la que tardará unos dos millones de años en acercarse.'],
    ['Espacio profundo', '¿Qué planeta enano visitó New Horizons en 2015?', 'Plutón', ['Ceres', 'Eris', 'Makemake'],
      'Después siguió hasta Arrokoth en 2019. Lleva a bordo cenizas de Clyde Tombaugh, quien descubrió Plutón.'],
    ['Espacio profundo', '¿Cuántos de sus 10 instrumentos mantiene encendidos Voyager 1?', '2', ['10', '5', 'Ninguno'],
      'Su energía se agota poco a poco, así que el equipo apaga instrumentos para que la nave dure más.'],
  ];

  const $ = (s) => document.querySelector(s);
  const card = $('#card');
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let qs, i, score, streak, best, answered, log;

  function start() {
    qs = shuffle(BANK.slice()).slice(0, ROUND).map(([where, q, right, wrong, why]) => ({
      where, q, right, why, opts: shuffle([right, ...wrong]),
    }));
    i = 0; score = 0; streak = 0; best = 0; log = [];
    show();
  }

  function hud() {
    $('#num').textContent = `${Math.min(i + 1, ROUND)}/${ROUND}`;
    $('#score').textContent = score;
    $('#streak').textContent = streak;
  }

  function show() {
    answered = false; hud();
    const q = qs[i];
    card.innerHTML = `
      <div class="q-progress"><span style="width:${(i / ROUND) * 100}%"></span></div>
      <p class="q-meta">${esc(q.where)}</p>
      <h2 class="q-text">${esc(q.q)}</h2>
      <div class="q-opts">${q.opts.map((o, k) => `<button type="button" class="opt" data-k="${k}"><span class="key">${k + 1}</span><span>${esc(o)}</span></button>`).join('')}</div>
      <div id="after"></div>`;
    card.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => answer(+b.dataset.k)));
    card.querySelector('.opt').focus({ preventScroll: true });
  }

  function answer(k) {
    if (answered) return;
    answered = true;
    const q = qs[i];
    const ok = q.opts[k] === q.right;
    if (ok) { score++; streak++; best = Math.max(best, streak); } else streak = 0;
    log.push({ q: q.q, ok, right: q.right });
    card.querySelectorAll('.opt').forEach((b, n) => {
      b.disabled = true;
      if (q.opts[n] === q.right) b.classList.add('right');
      else if (n === k) b.classList.add('wrong');
    });
    hud();
    const last = i === ROUND - 1;
    $('#after').innerHTML = `
      <p class="q-feedback"><b>${ok ? '¡Correcto!' : `La respuesta era: ${esc(q.right)}.`}</b> ${esc(q.why)}</p>
      <div class="q-next"><button type="button" class="btn" id="next">${last ? 'Ver resultado' : 'Siguiente pregunta'}</button></div>`;
    const nb = $('#next');
    nb.addEventListener('click', next);
    nb.focus({ preventScroll: true });
  }

  function next() {
    i++;
    if (i < ROUND) show(); else result();
  }

  function result() {
    hud();
    const msg = score === ROUND ? '¡Perfecto! Eres el bibliotecario jefe del sistema solar.'
      : score >= 8 ? 'Excelente. Conoces muy bien los estantes de la biblioteca.'
      : score >= 5 ? 'Buen viaje. Vuelve a leer algunos libros y lo harás aún mejor.'
      : 'Toda exploración empieza así. Abre los libros de la biblioteca y vuelve a intentarlo.';
    card.innerHTML = `
      <div class="q-result">
        <div class="q-progress"><span style="width:100%"></span></div>
        <p class="q-meta">Resultado</p>
        <p class="big">${score}/${ROUND}</p>
        <p>${msg} Tu mejor racha fue de ${best} ${best === 1 ? 'acierto' : 'aciertos'} seguidos.</p>
        <div class="ws-actions">
          <button type="button" class="btn" id="again">Jugar otra vez</button>
          <a class="btn btn-ghost" style="color:var(--ink);border-color:rgba(43,34,25,.25)" href="../">Ir a la biblioteca</a>
        </div>
        <ul class="review">${log.map((l) => `<li class="${l.ok ? 'ok' : 'no'}">${esc(l.q)} <b>${esc(l.right)}</b></li>`).join('')}</ul>
      </div>`;
    $('#again').addEventListener('click', start);
    $('#again').focus({ preventScroll: true });
  }

  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const n = parseInt(e.key, 10);
    if (!answered && n >= 1 && n <= 4 && qs && i < ROUND) answer(n - 1);
  });

  start();
})();
