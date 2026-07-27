import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "porto-ferreira";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Porto Ferreira | PS Proteção",
  description: "Terceirização de serviços em Porto Ferreira, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Porto Ferreira.",
  alternates: {
    canonical: `/${SLUG}`,
  },
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
