"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { savePost } from "@/lib/blog/actions";
import { slugify } from "@/lib/blog/slug";
import { CtaButton } from "@/lib/blog/ctaButtonExtension";
import { analyzeSeo, htmlToPlainText } from "@/lib/seo/analyzeSeo";
import { SITE_URL } from "@/lib/seo";
import type { Post, PostStatus } from "@/lib/blog/queries";
import CoverImageUploader from "@/components/admin/CoverImageUploader";
import EditorToolbar from "@/components/admin/EditorToolbar";
import SeoPanel from "@/components/admin/SeoPanel";

const inputClass =
  "w-full rounded-xl border border-navy/10 bg-surface px-4 py-2.5 text-graphite placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-yellow/50";

function isTiptapDoc(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && "type" in (value as object);
}

export default function PostEditor({ post }: { post: Post | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(post?.title ?? "");
  const [subtitle, setSubtitle] = useState(post?.subtitle ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(post?.coverImageAlt ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? "");
  const [focusKeyword, setFocusKeyword] = useState(post?.focusKeyword ?? "");
  const [bodyHtml, setBodyHtml] = useState(post?.bodyHtml ?? "");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: false }),
      CtaButton,
    ],
    content: post ? (isTiptapDoc(post.bodyJson) ? post.bodyJson : post.bodyHtml) : "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "blog-prose max-w-none px-4 py-4" },
    },
    onUpdate({ editor }) {
      setBodyHtml(editor.getHTML());
    },
  });

  const analysis = useMemo(
    () =>
      analyzeSeo({
        title,
        subtitle,
        slug: effectiveSlug,
        metaDescription,
        focusKeyword,
        bodyText: htmlToPlainText(bodyHtml),
        bodyHtml,
        coverImageAlt,
        siteHostname: new URL(SITE_URL).hostname,
      }),
    [title, subtitle, effectiveSlug, metaDescription, focusKeyword, bodyHtml, coverImageAlt]
  );

  function handleSave(status: PostStatus) {
    setFormError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const result = await savePost({
        id: post?.id ?? null,
        title,
        subtitle,
        slug: effectiveSlug,
        coverImageUrl,
        coverImageAlt,
        bodyHtml,
        bodyJson: editor?.getJSON() ?? {},
        metaDescription,
        focusKeyword,
        status,
      });

      if (!result.ok) {
        setFormError(result.error);
        return;
      }

      setSuccessMessage(status === "published" ? "Post publicado." : "Rascunho salvo.");
      router.replace(`/admin/posts/${result.id}/edit`);
      router.refresh();
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <label className="block">
            <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
              Título
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do post"
              className={`${inputClass} font-heading text-lg text-navy`}
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
              Subtítulo
            </span>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtítulo (opcional, mas recomendado para SEO)"
              className={inputClass}
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
              URL (slug)
            </span>
            <div className="flex items-center gap-1 text-sm text-graphite/50">
              <span className="whitespace-nowrap">/blog/</span>
              <input
                value={effectiveSlug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="url-do-post"
                className={inputClass}
              />
            </div>
          </label>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
              Meta descrição
            </span>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Resumo para resultados de busca (120–160 caracteres)"
              rows={2}
              className={inputClass}
            />
          </label>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <CoverImageUploader
            imageUrl={coverImageUrl}
            imageAlt={coverImageAlt}
            onImageUrlChange={setCoverImageUrl}
            onImageAltChange={setCoverImageAlt}
          />
        </div>

        <div>
          <EditorToolbar editor={editor} />
          <div className="rounded-b-xl border border-navy/10 bg-white">
            <EditorContent editor={editor} />
          </div>
        </div>

        {formError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</p>
        )}
        {successMessage && (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleSave("draft")}
            className="press-feedback rounded-full border border-navy/15 px-6 py-3 font-heading text-sm font-semibold text-navy hover:bg-navy/5 disabled:opacity-60"
          >
            {isPending ? "Salvando..." : "Salvar rascunho"}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleSave("published")}
            className="press-scale-only rounded-full bg-gradient-to-r from-yellow to-yellow-dark px-6 py-3 font-heading text-sm font-semibold text-navy shadow-sm disabled:opacity-60"
          >
            {isPending ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>

      <div className="lg:sticky lg:top-20 lg:self-start">
        <SeoPanel analysis={analysis} focusKeyword={focusKeyword} onFocusKeywordChange={setFocusKeyword} />
      </div>
    </div>
  );
}
