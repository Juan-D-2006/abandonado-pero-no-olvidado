// Ilustraciones de línea propias (64×64, trazo = currentColor).
const P = (d) => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

window.ICONS = {
  rover: P('<rect x="13" y="25" width="34" height="10" rx="1.5"/><path d="M18 35v6M30 35v6M42 35v6"/><circle cx="18" cy="46" r="5"/><circle cx="30" cy="46" r="5"/><circle cx="42" cy="46" r="5"/><path d="M40 25V13h7"/><rect x="45" y="9" width="8" height="6" rx="1"/><path d="M17 25l-4-9 9-2"/><path d="M6 54h52"/>'),
  lander: P('<path d="M22 20h20l4 13H18z"/><path d="M20 33l-8 15M44 33l8 15M27 33l-3 15M37 33l3 15"/><path d="M8 48h8M48 48h8"/><path d="M32 20v-6"/><path d="M24 11a8 4 0 0 0 16 0z"/><path d="M4 54h56"/>'),
  orbiter: P('<rect x="26" y="26" width="12" height="12" rx="1"/><path d="M6 27h16v10H6zM42 27h16v10H42z"/><path d="M14 27v10M50 27v10M22 32h4M38 32h4"/><path d="M32 26v-6"/><path d="M23 20a9 4 0 0 0 18 0z"/><circle cx="32" cy="50" r="2"/><path d="M20 52c4 3 20 3 24 0" stroke-dasharray="2 4"/>'),
  probe: P('<path d="M13 20a19 10 0 0 0 38 0z"/><path d="M32 20v5"/><rect x="27" y="25" width="10" height="8" rx="1"/><path d="M37 29l18 13M27 31l-15 12M32 33v19"/><circle cx="55" cy="43" r="2.5"/><circle cx="12" cy="44" r="2"/><path d="M8 8l.01 0M54 10l.01 0M48 56l.01 0"/>'),
  reflector: P('<path d="M10 31l40-11 4 15-40 11z"/><path d="M20 28l4 15M30 25.5l4 15M40 22.7l4 15M12 38.5l40-11"/><path d="M27 44l-4 10M45 39l6 12"/><path d="M6 54h52"/><path d="M52 6L36 22" stroke-dasharray="3 3"/>'),
  instrument: P('<rect x="20" y="14" width="18" height="20" rx="2"/><path d="M24 14V9h10v5M38 20h8v-8"/><path d="M16 34h26"/><path d="M6 46h9l3-6 5 12 5-16 5 14 3-4h22"/>'),
  impactor: P('<path d="M48 8L30 30"/><path d="M54 12L36 33" stroke-dasharray="3 3"/><circle cx="27" cy="35" r="5"/><path d="M6 52c10-7 42-7 52 0"/><path d="M17 45l-4-6M37 44l4-7M27 42v-2"/>'),
  helicopter: P('<path d="M8 14h48M14 20h36"/><rect x="26" y="6" width="12" height="4" rx="1"/><path d="M32 10v20"/><rect x="24" y="30" width="16" height="11" rx="3"/><path d="M26 41l-8 11M38 41l8 11M14 52h8M42 52h8"/>'),
  depot: P('<path d="M4 50h56"/><rect x="8" y="38" width="18" height="6" rx="3" transform="rotate(-10 17 41)"/><rect x="24" y="42" width="18" height="6" rx="3" transform="rotate(6 33 45)"/><rect x="40" y="36" width="18" height="6" rx="3" transform="rotate(-6 49 39)"/><path d="M20 26l4-10 4 10M36 24l4-10 4 10" stroke-dasharray="2 3"/>'),
  // UI
  prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M17 14v5H5V7h5"/></svg>',
};
