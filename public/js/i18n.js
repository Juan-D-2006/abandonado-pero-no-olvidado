/* Idiomas: español (original), inglés y francés.
   - Botón ES · EN · FR en todas las páginas (biblioteca y sala de juegos).
   - Textos fijos del HTML: atributos data-i18n, data-i18n-html, data-i18n-ph, data-i18n-aria.
   - Textos de los libros y escenas: js/i18n-books-en.js y js/i18n-books-fr.js.
   - El idioma elegido se recuerda en este navegador. */
(() => {
  'use strict';
  const LANGS = ['es', 'en', 'fr'];

  const UI = {
    es: {
      'lang.aria': 'Idioma',
      'doc.title': 'Abandonado pero no olvidado',
      'h1': 'Abandonado<br><em>pero no olvidado</em>',
      'lede': 'La biblioteca de las máquinas que la NASA dejó en la Luna, en Marte y camino a las estrellas. Elige un lomo para sacar el libro del estante. Los libros marcados con <strong class="mark-3d">3D</strong> traen una escena animada que cuenta su historia.',
      'games.btn': 'Sala de juegos: sopa de letras, quiz y 3D',
      'shelf.aria': 'Estante',
      'filter.todo': 'Todo', 'filter.luna': 'Luna', 'filter.marte': 'Marte', 'filter.espacio': 'Espacio profundo',
      'search.label': 'Buscar un objeto', 'search.ph': 'Buscar: rover, Voyager, hielo…',
      'legend.aria': 'Filtrar por estado', 'legend.3d': 'Con escena 3D',
      'loading': 'Desempolvando los estantes…',
      'sug.title': '¿Falta un libro?',
      'sug.text': 'Hay más de 100 objetos de la NASA repartidos por el sistema solar. Propón uno y lo revisaremos para el próximo estante.',
      'sug.obj': 'Objeto o misión', 'sug.obj.ph': 'Ej.: Lunar Prospector',
      'sug.where': '¿Dónde está?',
      'sug.why': '¿Por qué merece un libro?', 'sug.why.ph': 'Cuéntanos qué hizo y qué descubrió',
      'sug.name': 'Tu nombre', 'sug.opt': '(opcional)', 'sug.name.ph': 'Ej.: 5.º B',
      'sug.send': 'Enviar sugerencia', 'sug.sending': 'Enviando…',
      'sug.short': 'Escribe el nombre del objeto o de la misión (al menos 2 letras).',
      'sug.demo': 'Modo demostración: conecta Supabase (ver README) para guardar sugerencias.',
      'sug.fail': 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.',
      'sug.ok': '¡Gracias! «{obj}» quedó anotado en el libro de sugerencias.',
      'foot.data': 'Datos:',
      'foot.texts': ' · Textos basados en archivos públicos de la NASA (enlaces dentro de cada libro).',
      'foot.2': 'Proyecto escolar inspirado en el reto «Abandonado pero no olvidado» del NASA Space Apps Challenge 2026. No es un sitio oficial de la NASA.',
      'src.supabase': 'Supabase (en vivo)', 'src.fallback': 'copia local (Supabase no respondió)', 'src.demo': 'copia local (modo demostración)',
      'reader.aria': 'Libro abierto', 'reader.close': 'Devolver al estante',
      'dio.aria': 'Escena animada en 3D que cuenta la historia del objeto',
      'dio.load': 'Preparando la escena…', 'dio.err': 'No se pudo cargar la escena 3D. El libro sigue disponible.', 'dio.hint': 'Arrastra para girar la vista',
      'nav.prev': 'Página anterior', 'nav.next': 'Página siguiente',
      'shelf.vol': 'volúmenes', 'shelf.suggest': 'Propón un libro',
      'empty.q': 'Ningún libro coincide con «{q}». Prueba con otra palabra o quita los filtros.',
      'empty.f': 'No hay libros con esos filtros. Quita alguno para ver más.',
      'loc.luna': 'La Luna', 'loc.luna.note': 'A 384.000 km de casa',
      'loc.marte': 'Marte', 'loc.marte.note': 'Entre 55 y 400 millones de km',
      'loc.espacio': 'Espacio profundo', 'loc.espacio.note': 'Más allá de los planetas',
      'st.activo': 'Sigue funcionando', 'st.activo.t': 'Esta máquina todavía trabaja y envía datos o presta servicio.',
      'st.parcial': 'Funciona a medias', 'st.parcial.t': 'Sigue viva, pero con menos energía o menos instrumentos que al inicio.',
      'st.espera': 'Esperando regreso', 'st.espera.t': 'Fue dejada a propósito, guardada para una misión futura.',
      'st.inactivo': 'En reposo', 'st.inactivo.t': 'Terminó su trabajo y descansa donde la dejaron.',
      'st.perdido': 'Señal perdida', 'st.perdido.t': 'Dejó de responder y la NASA dio por terminada su misión.',
      'st.impacto': 'Impacto planeado', 'st.impacto.t': 'Terminó su misión chocando a propósito para obtener datos.',
      'k.rover': 'Rover', 'k.lander': 'Módulo de aterrizaje', 'k.orbiter': 'Orbitador', 'k.probe': 'Sonda', 'k.reflector': 'Experimento pasivo',
      'k.instrument': 'Estación científica', 'k.impactor': 'Impactador', 'k.helicopter': 'Helicóptero', 'k.depot': 'Depósito de muestras',
      'p.card': 'Ficha del objeto', 'f.type': 'Tipo', 'f.mission': 'Misión', 'f.place': 'Lugar', 'f.arrived': 'Llegó', 'f.ended': 'Último registro',
      'p.story': 'La historia', 'p.science': 'La ciencia que hizo posible', 'p.today': '¿Cómo está hoy?', 'p.fun': 'Dato curioso', 'p.more': 'Para seguir leyendo',
      'p.hint': 'Todos los enlaces llevan a archivos públicos de la NASA o de instituciones científicas.',
      'p.back': 'Biblioteca de objetos<br>abandonados pero no olvidados',
      'pn': ['Portada', 'Ficha', 'La historia', 'La ciencia', '¿Cómo está hoy?', 'Dato curioso', 'Para seguir leyendo', 'Contraportada'],

      // Sala de juegos
      'g.doc': 'Sala de juegos', 'g.back': 'Volver a la biblioteca', 'g.title': 'Sala de <em>juegos</em>',
      'g.lede': 'Después de leer los libros del estante, pon a prueba lo que aprendiste. Tres juegos sobre las máquinas que la NASA dejó en la Luna, en Marte y en el espacio profundo.',
      'g.ws.k': 'Palabras', 'g.ws.h': 'Sopa de letras espacial', 'g.ws.p': 'Busca los nombres de rovers, sondas y módulos escondidos entre las letras. Cada palabra trae un dato curioso.',
      'g.qz.k': 'Preguntas', 'g.qz.h': 'Quiz de la biblioteca', 'g.qz.p': 'Diez preguntas al azar sobre la Luna, Marte y el espacio profundo, con la explicación de cada respuesta.',
      'g.ex.k': 'Juego 3D', 'g.ex.h': 'Expedición lunar', 'g.ex.p': 'Conduce un rover por la superficie de la Luna y visita cinco objetos de las misiones Apollo y Surveyor antes de quedarte sin batería.',
      'g.play': 'Jugar', 'g.again': 'Jugar otra vez', 'g.lib': 'Ir a la biblioteca', 'g.time': 'Tiempo',
      'w.luna': 'Luna', 'w.marte': 'Marte', 'w.espacio': 'Espacio profundo',

      // Quiz
      'q.title': 'Quiz de la <em>biblioteca</em>',
      'q.lede': 'Diez preguntas al azar sobre los libros del estante. Responde con un clic o con las teclas 1 a 4. Después de cada respuesta te contamos el dato completo.',
      'q.num': 'Pregunta', 'q.score': 'Aciertos', 'q.streak': 'Racha',
      'q.right': '¡Correcto!', 'q.was': 'La respuesta era: {a}.', 'q.next': 'Siguiente pregunta', 'q.see': 'Ver resultado', 'q.result': 'Resultado',
      'q.m10': '¡Perfecto! Eres el bibliotecario jefe del sistema solar.',
      'q.m8': 'Excelente. Conoces muy bien los estantes de la biblioteca.',
      'q.m5': 'Buen viaje. Vuelve a leer algunos libros y lo harás aún mejor.',
      'q.m0': 'Toda exploración empieza así. Abre los libros de la biblioteca y vuelve a intentarlo.',
      'q.best1': 'Tu mejor racha fue de {n} acierto seguido.', 'q.bestN': 'Tu mejor racha fue de {n} aciertos seguidos.',

      // Sopa de letras
      'ws.doc': 'Sopa de letras espacial', 'ws.title': 'Sopa de letras <em>espacial</em>',
      'ws.lede': 'Escondimos aquí los nombres de naves, rovers y sondas de la biblioteca. Arrastra el dedo o el ratón sobre las letras, en línea recta, en cualquier dirección. Cada palabra que encuentres abre una ficha con su historia.',
      'ws.found': 'Encontradas', 'ws.hint': 'Pista', 'ws.new': 'Nueva sopa', 'ws.grid': 'Sopa de letras', 'ws.words': 'Palabras por encontrar',
      'ws.ready': '¿Listo?', 'ws.readyp': 'Encuentra la primera palabra para leer su ficha.',
      'ws.done': '¡Sopa completa!', 'ws.donep': 'Encontraste las {n} palabras en {t}. Pulsa «Nueva sopa» para otra ronda con palabras distintas.',

      // Expedición 3D
      'ex.doc': 'Expedición lunar 3D', 'ex.back': 'Juegos', 'ex.canvas': 'Superficie lunar en 3D con tu rover',
      'ex.bat': 'Batería', 'ex.sites': 'Sitios',
      'ex.intro': 'Eres el conductor de un pequeño rover explorador. Recorre la superficie de la Luna y visita los cinco objetos que dejaron las misiones de la NASA. La batería se gasta al avanzar: recoge las celdas solares doradas para recargarla.',
      'ex.fwd': 'Avanzar', 'ex.rev': 'Frenar y retroceder', 'ex.turn': 'Girar', 'ex.space': 'Espacio', 'ex.boost': 'Impulso (gasta más batería)',
      'ex.arrow': 'En la parte superior, la flecha te señala el sitio más cercano que aún no visitaste. En pantallas táctiles usa los botones de abajo.',
      'ex.start': 'Comenzar la expedición',
      'ex.err': 'No se pudo cargar el motor 3D. Revisa tu conexión a internet y recarga la página.',
      'ex.go': '¡En marcha!', 'ex.gop': 'Sigue la flecha dorada hasta la primera señal. Los haces de luz marcan los sitios por visitar.',
      'ex.won.k': 'Expedición completa', 'ex.won.t': '¡Misión cumplida!',
      'ex.won.p': 'Visitaste los {n} sitios en {t} y regresaste con {b}% de batería. Como los objetos de Apollo, tu rover se queda aquí, abandonado pero no olvidado.',
      'ex.lost.k': 'Batería agotada', 'ex.lost.t': 'El rover se detuvo',
      'ex.lost.p': 'Llegaste a {v} de {n} sitios. Recoge más celdas solares en el camino y planea la ruta más corta entre los faros.',
      'ex.cell': 'Celda solar', 'ex.cellp': '+20% de batería.',
    },

    en: {
      'lang.aria': 'Language',
      'doc.title': 'Abandoned but not forgotten',
      'h1': 'Abandoned<br><em>but not forgotten</em>',
      'lede': 'The library of the machines NASA left on the Moon, on Mars and on the way to the stars. Pick a spine to pull the book off the shelf. Books marked <strong class="mark-3d">3D</strong> come with an animated scene that tells their story.',
      'games.btn': 'Game room: word search, quiz and 3D',
      'shelf.aria': 'Shelf',
      'filter.todo': 'All', 'filter.luna': 'Moon', 'filter.marte': 'Mars', 'filter.espacio': 'Deep space',
      'search.label': 'Search for an object', 'search.ph': 'Search: rover, Voyager, ice…',
      'legend.aria': 'Filter by status', 'legend.3d': 'With 3D scene',
      'loading': 'Dusting off the shelves…',
      'sug.title': 'Is a book missing?',
      'sug.text': 'There are more than 100 NASA objects scattered across the solar system. Suggest one and we will consider it for the next shelf.',
      'sug.obj': 'Object or mission', 'sug.obj.ph': 'E.g. Lunar Prospector',
      'sug.where': 'Where is it?',
      'sug.why': 'Why does it deserve a book?', 'sug.why.ph': 'Tell us what it did and what it discovered',
      'sug.name': 'Your name', 'sug.opt': '(optional)', 'sug.name.ph': 'E.g. Class 5B',
      'sug.send': 'Send suggestion', 'sug.sending': 'Sending…',
      'sug.short': 'Type the name of the object or mission (at least 2 letters).',
      'sug.demo': 'Demo mode: connect Supabase (see README) to save suggestions.',
      'sug.fail': 'It could not be saved. Check your connection and try again.',
      'sug.ok': 'Thank you! “{obj}” has been written in the suggestion book.',
      'foot.data': 'Data:',
      'foot.texts': ' · Texts based on public NASA archives (links inside each book).',
      'foot.2': 'School project inspired by the “Abandoned but not forgotten” challenge of the NASA Space Apps Challenge 2026. This is not an official NASA website.',
      'src.supabase': 'Supabase (live)', 'src.fallback': 'local copy (Supabase did not respond)', 'src.demo': 'local copy (demo mode)',
      'reader.aria': 'Open book', 'reader.close': 'Put back on the shelf',
      'dio.aria': 'Animated 3D scene that tells the object’s story',
      'dio.load': 'Preparing the scene…', 'dio.err': 'The 3D scene could not be loaded. The book is still available.', 'dio.hint': 'Drag to rotate the view',
      'nav.prev': 'Previous page', 'nav.next': 'Next page',
      'shelf.vol': 'volumes', 'shelf.suggest': 'Suggest a book',
      'empty.q': 'No book matches “{q}”. Try another word or clear the filters.',
      'empty.f': 'No books match those filters. Remove one to see more.',
      'loc.luna': 'The Moon', 'loc.luna.note': '384,000 km from home',
      'loc.marte': 'Mars', 'loc.marte.note': 'Between 55 and 400 million km away',
      'loc.espacio': 'Deep space', 'loc.espacio.note': 'Beyond the planets',
      'st.activo': 'Still working', 'st.activo.t': 'This machine is still working and sends data or provides a service.',
      'st.parcial': 'Partly working', 'st.parcial.t': 'Still alive, but with less power or fewer instruments than at the start.',
      'st.espera': 'Waiting for pickup', 'st.espera.t': 'It was left on purpose, stored for a future mission.',
      'st.inactivo': 'At rest', 'st.inactivo.t': 'It finished its work and rests where it was left.',
      'st.perdido': 'Signal lost', 'st.perdido.t': 'It stopped responding and NASA ended its mission.',
      'st.impacto': 'Planned impact', 'st.impacto.t': 'It ended its mission by crashing on purpose to collect data.',
      'k.rover': 'Rover', 'k.lander': 'Lander', 'k.orbiter': 'Orbiter', 'k.probe': 'Probe', 'k.reflector': 'Passive experiment',
      'k.instrument': 'Science station', 'k.impactor': 'Impactor', 'k.helicopter': 'Helicopter', 'k.depot': 'Sample depot',
      'p.card': 'Object file', 'f.type': 'Type', 'f.mission': 'Mission', 'f.place': 'Location', 'f.arrived': 'Arrived', 'f.ended': 'Last record',
      'p.story': 'The story', 'p.science': 'The science it made possible', 'p.today': 'How is it today?', 'p.fun': 'Fun fact', 'p.more': 'Further reading',
      'p.hint': 'All links lead to public archives from NASA or scientific institutions.',
      'p.back': 'Library of objects<br>abandoned but not forgotten',
      'pn': ['Cover', 'File', 'The story', 'The science', 'How is it today?', 'Fun fact', 'Further reading', 'Back cover'],

      'g.doc': 'Game room', 'g.back': 'Back to the library', 'g.title': 'Game <em>room</em>',
      'g.lede': 'After reading the books on the shelf, put what you learned to the test. Three games about the machines NASA left on the Moon, on Mars and in deep space.',
      'g.ws.k': 'Words', 'g.ws.h': 'Space word search', 'g.ws.p': 'Find the names of rovers, probes and modules hidden among the letters. Each word comes with a fun fact.',
      'g.qz.k': 'Questions', 'g.qz.h': 'Library quiz', 'g.qz.p': 'Ten random questions about the Moon, Mars and deep space, with an explanation for each answer.',
      'g.ex.k': '3D game', 'g.ex.h': 'Moon expedition', 'g.ex.p': 'Drive a rover across the surface of the Moon and visit five objects from the Apollo and Surveyor missions before your battery runs out.',
      'g.play': 'Play', 'g.again': 'Play again', 'g.lib': 'Go to the library', 'g.time': 'Time',
      'w.luna': 'Moon', 'w.marte': 'Mars', 'w.espacio': 'Deep space',

      'q.title': 'Library <em>quiz</em>',
      'q.lede': 'Ten random questions about the books on the shelf. Answer with a click or with keys 1 to 4. After each answer we tell you the full story.',
      'q.num': 'Question', 'q.score': 'Correct', 'q.streak': 'Streak',
      'q.right': 'Correct!', 'q.was': 'The answer was: {a}.', 'q.next': 'Next question', 'q.see': 'See result', 'q.result': 'Result',
      'q.m10': 'Perfect! You are the head librarian of the solar system.',
      'q.m8': 'Excellent. You know the library shelves very well.',
      'q.m5': 'Good trip. Read a few books again and you will do even better.',
      'q.m0': 'Every exploration starts like this. Open the library books and try again.',
      'q.best1': 'Your best streak was {n} correct answer.', 'q.bestN': 'Your best streak was {n} correct answers in a row.',

      'ws.doc': 'Space word search', 'ws.title': 'Space <em>word search</em>',
      'ws.lede': 'We hid the names of spacecraft, rovers and probes from the library here. Drag your finger or mouse over the letters, in a straight line, in any direction. Each word you find opens a card with its story.',
      'ws.found': 'Found', 'ws.hint': 'Hint', 'ws.new': 'New puzzle', 'ws.grid': 'Word search', 'ws.words': 'Words to find',
      'ws.ready': 'Ready?', 'ws.readyp': 'Find the first word to read its card.',
      'ws.done': 'Puzzle complete!', 'ws.donep': 'You found all {n} words in {t}. Press “New puzzle” for another round with different words.',

      'ex.doc': '3D Moon expedition', 'ex.back': 'Games', 'ex.canvas': '3D lunar surface with your rover',
      'ex.bat': 'Battery', 'ex.sites': 'Sites',
      'ex.intro': 'You are the driver of a small explorer rover. Travel across the surface of the Moon and visit the five objects left by NASA missions. The battery runs down as you drive: pick up the golden solar cells to recharge it.',
      'ex.fwd': 'Forward', 'ex.rev': 'Brake and reverse', 'ex.turn': 'Turn', 'ex.space': 'Space', 'ex.boost': 'Boost (uses more battery)',
      'ex.arrow': 'At the top, the arrow points to the nearest site you have not visited yet. On touch screens, use the buttons below.',
      'ex.start': 'Start the expedition',
      'ex.err': 'The 3D engine could not be loaded. Check your internet connection and reload the page.',
      'ex.go': 'Let’s go!', 'ex.gop': 'Follow the golden arrow to the first beacon. The beams of light mark the sites to visit.',
      'ex.won.k': 'Expedition complete', 'ex.won.t': 'Mission accomplished!',
      'ex.won.p': 'You visited all {n} sites in {t} and came back with {b}% battery. Like the Apollo objects, your rover stays here, abandoned but not forgotten.',
      'ex.lost.k': 'Battery empty', 'ex.lost.t': 'The rover stopped',
      'ex.lost.p': 'You reached {v} of {n} sites. Pick up more solar cells on the way and plan the shortest route between the beacons.',
      'ex.cell': 'Solar cell', 'ex.cellp': '+20% battery.',
    },

    fr: {
      'lang.aria': 'Langue',
      'doc.title': 'Abandonné mais pas oublié',
      'h1': 'Abandonné<br><em>mais pas oublié</em>',
      'lede': 'La bibliothèque des machines que la NASA a laissées sur la Lune, sur Mars et en route vers les étoiles. Choisis un dos de livre pour le sortir de l’étagère. Les livres marqués <strong class="mark-3d">3D</strong> contiennent une scène animée qui raconte leur histoire.',
      'games.btn': 'Salle de jeux : mots mêlés, quiz et 3D',
      'shelf.aria': 'Étagère',
      'filter.todo': 'Tout', 'filter.luna': 'Lune', 'filter.marte': 'Mars', 'filter.espacio': 'Espace lointain',
      'search.label': 'Chercher un objet', 'search.ph': 'Chercher : rover, Voyager, glace…',
      'legend.aria': 'Filtrer par état', 'legend.3d': 'Avec scène 3D',
      'loading': 'On dépoussière les étagères…',
      'sug.title': 'Il manque un livre ?',
      'sug.text': 'Plus de 100 objets de la NASA sont répartis dans le système solaire. Propose-en un et nous l’étudierons pour la prochaine étagère.',
      'sug.obj': 'Objet ou mission', 'sug.obj.ph': 'Ex. : Lunar Prospector',
      'sug.where': 'Où se trouve-t-il ?',
      'sug.why': 'Pourquoi mérite-t-il un livre ?', 'sug.why.ph': 'Raconte-nous ce qu’il a fait et découvert',
      'sug.name': 'Ton nom', 'sug.opt': '(facultatif)', 'sug.name.ph': 'Ex. : CM2 B',
      'sug.send': 'Envoyer la suggestion', 'sug.sending': 'Envoi…',
      'sug.short': 'Écris le nom de l’objet ou de la mission (au moins 2 lettres).',
      'sug.demo': 'Mode démonstration : connecte Supabase (voir README) pour enregistrer les suggestions.',
      'sug.fail': 'Impossible d’enregistrer. Vérifie ta connexion et réessaie.',
      'sug.ok': 'Merci ! « {obj} » a été noté dans le livre des suggestions.',
      'foot.data': 'Données :',
      'foot.texts': ' · Textes basés sur des archives publiques de la NASA (liens dans chaque livre).',
      'foot.2': 'Projet scolaire inspiré du défi « Abandonné mais pas oublié » du NASA Space Apps Challenge 2026. Ce n’est pas un site officiel de la NASA.',
      'src.supabase': 'Supabase (en direct)', 'src.fallback': 'copie locale (Supabase n’a pas répondu)', 'src.demo': 'copie locale (mode démonstration)',
      'reader.aria': 'Livre ouvert', 'reader.close': 'Remettre sur l’étagère',
      'dio.aria': 'Scène animée en 3D qui raconte l’histoire de l’objet',
      'dio.load': 'Préparation de la scène…', 'dio.err': 'Impossible de charger la scène 3D. Le livre reste disponible.', 'dio.hint': 'Fais glisser pour tourner la vue',
      'nav.prev': 'Page précédente', 'nav.next': 'Page suivante',
      'shelf.vol': 'volumes', 'shelf.suggest': 'Propose un livre',
      'empty.q': 'Aucun livre ne correspond à « {q} ». Essaie un autre mot ou retire les filtres.',
      'empty.f': 'Aucun livre avec ces filtres. Retires-en un pour en voir plus.',
      'loc.luna': 'La Lune', 'loc.luna.note': 'À 384 000 km de chez nous',
      'loc.marte': 'Mars', 'loc.marte.note': 'Entre 55 et 400 millions de km',
      'loc.espacio': 'Espace lointain', 'loc.espacio.note': 'Au-delà des planètes',
      'st.activo': 'Fonctionne encore', 'st.activo.t': 'Cette machine travaille encore et envoie des données ou rend service.',
      'st.parcial': 'Fonctionne à moitié', 'st.parcial.t': 'Toujours en vie, mais avec moins d’énergie ou moins d’instruments qu’au début.',
      'st.espera': 'En attente de retour', 'st.espera.t': 'Laissé exprès, mis de côté pour une future mission.',
      'st.inactivo': 'Au repos', 'st.inactivo.t': 'Il a terminé son travail et repose là où on l’a laissé.',
      'st.perdido': 'Signal perdu', 'st.perdido.t': 'Il a cessé de répondre et la NASA a mis fin à sa mission.',
      'st.impacto': 'Impact prévu', 'st.impacto.t': 'Il a terminé sa mission en s’écrasant exprès pour recueillir des données.',
      'k.rover': 'Rover', 'k.lander': 'Atterrisseur', 'k.orbiter': 'Orbiteur', 'k.probe': 'Sonde', 'k.reflector': 'Expérience passive',
      'k.instrument': 'Station scientifique', 'k.impactor': 'Impacteur', 'k.helicopter': 'Hélicoptère', 'k.depot': 'Dépôt d’échantillons',
      'p.card': 'Fiche de l’objet', 'f.type': 'Type', 'f.mission': 'Mission', 'f.place': 'Lieu', 'f.arrived': 'Arrivée', 'f.ended': 'Dernier contact',
      'p.story': 'L’histoire', 'p.science': 'La science qu’il a rendue possible', 'p.today': 'Comment va-t-il aujourd’hui ?', 'p.fun': 'Le savais-tu ?', 'p.more': 'Pour aller plus loin',
      'p.hint': 'Tous les liens mènent à des archives publiques de la NASA ou d’institutions scientifiques.',
      'p.back': 'Bibliothèque des objets<br>abandonnés mais pas oubliés',
      'pn': ['Couverture', 'Fiche', 'L’histoire', 'La science', 'Aujourd’hui', 'Le savais-tu ?', 'Pour aller plus loin', 'Quatrième de couverture'],

      'g.doc': 'Salle de jeux', 'g.back': 'Retour à la bibliothèque', 'g.title': 'Salle de <em>jeux</em>',
      'g.lede': 'Après avoir lu les livres de l’étagère, teste ce que tu as appris. Trois jeux sur les machines que la NASA a laissées sur la Lune, sur Mars et dans l’espace lointain.',
      'g.ws.k': 'Mots', 'g.ws.h': 'Mots mêlés de l’espace', 'g.ws.p': 'Cherche les noms de rovers, de sondes et de modules cachés parmi les lettres. Chaque mot apporte une anecdote.',
      'g.qz.k': 'Questions', 'g.qz.h': 'Quiz de la bibliothèque', 'g.qz.p': 'Dix questions au hasard sur la Lune, Mars et l’espace lointain, avec l’explication de chaque réponse.',
      'g.ex.k': 'Jeu 3D', 'g.ex.h': 'Expédition lunaire', 'g.ex.p': 'Conduis un rover à la surface de la Lune et visite cinq objets des missions Apollo et Surveyor avant que ta batterie soit vide.',
      'g.play': 'Jouer', 'g.again': 'Rejouer', 'g.lib': 'Aller à la bibliothèque', 'g.time': 'Temps',
      'w.luna': 'Lune', 'w.marte': 'Mars', 'w.espacio': 'Espace lointain',

      'q.title': 'Quiz de la <em>bibliothèque</em>',
      'q.lede': 'Dix questions au hasard sur les livres de l’étagère. Réponds d’un clic ou avec les touches 1 à 4. Après chaque réponse, on te raconte l’anecdote complète.',
      'q.num': 'Question', 'q.score': 'Bonnes réponses', 'q.streak': 'Série',
      'q.right': 'Bravo !', 'q.was': 'La réponse était : {a}.', 'q.next': 'Question suivante', 'q.see': 'Voir le résultat', 'q.result': 'Résultat',
      'q.m10': 'Parfait ! Tu es le bibliothécaire en chef du système solaire.',
      'q.m8': 'Excellent. Tu connais très bien les étagères de la bibliothèque.',
      'q.m5': 'Bon voyage. Relis quelques livres et tu feras encore mieux.',
      'q.m0': 'Toute exploration commence ainsi. Ouvre les livres de la bibliothèque et réessaie.',
      'q.best1': 'Ta meilleure série : {n} bonne réponse.', 'q.bestN': 'Ta meilleure série : {n} bonnes réponses d’affilée.',

      'ws.doc': 'Mots mêlés de l’espace', 'ws.title': 'Mots mêlés <em>de l’espace</em>',
      'ws.lede': 'Nous avons caché ici les noms de vaisseaux, de rovers et de sondes de la bibliothèque. Fais glisser ton doigt ou ta souris sur les lettres, en ligne droite, dans n’importe quelle direction. Chaque mot trouvé ouvre une fiche avec son histoire.',
      'ws.found': 'Trouvés', 'ws.hint': 'Indice', 'ws.new': 'Nouvelle grille', 'ws.grid': 'Mots mêlés', 'ws.words': 'Mots à trouver',
      'ws.ready': 'Prêt ?', 'ws.readyp': 'Trouve le premier mot pour lire sa fiche.',
      'ws.done': 'Grille terminée !', 'ws.donep': 'Tu as trouvé les {n} mots en {t}. Appuie sur « Nouvelle grille » pour une autre partie avec des mots différents.',

      'ex.doc': 'Expédition lunaire 3D', 'ex.back': 'Jeux', 'ex.canvas': 'Surface lunaire en 3D avec ton rover',
      'ex.bat': 'Batterie', 'ex.sites': 'Sites',
      'ex.intro': 'Tu conduis un petit rover explorateur. Parcours la surface de la Lune et visite les cinq objets laissés par les missions de la NASA. La batterie se vide quand tu avances : ramasse les cellules solaires dorées pour la recharger.',
      'ex.fwd': 'Avancer', 'ex.rev': 'Freiner et reculer', 'ex.turn': 'Tourner', 'ex.space': 'Espace', 'ex.boost': 'Turbo (consomme plus de batterie)',
      'ex.arrow': 'En haut, la flèche t’indique le site le plus proche que tu n’as pas encore visité. Sur écran tactile, utilise les boutons en bas.',
      'ex.start': 'Commencer l’expédition',
      'ex.err': 'Impossible de charger le moteur 3D. Vérifie ta connexion Internet et recharge la page.',
      'ex.go': 'C’est parti !', 'ex.gop': 'Suis la flèche dorée jusqu’à la première balise. Les faisceaux de lumière marquent les sites à visiter.',
      'ex.won.k': 'Expédition terminée', 'ex.won.t': 'Mission accomplie !',
      'ex.won.p': 'Tu as visité les {n} sites en {t} et tu es revenu avec {b} % de batterie. Comme les objets d’Apollo, ton rover reste ici, abandonné mais pas oublié.',
      'ex.lost.k': 'Batterie vide', 'ex.lost.t': 'Le rover s’est arrêté',
      'ex.lost.p': 'Tu as atteint {v} sites sur {n}. Ramasse plus de cellules solaires en chemin et prévois le trajet le plus court entre les balises.',
      'ex.cell': 'Cellule solaire', 'ex.cellp': '+20 % de batterie.',
    },
  };

  let lang = 'es';
  try { const s = localStorage.getItem('lang'); if (LANGS.includes(s)) lang = s; } catch (e) { /* sin almacenamiento */ }

  function t(key, vars) {
    let s = (UI[lang] && UI[lang][key]) ?? UI.es[key] ?? key;
    if (vars && typeof s === 'string') s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return s;
  }
  // Elige la versión del idioma actual de un objeto {es, en, fr}
  const pick = (o) => (o && (o[lang] ?? o.es));

  function apply(root = document) {
    document.documentElement.lang = lang;
    const docKey = document.documentElement.dataset.i18nDoc;
    if (docKey) document.title = t(docKey);
    root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    root.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    root.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.querySelectorAll('.lang-switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    const sw = document.querySelector('.lang-switch'); if (sw) sw.setAttribute('aria-label', t('lang.aria'));
  }

  function setLang(l) {
    if (!LANGS.includes(l) || l === lang) return;
    lang = l;
    try { localStorage.setItem('lang', l); } catch (e) { /* sin almacenamiento */ }
    apply();
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  // ---------- botón ES · EN · FR ----------
  const css = `
  .lang-switch{position:fixed;top:14px;right:14px;z-index:60;display:inline-flex;gap:2px;padding:3px;border-radius:999px;
    background:rgba(15,18,25,.78);border:1px solid rgba(241,230,204,.22);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
    box-shadow:0 6px 18px rgba(0,0,0,.35);font:700 .8rem/1 'Atkinson Hyperlegible',system-ui,sans-serif;letter-spacing:.06em}
  .lang-switch button{appearance:none;border:0;margin:0;cursor:pointer;min-width:40px;min-height:32px;padding:0 10px;border-radius:999px;
    background:transparent;color:#c9bfae;font:inherit;letter-spacing:inherit;transition:background .2s,color .2s}
  .lang-switch button:hover{color:#f1e6cc;background:rgba(241,230,204,.1)}
  .lang-switch button[aria-pressed="true"]{background:#d9b25c;color:#1a140d}
  .lang-switch button:focus-visible{outline:2px solid #f0d28a;outline-offset:2px}
  .lang-switch.in-slot{position:static;box-shadow:none}
  html.reading .lang-switch{opacity:0;pointer-events:none}
  @media (max-width:560px){.lang-switch{top:10px;right:10px}.lang-switch button{min-width:36px;padding:0 8px}
    .lang-switch.in-slot{margin-left:auto;font-size:.72rem}.lang-switch.in-slot button{min-width:28px;min-height:28px;padding:0 5px}}`;

  function mount() {
    if (document.querySelector('.lang-switch')) return;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    const sw = document.createElement('div');
    sw.className = 'lang-switch'; sw.setAttribute('role', 'group');
    sw.innerHTML = LANGS.map((l) => `<button type="button" data-lang="${l}" lang="${l}" title="${{ es: 'Español', en: 'English', fr: 'Français' }[l]}">${l.toUpperCase()}</button>`).join('');
    sw.addEventListener('click', (e) => { const b = e.target.closest('[data-lang]'); if (b) setLang(b.dataset.lang); });
    const slot = document.querySelector('[data-lang-slot]');
    if (slot) { sw.classList.add('in-slot'); slot.appendChild(sw); } else document.body.appendChild(sw);
    apply();
  }

  window.I18N = { get lang() { return lang; }, LANGS, t, pick, apply, setLang };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
