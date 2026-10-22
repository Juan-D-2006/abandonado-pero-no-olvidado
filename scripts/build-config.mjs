// Render ejecuta este script en cada deploy (ver render.yaml).
// Toma las variables de entorno y escribe public/js/config.js.
// La "anon key" de Supabase es pública por diseño: la protección real la dan las políticas RLS.
import { writeFileSync } from 'node:fs';

const config = {
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
};
writeFileSync(
  new URL('../public/js/config.js', import.meta.url),
  `window.APP_CONFIG = ${JSON.stringify(config, null, 2)};\n`
);
console.log(config.SUPABASE_URL ? `✔ config.js apuntando a ${config.SUPABASE_URL}` : '⚠ Sin SUPABASE_URL: la app usará los datos locales.');
