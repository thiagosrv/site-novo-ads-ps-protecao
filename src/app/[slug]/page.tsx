import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceCityPage from "@/components/ServiceCityPage";
import CityServicesHubPage from "@/components/CityServicesHubPage";
import ServiceSegmentCityPage from "@/components/ServiceSegmentCityPage";
import ServiceCategoryCityPage from "@/components/ServiceCategoryCityPage";
import CityPage from "@/components/CityPage";
import { getAllProgrammaticSlugs, getProgrammaticPage } from "@/lib/programmatic";
import { SEGMENT_CATEGORY_LABEL } from "@/lib/segments";
import { CATEGORY_LABEL } from "@/lib/services";
import { getCityBySlug, FALLBACK_CITY_SLUGS } from "@/lib/cities";

export function generateStaticParams() {
  return [
    ...getAllProgrammaticSlugs().map((slug) => ({ slug })),
    ...FALLBACK_CITY_SLUGS.map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);
  if (!page) {
    const city = getCityBySlug(slug);
    if (!city) return {};
    return {
      title: `Terceirização de Portaria e Limpeza em ${city.name} | PS Proteção`,
      description: `Terceirização de serviços em ${city.name}, com padrão, supervisão e relatório. Portaria, limpeza, zeladoria e recepção para empresas e condomínios em ${city.name}.`,
      alternates: { canonical: `/${slug}` },
    };
  }

  if (page.type === "combo") {
    const { service, city } = page;
    return {
      title: `${service.name} em ${city.name}, ${city.uf} | PS Proteção`,
      description: `${service.name} em ${city.name}: ${service.intro.slice(0, 140).trim()}...`,
      alternates: { canonical: `/${slug}` },
    };
  }

  if (page.type === "segment") {
    const { category, segment, city } = page;
    const categoryLabel = SEGMENT_CATEGORY_LABEL[category] ?? category;
    return {
      title: `${categoryLabel} para ${segment.name} em ${city.name}, ${city.uf} | PS Proteção`,
      description: `${categoryLabel} para ${segment.name.toLowerCase()} em ${city.name}: ${segment.intro.slice(0, 130).trim()}...`,
      alternates: { canonical: `/${slug}` },
    };
  }

  if (page.type === "category-flat") {
    const { category, city, variant } = page;
    const categoryLabel = CATEGORY_LABEL[category];
    const title =
      variant === "a"
        ? `${categoryLabel} em ${city.name}, ${city.uf} | PS Proteção`
        : `Serviço de ${categoryLabel} em ${city.name}, ${city.uf} | PS Proteção`;
    return {
      title,
      description: `${categoryLabel} terceirizada em ${city.name}: diagnóstico do posto, equipe treinada e supervisão ativa em toda a ${city.region}.`,
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
  if (!page) {
    const city = getCityBySlug(slug);
    if (!city) notFound();
    return <CityPage city={city} />;
  }

  if (page.type === "combo") {
    return <ServiceCityPage service={page.service} city={page.city} />;
  }
  if (page.type === "segment") {
    return (
      <ServiceSegmentCityPage category={page.category} segment={page.segment} city={page.city} />
    );
  }
  if (page.type === "category-flat") {
    return (
      <ServiceCategoryCityPage
        category={page.category}
        city={page.city}
        variant={page.variant === "a" ? "flat-a" : "flat-b"}
      />
    );
  }
  return <CityServicesHubPage city={page.city} />;
}
