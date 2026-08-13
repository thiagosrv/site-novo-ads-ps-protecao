import { sql } from "@/lib/db";

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  coverImageUrl: string;
  coverImageAlt: string;
  bodyHtml: string;
  bodyJson: unknown;
  excerpt: string | null;
  metaDescription: string;
  focusKeyword: string;
  authorName: string | null;
  authorBio: string | null;
  secondaryKeywords: string | null;
  videoEmbedUrl: string | null;
  wordCount: number;
  seoScore: number | null;
  status: PostStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type PostRow = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  cover_image_url: string;
  cover_image_alt: string;
  body_html: string;
  body_json: unknown;
  excerpt: string | null;
  meta_description: string;
  focus_keyword: string;
  author_name: string | null;
  author_bio: string | null;
  secondary_keywords: string | null;
  video_embed_url: string | null;
  word_count: number;
  seo_score: number | null;
  status: PostStatus;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

function mapRow(row: PostRow): Post {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    slug: row.slug,
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    bodyHtml: row.body_html,
    bodyJson: row.body_json,
    excerpt: row.excerpt,
    metaDescription: row.meta_description,
    focusKeyword: row.focus_keyword,
    authorName: row.author_name,
    authorBio: row.author_bio,
    secondaryKeywords: row.secondary_keywords,
    videoEmbedUrl: row.video_embed_url,
    wordCount: row.word_count,
    seoScore: row.seo_score,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listPosts(): Promise<Post[]> {
  const result = await sql<PostRow>`
    SELECT * FROM posts ORDER BY updated_at DESC
  `;
  return result.rows.map(mapRow);
}

export async function getPostById(id: string): Promise<Post | null> {
  const result = await sql<PostRow>`
    SELECT * FROM posts WHERE id = ${id} LIMIT 1
  `;
  return result.rows[0] ? mapRow(result.rows[0]) : null;
}

export async function listPublishedPosts(): Promise<Post[]> {
  const result = await sql<PostRow>`
    SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC
  `;
  return result.rows.map(mapRow);
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const result = await sql<PostRow>`
    SELECT * FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1
  `;
  return result.rows[0] ? mapRow(result.rows[0]) : null;
}
