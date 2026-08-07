import { CITIES } from "./cities";
import { SERVICES } from "./services";
import { SEGMENTS } from "./segments";
import {
  buildComboSlug,
  buildHubSlug,
  buildSegmentComboSlug,
  buildCategoryFlatSlugA,
  buildCategoryFlatSlugB,
  buildCategoryNestedPath,
  buildSegmentNestedPath,
  buildServiceNestedPath,
  CATEGORY_ORDER,
} from "./programmatic";

// Mirrors the same combinations enumerated in src/app/sitemap.ts. This is the
// single source of truth middleware.ts uses to reject any request path that
// isn't one of the site's real pages, before it ever reaches a React render —
// keeps bot/spam traffic hitting made-up URLs (e.g. leftover negative-SEO
// requests for gambling slugs) from costing a function invocation or ISR read.
const STATIC_PATHS = [
  "/",
  "/servicos",
  "/servicos/padrao-operacional-e-supervisao",
  "/sobre",
  "/sobre/recrutamento-e-triagem",
  "/tecnologia",
  "/duvidas",
  "/contato",
  "/privacidade",
  "/obrigado",
];

function buildAllValidPaths(): string[] {
  const paths: string[] = [...STATIC_PATHS];

  for (const city of CITIES) {
    paths.push(`/${city.slug}`);
    paths.push(`/${buildHubSlug(city)}`);

    for (const service of SERVICES) {
      paths.push(`/${buildComboSlug(service, city)}`);
      paths.push(buildServiceNestedPath(service, city));
    }

    for (const segment of SEGMENTS) {
      for (const category of segment.relevantCategories) {
        paths.push(`/${buildSegmentComboSlug(category, segment, city)}`);
        paths.push(buildSegmentNestedPath(category, segment, city));
      }
    }

    for (const category of CATEGORY_ORDER) {
      paths.push(`/${buildCategoryFlatSlugA(category, city)}`);
      paths.push(`/${buildCategoryFlatSlugB(category, city)}`);
      paths.push(buildCategoryNestedPath(category, city));
    }
  }

  return paths;
}

export const VALID_PATHS: Set<string> = new Set(buildAllValidPaths());

export function isValidPath(pathname: string): boolean {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return VALID_PATHS.has(normalized);
}
