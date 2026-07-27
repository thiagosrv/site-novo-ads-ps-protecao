import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "elias-fausto";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Elias Fausto | PS Proteção",
  description: "Terceirização de serviços em Elias Fausto, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Elias Fausto.",
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
