import { CITIES, type City } from "./cities";
import {
  SERVICES,
  CATEGORY_REPRESENTATIVE_SLUG,
  getServiceBySlug,
  type ProgrammaticService,
  type ServiceCategory,
  type RealServiceId,
} from "./services";

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

export type ProgrammaticPage = ComboPage | HubPage;

export function buildComboSlug(service: ProgrammaticService, city: City): string {
  return `${service.slug}-em-${city.slug}-sp`;
}

export function buildHubSlug(city: City): string {
  return `servicos-em-${city.slug}`;
}

const PAGE_MAP: Map<string, ProgrammaticPage> = new Map();

for (const city of CITIES) {
  const hubSlug = buildHubSlug(city);
  PAGE_MAP.set(hubSlug, { type: "hub", slug: hubSlug, city });

  for (const service of SERVICES) {
    const comboSlug = buildComboSlug(service, city);
    PAGE_MAP.set(comboSlug, { type: "combo", slug: comboSlug, service, city });
  }
}

export function getProgrammaticPage(slug: string): ProgrammaticPage | undefined {
  return PAGE_MAP.get(slug);
}

export function getAllProgrammaticSlugs(): string[] {
  return [...PAGE_MAP.keys()];
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
