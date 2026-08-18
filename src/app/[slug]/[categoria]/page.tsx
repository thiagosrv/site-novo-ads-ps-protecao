import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceCategoryCityPage from "@/components/ServiceCategoryCityPage";
import { PRIORITY_CITIES, getCityBySlug } from "@/lib/cities";
import { CATEGORY_LABEL } from "@/lib/services";
import { CATEGORY_ORDER } from "@/lib/programmatic";
import { getCategoryBySlug, SEGMENT_CATEGORY_SLUG } from "@/lib/segments";

// See [filho]/page.tsx: capped to PRIORITY_CITIES to keep the Cloudflare
// Workers build's static output (and per-page segment prefetch caches)
// within its disk budget. Every other city still resolves via dynamicParams
// fallback (default true) on first request, then cache.
export function generateStaticParams() {
  return PRIORITY_CITIES.flatMap((city) =>
    CATEGORY_ORDER.map((category) => ({
      slug: city.slug,
      categoria: SEGMENT_CATEGORY_SLUG[category],
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; categoria: string }>;
}): Promise<Metadata> {
  const { slug, categoria } = await params;
  const city = getCityBySlug(slug);
  const category = getCategoryBySlug(categoria);
  if (!city || !category) return {};

  const categoryLabel = CATEGORY_LABEL[category];
  return {
    title: `${categoryLabel} terceirizada em ${city.name}, ${city.uf} | PS Proteção`,
    description: `${categoryLabel} terceirizada em ${city.name}: diagnóstico do posto, equipe treinada e supervisão ativa em toda a ${city.region}.`,
    alternates: { canonical: `/${city.slug}/${categoria}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; categoria: string }>;
}) {
  const { slug, categoria } = await params;
  const city = getCityBySlug(slug);
  const category = getCategoryBySlug(categoria);
  if (!city || !category) notFound();

  return <ServiceCategoryCityPage category={category} city={city} variant="nested" />;
}
