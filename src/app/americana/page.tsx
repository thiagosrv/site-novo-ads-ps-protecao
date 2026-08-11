import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "americana";

export const metadata: Metadata = {
  title: "PS Proteção em Americana, SP | Sede no Vila Belvedere · 4.8★ (70 avaliações)",
  description: "Sede própria da PS Proteção em Americana, SP, no Vila Belvedere, a 5 minutos do Centro. Terceirização de portaria, limpeza, zeladoria e recepção com padrão, supervisão e relatório. Nota 4.8 no Google (70 avaliações).",
  alternates: {
    canonical: `/${SLUG}`,
  },
};

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPage city={city} />;
}
