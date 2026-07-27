import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "santa-barbara-d-oeste";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Santa Bárbara d'Oeste | PS Proteção",
  description: "Terceirização de serviços em Santa Bárbara d'Oeste, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Santa Bárbara d'Oeste.",
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
