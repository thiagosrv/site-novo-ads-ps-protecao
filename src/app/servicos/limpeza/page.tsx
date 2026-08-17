import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  SprayCan,
  ClipboardCheck,
  Clock,
  UsersRound,
  BadgeCheck,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  Building2,
} from "lucide-react";
import GsapReveal from "@/components/GsapReveal";
import WhatsAppCta from "@/components/WhatsAppCta";
import SectionLabel from "@/components/SectionLabel";
import ProcessCard from "@/components/ProcessCard";
import MarqueeBand from "@/components/MarqueeBand";
import WhereWeOperate from "@/components/WhereWeOperate";
import Breadcrumbs, { buildBreadcrumbSchema } from "@/components/Breadcrumbs";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Limpeza Terceirizada | PS Proteção",
  description:
    "Limpeza terceirizada com equipe própria em CLT, contratação mínima de 44h semanais e auditoria periódica de qualidade. Solicite uma proposta sem compromisso.",
  alternates: {
    canonical: "/servicos/limpeza",
  },
};

const HERO_CHECKS = [
  "Equipe própria em CLT, sem subcontratação",
  "Contratação mínima de 44h semanais por posto",
  "Escala dimensionada pela área e circulação do local",
  "Sem letras miúdas: escopo e SLA por escrito",
];

const PILLARS = [
  {
    n: "1",
    icon: ClipboardCheck,
    title: "Diagnóstico e Implantação Rápida",
    text: "Levantamento da área construída e do fluxo de circulação, dimensionamento da equipe e início de operação em 5 a 15 dias úteis.",
  },
  {
    n: "2",
    icon: Clock,
    title: "Contratação Mínima de 44h Semanais",
    text: "Modelo de contratação com carga horária mínima de 44h semanais por posto, dimensionada conforme a área e o fluxo de circulação do seu ambiente.",
  },
  {
    n: "3",
    icon: UsersRound,
    title: "Reposição Rápida sem Custo Extra",
    text: "Cobertura imediata em faltas, férias e desligamentos, com profissionais treinados e integrados à rotina do seu local.",
  },
  {
    n: "4",
    icon: BadgeCheck,
    title: "Auditoria de Qualidade Periódica",
    text: "Rotinas de higienização definidas em POP e auditadas sem aviso prévio, para garantir o padrão combinado mês a mês.",
    accent: true,
  },
];

const MARQUEE_ITEMS = ["Limpeza Terceirizada", "Equipe Própria em CLT", "Auditoria de Qualidade"];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qual o prazo para contratar e implantar a limpeza terceirizada?",
    answer:
      "O prazo médio é de 5 a 15 dias úteis, contando levantamento da área, dimensionamento da equipe conforme a circulação do local e início da operação com supervisão intensiva nas primeiras semanas.",
  },
  {
    question: "Qual a área de atuação da PS Proteção?",
    answer:
      "Atendemos condomínios, empresas e indústrias na Região Metropolitana de Campinas, com o mesmo padrão de qualidade em todos os contratos. Fale com nossa equipe para confirmar a cobertura no seu endereço.",
  },
  {
    question: "Existe uma carga horária mínima de contratação?",
    answer:
      "Sim. Trabalhamos com contratação mínima de 44h semanais por posto, o que garante rotina de higienização consistente e dimensionamento adequado da equipe para o seu ambiente.",
  },
  {
    question: "Preciso assinar contrato de longo prazo?",
    answer:
      "Não. Formalizamos um contrato de prestação de serviço com escopo, escala e SLA definidos por escrito, sem fidelidade obrigatória. A proposta é personalizada conforme o porte do seu local.",
  },
  {
    question: "Como a PS Proteção garante o padrão de limpeza combinado?",
    answer:
      "Rotinas de higienização são definidas em POP e auditadas periodicamente, sem aviso prévio, para garantir que a frequência e a qualidade combinadas em contrato sejam mantidas mês a mês.",
  },
];

