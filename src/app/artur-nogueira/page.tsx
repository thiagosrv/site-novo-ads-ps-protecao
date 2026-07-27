import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "artur-nogueira";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Artur Nogueira | PS Proteção",
  description: "Terceirização de serviços em Artur Nogueira, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Artur Nogueira.",
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
