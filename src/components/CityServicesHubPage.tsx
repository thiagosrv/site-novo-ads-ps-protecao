import Link from "next/link";
import {
  ShieldCheck,
  SprayCan,
  Wrench,
  Headset,
  Eye,
  Users,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppCta from "./WhatsAppCta";
import FaqAccordion, { type FaqItem } from "./FaqAccordion";
import Breadcrumbs, { buildBreadcrumbSchema } from "./Breadcrumbs";
import type { City } from "@/lib/cities";
import { SERVICES, CATEGORY_LABEL, type RealServiceId } from "@/lib/services";
import { CATEGORY_ORDER, buildComboSlug, getRealServiceComboHref } from "@/lib/programmatic";

const ICON_BY_CATEGORY = {
  portaria: ShieldCheck,
  limpeza: SprayCan,
  facilities: Wrench,
  vigilancia: Eye,
  jardinagem: SprayCan,
  recepcao: Headset,
  geral: Users,
} as const;

const REAL_SERVICES: { id: RealServiceId; title: string; description: string }[] = [
  {
    id: "portaria",
    title: "Portaria e Controle de Acesso",
    description: "Gestão de acesso, triagem de visitantes e registro de ocorrências.",
  },
  {
    id: "limpeza",
    title: "Limpeza e Conservação",
    description: "Equipe uniformizada, produtos inclusos e rotinas de higienização.",
  },
  {
    id: "zeladoria",
    title: "Zeladoria",
    description: "Manutenção preventiva básica, organização e zelo pelo patrimônio.",
  },
  {
    id: "administrativo",
    title: "Auxiliar Administrativo",
    description: "Suporte a processos internos, documentos e rotinas administrativas.",
  },
  {
    id: "recepcao",
    title: "Recepção",
    description: "Atendimento presencial e telefônico, com controle de agenda e visitas.",
  },
  {
    id: "contabil",
    title: "Auxiliar Contábil",
    description: "Suporte em rotinas contábeis, lançamentos e conciliações.",
  },
];

function buildHubFaq(city: City): FaqItem[] {
  return [
    {
      question: `Quais serviços a PS Proteção oferece em ${city.name}?`,
      answer: `Em ${city.name} oferecemos portaria e controle de acesso, limpeza e conservação, zeladoria, recepção, auxiliar administrativo e auxiliar contábil, isolados ou integrados em um único contrato de facilities.`,
    },
    {
      question: `A PS Proteção atende toda a região de ${city.name}, CEP ${city.cep}?`,
      answer: `Sim. Atendemos ${city.name} (região do CEP ${city.cep}) e toda a ${city.region}, a partir da nossa sede em Americana, SP, com supervisão ativa em todos os postos.`,
    },
    {
      question: `Como escolher o serviço certo para minha empresa em ${city.name}?`,
      answer: `Nesta página organizamos por categoria as variações de serviço mais buscadas para ${city.name}. Cada uma leva a uma página com escopo, prazo de implantação e perguntas frequentes específicas para a sua necessidade.`,
    },
    {
      question: `É possível combinar mais de um serviço em ${city.name}?`,
      answer: `Sim. É possível integrar portaria, limpeza, zeladoria e recepção em um único contrato de facilities, com gestão unificada e um só ponto de contato comercial.`,
    },
  ];
}

export default function CityServicesHubPage({ city }: { city: City }) {
  const faqItems = buildHubFaq(city);
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
    { label: `Serviços em ${city.name}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
                <span className="w-2.5 h-2.5 rounded-full bg-yellow" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                  {city.name}, {city.uf} · {city.region}
                </span>
              </div>
            </Reveal>
            <Reveal delayMs={160}>
              <h1 className="text-white font-heading text-4xl md:text-5xl font-bold leading-[1.15] mb-6">
                Todos os nossos serviços em {city.name}, {city.uf}
              </h1>
            </Reveal>
            <Reveal delayMs={240}>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                Diretório completo de terceirização de portaria, limpeza, zeladoria e recepção
                para {city.name}, região do CEP {city.cep}, e toda a {city.region}.
              </p>
            </Reveal>
            <Reveal delayMs={320}>
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
        </div>
      </section>

      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Nosso portfólio real
                </span>
                <span className="w-8 h-px bg-yellow" />
              </div>
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-4">
                6 serviços de facilities para {city.name}
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_SERVICES.map((real, i) => {
              const href = getRealServiceComboHref(real.id, city) ?? `/servicos#${real.id}`;
              return (
                <Reveal key={real.id} delayMs={i * 60}>
                  <Link
                    href={href}
                    className="group h-full flex flex-col p-7 rounded-3xl border border-navy/10 bg-surface hover:border-yellow/50 transition-colors"
                  >
                    <h3 className="font-heading text-lg text-navy mb-2">{real.title}</h3>
                    <p className="text-graphite/70 text-sm leading-relaxed mb-5">
                      {real.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-yellow-dark text-sm font-semibold">
                      Ver em {city.name}
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Diretório completo
                </span>
                <span className="w-8 h-px bg-yellow" />
              </div>
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-4">
                Todas as variações de serviço em {city.name}
              </h2>
              <p className="text-graphite/70 text-lg leading-relaxed">
                Encontre a página específica para o que você procura em {city.name}, organizada
                por categoria.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            {CATEGORY_ORDER.map((category) => {
              const CategoryIcon = ICON_BY_CATEGORY[category];
              const items = SERVICES.filter((s) => s.category === category);
              if (items.length === 0) return null;
              return (
                <Reveal key={category}>
                  <div className="bg-white rounded-3xl border border-navy/10 p-7 md:p-9">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center shrink-0">
                        <CategoryIcon className="text-yellow" size={18} />
                      </div>
                      <h3 className="font-heading text-lg text-navy">
                        {CATEGORY_LABEL[category]}
                      </h3>
                    </div>
                    <ul className="flex flex-wrap gap-2.5">
                      {items.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/${buildComboSlug(service, city)}`}
                            className="inline-block px-4 py-2 bg-surface border border-navy/10 rounded-full font-mono text-xs text-graphite/70 tracking-wide hover:border-yellow/50 hover:text-navy transition-colors"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 md:py-[var(--spacing-section)] bg-white">
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
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight">
                Perguntas sobre nossos serviços em {city.name}
              </h2>
            </div>
          </Reveal>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 text-center flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-white max-w-2xl">
              Pronto para terceirizar sua operação em {city.name}?
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="text-white/70 text-lg max-w-xl flex items-center gap-2 justify-center">
              <MapPin size={16} className="text-yellow shrink-0" />
              {city.name}/{city.uf} · CEP {city.cep}
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
