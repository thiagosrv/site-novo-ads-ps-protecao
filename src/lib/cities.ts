import citiesData from "./cities.json";

export type City = {
  slug: string;
  name: string;
  region: string;
  uf: string;
  cep: string;
  lat: number;
  lng: number;
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
