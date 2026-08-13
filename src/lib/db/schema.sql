-- Blog CMS schema. Apply once manually against the Vercel Postgres database
-- (no migration framework, given the size of the schema — a single table).
create extension if not exists pgcrypto;

create table if not exists posts (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  subtitle            text,
  slug                text not null unique,
  cover_image_url     text not null,
  cover_image_alt     text not null,
  body_html           text not null,
  body_json           jsonb,
  excerpt             text,
  meta_description    text not null,
  focus_keyword       text not null,
  -- E-E-A-T: assinatura de autoridade do autor (nome + credenciais/bio curta).
  author_name         text,
  author_bio          text,
  -- Densidade semântica (LSI): termos relacionados/sinônimos da palavra-chave
  -- foco, separados por vírgula.
  secondary_keywords  text,
  -- Multimídia de retenção (dwell time) — não obrigatório. URL de embed
  -- (ex: https://www.youtube.com/embed/VIDEO_ID).
  video_embed_url     text,
  word_count          integer not null default 0,
  seo_score           integer,
  status              text not null default 'draft' check (status in ('draft', 'published')),
  published_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on posts (status, published_at desc);

-- Migração aditiva para bancos já criados antes destas colunas existirem.
alter table posts add column if not exists author_name text;
alter table posts add column if not exists author_bio text;
alter table posts add column if not exists secondary_keywords text;
alter table posts add column if not exists video_embed_url text;
