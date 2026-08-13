import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Clock, MessageCircle } from "lucide-react";
import Breadcrumbs, { buildBreadcrumbSchema } from "@/components/Breadcrumbs";
import WhatsAppCta from "@/components/WhatsAppCta";
import { getPublishedPostBySlug } from "@/lib/blog/queries";
import { SITE_URL } from "@/lib/seo";
import { isSafeVideoEmbedUrl } from "@/lib/seo/analyzeSeo";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog PS Proteção`,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [{ url: post.coverImageUrl, width: 1200, height: 675, alt: post.coverImageAlt }],
      publishedTime: post.publishedAt?.toISOString(),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const readingMinutes = Math.max(1, Math.round(post.wordCount / 200));
  const hasSafeVideoEmbed = Boolean(post.videoEmbedUrl && isSafeVideoEmbedUrl(post.videoEmbedUrl));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: [post.coverImageUrl],
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    author: post.authorName
      ? {
          "@type": "Person",
          name: post.authorName,
          ...(post.authorBio ? { description: post.authorBio } : {}),
        }
      : {
          "@type": "Organization",
          name: "PS Proteção",
          "@id": `${SITE_URL}/#organization`,
        },
    publisher: {
      "@type": "Organization",
      name: "PS Proteção",
      "@id": `${SITE_URL}/#organization`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/logo-ps-protecao.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="relative bg-gradient-to-b from-navy to-navy-deep pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
          viewBox="0 0 1440 500"
          aria-hidden="true"
        >
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="80" x2="80" y1="0" y2="500" />
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="1360" x2="1360" y1="0" y2="500" />
          <circle className="fill-yellow" cx="80" cy="250" r="4" />
          <circle className="fill-yellow" cx="1360" cy="150" r="4" />
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} dark />
          </div>
          <h1 className="text-white font-heading text-3xl md:text-5xl font-bold leading-[1.15] mb-5">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-white/80 text-lg leading-relaxed mb-6">{post.subtitle}</p>
          )}
          <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm font-mono">
            {post.publishedAt && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={15} />
                {dateFormatter.format(new Date(post.publishedAt))}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Clock size={15} />
              {readingMinutes} min de leitura
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)] -mt-12 md:-mt-16 relative z-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-[0_25px_55px_-20px_rgba(0,15,105,0.35)]">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt}
            fill
            priority
            quality={90}
            className="object-cover"
          />
        </div>
      </div>

      <article className="py-16 md:py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <div className="blog-prose max-w-none" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

          {hasSafeVideoEmbed && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(0,15,105,0.3)]">
              <iframe
                src={post.videoEmbedUrl!}
                title={post.title}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {post.authorName && (
            <div className="mt-12 flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 font-heading text-sm font-semibold text-navy">
                {post.authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-navy">{post.authorName}</p>
                {post.authorBio && (
                  <p className="mt-1 text-sm leading-relaxed text-graphite/70">{post.authorBio}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </article>

      <section className="bg-gradient-to-br from-navy to-navy-deep py-20 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 text-center flex flex-col items-center gap-6">
          <h2 className="font-heading text-3xl md:text-4xl text-white">
            Pronto para terceirizar com quem entende do assunto?
          </h2>
          <p className="text-white/70 text-lg max-w-xl">
            Fale com nossa equipe agora e receba uma proposta personalizada, sem compromisso.
          </p>
          <WhatsAppCta
            label={
              <>
                <MessageCircle size={18} />
                Solicitar proposta sem compromisso
              </>
            }
            className="px-7 py-3.5 text-[15px]"
          />
        </div>
      </section>
    </>
  );
}
