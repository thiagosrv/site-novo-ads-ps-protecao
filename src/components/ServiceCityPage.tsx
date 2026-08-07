import Image from "next/image";
import Link from "next/link";
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
import Breadcrumbs, { buildBreadcrumbSchema } from "./Breadcrumbs";
import StatsBar from "./StatsBar";
import Differentiators from "./Differentiators";
import Testimonials from "./Testimonials";
import Implementation from "./Implementation";
import TechSolutions from "./TechSolutions";
import ContactSection from "./ContactSection";
import OurPresence from "./OurPresence";
import { CITIES, type City } from "@/lib/cities";
import { CATEGORY_LABEL, type ProgrammaticService } from "@/lib/services";
import { buildComboSlug, buildHubSlug, getRelatedServiceCards } from "@/lib/programmatic";
import { SITE_URL } from "@/lib/seo";

const ICON_BY_CATEGORY = {
  portaria: ShieldCheck,
  limpeza: SprayCan,
  facilities: Wrench,
  vigilancia: Eye,
  jardinagem: SprayCan,
  recepcao: Headset,
  geral: Users,
} as const;

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

function buildComboFaq(service: ProgrammaticService, city: City): FaqItem[] {
  const nameLower = service.name.toLowerCase();
  return [
    {
      question: `A PS Proteção oferece ${service.name.toLowerCase()} na região do CEP ${city.cep}, em ${city.name}?`,
      answer: `Sim. Atendemos ${city.name} (região do CEP ${city.cep}) e toda a ${city.region}, a partir da nossa sede em Americana, SP, com o mesmo padrão operacional aplicado em todos os municípios cobertos.`,
    },
    {
      question: `O que está incluso em ${service.name.toLowerCase()} em ${city.name}?`,
      answer: service.intro,
    },
    {
      question: `Quanto tempo leva para implantar ${nameLower} em ${city.name}?`,
      answer: `O prazo médio é de 5 a 15 dias úteis, contando diagnóstico do posto, seleção e treinamento da equipe com POP (Procedimento Operacional Padrão) específico para o seu endereço em ${city.name}, e início da operação com supervisão intensiva nas primeiras semanas.`,
    },
    {
      question: `Como funciona a substituição em caso de falta na equipe em ${city.name}?`,
      answer: `Mantemos equipe de reserva treinada para cobrir faltas, férias e desligamentos em qualquer posto da nossa área de atuação, incluindo ${city.name}, garantindo que a operação nunca fique descoberta.`,
    },
    {
      question: `Empresas pequenas e condomínios em ${city.name} também podem contratar ${nameLower}?`,
      answer: `Sim. Dimensionamos ${nameLower} conforme o porte da operação — desde pequenos comércios e condomínios até indústrias de grande porte em ${city.name} e região.`,
    },
  ];
}

