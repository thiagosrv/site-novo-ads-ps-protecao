import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSegmentCityPage from "@/components/ServiceSegmentCityPage";
import ServiceCityPage from "@/components/ServiceCityPage";
import { PRIORITY_CITIES, getCityBySlug } from "@/lib/cities";
import { SEGMENTS, SEGMENT_CATEGORY_SLUG, SEGMENT_CATEGORY_LABEL, getCategoryBySlug, getSegmentBySlug } from "@/lib/segments";
import { SERVICES, getServiceBySlug } from "@/lib/services";

// Eagerly pre-rendered only for PRIORITY_CITIES; every other city renders on
// first request via dynamicParams (default true) and gets cached after that.
// Keeps every URL live while capping the Cloudflare Workers build's static
// output (each pre-rendered page also emits a segment prefetch cache, and
// building all 100 cities x every combination exhausts the build container's
// disk budget).
export function generateStaticParams() {
  const segmentParams = PRIORITY_CITIES.flatMap((city) =>
    SEGMENTS.flatMap((segment) =>
      segment.relevantCategories.map((category) => ({
        slug: city.slug,
        categoria: SEGMENT_CATEGORY_SLUG[category],
        filho: segment.slug,
      }))
    )
  );

  const serviceParams = PRIORITY_CITIES.flatMap((city) =>
    SERVICES.map((service) => ({
      slug: city.slug,
      categoria: SEGMENT_CATEGORY_SLUG[service.category],
      filho: service.slug,
    }))
  );

  return [...segmentParams, ...serviceParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; categoria: string; filho: string }>;
}): Promise<Metadata> {
  const { slug, categoria, filho } = await params;
  const city = getCityBySlug(slug);
  const category = getCategoryBySlug(categoria);
  if (!city || !category) return {};

  const segment = getSegmentBySlug(filho);
  if (segment && segment.relevantCategories.includes(category)) {
    const categoryLabel = SEGMENT_CATEGORY_LABEL[category];
    return {
      title: `${categoryLabel} para ${segment.name} em ${city.name}, ${city.uf} | PS Proteção`,
      description: `${categoryLabel} para ${segment.name.toLowerCase()} em ${city.name}: ${segment.intro.slice(0, 130).trim()}...`,
      alternates: { canonical: `/${city.slug}/${categoria}/${filho}` },
    };
  }

  const service = getServiceBySlug(filho);
  if (service && service.category === category) {
    return {
      title: `${service.name} em ${city.name}, ${city.uf} | PS Proteção`,
      description: `${service.name} em ${city.name}: ${service.intro.slice(0, 140).trim()}...`,
      alternates: { canonical: `/${city.slug}/${categoria}/${filho}` },
    };
  }

  return {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; categoria: string; filho: string }>;
}) {
  const { slug, categoria, filho } = await params;
  const city = getCityBySlug(slug);
  const category = getCategoryBySlug(categoria);
  if (!city || !category) notFound();

  const segment = getSegmentBySlug(filho);
  if (segment && segment.relevantCategories.includes(category)) {
    return <ServiceSegmentCityPage category={category} segment={segment} city={city} />;
  }

  const service = getServiceBySlug(filho);
  if (service && service.category === category) {
    return <ServiceCityPage service={service} city={city} />;
  }

  notFound();
}
