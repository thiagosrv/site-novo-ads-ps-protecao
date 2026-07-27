import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "sumare";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Sumaré | PS Proteção",
  description: "Terceirização de serviços em Sumaré, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Sumaré.",
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
