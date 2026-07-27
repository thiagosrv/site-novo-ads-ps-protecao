import citiesData from "./cities.json";

export type City = {
  slug: string;
  name: string;
  region: string;
};

export const CITIES: City[] = citiesData;

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug);
}
