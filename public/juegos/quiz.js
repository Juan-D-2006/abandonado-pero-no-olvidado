/* Quiz: 10 preguntas al azar de un banco basado en data/hardware.json. */
(() => {
  'use strict';
  const ROUND = 10;

  // [lugar, pregunta, respuesta correcta, [incorrectas], explicación]
  const BANK_ES = [
    ['luna', '¿Cuántos Rovers Lunares (LRV) quedaron estacionados en la Luna?', '3', ['1', '6', 'Ninguno: volvieron a la Tierra'],
      'Apollo 15, 16 y 17 llevaron un rover cada una. No había espacio para traerlos, así que los tres siguen allí.'],
    ['luna', '¿De qué estaban hechas las ruedas del Rover Lunar?', 'Malla de acero con placas de titanio', ['Goma inflable', 'Madera reforzada', 'Plástico flexible'],
      'El caucho se habría dañado con el frío y el calor extremos, así que se usó una malla de alambre de acero.'],
    ['luna', '¿Qué experimento de Apollo sigue funcionando hoy, sin necesitar energía?', 'Los retrorreflectores láser', ['Los sismómetros ALSEP', 'El Rover Lunar', 'La cámara del Surveyor 3'],
      'Son prismas que devuelven la luz de un láser enviado desde la Tierra. Así se mide la distancia a la Luna con precisión de milímetros.'],
    ['luna', '¿En qué lugar aterrizó el Eagle de Apollo 11?', 'Mar de la Tranquilidad', ['Océano de las Tormentas', 'Cráter Cabeus', 'Taurus-Littrow'],
      'El 20 de julio de 1969. Su etapa de descenso sigue allí con una placa que dice «Vinimos en paz en nombre de toda la humanidad».'],
    ['luna', '¿Qué fuente de energía usaban las estaciones científicas ALSEP?', 'Plutonio-238', ['Paneles solares', 'Baterías recargables', 'Viento lunar'],
      'Un generador de plutonio-238 les permitió medir lunamotos durante casi 8 años, hasta 1977.'],
    ['luna', '¿Qué hizo LCROSS en 2009?', 'Chocó contra un cráter para buscar agua', ['Aterrizó suavemente en el polo norte', 'Trajo rocas a la Tierra', 'Fotografió el lado oculto'],
      'Chocó a propósito contra el cráter Cabeus. La nube de polvo que levantó confirmó que había agua congelada.'],
    ['luna', '¿Qué nave fue visitada por astronautas de Apollo 12, dos años y medio después de aterrizar?', 'Surveyor 3', ['Viking 1', 'LRO', 'Pioneer 10'],
      'Los astronautas le quitaron piezas, como su cámara, que hoy está en el Museo Nacional del Aire y el Espacio.'],
    ['luna', '¿Qué sonda ha fotografiado desde la órbita los seis sitios de aterrizaje Apollo?', 'Lunar Reconnaissance Orbiter (LRO)', ['MAVEN', 'Voyager 2', 'Phoenix'],
      'LRO lleva más de 17 años en órbita lunar. En sus fotos todavía se ven las huellas de los astronautas y las ruedas del rover.'],
    ['marte', '¿Cuántos días debían durar las misiones de Spirit y Opportunity?', '90 días', ['7 días', '1 año', '10 años'],
      'Spirit trabajó más de 6 años y Opportunity más de 14. ¡Superaron por mucho lo planeado!'],
    ['marte', '¿Cuántos vuelos logró Ingenuity en Marte?', '72', ['5', '12', '200'],
      'Estaba planeado para 5 vuelos de prueba. Fue el primer helicóptero en volar en otro planeta.'],
    ['marte', '¿Qué lleva Ingenuity a bordo como homenaje?', 'Un trocito de tela del avión de los hermanos Wright', ['Una foto de la Luna', 'Un disco de oro', 'Semillas de la Tierra'],
      'Dos primeros vuelos, uno en la Tierra y otro en Marte, conectados por más de un siglo.'],
    ['marte', '¿Quién propuso el nombre «Sojourner»?', 'Una niña de 12 años en un concurso escolar', ['El director de la NASA', 'Un astronauta de Apollo', 'Un programa de computadora'],
      'Valerie Ambroise lo eligió en honor a Sojourner Truth, luchadora por los derechos civiles.'],
    ['marte', '¿Qué encontró Phoenix en el ártico marciano?', 'Hielo de agua', ['Fósiles', 'Un lago líquido', 'Oro'],
      'Al raspar el suelo apareció hielo que luego se evaporó. Además lleva un DVD con novelas y arte sobre Marte.'],
    ['marte', '¿Qué medía InSight en Marte?', 'Martemotos (sismos de Marte)', ['La temperatura del Sol', 'La velocidad de los rovers', 'Señales de radio de la Tierra'],
      'Detectó 1.319 martemotos, el mayor de magnitud 4,7, para entender cómo es el interior del planeta.'],
    ['marte', '¿Cuántos tubos con muestras dejó Perseverance en el depósito Three Forks?', '10', ['2', '43', '100'],
      'Están ordenados en zigzag en el cráter Jezero, esperando que alguna misión futura los traiga a la Tierra.'],
    ['marte', '¿Qué pregunta intentaba responder MAVEN?', '¿Hacia dónde se fue el aire de Marte?', ['¿Hay vida en Marte?', '¿Cuánto pesa Marte?', '¿Por qué Marte es rojo?'],
      'Estudió la atmósfera alta durante 11 años y mostró cómo el viento solar arrancó gran parte del aire del planeta.'],
    ['marte', '¿Qué nave tomó las primeras fotos a color desde la superficie de Marte?', 'Viking 1', ['Sojourner', 'Spirit', 'Mars Pathfinder'],
      'Aterrizó en Chryse Planitia en 1976 y trabajó más de 6 años.'],
    ['espacio', '¿Qué llevan a bordo las sondas Voyager?', 'Un disco de oro con sonidos y saludos de la Tierra', ['Una bandera gigante', 'Un telescopio de repuesto', 'Muestras de suelo lunar'],
      'Tiene saludos en 55 idiomas, música y sonidos como la lluvia o el latido de un corazón.'],
    ['espacio', '¿Cuál es la única nave que ha visitado Urano y Neptuno?', 'Voyager 2', ['Voyager 1', 'Pioneer 10', 'New Horizons'],
      'Voyager 2 visitó cuatro planetas y entró al espacio interestelar en 2018.'],
    ['espacio', '¿Cómo se llama la famosa foto de la Tierra que tomó Voyager 1 en 1990?', 'El pálido punto azul', ['La canica azul', 'Salida de la Tierra', 'El ojo del universo'],
      'Desde 6.000 millones de km, la Tierra se ve como un puntito diminuto en un rayo de luz.'],
    ['espacio', '¿Qué fue lo primero que logró Pioneer 10?', 'Cruzar el cinturón de asteroides', ['Aterrizar en Júpiter', 'Llegar a Plutón', 'Dar la vuelta al Sol'],
      'Visitó Júpiter en 1973 y siguió hacia la estrella Aldebarán, a la que tardará unos dos millones de años en acercarse.'],
    ['espacio', '¿Qué planeta enano visitó New Horizons en 2015?', 'Plutón', ['Ceres', 'Eris', 'Makemake'],
      'Después siguió hasta Arrokoth en 2019. Lleva a bordo cenizas de Clyde Tombaugh, quien descubrió Plutón.'],
    ['espacio', '¿Cuántos de sus 10 instrumentos mantiene encendidos Voyager 1?', '2', ['10', '5', 'Ninguno'],
      'Su energía se agota poco a poco, así que el equipo apaga instrumentos para que la nave dure más.'],
  ];

  const BANK_EN = [
    ['luna', 'How many Lunar Roving Vehicles (LRV) were left parked on the Moon?', '3', ['1', '6', 'None: they came back to Earth'],
      'Apollo 15, 16 and 17 each carried a rover. There was no room to bring them back, so all three are still there.'],
    ['luna', 'What were the Lunar Rover’s wheels made of?', 'Steel mesh with titanium plates', ['Inflatable rubber', 'Reinforced wood', 'Flexible plastic'],
      'Rubber would have been damaged by the extreme cold and heat, so a steel wire mesh was used.'],
    ['luna', 'Which Apollo experiment still works today without needing any power?', 'The laser retroreflectors', ['The ALSEP seismometers', 'The Lunar Rover', 'The Surveyor 3 camera'],
      'They are prisms that bounce back the light of a laser fired from Earth. That is how the distance to the Moon is measured to the millimeter.'],
    ['luna', 'Where did Apollo 11’s Eagle land?', 'Sea of Tranquility', ['Ocean of Storms', 'Cabeus crater', 'Taurus-Littrow'],
      'On July 20, 1969. Its descent stage is still there with a plaque that says “We came in peace for all mankind.”'],
    ['luna', 'What power source did the ALSEP science stations use?', 'Plutonium-238', ['Solar panels', 'Rechargeable batteries', 'Lunar wind'],
      'A plutonium-238 generator let them measure moonquakes for almost 8 years, until 1977.'],
    ['luna', 'What did LCROSS do in 2009?', 'It crashed into a crater to look for water', ['It landed gently at the north pole', 'It brought rocks to Earth', 'It photographed the far side'],
      'It crashed on purpose into Cabeus crater. The cloud of dust it threw up confirmed there was frozen water.'],
    ['luna', 'Which spacecraft was visited by Apollo 12 astronauts two and a half years after it landed?', 'Surveyor 3', ['Viking 1', 'LRO', 'Pioneer 10'],
      'The astronauts removed parts of it, like its camera, which is now in the National Air and Space Museum.'],
    ['luna', 'Which spacecraft has photographed all six Apollo landing sites from orbit?', 'Lunar Reconnaissance Orbiter (LRO)', ['MAVEN', 'Voyager 2', 'Phoenix'],
      'LRO has been in lunar orbit for more than 17 years. In its photos you can still see the astronauts’ footprints and the rover’s wheel tracks.'],
    ['marte', 'How many days were the Spirit and Opportunity missions supposed to last?', '90 days', ['7 days', '1 year', '10 years'],
      'Spirit worked for more than 6 years and Opportunity for more than 14. They went far beyond the plan!'],
    ['marte', 'How many flights did Ingenuity make on Mars?', '72', ['5', '12', '200'],
      'It was planned for 5 test flights. It was the first helicopter to fly on another planet.'],
    ['marte', 'What does Ingenuity carry on board as a tribute?', 'A tiny piece of fabric from the Wright brothers’ airplane', ['A photo of the Moon', 'A golden record', 'Seeds from Earth'],
      'Two first flights, one on Earth and one on Mars, connected across more than a century.'],
    ['marte', 'Who suggested the name “Sojourner”?', 'A 12-year-old girl in a school contest', ['The head of NASA', 'An Apollo astronaut', 'A computer program'],
      'Valerie Ambroise chose it in honor of Sojourner Truth, a civil rights fighter.'],
    ['marte', 'What did Phoenix find in the Martian Arctic?', 'Water ice', ['Fossils', 'A liquid lake', 'Gold'],
      'When it scraped the ground, ice appeared and later turned into vapor. It also carries a DVD with novels and art about Mars.'],
    ['marte', 'What did InSight measure on Mars?', 'Marsquakes', ['The temperature of the Sun', 'The speed of the rovers', 'Radio signals from Earth'],
      'It detected 1,319 marsquakes, the largest of magnitude 4.7, to understand what the inside of the planet is like.'],
    ['marte', 'How many sample tubes did Perseverance leave at the Three Forks depot?', '10', ['2', '43', '100'],
      'They are laid out in a zigzag in Jezero crater, waiting for a future mission to bring them to Earth.'],
    ['marte', 'What question was MAVEN trying to answer?', 'Where did the air of Mars go?', ['Is there life on Mars?', 'How much does Mars weigh?', 'Why is Mars red?'],
      'It studied the upper atmosphere for 11 years and showed how the solar wind stripped away much of the planet’s air.'],
    ['marte', 'Which spacecraft took the first color photos from the surface of Mars?', 'Viking 1', ['Sojourner', 'Spirit', 'Mars Pathfinder'],
      'It landed in Chryse Planitia in 1976 and worked for more than 6 years.'],
    ['espacio', 'What do the Voyager probes carry on board?', 'A golden record with sounds and greetings from Earth', ['A giant flag', 'A spare telescope', 'Samples of lunar soil'],
      'It has greetings in 55 languages, music and sounds like rain or a beating heart.'],
    ['espacio', 'What is the only spacecraft that has visited Uranus and Neptune?', 'Voyager 2', ['Voyager 1', 'Pioneer 10', 'New Horizons'],
      'Voyager 2 visited four planets and entered interstellar space in 2018.'],
    ['espacio', 'What is the name of the famous photo of Earth taken by Voyager 1 in 1990?', 'The Pale Blue Dot', ['The Blue Marble', 'Earthrise', 'The Eye of the Universe'],
      'From 6 billion km away, Earth looks like a tiny speck in a ray of light.'],
    ['espacio', 'What was the first thing Pioneer 10 achieved?', 'Crossing the asteroid belt', ['Landing on Jupiter', 'Reaching Pluto', 'Going around the Sun'],
      'It visited Jupiter in 1973 and kept going toward the star Aldebaran, which it will approach in about two million years.'],
    ['espacio', 'Which dwarf planet did New Horizons visit in 2015?', 'Pluto', ['Ceres', 'Eris', 'Makemake'],
      'Then it continued to Arrokoth in 2019. It carries the ashes of Clyde Tombaugh, who discovered Pluto.'],
    ['espacio', 'How many of its 10 instruments does Voyager 1 keep switched on?', '2', ['10', '5', 'None'],
      'Its power is slowly running out, so the team switches instruments off to make the spacecraft last longer.'],
  ];

  const BANK_FR = [
    ['luna', 'Combien de rovers lunaires (LRV) sont restés garés sur la Lune ?', '3', ['1', '6', 'Aucun : ils sont revenus sur Terre'],
      'Apollo 15, 16 et 17 ont chacune emporté un rover. Il n’y avait pas de place pour les ramener : les trois sont toujours là-bas.'],
    ['luna', 'En quoi étaient faites les roues du rover lunaire ?', 'Un treillis d’acier avec des plaques de titane', ['Du caoutchouc gonflable', 'Du bois renforcé', 'Du plastique souple'],
      'Le caoutchouc aurait été abîmé par le froid et la chaleur extrêmes : on a donc utilisé un treillis de fil d’acier.'],
    ['luna', 'Quelle expérience d’Apollo fonctionne encore aujourd’hui, sans aucune énergie ?', 'Les rétroréflecteurs laser', ['Les sismomètres ALSEP', 'Le rover lunaire', 'La caméra de Surveyor 3'],
      'Ce sont des prismes qui renvoient la lumière d’un laser tiré depuis la Terre. On mesure ainsi la distance de la Lune au millimètre près.'],
    ['luna', 'Où s’est posé l’Eagle d’Apollo 11 ?', 'Mer de la Tranquillité', ['Océan des Tempêtes', 'Cratère Cabeus', 'Taurus-Littrow'],
      'Le 20 juillet 1969. Son étage de descente est toujours là, avec une plaque qui dit « Nous sommes venus en paix au nom de toute l’humanité ».'],
    ['luna', 'Quelle source d’énergie utilisaient les stations scientifiques ALSEP ?', 'Le plutonium 238', ['Des panneaux solaires', 'Des batteries rechargeables', 'Le vent lunaire'],
      'Un générateur au plutonium 238 leur a permis de mesurer des séismes lunaires pendant presque 8 ans, jusqu’en 1977.'],
    ['luna', 'Qu’a fait LCROSS en 2009 ?', 'Il s’est écrasé dans un cratère pour chercher de l’eau', ['Il s’est posé en douceur au pôle Nord', 'Il a rapporté des roches sur Terre', 'Il a photographié la face cachée'],
      'Il s’est écrasé exprès dans le cratère Cabeus. Le nuage de poussière soulevé a confirmé la présence d’eau gelée.'],
    ['luna', 'Quel vaisseau a reçu la visite des astronautes d’Apollo 12, deux ans et demi après son atterrissage ?', 'Surveyor 3', ['Viking 1', 'LRO', 'Pioneer 10'],
      'Les astronautes lui ont retiré des pièces, comme sa caméra, aujourd’hui exposée au Musée national de l’air et de l’espace.'],
    ['luna', 'Quelle sonde a photographié depuis l’orbite les six sites d’atterrissage Apollo ?', 'Lunar Reconnaissance Orbiter (LRO)', ['MAVEN', 'Voyager 2', 'Phoenix'],
      'LRO est en orbite lunaire depuis plus de 17 ans. Sur ses photos, on voit encore les traces de pas des astronautes et des roues du rover.'],
    ['marte', 'Combien de jours devaient durer les missions de Spirit et Opportunity ?', '90 jours', ['7 jours', '1 an', '10 ans'],
      'Spirit a travaillé plus de 6 ans et Opportunity plus de 14. Ils ont largement dépassé le plan !'],
    ['marte', 'Combien de vols Ingenuity a-t-il réalisés sur Mars ?', '72', ['5', '12', '200'],
      'Il était prévu pour 5 vols d’essai. C’est le premier hélicoptère à avoir volé sur une autre planète.'],
    ['marte', 'Qu’emporte Ingenuity à bord en hommage ?', 'Un petit morceau de toile de l’avion des frères Wright', ['Une photo de la Lune', 'Un disque d’or', 'Des graines de la Terre'],
      'Deux premiers vols, l’un sur Terre et l’autre sur Mars, reliés à plus d’un siècle d’écart.'],
    ['marte', 'Qui a proposé le nom « Sojourner » ?', 'Une fille de 12 ans lors d’un concours scolaire', ['Le directeur de la NASA', 'Un astronaute d’Apollo', 'Un programme informatique'],
      'Valerie Ambroise l’a choisi en l’honneur de Sojourner Truth, militante des droits civiques.'],
    ['marte', 'Qu’a trouvé Phoenix dans l’Arctique martien ?', 'De la glace d’eau', ['Des fossiles', 'Un lac liquide', 'De l’or'],
      'En grattant le sol, de la glace est apparue, puis elle s’est évaporée. Il emporte aussi un DVD avec des romans et de l’art sur Mars.'],
    ['marte', 'Que mesurait InSight sur Mars ?', 'Les séismes martiens', ['La température du Soleil', 'La vitesse des rovers', 'Les signaux radio de la Terre'],
      'Il a détecté 1 319 séismes martiens, le plus fort de magnitude 4,7, pour comprendre l’intérieur de la planète.'],
    ['marte', 'Combien de tubes d’échantillons Perseverance a-t-il laissés au dépôt Three Forks ?', '10', ['2', '43', '100'],
      'Ils sont disposés en zigzag dans le cratère Jezero, en attendant qu’une future mission les ramène sur Terre.'],
    ['marte', 'À quelle question MAVEN essayait-il de répondre ?', 'Où est passé l’air de Mars ?', ['Y a-t-il de la vie sur Mars ?', 'Combien pèse Mars ?', 'Pourquoi Mars est-elle rouge ?'],
      'Il a étudié la haute atmosphère pendant 11 ans et montré comment le vent solaire a arraché une grande partie de l’air de la planète.'],
    ['marte', 'Quel vaisseau a pris les premières photos en couleur depuis la surface de Mars ?', 'Viking 1', ['Sojourner', 'Spirit', 'Mars Pathfinder'],
      'Il s’est posé à Chryse Planitia en 1976 et a fonctionné plus de 6 ans.'],
    ['espacio', 'Qu’emportent les sondes Voyager à bord ?', 'Un disque d’or avec des sons et des salutations de la Terre', ['Un drapeau géant', 'Un télescope de rechange', 'Des échantillons de sol lunaire'],
      'Il contient des salutations en 55 langues, de la musique et des sons comme la pluie ou les battements d’un cœur.'],
    ['espacio', 'Quel est le seul vaisseau à avoir visité Uranus et Neptune ?', 'Voyager 2', ['Voyager 1', 'Pioneer 10', 'New Horizons'],
      'Voyager 2 a visité quatre planètes et est entré dans l’espace interstellaire en 2018.'],
    ['espacio', 'Comment s’appelle la célèbre photo de la Terre prise par Voyager 1 en 1990 ?', 'Le point bleu pâle', ['La bille bleue', 'Le lever de Terre', 'L’œil de l’univers'],
      'À 6 milliards de km, la Terre ressemble à un minuscule point dans un rayon de lumière.'],
    ['espacio', 'Quelle a été la première réussite de Pioneer 10 ?', 'Traverser la ceinture d’astéroïdes', ['Se poser sur Jupiter', 'Atteindre Pluton', 'Faire le tour du Soleil'],
      'Il a visité Jupiter en 1973 et a continué vers l’étoile Aldébaran, dont il s’approchera dans environ deux millions d’années.'],
    ['espacio', 'Quelle planète naine New Horizons a-t-il visitée en 2015 ?', 'Pluton', ['Cérès', 'Éris', 'Makémaké'],
      'Ensuite, il a continué jusqu’à Arrokoth en 2019. Il emporte des cendres de Clyde Tombaugh, qui a découvert Pluton.'],
    ['espacio', 'Combien de ses 10 instruments Voyager 1 garde-t-il allumés ?', '2', ['10', '5', 'Aucun'],
      'Son énergie s’épuise peu à peu : l’équipe éteint des instruments pour que le vaisseau dure plus longtemps.'],
  ];

  const I = window.I18N || { lang: 'es', t: (k) => k };
  const _t = (k, v) => I.t(k, v);
  const BANK = { es: BANK_ES, en: BANK_EN, fr: BANK_FR }[I.lang] || BANK_ES;
  // Cambiar de idioma reinicia la partida en el nuevo idioma
  addEventListener('langchange', () => location.reload());

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
      <p class="q-meta">${esc(_t('w.' + q.where))}</p>
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
      <p class="q-feedback"><b>${ok ? _t('q.right') : esc(_t('q.was', { a: q.right }))}</b> ${esc(q.why)}</p>
      <div class="q-next"><button type="button" class="btn" id="next">${last ? _t('q.see') : _t('q.next')}</button></div>`;
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
    const msg = _t(score === ROUND ? 'q.m10' : score >= 8 ? 'q.m8' : score >= 5 ? 'q.m5' : 'q.m0');
    card.innerHTML = `
      <div class="q-result">
        <div class="q-progress"><span style="width:100%"></span></div>
        <p class="q-meta">${_t('q.result')}</p>
        <p class="big">${score}/${ROUND}</p>
        <p>${msg} ${_t(best === 1 ? 'q.best1' : 'q.bestN', { n: best })}</p>
        <div class="ws-actions">
          <button type="button" class="btn" id="again">${_t('g.again')}</button>
          <a class="btn btn-ghost" style="color:var(--ink);border-color:rgba(43,34,25,.25)" href="../">${_t('g.lib')}</a>
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
