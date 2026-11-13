/* Idioma del sitio (español / inglés).
   - El idioma se elige con el selector ES/EN, con ?lang=en o ?lang=es en la URL,
     y se recuerda en este navegador.
   - En el HTML, cada texto en español lleva su versión en inglés en atributos:
       data-en="…"              reemplaza el texto
       data-en-html="…"         reemplaza el contenido (permite etiquetas)
       data-en-placeholder="…"  data-en-aria-label="…"  data-en-content="…"  data-en-title="…"
   - En JavaScript: I18N.tr('texto en español', 'English text'). */
(() => {
  'use strict';
  const KEY = 'apno-lang';
  const ok = (l) => l === 'es' || l === 'en';
  let lang = 'es';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (ok(q)) { lang = q; localStorage.setItem(KEY, q); }
    else { const s = localStorage.getItem(KEY); if (ok(s)) lang = s; }
  } catch (e) { /* sin almacenamiento: se queda en español */ }
  document.documentElement.lang = lang;

  const tr = (es, en) => (lang === 'en' ? en : es);
  const ATTRS = ['placeholder', 'aria-label', 'content', 'title'];

  function apply(root = document) {
    if (lang !== 'en') return;
    root.querySelectorAll('[data-en]').forEach((el) => { el.textContent = el.dataset.en; });
    root.querySelectorAll('[data-en-html]').forEach((el) => { el.innerHTML = el.dataset.enHtml; });
    for (const a of ATTRS) root.querySelectorAll(`[data-en-${a}]`).forEach((el) => el.setAttribute(a, el.getAttribute(`data-en-${a}`)));
  }

  function set(l) {
    if (!ok(l) || l === lang) return;
    try { localStorage.setItem(KEY, l); } catch (e) { /* ignora */ }
    const url = new URL(location.href);
    url.searchParams.set('lang', l); // también funciona sin almacenamiento
    location.replace(url.toString());
  }

  // Selector: cualquier elemento con [data-lang-switch] recibe dos botones ES | EN
  function switches() {
    document.querySelectorAll('[data-lang-switch]').forEach((box) => {
      box.classList.add('lang-switch');
      box.setAttribute('role', 'group');
      box.setAttribute('aria-label', tr('Idioma', 'Language'));
      box.innerHTML = [['es', 'ES', 'Español'], ['en', 'EN', 'English']]
        .map(([l, short, long]) => `<button type="button" data-lang="${l}" aria-pressed="${l === lang}" lang="${l}" title="${long}">${short}</button>`).join('');
      box.addEventListener('click', (e) => { const b = e.target.closest('[data-lang]'); if (b) set(b.dataset.lang); });
    });
  }

  function init() { apply(); switches(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.I18N = { lang, tr, apply, set };
})();
