import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "varzea-paulista";

export const metadata: Metadata = {
  title: "Terceirização de Portaria e Limpeza em Várzea Paulista | PS Proteção",
  description: "Terceirização de serviços em Várzea Paulista, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em Várzea Paulista.",
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
