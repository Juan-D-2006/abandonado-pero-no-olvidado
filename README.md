# Abandonado pero no olvidado 📚🚀

Biblioteca virtual del hardware que la NASA dejó en la **Luna**, en **Marte** y en el **espacio profundo**.
Cada objeto es un libro: lo eliges en el estante, sale volando, se abre y pasas sus páginas.

> Proyecto escolar basado en el reto *“Abandoned but not forgotten”* del NASA Space Apps Challenge 2026.

- **Frontend:** HTML + CSS + JavaScript puro (sin frameworks), animaciones 3D con CSS y Web Animations API.
- **Base de datos:** Supabase (PostgreSQL) — tablas `hardware` (los libros) y `sugerencias` (formulario).
- **Hosting:** Render (Static Site).
- **Modo demostración:** si no configuras Supabase, la app usa `public/js/data-local.js`, así que siempre funciona.

## Estructura

```
data/hardware.json        ← fuente única de los 20 libros (edita aquí)
scripts/build-data.mjs    ← genera supabase/seed.sql y public/js/data-local.js
scripts/build-config.mjs  ← Render lo ejecuta: crea public/js/config.js con tus claves
supabase/schema.sql       ← tablas, tipos y políticas RLS
supabase/seed.sql         ← INSERT de los 20 libros
public/                   ← el sitio (index.html, css/, js/)
render.yaml               ← blueprint de Render
```

## 1 · Supabase

1. Crea un proyecto en <https://supabase.com> (plan gratuito).
2. Ve a **SQL Editor → New query**, pega `supabase/schema.sql` y pulsa **Run**.
3. Nueva query: pega `supabase/seed.sql` y **Run**. En **Table Editor → hardware** verás los 20 libros.
4. En **Project Settings → API** copia la **Project URL** y la **anon public key**.

> La *anon key* es pública por diseño. La seguridad la dan las políticas RLS de `schema.sql`:
> todos pueden **leer** `hardware` y **enviar** sugerencias, pero nadie puede borrar ni editar.
> Las sugerencias recibidas se leen desde el panel de Supabase (Table Editor → sugerencias).

## 2 · Probar en tu computadora

```bash
# crea public/js/config.js con tus claves (o déjalo vacío para usar datos locales)
SUPABASE_URL=https://xxxx.supabase.co SUPABASE_ANON_KEY=eyJ... node scripts/build-config.mjs
npx serve public        # o: python -m http.server -d public 5173
```
En Windows (PowerShell): `$env:SUPABASE_URL="..."; $env:SUPABASE_ANON_KEY="..."; node scripts/build-config.mjs`

El pie de página indica la fuente: **“Supabase (en vivo)”** o **“copia local”**.

## 3 · Publicar en Render

1. Sube esta carpeta a un repositorio de GitHub.
2. En <https://render.com>: **New → Blueprint**, elige el repositorio (detecta `render.yaml`).
   *(O manualmente: New → Static Site · Build command `node scripts/build-config.mjs` · Publish directory `public`.)*
3. Rellena las variables `SUPABASE_URL` y `SUPABASE_ANON_KEY` → **Apply / Deploy**.
4. Render te da una URL `https://...onrender.com`. ¡Listo!

## Agregar o editar libros

Opción A (recomendada): edita `data/hardware.json`, ejecuta `npm run data` y vuelve a correr `supabase/seed.sql`
(usa `on conflict … do update`, así que no duplica).
Opción B: agrega filas directamente en el Table Editor de Supabase.

Campos: `slug, name, mission, location (luna|marte|espacio), kind (rover|lander|orbiter|probe|reflector|instrument|impactor|helicopter|depot), year, arrived, ended, status (activo|parcial|inactivo|impacto|espera|perdido), place, stats [[etiqueta, valor]×3], story, science, today, fun, sources [{title,url}]`.

## Las animaciones (para explicarlas en clase)

| Momento | Técnica |
|---|---|
| Libros que caen al estante al cargar | `@keyframes shelve` con retardo escalonado (máx. 0,5 s) |
| Sacar el libro | Un “libro 3D” (tapa, lomo, páginas, contratapa con `preserve-3d`) empieza girado 90° para que **su lomo coincida exactamente** con el lomo del estante; sale hacia ti (`translateZ`), gira y vuela al centro (Web Animations API) |
| Abrir y pasar hojas | Cada hoja es un `div` con cara frontal y trasera (`backface-visibility: hidden`) que gira `rotateY(-180deg)` sobre su borde izquierdo; una sombra recorre la hoja mientras gira |
| Devolver al estante | Se cierran todas las hojas en cascada y el libro hace el vuelo inverso hasta su hueco |
| Celular | Se ve una página a la vez: el libro se desliza entre página izquierda y derecha; también puedes deslizar con el dedo |
| Accesibilidad | Teclado (← → Esc), foco atrapado en el lector, y `prefers-reduced-motion` cambia los giros por fundidos suaves |

## Fuentes y recursos consultados

- NASA Science – páginas de misión: <https://science.nasa.gov/mission/voyager/>, <https://science.nasa.gov/mission/mer-opportunity/>, <https://science.nasa.gov/mission/insight/>, <https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-helicopter/>, <https://science.nasa.gov/mission/maven/>, <https://science.nasa.gov/mission/new-horizons/> (y las demás enlazadas dentro de cada libro)
- NSSDCA (NASA): <https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo.html>
- NASA History Office – *Catalogue of Manmade Material on the Moon*: <https://history.nasa.gov/FINAL%20Catalogue%20of%20Manmade%20Material%20on%20the%20Moon.pdf>
- LROC (fotos de los sitios Apollo desde la órbita): <https://www.lroc.asu.edu/>
- APOLLO – medición láser Tierra-Luna: <https://tmurphy.physics.ucsd.edu/apollo/>
- NASA Moon Trek / Mars Trek (mapas interactivos): <https://trek.nasa.gov/>

Datos verificados a octubre de 2026 (p. ej. Voyager 1 con 2 instrumentos activos; MAVEN declarada terminada en 2026).
Revisen los enlaces antes de entregar: la NASA reorganiza su web con frecuencia.

*No es un sitio oficial de la NASA.*