export default function ServicoLimpezaPage() {
  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: "Limpeza Terceirizada" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Limpeza Terceirizada",
    name: "Limpeza Terceirizada | PS Proteção",
    description:
      "Terceirização de limpeza predial e comercial com equipe própria e contratação mínima de 44h semanais, para condomínios, empresas e indústrias.",
    provider: {
      "@type": "LocalBusiness",
      name: "PS Proteção",
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "State",
      name: "São Paulo",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-navy to-navy-deep pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
          viewBox="0 0 1440 600"
          aria-hidden="true"
        >
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="80" x2="80" y1="0" y2="600" />
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="1360" x2="1360" y1="0" y2="600" />
          <circle className="fill-yellow" cx="80" cy="300" r="4" />
          <circle className="fill-yellow" cx="1360" cy="180" r="4" />
        </svg>

        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <GsapReveal>
            <div className="mb-8">
              <Breadcrumbs items={breadcrumbItems} dark />
            </div>
          </GsapReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-12 items-center">
            <div className="md:col-span-7 text-center md:text-left">
              <GsapReveal>
                <SectionLabel align="center" className="md:justify-start">
                  Serviços · Limpeza Terceirizada
                </SectionLabel>
              </GsapReveal>
              <GsapReveal delayMs={100}>
                <h1 className="text-white font-heading text-4xl md:text-[3.4rem] font-bold leading-[1.1] mb-6">
                  Limpeza Terceirizada para Empresas e Condomínios
                </h1>
              </GsapReveal>
              <GsapReveal delayMs={200}>
                <p className="text-white/80 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8">
                  Assumimos a limpeza do seu ambiente com equipe própria em CLT, contratação
                  mínima de 44h semanais e auditoria periódica de qualidade. Solicite uma proposta
                  personalizada, sem compromisso.
                </p>
                <WhatsAppCta
                  href="https://wa.me/5519982892037"
                  label={
                    <>
                      <MessageCircle size={18} />
                      Solicitar proposta sem compromisso
                    </>
                  }
                  className="px-7 py-3.5 text-[15px]"
                />
              </GsapReveal>
            </div>

            <GsapReveal delayMs={150} className="md:col-span-5">
              <div className="relative bg-white/5 border border-white/10 rounded-[24px] p-6 md:p-7 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-6">
                  <Lock size={16} className="text-yellow" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
                    O que você recebe
                  </span>
                </div>
                <ul className="flex flex-col">
                  {HERO_CHECKS.map((item, i) => (
                    <li key={item} className="relative flex items-start gap-3 pb-5 last:pb-0">
                      {i !== HERO_CHECKS.length - 1 && (
                        <span className="absolute left-[9px] top-6 w-px h-[calc(100%-8px)] bg-white/15" />
                      )}
                      <CheckCircle2 size={19} className="text-emerald-400 shrink-0" />
                      <span className="text-white/85 text-sm leading-snug pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GsapReveal>
          </div>
        </div>
      </section>

      <MarqueeBand items={MARQUEE_ITEMS} />

      {/* Quem somos */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-surface overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-16 items-center">
          <GsapReveal className="md:col-span-6 order-2 md:order-1">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                Quem Somos
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-[1.15]">
                Uma empresa com sede própria, não só um número de telefone
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  A PS Proteção nasceu em 1998 com um princípio simples: trabalho sério e
                  proximidade real com o cliente. Mais de 28 anos depois, mantemos estrutura
                  própria por trás de cada contrato de limpeza que colocamos em operação.
                </p>
                <p>
                  São mais de{" "}
                  <strong className="text-navy">3.000 colaboradores treinados</strong> e mais de{" "}
                  <strong className="text-navy">1.000 clientes atendidos</strong>, com a mesma
                  supervisão de perto que existia no primeiro contrato da empresa.
                </p>
                <p>
                  Da administradora de condomínio à indústria de grande porte, aplicamos o mesmo
                  padrão operacional e a mesma disciplina de supervisão em cada contrato — não
                  existe cliente pequeno demais para receber atenção da nossa equipe de campo.
                </p>
              </div>
            </div>
          </GsapReveal>

          <GsapReveal delayMs={100} className="md:col-span-6 order-1 md:order-2">
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] md:aspect-[5/4] shadow-[0_25px_55px_-25px_rgba(0,15,105,0.35)]">
              <Image
                src="/assets/fachada.webp"
                alt="Fachada da sede própria da PS Proteção"
                fill
                quality={90}
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2">
                  <Building2 size={16} className="text-yellow-dark" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                    Sede Própria · Desde 1998
                  </span>
                </div>
              </div>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* Apresentação */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-gradient-to-b from-white to-surface overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-16 items-center">
          <GsapReveal className="md:col-span-6">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel color="navy">Gestão completa da limpeza</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-[1.15]">
                A limpeza sai da sua{" "}
                <span className="text-yellow-dark">rotina interna</span>
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  Terceirizar a limpeza remove da sua empresa a gestão de EPIs, produtos químicos
                  e escala de equipe, deixando isso sob nossa responsabilidade contratual.
                </p>
                <p>
                  Você recebe relatórios periódicos, sem precisar administrar folha de pagamento
                  ou processo seletivo — apenas o{" "}
                  <strong className="text-navy">resultado combinado</strong>, todos os dias.
                </p>
              </div>
              <ul className="flex flex-col gap-3 max-w-[62ch] mx-auto md:mx-0">
                {[
                  "EPIs e produtos de limpeza certificados",
                  "Escala dimensionada por m² e fluxo de circulação",
                  "Relatórios periódicos de execução e auditoria",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-graphite/70 text-sm md:text-base">
                    <CheckCircle2 size={18} className="text-yellow-dark shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex justify-center md:justify-start">
                <WhatsAppCta
                  label={
                    <>
                      <MessageCircle size={16} />
                      Tirar dúvidas sobre a implantação
                    </>
                  }
                  className="px-6 py-3 text-sm"
                />
              </div>
            </div>
          </GsapReveal>

          <GsapReveal delayMs={100} className="md:col-span-6">
            <div className="rounded-[24px] overflow-hidden border border-navy/10 bg-surface shadow-[0_25px_55px_-25px_rgba(0,15,105,0.35)] max-w-md mx-auto md:max-w-none">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/assets/limpeza.webp"
                  alt="Profissional de limpeza PS Proteção uniformizada higienizando estação de trabalho em escritório"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div className="flex items-start gap-3 px-6 py-5 border-t border-navy/10 bg-white">
                <SprayCan size={20} className="text-yellow-dark shrink-0 mt-0.5" />
                <p className="font-heading text-navy text-sm leading-snug">
                  Equipe uniformizada e supervisão em 100% dos contratos
                </p>
              </div>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-gradient-to-b from-navy-deep to-navy">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <GsapReveal>
            <div className="mb-14 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel align="center">Como funciona</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[48px] text-white mb-4 leading-tight">
                Da proposta à operação no seu local
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Quatro pilares sustentam a limpeza terceirizada da PS Proteção, do primeiro
                diagnóstico à auditoria de qualidade contínua.
              </p>
            </div>
          </GsapReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {PILLARS.map((pillar, i) => (
              <GsapReveal key={pillar.n} delayMs={i * 100}>
                <ProcessCard
                  number={pillar.n}
                  icon={pillar.icon}
                  title={pillar.title}
                  text={pillar.text}
                  accent={pillar.accent}
                />
              </GsapReveal>
            ))}
          </div>
        </div>
      </section>

      <WhereWeOperate category="limpeza" />

      {/* FAQ */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <GsapReveal>
            <div className="mb-12 text-center">
              <SectionLabel align="center">Perguntas frequentes</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-tight">
                Dúvidas comuns sobre limpeza terceirizada
              </h2>
            </div>
          </GsapReveal>
          <FaqAccordion items={FAQ_ITEMS} />
          <GsapReveal delayMs={150}>
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="text-graphite/70 text-sm md:text-base">
                Não encontrou sua dúvida aqui? Fale direto com nossa equipe.
              </p>
              <WhatsAppCta
                label={
                  <>
                    <MessageCircle size={16} />
                    Falar com um especialista
                  </>
                }
                className="px-6 py-3 text-sm"
              />
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-navy to-navy-deep py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-center">
          <GsapReveal className="md:col-span-7 text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Pronto para terceirizar sua limpeza?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto md:mx-0">
              Fale com nossa equipe agora e receba uma proposta personalizada, sem compromisso,
              para o seu condomínio, empresa ou indústria.
            </p>
          </GsapReveal>
          <GsapReveal delayMs={100} className="md:col-span-5">
            <div className="flex flex-col gap-4 max-w-sm mx-auto md:mx-0 md:max-w-none">
              <WhatsAppCta
                href="https://wa.me/5519982892037"
                label={
                  <>
                    <MessageCircle size={18} />
                    Falar pelo WhatsApp
                  </>
                }
                className="w-full justify-center px-7 py-3.5 text-[15px]"
              />
              <Link
                href="/servicos/portaria"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 font-heading font-semibold text-white transition-colors hover:bg-white/15"
              >
                <ArrowRight size={18} />
                Conhecer Portaria Terceirizada
              </Link>
            </div>
          </GsapReveal>
        </div>
      </section>
    </>
  );
}
