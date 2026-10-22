// Genera, a partir de data/hardware.json:
//   - supabase/seed.sql          (para cargar la base de datos)
//   - public/js/data-local.js    (respaldo cuando Supabase no está configurado)
// Uso: npm run data
import { readFileSync, writeFileSync } from 'node:fs';

const rows = JSON.parse(readFileSync(new URL('../data/hardware.json', import.meta.url), 'utf8'));
const q = (v) => (v == null ? 'null' : `'${String(v).replace(/'/g, "''")}'`);
const j = (v) => `${q(JSON.stringify(v))}::jsonb`;

const cols = ['slug', 'name', 'mission', 'location', 'kind', 'year', 'arrived', 'ended', 'status', 'place', 'stats', 'story', 'science', 'today', 'fun', 'sources'];
const values = rows.map((r) =>
  `  (${[q(r.slug), q(r.name), q(r.mission), q(r.location), q(r.kind), r.year, q(r.arrived), q(r.ended), q(r.status), q(r.place), j(r.stats), q(r.story), q(r.science), q(r.today), q(r.fun), j(r.sources)].join(', ')})`
);

const sql = `-- Generado por scripts/build-data.mjs — no editar a mano.
-- Ejecuta después de schema.sql (Supabase > SQL Editor).
insert into public.hardware (${cols.join(', ')}) values
${values.join(',\n')}
on conflict (slug) do update set
${cols.filter((c) => c !== 'slug').map((c) => `  ${c} = excluded.${c}`).join(',\n')};
`;
writeFileSync(new URL('../supabase/seed.sql', import.meta.url), sql);
writeFileSync(
  new URL('../public/js/data-local.js', import.meta.url),
  `// Generado por scripts/build-data.mjs. Respaldo local si Supabase no responde.\nwindow.HARDWARE_LOCAL = ${JSON.stringify(rows)};\n`
);
console.log(`✔ ${rows.length} registros → supabase/seed.sql y public/js/data-local.js`);
