import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "aguas-de-lindoia";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Águas de Lindóia | PS Proteção",
  description: "Terceirização de serviços em Águas de Lindóia, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Águas de Lindóia.",
  alternates: {
    canonical: `/${SLUG}`,
  },
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
