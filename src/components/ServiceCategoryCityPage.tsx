import Link from "next/link";
import type { ReactNode } from "react";
import {
  ShieldCheck,
  SprayCan,
  Wrench,
  Headset,
  Eye,
  Users,
  ArrowRight,
  CheckCircle2,
  MapPin,
  PackageCheck,
  CalendarX,
  GaugeCircle,
} from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppCta from "./WhatsAppCta";
import FaqAccordion, { type FaqItem } from "./FaqAccordion";
import Breadcrumbs, { buildBreadcrumbSchema, type BreadcrumbItem } from "./Breadcrumbs";
import StatsBar from "./StatsBar";
import Differentiators from "./Differentiators";
import Testimonials from "./Testimonials";
import Implementation from "./Implementation";
import TechSolutions from "./TechSolutions";
import ContactSection from "./ContactSection";
import OurPresence from "./OurPresence";
import { CITIES, type City } from "@/lib/cities";
import {
  SERVICES,
  CATEGORY_LABEL,
  CATEGORY_REPRESENTATIVE_SLUG,
  getServiceBySlug,
  type ServiceCategory,
} from "@/lib/services";
import { SEGMENTS } from "@/lib/segments";
import {
  CATEGORY_ORDER,
  buildHubSlug,
  buildComboSlug,
  buildSegmentComboSlug,
  buildCategoryFlatSlugA,
  buildCategoryNestedPath,
  buildSegmentNestedPath,
  buildServiceNestedPath,
  getRelatedServiceCards,
} from "@/lib/programmatic";
import { SITE_URL } from "@/lib/seo";

export type CategoryPageVariant = "flat-a" | "flat-b" | "nested";

const ICON_BY_CATEGORY: Record<ServiceCategory, typeof ShieldCheck> = {
  portaria: ShieldCheck,
  limpeza: SprayCan,
  facilities: Wrench,
  vigilancia: Eye,
  jardinagem: SprayCan,
  recepcao: Headset,
  geral: Users,
};

const REGIONAL_DIFFERENTIALS = [
  {
    icon: PackageCheck,
    title: "Implantação Estruturada",
    text: "Diagnóstico do posto, seleção da equipe e treinamento com POP específico, com início de operação em 5 a 15 dias úteis.",
  },
  {
    icon: CalendarX,
    title: "Equipe de Reserva",
    text: "Cobertura imediata em caso de falta, férias ou desligamento, para que o posto nunca fique desguarnecido.",
  },
  {
    icon: GaugeCircle,
    title: "Supervisão de Bancada",
    text: "Dupla camada de supervisão — campo e bancada — com o dispositivo \"Sempre Alerta\" e relatórios periódicos.",
  },
];

function getHeroTitleClasses(fullText: string): string {
  return fullText.length > 55
    ? "text-3xl md:text-[51px] leading-[1.15]"
    : "text-4xl md:text-6xl leading-[1.1]";
}

const HERO_TITLE_TEXT: Record<CategoryPageVariant, (label: string, city: City) => string> = {
  "flat-a": (label, city) => `${label} em ${city.name}, ${city.uf}`,
  "flat-b": (label, city) => `Serviço de ${label} em ${city.name}, ${city.uf}`,
  nested: (label, city) => `${label} terceirizada em ${city.name}, ${city.uf}`,
};

const HERO_SUBTITLE: Record<CategoryPageVariant, (label: string, city: City) => string> = {
  "flat-a": (label, city) =>
    `Reduza o custo total da operação de ${label.toLowerCase()} em ${city.name}: uma fatura mensal previsível substitui encargos, férias, 13º e rescisão de uma equipe própria.`,
  "flat-b": (label, city) =>
    `Contrato formal, encargos em dia e supervisão documentada para ${label.toLowerCase()} em ${city.name}, reduzindo o risco trabalhista de manter uma equipe própria.`,
  nested: (label, city) =>
    `Atendemos ${city.name} e toda a ${city.region} a partir da nossa sede em Americana, SP, com um processo de implantação estruturado para ${label.toLowerCase()}.`,
};

