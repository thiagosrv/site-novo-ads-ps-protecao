-- Blog CMS schema. Apply once manually against the Vercel Postgres database
-- (no migration framework, given the size of the schema — a single table).
create extension if not exists pgcrypto;

create table if not exists posts (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  subtitle          text,
  slug              text not null unique,
  cover_image_url   text not null,
  cover_image_alt   text not null,
  body_html         text not null,
  body_json         jsonb,
  excerpt           text,
  meta_description  text not null,
  focus_keyword     text not null,
  word_count        integer not null default 0,
  seo_score         integer,
  status            text not null default 'draft' check (status in ('draft', 'published')),
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on posts (status, published_at desc);
