import { CITIES } from "@/lib/cities";
import { SITE_URL } from "@/lib/seo";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "PS Proteção",
  alternateName: "PS Proteção - Portaria e Segurança",
  description:
    "Terceirização de portaria, limpeza, zeladoria, recepção e facilities para empresas, condomínios e indústrias em Americana e na Região Metropolitana de Campinas, SP.",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-ps-protecao.png`,
  image: `${SITE_URL}/brand/logo-ps-protecao.png`,
  telephone: "+5519982892037",
  email: "comercial@psprotecao.com.br",
  taxID: "47.425.584/0001-00",
  foundingDate: "1998",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua São Gabriel, 1623 - Vila Belvedere",
    addressLocality: "Americana",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.7301816,
    longitude: -47.30249,
  },
  hasMap: "https://maps.app.goo.gl/CnMKVARk457uNvwq6",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "12:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+5519982892037",
      contactType: "sales",
      email: "comercial@psprotecao.com.br",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    {
      "@type": "ContactPoint",
      telephone: "+551934787799",
      contactType: "customer service",
      email: "empresas@psprotecao.com.br",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    {
      "@type": "ContactPoint",
      telephone: "+5519997818615",
      contactType: "emergency",
      description: "Plantão 24h para ocorrências fora do horário comercial",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    {
      "@type": "ContactPoint",
      email: "rh@psprotecao.com.br",
      contactType: "HR",
      availableLanguage: "Portuguese",
    },
  ],
  sameAs: [
    "https://maps.app.goo.gl/CnMKVARk457uNvwq6",
    "https://share.google/wNR5N8gN2ps4YsmK7",
    "https://www.linkedin.com/company/ps-protecao",
    "https://www.instagram.com/protecao_seguranca/",
  ],
  areaServed: CITIES.map((city) => ({
    "@type": "City",
    name: city.name,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "São Paulo",
    },
  })),
};

export default function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
    />
  );
}