const SOBRE_INTRO: Record<CategoryPageVariant, (label: string, city: City) => string> = {
  "flat-a": (label, city) =>
    `Terceirizar ${label.toLowerCase()} em ${city.name} reúne todos os custos de uma equipe própria — salário, encargos, férias, 13º e rescisão — em uma única fatura mensal, sem surpresas no fluxo de caixa da sua empresa ou condomínio.`,
  "flat-b": (label, city) =>
    `Empresas e condomínios em ${city.name} contratam ${label.toLowerCase()} terceirizada da PS Proteção por conformidade: contrato formal, obrigações trabalhistas em dia e relatórios periódicos de supervisão, sem o passivo trabalhista de uma equipe própria.`,
  nested: (label, city) =>
    `A implantação de ${label.toLowerCase()} em ${city.name} segue um processo estruturado: diagnóstico do posto, dimensionamento da equipe, treinamento com POP (Procedimento Operacional Padrão) específico e início de operação com supervisão intensiva nas primeiras semanas.`,
};

const CTA_TITLE: Record<CategoryPageVariant, (label: string, city: City) => string> = {
  "flat-a": (label, city) => `Pronto para reduzir custos com ${label.toLowerCase()} em ${city.name}?`,
  "flat-b": (label, city) => `Pronto para terceirizar ${label.toLowerCase()} com conformidade em ${city.name}?`,
  nested: (label, city) => `Pronto para implantar ${label.toLowerCase()} em ${city.name}?`,
};

function buildCategoryFaqPool(label: string, city: City): FaqItem[] {
  const labelLower = label.toLowerCase();
  return [
    {
      question: `A PS Proteção oferece ${labelLower} em ${city.name}?`,
      answer: `Sim. Atendemos ${city.name} (região do CEP ${city.cep}) e toda a ${city.region}, a partir da nossa sede em Americana, SP, com o mesmo padrão operacional aplicado em todos os municípios cobertos.`,
    },
    {
      question: `Quanto tempo leva a implantação de ${labelLower} em ${city.name}?`,
      answer: `O prazo médio é de 5 a 15 dias úteis, contando diagnóstico do posto, seleção e treinamento da equipe com POP específico para o seu endereço em ${city.name}, e início da operação com supervisão intensiva nas primeiras semanas.`,
    },
    {
      question: `Terceirizar ${labelLower} em ${city.name} sai mais caro que contratar direto?`,
      answer: `Olhando só o holerite pode parecer mais barato contratar direto, mas o custo real de uma equipe própria inclui encargos, férias, 13º, rescisão e turnover. Em ${city.name}, a terceirização reúne tudo isso em uma única fatura mensal previsível.`,
    },
    {
      question: `Como funciona a substituição em caso de falta na equipe de ${labelLower} em ${city.name}?`,
      answer: `Mantemos equipe de reserva treinada para cobrir faltas, férias e desligamentos em qualquer posto de ${labelLower} na nossa área de atuação, incluindo ${city.name}, garantindo que a operação nunca fique descoberta.`,
    },
    {
      question: `Quais segmentos contratam ${labelLower} em ${city.name}?`,
      answer: `Atendemos condomínios, indústrias, centros logísticos, hospitais, escolas e empresas de diversos portes em ${city.name}, cada um com escopo e POP dimensionados para o perfil da operação.`,
    },
    {
      question: `Empresas pequenas em ${city.name} também podem contratar ${labelLower}?`,
      answer: `Sim. Dimensionamos ${labelLower} conforme o porte da operação — desde pequenos comércios e condomínios até indústrias de grande porte em ${city.name} e região.`,
    },
    {
      question: `É possível integrar ${labelLower} com outros serviços em ${city.name}?`,
      answer: `Sim. É possível combinar ${labelLower} com limpeza, recepção e demais frentes de facilities em um único contrato, com gestão unificada em ${city.name}.`,
    },
  ];
}

