import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "santo-antonio-de-posse";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Santo Antônio de Posse | PS Proteção",
  description: "Terceirização de serviços em Santo Antônio de Posse, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Santo Antônio de Posse.",
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
