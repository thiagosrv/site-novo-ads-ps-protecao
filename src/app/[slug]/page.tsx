import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceCityPage from "@/components/ServiceCityPage";
import CityServicesHubPage from "@/components/CityServicesHubPage";
import { getAllProgrammaticSlugs, getProgrammaticPage } from "@/lib/programmatic";

export function generateStaticParams() {
  return getAllProgrammaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);
  if (!page) return {};

  if (page.type === "combo") {
    const { service, city } = page;
    return {
      title: `${service.name} em ${city.name}, ${city.uf} | PS Proteção`,
      description: `${service.name} em ${city.name}: ${service.intro.slice(0, 140).trim()}...`,
      alternates: { canonical: `/${slug}` },
    };
  }

  const { city } = page;
  return {
    title: `Serviços em ${city.name}, ${city.uf} | PS Proteção`,
    description: `Diretório completo de portaria, limpeza, zeladoria e recepção terceirizadas em ${city.name}, região do CEP ${city.cep}, e toda a ${city.region}.`,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);
  if (!page) notFound();

  if (page.type === "combo") {
    return <ServiceCityPage service={page.service} city={page.city} />;
  }
  return <CityServicesHubPage city={page.city} />;
}
