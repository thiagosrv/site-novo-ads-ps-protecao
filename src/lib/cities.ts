import citiesData from "./cities.json";

export type City = {
  slug: string;
  name: string;
  region: string;
  uf: string;
  cep: string;
  lat: number;
  lng: number;
  hqProximity?: {
    minutes: number;
    industrialArea: string;
  };
};

export const CITIES: City[] = citiesData;

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug);
}

// Cities without a dedicated static folder under src/app/. Kept as an explicit
// list (rather than derived at build time from the filesystem) so the fallback
// route's scope is predictable and reviewable.
export const FALLBACK_CITY_SLUGS = [
  "sorocaba",
  "votorantim",
  "itu",
  "salto",
  "boituva",
  "tatui",
  "cerquilho",
  "tiete",
  "porto-feliz",
  "sao-roque",
  "aracoiaba-da-serra",
  "ipero",
  "capela-do-alto",
  "alambari",
  "itapetininga",
  "sao-carlos",
  "ibate",
  "araraquara",
  "matao",
  "jaboticabal",
  "ribeirao-preto",
  "sertaozinho",
  "cravinhos",
  "batatais",
  "brodowski",
  "franca",
  "mococa",
  "sao-joao-da-boa-vista",
  "aguai",
  "casa-branca",
  "vargem-grande-do-sul",
  "espirito-santo-do-pinhal",
  "sao-jose-do-rio-pardo",
  "tambau",
  "itobi",
  "caconde",
  "jau",
  "botucatu",
  "lencois-paulista",
  "bauru",
];

// Cities eagerly pre-rendered for every programmatic combo (service, segment,
// and category-flat pages, plus the nested /[categoria] and /[categoria]/[filho]
// routes) at build time. Cloudflare Workers Builds has a hard disk budget
// (~5GB usable) for staging OpenNext's per-page cache assets during the
// build, and every city added here multiplies across every route family --
// so this stays a short, deliberate list of the highest commercial priority
// cities. Every other city still resolves the exact same URLs via
// dynamicParams (default true) on first request, then is served from the
// R2-backed incremental cache -- no page is removed, just no longer built
// eagerly.
const PRIORITY_CITY_SLUGS = [
  "americana",
  "santa-barbara-d-oeste",
  "piracicaba",
  "campinas",
  "nova-odessa",
  "sumare",
  "valinhos",
  "vinhedo",
  "limeira",
  "indaiatuba",
];

export const PRIORITY_CITIES: City[] = PRIORITY_CITY_SLUGS.map((slug) => {
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) throw new Error(`PRIORITY_CITIES: no city found for slug "${slug}"`);
  return city;
});
