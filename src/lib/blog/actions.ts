"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { putObject, deleteObject, publicUrl, keyFromPublicUrl } from "@/lib/r2";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  requireSession,
  verifyCredentials,
} from "@/lib/auth";
import { slugify } from "@/lib/blog/slug";
import { analyzeSeo, htmlToPlainText, isSafeVideoEmbedUrl } from "@/lib/seo/analyzeSeo";
import { SITE_URL } from "@/lib/seo";
import type { PostStatus } from "@/lib/blog/queries";

export type LoginState = { error: string | null };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyCredentials(email, password)) {
    return { error: "E-mail ou senha inválidos." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin/posts");
}

export async function logoutAction(): Promise<void> {
  await requireSession();
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}

export type SavePostInput = {
  id: string | null;
  title: string;
  subtitle: string;
  slug: string;
  coverImageUrl: string;
  coverImageAlt: string;
  bodyHtml: string;
  bodyJson: unknown;
  metaDescription: string;
  focusKeyword: string;
  authorName: string;
  authorBio: string;
  secondaryKeywords: string;
  videoEmbedUrl: string;
  status: PostStatus;
};

export type SavePostResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

async function slugExists(slug: string, excludePostId?: string): Promise<boolean> {
  const result = excludePostId
    ? await sql`SELECT 1 FROM posts WHERE slug = ${slug} AND id != ${excludePostId} LIMIT 1`
    : await sql`SELECT 1 FROM posts WHERE slug = ${slug} LIMIT 1`;
  return (result.rowCount ?? 0) > 0;
}

// Appends -2, -3, ... until the slug is free, excluding the post being
// edited (if any) so saving an unchanged slug doesn't collide with itself.
async function ensureUniqueSlug(baseSlug: string, excludePostId?: string): Promise<string> {
  let candidate = baseSlug;
  let suffix = 2;

  while (await slugExists(candidate, excludePostId)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function isSafeHref(href: string): boolean {
  const trimmed = href.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return true;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function savePost(input: SavePostInput): Promise<SavePostResult> {
  await requireSession();

  const title = input.title.trim();
  const subtitle = input.subtitle.trim();
  const coverImageUrl = input.coverImageUrl.trim();
  const coverImageAlt = input.coverImageAlt.trim();
  const metaDescription = input.metaDescription.trim();
  const focusKeyword = input.focusKeyword.trim();
  const authorName = input.authorName.trim();
  const authorBio = input.authorBio.trim();
  const secondaryKeywords = input.secondaryKeywords.trim();
  const videoEmbedUrl = input.videoEmbedUrl.trim();

  if (!title) return { ok: false, error: "O título é obrigatório." };
  if (!coverImageUrl) return { ok: false, error: "A imagem de capa é obrigatória." };
  if (!coverImageAlt) return { ok: false, error: "O texto alternativo da imagem é obrigatório." };
  if (!metaDescription) return { ok: false, error: "A meta descrição é obrigatória." };
  if (!focusKeyword) return { ok: false, error: "A palavra-chave foco é obrigatória." };
  if (videoEmbedUrl && !isSafeVideoEmbedUrl(videoEmbedUrl)) {
    return {
      ok: false,
      error: "A URL de vídeo precisa ser um embed do YouTube ou Vimeo (https).",
    };
  }

  const ctaHrefRegex = /<a\s+[^>]*data-cta-button="true"[^>]*href="([^"]*)"/gi;
  let ctaMatch: RegExpExecArray | null;
  while ((ctaMatch = ctaHrefRegex.exec(input.bodyHtml)) !== null) {
    if (!isSafeHref(ctaMatch[1])) {
      return { ok: false, error: "Um dos botões de CTA tem um link inválido." };
    }
  }

  const requestedSlug = slugify(input.slug || title);
  if (!requestedSlug) return { ok: false, error: "Não foi possível gerar a URL do post." };
  const slug = await ensureUniqueSlug(requestedSlug, input.id ?? undefined);

  const bodyText = htmlToPlainText(input.bodyHtml);
  const siteHostname = new URL(SITE_URL).hostname;
  const { score, wordCount } = analyzeSeo({
    title,
    subtitle,
    slug,
    metaDescription,
    focusKeyword,
    bodyText,
    bodyHtml: input.bodyHtml,
    coverImageAlt,
    siteHostname,
    authorName,
    authorBio,
    secondaryKeywords,
    videoEmbedUrl,
  });

  const bodyJson = JSON.stringify(input.bodyJson ?? {});
  const publishedAtClause = input.status === "published";

  let id = input.id;

  if (id) {
    await sql`
      UPDATE posts SET
        title = ${title},
        subtitle = ${subtitle || null},
        slug = ${slug},
        cover_image_url = ${coverImageUrl},
        cover_image_alt = ${coverImageAlt},
        body_html = ${input.bodyHtml},
        body_json = ${bodyJson}::jsonb,
        meta_description = ${metaDescription},
        focus_keyword = ${focusKeyword},
        author_name = ${authorName || null},
        author_bio = ${authorBio || null},
        secondary_keywords = ${secondaryKeywords || null},
        video_embed_url = ${videoEmbedUrl || null},
        word_count = ${wordCount},
        seo_score = ${score},
        status = ${input.status},
        published_at = CASE
          WHEN ${publishedAtClause} AND published_at IS NULL THEN now()
          ELSE published_at
        END,
        updated_at = now()
      WHERE id = ${id}
    `;
  } else {
    const result = await sql<{ id: string }>`
      INSERT INTO posts (
        title, subtitle, slug, cover_image_url, cover_image_alt,
        body_html, body_json, meta_description, focus_keyword,
        author_name, author_bio, secondary_keywords, video_embed_url,
        word_count, seo_score, status, published_at
      ) VALUES (
        ${title}, ${subtitle || null}, ${slug}, ${coverImageUrl}, ${coverImageAlt},
        ${input.bodyHtml}, ${bodyJson}::jsonb, ${metaDescription}, ${focusKeyword},
        ${authorName || null}, ${authorBio || null}, ${secondaryKeywords || null}, ${videoEmbedUrl || null},
        ${wordCount}, ${score}, ${input.status},
        ${publishedAtClause ? new Date().toISOString() : null}
      )
      RETURNING id
    `;
    id = result.rows[0].id;
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return { ok: true, id: id!, slug };
}

export async function setPostStatus(
  id: string,
  status: PostStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireSession();

  const result = await sql<{ slug: string }>`
    UPDATE posts SET
      status = ${status},
      published_at = CASE
        WHEN ${status === "published"} AND published_at IS NULL THEN now()
        ELSE published_at
      END,
      updated_at = now()
    WHERE id = ${id}
    RETURNING slug
  `;
  const updated = result.rows[0];
  if (!updated) return { ok: false, error: "Post não encontrado." };

  revalidatePath("/blog");
  revalidatePath(`/blog/${updated.slug}`);

  return { ok: true };
}

export async function deletePost(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireSession();

  const result = await sql<{ slug: string; cover_image_url: string }>`
    DELETE FROM posts WHERE id = ${id} RETURNING slug, cover_image_url
  `;
  const deleted = result.rows[0];
  if (!deleted) return { ok: false, error: "Post não encontrado." };

  revalidatePath("/blog");
  revalidatePath(`/blog/${deleted.slug}`);

  try {
    const key = keyFromPublicUrl(deleted.cover_image_url);
    if (key) await deleteObject(key);
  } catch {
    // Non-fatal — an orphaned object doesn't block the post deletion.
  }

  return { ok: true };
}

export type UploadCoverImageResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

const MAX_COVER_IMAGE_BYTES = 8 * 1024 * 1024;

export async function uploadCoverImage(formData: FormData): Promise<UploadCoverImageResult> {
  await requireSession();

  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false, error: "Nenhum arquivo enviado." };
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "O arquivo precisa ser uma imagem." };
  }
  if (file.size > MAX_COVER_IMAGE_BYTES) {
    return { ok: false, error: "A imagem deve ter no máximo 8MB." };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const key = `blog/covers/${randomUUID()}.${extension}`;

  await putObject(key, file, file.type);

  return { ok: true, url: publicUrl(key) };
}
