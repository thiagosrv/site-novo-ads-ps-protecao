import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "rio-claro";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Rio Claro | PS Proteção",
  description: "Terceirização de serviços em Rio Claro, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Rio Claro.",
  alternates: {
    canonical: `/${SLUG}`,
  },
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
