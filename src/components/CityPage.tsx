import Link from "next/link";
import {
  ShieldCheck,
  SprayCan,
  Wrench,
  Headset,
  ClipboardList,
  Calculator,
  MapPin,
  PackageCheck,
  GaugeCircle,
  CalendarX,
  ArrowRight,
  Star,
} from "lucide-react";
import CityHero from "./CityHero";
import Reveal from "./Reveal";
import FaqAccordion, { type FaqItem } from "./FaqAccordion";
import WhatsAppCta from "./WhatsAppCta";
import StatsBar from "./StatsBar";
import Differentiators from "./Differentiators";
import Testimonials from "./Testimonials";
import Implementation from "./Implementation";
import TechSolutions from "./TechSolutions";
import ContactSection from "./ContactSection";
import OurPresence from "./OurPresence";
import CityCategoryGrid from "./CityCategoryGrid";
import { CITIES, type City } from "@/lib/cities";
import { SITE_URL } from "@/lib/seo";

const SERVICES = [
  {
    icon: ShieldCheck,
    title: "Portaria e Controle de Acesso",
    text: "Recepção do fluxo de pessoas, visitantes e veículos com Procedimento Operacional Padrão (POP) e registros de entrada e saída.",
  },
  {
    icon: SprayCan,
    title: "Limpeza e Conservação",
    text: "Equipe treinada com produtos e equipamentos inclusos, mantendo o padrão de conservação do seu espaço.",
  },
  {
    icon: Wrench,
    title: "Zeladoria",
    text: "Cuidado contínuo com áreas comuns, manutenção preventiva e zelo pelo patrimônio do cliente.",
  },
  {
    icon: Headset,
    title: "Recepção",
    text: "Atendimento profissional e padronizado para visitantes, clientes e colaboradores.",
  },
  {
    icon: ClipboardList,
    title: "Auxiliar Administrativo",
    text: "Suporte operacional para rotinas administrativas, com processos documentados e supervisionados.",
  },
  {
    icon: Calculator,
    title: "Auxiliar Contábil",
    text: "Apoio em rotinas contábeis com rigor de conformidade e organização.",
  },
];

