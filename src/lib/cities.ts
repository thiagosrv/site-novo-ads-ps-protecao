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
