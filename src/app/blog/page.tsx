import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Breadcrumbs, { buildBreadcrumbSchema } from "@/components/Breadcrumbs";
import { listPublishedPosts } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | PS Proteção",
  description:
    "Conteúdo sobre portaria, limpeza, zeladoria e terceirização de facilities e segurança patrimonial para condomínios, empresas e indústrias.",
  alternates: {
    canonical: "/blog",
  },
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default async function BlogPage() {
  const posts = await listPublishedPosts();

  const breadcrumbItems = [{ label: "Início", href: "/" }, { label: "Blog" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        tag="Blog PS Proteção"
        title="Conteúdo sobre Facilities e Segurança Patrimonial"
        description="Boas práticas, tendências e orientações para condomínios, empresas e indústrias que buscam terceirizar portaria, limpeza e serviços de facilities."
      />

      <div className="bg-surface border-b border-navy/5">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] py-5">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          {posts.length === 0 ? (
            <Reveal>
              <p className="text-center text-graphite/60 text-lg py-16">
                Em breve, novos conteúdos por aqui.
              </p>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <Reveal key={post.id} delayMs={Math.min(i, 5) * 80}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/5 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.coverImageAlt}
                        fill
                        quality={90}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {post.publishedAt && (
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-graphite/50">
                          <CalendarDays size={14} />
                          {dateFormatter.format(new Date(post.publishedAt))}
                        </div>
                      )}
                      <h2 className="font-heading text-xl text-navy leading-snug">{post.title}</h2>
                      {post.subtitle && (
                        <p className="text-graphite/70 text-sm leading-relaxed line-clamp-3">
                          {post.subtitle}
                        </p>
                      )}
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-heading text-sm font-semibold text-navy transition-colors group-hover:text-yellow-dark">
                        Ler artigo
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