const DIFFERENTIALS = [
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

function buildFaq(city: City): FaqItem[] {
  const hqItems: FaqItem[] =
    city.slug === "americana"
      ? [
          {
            question: "Onde fica a sede da PS Proteção em Americana?",
            answer:
              "Nossa sede fica na Rua São Gabriel, 1623, no bairro Vila Belvedere, a cerca de 5 minutos do Centro de Americana, ao lado do Portal de Americana e com acesso rápido à Rodovia Anhanguera.",
          },
          {
            question: "É possível visitar a sede da PS Proteção em Americana?",
            answer:
              "Sim. Atendemos presencialmente de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h. Recomendamos agendar previamente pelo WhatsApp para garantir um consultor disponível no horário.",
          },
        ]
      : [];

  return [
    ...hqItems,
    {
      question: `A PS Proteção atende empresas em ${city.name}?`,
      answer: `Sim. A PS Proteção atende empresas, condomínios e indústrias em ${city.name} e em toda a ${city.region}, a partir da nossa sede em Americana, SP, com a mesma supervisão ativa e padrão operacional aplicados em todos os municípios atendidos.`,
    },
    {
      question: `Quanto tempo leva a implantação de um posto de portaria ou limpeza em ${city.name}?`,
      answer: `O prazo médio é de 5 a 15 dias úteis, contando diagnóstico do posto, dimensionamento e seleção da equipe, treinamento com POP (Procedimento Operacional Padrão) específico para o seu endereço em ${city.name} e início da operação com supervisão intensiva nas primeiras semanas.`,
    },
    {
      question: `Terceirizar a portaria ou limpeza em ${city.name} sai mais caro que contratar direto?`,
      answer: `Olhando só o holerite pode parecer mais barato contratar direto, mas o custo real de uma equipe própria inclui encargos, férias, 13º, rescisão e turnover. Para empresas em ${city.name}, a terceirização com a PS Proteção reúne tudo isso em uma única fatura mensal previsível, sem custos ocultos.`,
    },
    {
      question: `Como funciona a substituição de um profissional em caso de falta em ${city.name}?`,
      answer: `Mantemos equipe de reserva treinada para cobrir faltas, férias e desligamentos em qualquer posto da nossa área de atuação, incluindo ${city.name}, garantindo que a operação nunca fique descoberta.`,
    },
    {
      question: `Quais serviços a PS Proteção oferece em ${city.name}?`,
      answer: `Em ${city.name} oferecemos portaria e controle de acesso, limpeza e conservação, zeladoria, recepção, auxiliar administrativo e auxiliar contábil — isolados ou integrados em um único contrato de facilities com gestão unificada.`,
    },
    {
      question: `Empresas pequenas ou condomínios em ${city.name} também podem contratar?`,
      answer: `Sim. Atendemos desde pequenos comércios e condomínios até indústrias de grande porte em ${city.name}, com a operação dimensionada conforme o tamanho do local e as necessidades específicas de cada cliente.`,
    },
  ];
}

export default function CityPage({ city }: { city: City }) {
  const isHQ = city.slug === "americana";
  const faqItems = buildFaq(city);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = isHQ
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}/${city.slug}` },
        ],
      }
    : null;

  const relatedCities = CITIES.filter(
    (c) => c.region === city.region && c.slug !== city.slug
  ).slice(0, 8);

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <CityHero city={city} />
      <StatsBar />
      <Differentiators />

      {isHQ && (
        <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
          <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <Reveal className="lg:col-span-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-yellow" />
                  <span className="font-mono text-navy text-sm tracking-widest uppercase">
                    Nossa sede
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-5">
                  Sede própria no Vila Belvedere, a 5 minutos do Centro de Americana
                </h2>
                <p className="text-graphite/70 text-lg leading-relaxed mb-6">
                  Nosso endereço fica ao lado do Portal de Americana, com acesso rápido à Rodovia
                  Anhanguera — uma localização estratégica que agiliza o deslocamento das nossas
                  equipes de supervisão para toda a Região Metropolitana de Campinas.
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1 text-yellow-dark">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <a
                    href="https://share.google/hnbDKKadI4SNmQKKm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-navy hover:text-yellow-dark transition-colors"
                  >
                    4.8 · 70 avaliações no Google
                  </a>
                </div>
                <p className="font-mono text-sm text-graphite/60">
                  Rua São Gabriel, 1623 — Vila Belvedere, Americana/SP
                </p>
              </Reveal>

              <Reveal className="lg:col-span-6" delayMs={120}>
                <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-navy/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <iframe
                    src="https://www.google.com/maps?q=Rua+S%C3%A3o+Gabriel%2C+1623+-+Vila+Belvedere%2C+Americana+-+SP%2C+13473-000&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização da sede da PS Proteção em Americana, SP"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {!isHQ && city.hqProximity && (
        <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
          <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
            <Reveal className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Sede próxima
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-5">
                Sede a {city.hqProximity.minutes} minutos de {city.name}
              </h2>
              <p className="text-graphite/70 text-lg leading-relaxed mb-6">
                Resposta imediata em {city.name}. Atendemos em postos de serviço no{" "}
                {city.hqProximity.industrialArea} e em toda a cidade, com a mesma supervisão
                ativa e padrão operacional da nossa sede em Americana.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-dark">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <a
                  href="https://share.google/hnbDKKadI4SNmQKKm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-navy hover:text-yellow-dark transition-colors"
                >
                  4.8 · 70 avaliações no Google
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Serviços em {city.name}
                </span>
                <span className="w-8 h-px bg-yellow" />
              </div>
              <h2 className="font-heading text-3xl md:text-[48px] text-navy leading-tight mb-4">
                Nossos Serviços em {city.name}, que protegem e valorizam seu ativo.
              </h2>
              <p className="text-graphite/70 text-lg leading-relaxed">
                Uma equipe terceirizada, treinada e supervisionada, dimensionada para o perfil da
                sua operação em {city.name}.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delayMs={i * 60}>
                  <div className="h-full p-8 rounded-3xl border border-navy/10 bg-white hover:border-yellow/50 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center mb-6">
                      <Icon className="text-yellow" size={22} />
                    </div>
                    <h3 className="font-heading text-lg text-navy mb-3">{service.title}</h3>
                    <p className="text-graphite/70 text-sm leading-relaxed">{service.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CityCategoryGrid city={city} />

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
                A partir da nossa sede em Americana, SP, atendemos {city.name} com o mesmo padrão
                operacional aplicado em toda a nossa área de cobertura: supervisão ativa, POP
                definido por posto e equipe de reserva para garantir que a operação nunca fique
                descoberta.
              </p>
              {relatedCities.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-yellow shrink-0" />
                    <span className="font-mono text-xs text-white/50 tracking-wide uppercase">
                      Também atendemos na região
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {relatedCities.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/${c.slug}`}
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
              {DIFFERENTIALS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delayMs={i * 80}>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                        <Icon className="text-yellow" size={20} />
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
              <h2 className="font-heading text-3xl md:text-[48px] text-navy leading-tight mb-4">
                Perguntas sobre terceirização em {city.name}
              </h2>
              <p className="text-graphite/70 text-lg leading-relaxed">
                Reunimos as dúvidas mais comuns de empresas e condomínios de {city.name} na hora
                de terceirizar portaria, limpeza e facilities.
              </p>
            </div>
          </Reveal>

          <FaqAccordion items={faqItems} />

          <Reveal delayMs={200}>
            <div className="text-center mt-10">
              <Link
                href="/duvidas"
                className="inline-flex items-center gap-2 text-navy font-heading font-semibold hover:text-navy-deep transition-colors"
              >
                Ver central de dúvidas completa
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactSection />
      <OurPresence />

      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 text-center flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-white max-w-2xl">
              Pronto para terceirizar sua operação em {city.name}?
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="text-white/70 text-lg max-w-xl">
              Solicite um diagnóstico gratuito e conheça a proposta da PS Proteção para a sua
              empresa em {city.name}.
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
