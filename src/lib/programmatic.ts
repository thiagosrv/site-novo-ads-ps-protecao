import { CITIES, PRIORITY_CITIES, type City } from "./cities";
import {
  SERVICES,
  CATEGORY_REPRESENTATIVE_SLUG,
  getServiceBySlug,
  type ProgrammaticService,
  type ServiceCategory,
  type RealServiceId,
} from "./services";
import { SEGMENTS, SEGMENT_CATEGORY_SLUG, type Segment } from "./segments";

export type ComboPage = {
  type: "combo";
  slug: string;
  service: ProgrammaticService;
  city: City;
};

export type HubPage = {
  type: "hub";
  slug: string;
  city: City;
};

export type SegmentPage = {
  type: "segment";
  slug: string;
  category: ServiceCategory;
  segment: Segment;
  city: City;
};

export type CategoryFlatPage = {
  type: "category-flat";
  slug: string;
  variant: "a" | "b";
  category: ServiceCategory;
  city: City;
};

export type ProgrammaticPage = ComboPage | HubPage | SegmentPage | CategoryFlatPage;

export function buildComboSlug(service: ProgrammaticService, city: City): string {
  return `${service.slug}-em-${city.slug}-sp`;
}

export function buildHubSlug(city: City): string {
  return `servicos-em-${city.slug}`;
}

export function buildSegmentComboSlug(
  category: ServiceCategory,
  segment: Segment,
  city: City
): string {
  const categorySlug = SEGMENT_CATEGORY_SLUG[category];
  if (!categorySlug) throw new Error(`No segment slug configured for category ${category}`);
  return `${categorySlug}-para-${segment.slug}-em-${city.slug}`;
}

export function buildCategoryFlatSlugA(category: ServiceCategory, city: City): string {
  return `${SEGMENT_CATEGORY_SLUG[category]}-em-${city.slug}`;
}

export function buildCategoryFlatSlugB(category: ServiceCategory, city: City): string {
  return `servico-de-${SEGMENT_CATEGORY_SLUG[category]}-em-${city.slug}`;
}

export function buildCategoryNestedPath(category: ServiceCategory, city: City): string {
  return `/${city.slug}/${SEGMENT_CATEGORY_SLUG[category]}`;
}

export function buildSegmentNestedPath(
  category: ServiceCategory,
  segment: Segment,
  city: City
): string {
  return `/${city.slug}/${SEGMENT_CATEGORY_SLUG[category]}/${segment.slug}`;
}

export function buildServiceNestedPath(service: ProgrammaticService, city: City): string {
  return `/${city.slug}/${SEGMENT_CATEGORY_SLUG[service.category]}/${service.slug}`;
}

// Nested segment and service-specific routes share one dynamic route file and
// resolve the leaf slug by trying SEGMENTS first, then SERVICES. This only
// works if no slug is used by both data sets.
const segmentSlugSet = new Set(SEGMENTS.map((segment) => segment.slug));
const collidingServiceSlug = SERVICES.find((service) => segmentSlugSet.has(service.slug));
if (collidingServiceSlug) {
  throw new Error(
    `Segment/service slug collision detected: "${collidingServiceSlug.slug}" is used by both SEGMENTS and SERVICES`
  );
}

export const CATEGORY_ORDER: ServiceCategory[] = [
  "portaria",
  "limpeza",
  "facilities",
  "recepcao",
  "vigilancia",
  "geral",
  "jardinagem",
];

const PAGE_MAP: Map<string, ProgrammaticPage> = new Map();

for (const city of CITIES) {
  const hubSlug = buildHubSlug(city);
  PAGE_MAP.set(hubSlug, { type: "hub", slug: hubSlug, city });

  for (const service of SERVICES) {
    const comboSlug = buildComboSlug(service, city);
    PAGE_MAP.set(comboSlug, { type: "combo", slug: comboSlug, service, city });
  }

  for (const segment of SEGMENTS) {
    for (const category of segment.relevantCategories) {
      const segmentSlug = buildSegmentComboSlug(category, segment, city);
      PAGE_MAP.set(segmentSlug, { type: "segment", slug: segmentSlug, category, segment, city });
    }
  }

  for (const category of CATEGORY_ORDER) {
    const flatSlugA = buildCategoryFlatSlugA(category, city);
    PAGE_MAP.set(flatSlugA, { type: "category-flat", slug: flatSlugA, variant: "a", category, city });

    const flatSlugB = buildCategoryFlatSlugB(category, city);
    PAGE_MAP.set(flatSlugB, { type: "category-flat", slug: flatSlugB, variant: "b", category, city });
  }
}

export function getProgrammaticPage(slug: string): ProgrammaticPage | undefined {
  return PAGE_MAP.get(slug);
}

// Eagerly pre-rendered only for PRIORITY_CITIES -- see the comment there for
// why this list stays short. Every other city still resolves every one of
// these URLs via dynamicParams (default true) on first request, then cache
// -- no page is removed, just no longer built eagerly.
const priorityCitySlugSet = new Set(PRIORITY_CITIES.map((city) => city.slug));

export function getPriorityProgrammaticSlugs(): string[] {
  return [...PAGE_MAP.entries()]
    .filter(([, page]) => priorityCitySlugSet.has(page.city.slug))
    .map(([slug]) => slug);
}

export function getRelatedServiceCards(
  currentCategory: ServiceCategory,
  city: City,
  count = 4
): { service: ProgrammaticService; href: string }[] {
  return CATEGORY_ORDER.filter((category) => category !== currentCategory)
    .slice(0, count)
    .map((category) => {
      const service = getServiceBySlug(CATEGORY_REPRESENTATIVE_SLUG[category]);
      if (!service) throw new Error(`Missing representative service for category ${category}`);
      return { service, href: `/${buildComboSlug(service, city)}` };
    });
}

export function getOtherCategoriesForSegment(
  segment: Segment,
  currentCategory: ServiceCategory,
  city: City
): { category: ServiceCategory; href: string }[] {
  return segment.relevantCategories
    .filter((category) => category !== currentCategory)
    .map((category) => ({
      category,
      href: `/${buildSegmentComboSlug(category, segment, city)}`,
    }));
}

export function getOtherSegmentsForCategory(
  category: ServiceCategory,
  currentSegmentSlug: string,
  city: City,
  count = 4
): { segment: Segment; href: string }[] {
  return SEGMENTS.filter(
    (segment) =>
      segment.slug !== currentSegmentSlug && segment.relevantCategories.includes(category)
  )
    .slice(0, count)
    .map((segment) => ({
      segment,
      href: `/${buildSegmentComboSlug(category, segment, city)}`,
    }));
}

const REAL_SERVICE_REPRESENTATIVE_SLUG: Partial<Record<RealServiceId, string>> = {
  portaria: "servico-de-portaria",
  limpeza: "servico-de-limpeza",
  zeladoria: "empresa-de-facilities",
  recepcao: "recepcao-terceirizada",
};

export function getRealServiceComboHref(realServiceId: RealServiceId, city: City): string | null {
  const slug = REAL_SERVICE_REPRESENTATIVE_SLUG[realServiceId];
  if (!slug) return null;
  const service = getServiceBySlug(slug);
  if (!service) return null;
  return `/${buildComboSlug(service, city)}`;
}
