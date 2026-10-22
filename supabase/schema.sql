-- =====================================================================
--  Abandonado pero no olvidado · Esquema para Supabase
--  Ejecuta este archivo en: Supabase > SQL Editor > New query > Run
--  Después ejecuta seed.sql para cargar los 20 "libros".
-- =====================================================================

-- Tipos -----------------------------------------------------------------
do $$ begin
  create type ubicacion as enum ('luna', 'marte', 'espacio');
exception when duplicate_object then null; end $$;

do $$ begin
  create type estado_hw as enum ('activo', 'parcial', 'inactivo', 'impacto', 'espera', 'perdido');
exception when duplicate_object then null; end $$;

-- Tabla principal: cada fila es un "libro" de la biblioteca -------------
create table if not exists public.hardware (
  id          bigint generated always as identity primary key,
  slug        text unique not null,
  name        text not null,
  mission     text not null,
  location    ubicacion not null,
  kind        text not null,            -- rover, lander, orbiter, probe, reflector, instrument, impactor, helicopter, depot
  year        int  not null,            -- año de llegada / lanzamiento (para ordenar)
  arrived     text,
  ended       text,
  status      estado_hw not null,
  place       text,
  stats       jsonb not null default '[]'::jsonb,   -- [["etiqueta","valor"], ...]
  story       text not null,            -- La historia
  science     text not null,            -- La ciencia que hizo posible
  today       text not null,            -- ¿Cómo está hoy?
  fun         text,                     -- Dato curioso
  sources     jsonb not null default '[]'::jsonb,   -- [{"title","url"}]
  created_at  timestamptz not null default now()
);

create index if not exists hardware_location_idx on public.hardware (location, year);

-- Sugerencias de los lectores (formulario "Propón un libro") ------------
create table if not exists public.sugerencias (
  id          bigint generated always as identity primary key,
  autor       text check (char_length(autor) <= 60),
  objeto      text not null check (char_length(objeto) between 2 and 120),
  ubicacion   ubicacion,
  motivo      text check (char_length(motivo) <= 600),
  created_at  timestamptz not null default now()
);

-- Seguridad (Row Level Security) ----------------------------------------
alter table public.hardware    enable row level security;
alter table public.sugerencias enable row level security;

-- Cualquiera puede LEER la biblioteca
drop policy if exists "lectura publica" on public.hardware;
create policy "lectura publica" on public.hardware
  for select to anon, authenticated using (true);

-- Cualquiera puede ENVIAR una sugerencia, pero no leer las de otros
drop policy if exists "insertar sugerencias" on public.sugerencias;
create policy "insertar sugerencias" on public.sugerencias
  for insert to anon, authenticated with check (true);
