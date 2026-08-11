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
    postalCode: "13473-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.7301816,
    longitude: -47.30249,
  },
  hasMap: "https://maps.app.goo.gl/rFdMcsozBJnGW3Sq7",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "70",
    bestRating: "5",
  },
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
      email: "adm@psprotecao.com.br",
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
    "https://maps.app.goo.gl/rFdMcsozBJnGW3Sq7",
    "https://share.google/eWwjNSUDdjT59UiGY",
    "https://share.google/hnbDKKadI4SNmQKKm",
    "https://www.linkedin.com/company/ps-protecao",
    "https://www.instagram.com/protecao_seguranca/",
    "https://web.facebook.com/protecaoeseguranca",
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
