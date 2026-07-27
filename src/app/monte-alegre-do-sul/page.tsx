import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "monte-alegre-do-sul";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Monte Alegre do Sul | PS Proteção",
  description: "Terceirização de serviços em Monte Alegre do Sul, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Monte Alegre do Sul.",
  alternates: {
    canonical: `/${SLUG}`,
  },
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