const FAQ_SELECTION: Record<CategoryPageVariant, number[]> = {
  "flat-a": [0, 1, 2, 3, 4],
  "flat-b": [2, 3, 4, 5, 6],
  nested: [0, 2, 4, 5, 6],
};

export default function ServiceCategoryCityPage({
  category,
  city,
  variant,
}: {
  category: ServiceCategory;
  city: City;
  variant: CategoryPageVariant;
}) {
  const Icon = ICON_BY_CATEGORY[category];
  const categoryLabel = CATEGORY_LABEL[category];
  const representativeService = getServiceBySlug(CATEGORY_REPRESENTATIVE_SLUG[category]);

  const heroTitleText = HERO_TITLE_TEXT[variant](categoryLabel, city);
  const heroTitleClasses = getHeroTitleClasses(heroTitleText);

  const faqPool = buildCategoryFaqPool(categoryLabel, city);
  const faqItems = FAQ_SELECTION[variant].map((i) => faqPool[i]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbItems: BreadcrumbItem[] =
    variant === "nested"
      ? [
          { label: "Início", href: "/" },
          { label: city.name, href: `/${city.slug}` },
          { label: `${categoryLabel} em ${city.name}` },
        ]
      : [
          { label: "Início", href: "/" },
          { label: "Serviços", href: "/servicos" },
          { label: `Serviços em ${city.name}`, href: `/${buildHubSlug(city)}` },
          { label: `${categoryLabel} em ${city.name}` },
        ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: categoryLabel,
    name: `${categoryLabel} em ${city.name}, SP`,
    description: representativeService?.intro ?? SOBRE_INTRO[variant](categoryLabel, city),
    provider: {
      "@type": "LocalBusiness",
      name: "PS Proteção",
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.uf,
        postalCode: city.cep,
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lng,
      },
    },
  };

  const categoryServices = SERVICES.filter((s) => s.category === category).slice(0, 6);
  const categorySegments = SEGMENTS.filter((s) => s.relevantCategories.includes(category)).slice(
    0,
    6
  );
  const otherCategories = CATEGORY_ORDER.filter((c) => c !== category).slice(0, 4);
  const relatedCards = getRelatedServiceCards(category, city, 4);
  const nearbyCities = CITIES.filter(
    (c) => c.region === city.region && c.slug !== city.slug
  ).slice(0, 6);

  const serviceHref = (serviceSlugOwner: (typeof categoryServices)[number]) =>
    variant === "nested"
      ? buildServiceNestedPath(serviceSlugOwner, city)
      : `/${buildComboSlug(serviceSlugOwner, city)}`;

  const segmentHref = (segment: (typeof categorySegments)[number]) =>
    variant === "nested"
      ? buildSegmentNestedPath(category, segment, city)
      : `/${buildSegmentComboSlug(category, segment, city)}`;

  const categoryHref = (otherCategory: ServiceCategory) =>
    variant === "nested"
      ? buildCategoryNestedPath(otherCategory, city)
      : `/${buildCategoryFlatSlugA(otherCategory, city)}`;

  const sobreSection = (
    <section key="sobre" className="py-20 md:py-[var(--spacing-section)] bg-white">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center mb-6">
              <Icon className="text-yellow" size={22} />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-navy leading-tight mb-4">
              Sobre {categoryLabel.toLowerCase()} em {city.name}
            </h2>
            <p className="text-graphite/70 text-lg leading-relaxed mb-6">
              {SOBRE_INTRO[variant](categoryLabel, city)}
            </p>
            <div className="flex items-center gap-2 text-graphite/60 text-sm font-mono">
              <MapPin size={15} className="text-yellow-dark shrink-0" />
              {city.name}/{city.uf} · CEP {city.cep} · {city.lat.toFixed(4)}, {city.lng.toFixed(4)}
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <ul className="flex flex-col gap-4">
              {(representativeService?.features ?? []).map((feature) => (
                <Reveal key={feature}>
                  <li className="flex items-start gap-3 p-5 rounded-2xl border border-navy/10 bg-surface">
                    <CheckCircle2 className="text-yellow-dark shrink-0 mt-0.5" size={20} />
                    <span className="text-graphite/80 text-[15px] leading-relaxed">{feature}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  const testimonialsSection = <Testimonials key="testimonials" />;
  const implementationSection = <Implementation key="implementation" />;
  const techSolutionsSection = <TechSolutions key="tech" />;
  const differentiatorsSection = <Differentiators key="differentiators" />;

  const coberturaSection = (
    <section
      key="cobertura"
      className="py-20 md:py-[var(--spacing-section)] bg-navy relative overflow-hidden"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-yellow text-sm tracking-widest uppercase">
                Cobertura regional
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-[40px] text-white leading-tight mb-5">
              Presença ativa em {city.name} e em toda a {city.region}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              A partir da nossa sede em Americana, SP, oferecemos {categoryLabel.toLowerCase()} em{" "}
              {city.name} (região do CEP {city.cep}) com o mesmo padrão operacional aplicado em
              toda a nossa área de cobertura: supervisão ativa, POP definido por posto e equipe de
              reserva para garantir que a operação nunca fique descoberta.
            </p>
            {nearbyCities.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-yellow shrink-0" />
                  <span className="font-mono text-xs text-white/50 tracking-wide uppercase">
                    Também atendemos {categoryLabel.toLowerCase()} em
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {nearbyCities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={
                          variant === "nested"
                            ? buildCategoryNestedPath(category, c)
                            : `/${buildCategoryFlatSlugA(category, c)}`
                        }
                        className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-white/75 tracking-wide hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          <div className="lg:col-span-5 flex flex-col gap-5">
            {REGIONAL_DIFFERENTIALS.map((item, i) => {
              const DiffIcon = item.icon;
              return (
                <Reveal key={item.title} delayMs={i * 80}>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <DiffIcon className="text-yellow" size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading text-white text-base mb-2">{item.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  const faqSection = (
    <section key="faq" id="faq" className="py-20 md:py-[var(--spacing-section)] bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                Dúvidas frequentes
              </span>
              <span className="w-8 h-px bg-yellow" />
            </div>
            <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-4">
              Perguntas sobre {categoryLabel.toLowerCase()} em {city.name}
            </h2>
          </div>
        </Reveal>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );

  const sectionOrder: Record<CategoryPageVariant, ReactNode[]> = {
    "flat-a": [
      differentiatorsSection,
      sobreSection,
      testimonialsSection,
      implementationSection,
      techSolutionsSection,
      coberturaSection,
      faqSection,
    ],
    "flat-b": [
      sobreSection,
      differentiatorsSection,
      implementationSection,
      techSolutionsSection,
      testimonialsSection,
      faqSection,
      coberturaSection,
    ],
    nested: [
      differentiatorsSection,
      sobreSection,
      implementationSection,
      testimonialsSection,
      techSolutionsSection,
      coberturaSection,
      faqSection,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="relative bg-navy pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
          viewBox="0 0 1440 400"
          aria-hidden="true"
        >
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="80" x2="80" y1="0" y2="400" />
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="1360" x2="1360" y1="0" y2="400" />
          <circle className="fill-yellow" cx="80" cy="200" r="4" />
          <circle className="fill-yellow" cx="1360" cy="120" r="4" />
        </svg>

        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-8">
              <Breadcrumbs items={breadcrumbItems} dark />
            </div>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal delayMs={80}>
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-5 py-2 rounded-full mb-8 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                  {categoryLabel} · {city.name}, {city.uf}
                </span>
              </div>
            </Reveal>
            <Reveal delayMs={160}>
              <h1 className={`text-white font-heading font-bold mb-6 ${heroTitleClasses}`}>
                {heroTitleText}
              </h1>
            </Reveal>
            <Reveal delayMs={240}>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                {HERO_SUBTITLE[variant](categoryLabel, city)}
              </p>
            </Reveal>
            <Reveal delayMs={320}>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <WhatsAppCta
                  city={city.name}
                  className="px-7 py-3.5 text-[15px] hover:scale-[1.03] shadow-[0_8px_24px_rgba(252,191,7,0.25)]"
                  label={
                    <>
                      Solicitar diagnóstico em {city.name}
                      <ArrowRight size={18} />
                    </>
                  }
                />
                <Link
                  href={`/${buildHubSlug(city)}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-[15px] font-heading font-semibold tracking-wide text-white text-center transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5"
                >
                  Ver todos os serviços em {city.name}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsBar />
      {sectionOrder[variant]}

      <ContactSection />
      <OurPresence />

      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          {categoryServices.length > 0 && (
            <div className="mb-16">
              <Reveal>
                <h2 className="font-heading text-2xl md:text-3xl text-navy leading-tight mb-6">
                  Variações de {categoryLabel.toLowerCase()} em {city.name}
                </h2>
              </Reveal>
              <ul className="flex flex-wrap gap-2.5">
                {categoryServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={serviceHref(service)}
                      className="inline-block px-4 py-2 bg-surface border border-navy/10 rounded-full font-mono text-xs text-graphite/70 tracking-wide hover:border-yellow/50 hover:text-navy transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {categorySegments.length > 0 && (
            <div className="mb-16">
              <Reveal>
                <h2 className="font-heading text-2xl md:text-3xl text-navy leading-tight mb-6">
                  {categoryLabel} para segmentos específicos em {city.name}
                </h2>
              </Reveal>
              <ul className="flex flex-wrap gap-2.5">
                {categorySegments.map((segment) => (
                  <li key={segment.slug}>
                    <Link
                      href={segmentHref(segment)}
                      className="inline-block px-4 py-2 bg-surface border border-navy/10 rounded-full font-mono text-xs text-graphite/70 tracking-wide hover:border-yellow/50 hover:text-navy transition-colors"
                    >
                      {segment.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Reveal>
            <div className="text-center mb-12 max-w-xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl text-navy leading-tight mb-3">
                Outros serviços em {city.name}
              </h2>
              <p className="text-graphite/70">
                Conheça outras frentes de terceirização que oferecemos em {city.name}.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedCards.map(({ service: related, href }, i) => {
              const RelatedIcon = ICON_BY_CATEGORY[related.category];
              return (
                <Reveal key={related.slug} delayMs={i * 80}>
                  <Link
                    href={href}
                    className="group h-full flex flex-col p-6 rounded-2xl border border-navy/10 bg-surface hover:border-yellow/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center mb-4">
                      <RelatedIcon className="text-yellow" size={18} />
                    </div>
                    <h3 className="font-heading text-base text-navy mb-2 leading-snug">
                      {related.name} em {city.name}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-yellow-dark text-sm font-semibold">
                      Saiba mais
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {otherCategories.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2.5 justify-center">
              {otherCategories.map((otherCategory) => (
                <Link
                  key={otherCategory}
                  href={categoryHref(otherCategory)}
                  className="inline-block px-4 py-2 bg-surface border border-navy/10 rounded-full font-mono text-xs text-graphite/70 tracking-wide hover:border-yellow/50 hover:text-navy transition-colors"
                >
                  {CATEGORY_LABEL[otherCategory]} em {city.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 text-center flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-white max-w-2xl">
              {CTA_TITLE[variant](categoryLabel, city)}
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="text-white/70 text-lg max-w-xl">
              Solicite um diagnóstico gratuito e conheça a proposta da PS Proteção para a sua
              operação em {city.name}.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <WhatsAppCta
              city={city.name}
              className="px-7 py-3.5 text-[15px] hover:scale-[1.03] shadow-[0_8px_24px_rgba(252,191,7,0.25)]"
              label={
                <>
                  Solicitar diagnóstico em {city.name}
                  <ArrowRight size={18} />
                </>
              }
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
