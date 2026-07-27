import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "santa-rita-do-passa-quatro";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Santa Rita do Passa Quatro | PS Proteção",
  description: "Terceirização de serviços em Santa Rita do Passa Quatro, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Santa Rita do Passa Quatro.",
  alternates: {
    canonical: `/${SLUG}`,
  },
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