export default function ServiceCityPage({
  service,
  city,
}: {
  service: ProgrammaticService;
  city: City;
}) {
  const Icon = ICON_BY_CATEGORY[service.category];
  const isPortariaHero = service.category === "portaria";
  const faqItems = buildComboFaq(service, city);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: `Serviços em ${city.name}`, href: `/${buildHubSlug(city)}` },
    { label: `${service.name} em ${city.name}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} em ${city.name}, SP`,
    description: service.intro,
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

  const relatedCards = getRelatedServiceCards(service.category, city, 4);
  const nearbyCities = CITIES.filter(
    (c) => c.region === city.region && c.slug !== city.slug
  ).slice(0, 6);

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

      <section
        className={`relative flex items-center overflow-hidden pt-28 pb-16 md:pt-20 ${
          isPortariaHero
            ? "md:min-h-screen bg-gradient-to-br from-navy via-navy to-navy-deep"
            : "min-h-screen bg-navy"
        }`}
      >
        <div className="absolute inset-0 z-0">
          {!isPortariaHero && (
            <Image
              src="/assets/background-mobile.webp"
              alt={`Profissional de segurança da PS Proteção em ${service.name.toLowerCase()} em ${city.name}`}
              fill
              priority
              className="object-cover object-[75%_center] md:hidden"
            />
          )}
          <Image
            src={isPortariaHero ? "/assets/uniforme-psprotecao.webp" : "/brand/guarda-fachada.png"}
            alt={`Profissional de segurança da PS Proteção em ${service.name.toLowerCase()} em ${city.name}`}
            fill
            priority
            quality={isPortariaHero ? 90 : undefined}
            className={`hidden object-cover md:block ${isPortariaHero ? "object-[75%_20%]" : "object-[75%_center]"}`}
          />
          <div className={`absolute inset-0 hero-gradient ${isPortariaHero ? "hidden md:block" : ""}`} />
          {isPortariaHero && (
            <>
              <div
                className="texture-halftone absolute inset-0 pointer-events-none opacity-20 hidden md:block"
                style={{ maskImage: "linear-gradient(to right, transparent 0%, black 58%)" }}
                aria-hidden="true"
              />
              <div
                className="texture-halftone absolute inset-0 pointer-events-none opacity-20 md:hidden"
                aria-hidden="true"
              />
            </>
          )}
        </div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
          viewBox="0 0 1440 800"
          aria-hidden="true"
        >
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="80" x2="80" y1="0" y2="800" />
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="1360" x2="1360" y1="0" y2="800" />
          <circle className="fill-yellow" cx="80" cy="400" r="4" />
          <circle className="fill-yellow" cx="1360" cy="200" r="4" />
          <path className="stroke-yellow" d="M 80 200 L 200 200 L 200 320" fill="none" strokeDasharray="2 2" />
        </svg>

        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] w-full">
          <Reveal>
            <div className="mb-8">
              <Breadcrumbs items={breadcrumbItems} dark />
            </div>
          </Reveal>

          <div className="max-w-2xl mx-auto text-center md:mx-0 md:text-left">
            <Reveal delayMs={80}>
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-5 py-2 rounded-full mb-8 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                  {CATEGORY_LABEL[service.category]} · {city.name}, {city.uf}
                </span>
              </div>
            </Reveal>

            <Reveal delayMs={160}>
              <h1 className="text-white font-heading text-4xl md:text-6xl font-bold leading-[1.1] mb-8">
                {service.name} em{" "}
                <span className="text-yellow">
                  {city.name}, {city.uf}
                </span>
                .
              </h1>
            </Reveal>

            <Reveal delayMs={240}>
              <p className="text-white/80 text-[16px] md:text-lg mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Atendemos {city.name} e toda a {city.region} a partir da nossa sede em Americana,
                SP, com supervisão ativa e o mesmo padrão operacional aplicado em todos os postos.
              </p>
            </Reveal>

            <Reveal delayMs={320}>
              <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
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

            {isPortariaHero && (
              <Reveal delayMs={380}>
                <div className="md:hidden relative mt-10 w-full aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/uniforme-psprotecao.webp"
                    alt={`Profissional de segurança da PS Proteção em ${service.name.toLowerCase()} em ${city.name}`}
                    fill
                    quality={90}
                    className="object-cover object-[75%_20%]"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <StatsBar />
      <Differentiators />

      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center mb-6">
                <Icon className="text-yellow" size={22} />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-navy leading-tight mb-4">
                Sobre {service.name.toLowerCase()} em {city.name}
              </h2>
              <p className="text-graphite/70 text-lg leading-relaxed mb-6">{service.intro}</p>
              <p className="text-graphite/70 leading-relaxed mb-6">
                Atendemos {city.name}, na região do CEP {city.cep}, e toda a {city.region}, a
                partir da nossa sede em Americana, SP, com supervisão ativa e o mesmo padrão
                operacional aplicado em todos os municípios cobertos.
              </p>
              <div className="flex items-center gap-2 text-graphite/60 text-sm font-mono">
                <MapPin size={15} className="text-yellow-dark shrink-0" />
                {city.name}/{city.uf} · CEP {city.cep} · {city.lat.toFixed(4)},{" "}
                {city.lng.toFixed(4)}
              </div>
            </Reveal>

            <div className="lg:col-span-5">
              <ul className="flex flex-col gap-4">
                {service.features.map((feature) => (
                  <Reveal key={feature}>
                    <li className="flex items-start gap-3 p-5 rounded-2xl border border-navy/10 bg-surface">
                      <CheckCircle2 className="text-yellow-dark shrink-0 mt-0.5" size={20} />
                      <span className="text-graphite/80 text-[15px] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Implementation />
      <TechSolutions />

      <section className="py-20 md:py-[var(--spacing-section)] bg-navy relative overflow-hidden">
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
                A partir da nossa sede em Americana, SP, oferecemos {service.name.toLowerCase()}{" "}
                em {city.name} (região do CEP {city.cep}) com o mesmo padrão operacional aplicado
                em toda a nossa área de cobertura: supervisão ativa, POP definido por posto e
                equipe de reserva para garantir que a operação nunca fique descoberta.
              </p>
              {nearbyCities.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-yellow shrink-0" />
                    <span className="font-mono text-xs text-white/50 tracking-wide uppercase">
                      Também atendemos {service.name.toLowerCase()} em
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {nearbyCities.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/${buildComboSlug(service, c)}`}
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

      <section id="faq" className="py-20 md:py-[var(--spacing-section)] bg-surface">
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
                Perguntas sobre {service.name.toLowerCase()} em {city.name}
              </h2>
            </div>
          </Reveal>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <ContactSection />
      <OurPresence />

      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
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
        </div>
      </section>

      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 text-center flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-white max-w-2xl">
              Pronto para contratar {service.name.toLowerCase()} em {city.name}?
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
