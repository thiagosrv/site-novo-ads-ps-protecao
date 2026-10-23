import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  UsersRound,
  Car,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Building2,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WhatsAppCta from "@/components/WhatsAppCta";
import SectionLabel from "@/components/SectionLabel";
import ProcessCard from "@/components/ProcessCard";
import MarqueeBand from "@/components/MarqueeBand";
import WhereWeOperate from "@/components/WhereWeOperate";
import Breadcrumbs, { buildBreadcrumbSchema } from "@/components/Breadcrumbs";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import { CategoryHeroBackground, CategoryHeroMobileCard } from "@/components/CategoryHeroMedia";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Empresa de Portaria | Terceirização de Portaria | PS Proteção",
  description:
    "Empresa de portaria com porteiro treinado e equipe certificada SESP. Terceirização de portaria e controle de acesso, com implantação em até 15 dias úteis.",
  alternates: {
    canonical: "/servicos/portaria",
  },
};

const HERO_ALT = "Porteiro treinado da PS Proteção em posto de portaria e controle de acesso";

const HERO_CHECKS = [
  "Porteiro treinado, com seleção, escala e uniforme sob nossa gestão",
  "Equipe certificada conforme exigência SESP/SSP",
  "Cobertura garantida contratualmente em faltas",
  "Sem letras miúdas: escopo e SLA por escrito",
];

const PILLARS = [
  {
    n: "1",
    icon: ClipboardCheck,
    title: "Diagnóstico e Implantação Rápida",
    text: "Diagnóstico do posto, seleção da equipe e treinamento com Procedimento Operacional Padrão (POP) específico, para uma portaria profissional com início de operação em 5 a 15 dias úteis.",
  },
  {
    n: "2",
    icon: GraduationCap,
    title: "Equipe Certificada SESP/SSP",
    text: "Cada porteiro treinado é selecionado e formado conforme exigência do curso SESP/SSP, preparado para triagem de visitantes, controle de acesso e registro de ocorrências.",
  },
  {
    n: "3",
    icon: UsersRound,
    title: "Reserva Técnica sem Custo Extra",
    text: "Cobertura imediata em faltas, férias e desligamentos, com profissionais treinados e integrados aos protocolos do seu posto — o contratante nunca fica descoberto.",
  },
  {
    n: "4",
    icon: Car,
    title: "Supervisão Ativa Contínua",
    text: "Inspetores em campo e supervisão de bancada acompanham o cumprimento da escala, também no período noturno, com relatórios periódicos de passagem de plantão.",
    accent: true,
  },
];

const MARQUEE_ITEMS = ["Empresa de Portaria", "Porteiro Treinado", "Equipe Certificada SESP", "Supervisão Ativa 24h"];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qual o prazo para contratar e implantar a terceirização de portaria?",
    answer:
      "O prazo médio é de 5 a 15 dias úteis, contando diagnóstico do posto, seleção e treinamento da equipe com POP específico para o seu endereço, e início da operação com supervisão intensiva nas primeiras semanas.",
  },
  {
    question: "O que uma empresa de portaria entrega além do porteiro?",
    answer:
      "Além do porteiro treinado, a PS Proteção entrega a gestão do posto: escala, uniforme, cobertura em faltas, triagem de visitantes, controle de acesso e registro de ocorrências, com supervisão ativa e relatórios periódicos de passagem de plantão.",
  },
  {
    question: "Qual a área de atuação da PS Proteção?",
    answer:
      "Atendemos condomínios, empresas e indústrias na Região Metropolitana de Campinas, com o mesmo padrão operacional em todos os postos. Fale com nossa equipe para confirmar a cobertura no seu endereço.",
  },
  {
    question: "Preciso assinar contrato de longo prazo?",
    answer:
      "Não. Formalizamos um contrato de prestação de serviço com escopo, escala e SLA definidos por escrito, sem fidelidade obrigatória. A proposta é personalizada conforme a necessidade do seu posto.",
  },
  {
    question: "Como funciona o orçamento e a proposta?",
    answer:
      "Após entender o porte da operação — condomínio, empresa ou indústria — enviamos uma proposta personalizada sem compromisso, com escopo, escala e valores claros antes de qualquer assinatura.",
  },
  {
    question: "O porteiro treinado da equipe de portaria tem certificação?",
    answer:
      "Sim. Nossos profissionais são selecionados e formados conforme o curso SESP/SSP, com treinamento interno periódico e supervisão de campo que acompanha o cumprimento do padrão combinado.",
  },
];

export default function ServicoPortariaPage() {
  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: "Portaria Terceirizada" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Terceirização de Portaria",
    name: "Empresa de Portaria | Terceirização de Portaria | PS Proteção",
    description:
      "Empresa de portaria: terceirização de portaria e controle de acesso com porteiro treinado, seleção, escala, uniforme e supervisão de equipe certificada, para condomínios, empresas e indústrias.",
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

      {/* Hero — mesmo desenho da home: foto à direita com borda esfumada e textura halftone */}
      <section className="relative flex items-center overflow-hidden pt-[110px] pb-16 md:pt-[130px] md:pb-28 md:min-h-screen bg-gradient-to-br from-navy via-navy to-navy-deep">
        <CategoryHeroBackground kind="portaria" alt={HERO_ALT} />
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

        <div className="relative z-10 w-full max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
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
                  Serviços · Portaria e Controle de Acesso
                </span>
              </div>
            </Reveal>
            <Reveal delayMs={160}>
              <h1 className="text-white font-heading text-4xl md:text-5xl font-bold leading-[1.1] mb-6">
                Empresa de Portaria: Terceirização de Portaria Profissional
              </h1>
            </Reveal>
            <Reveal delayMs={240}>
              <p className="text-white/80 text-[16px] md:text-lg leading-relaxed mb-8">
                Somos uma empresa de portaria com porteiro treinado, equipe certificada SESP/SSP e
                supervisão ativa. Na terceirização de portaria para empresas e condomínios, a PS
                Proteção assume seleção, escala, uniforme e cobertura em faltas. Solicite uma
                proposta personalizada, sem compromisso.
              </p>
            </Reveal>
            <Reveal delayMs={320}>
              <div className="flex justify-center md:justify-start mb-8">
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
              </div>
              <ul className="flex flex-col gap-2.5 max-w-md mx-auto md:mx-0 text-left">
                {HERO_CHECKS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-white/85 text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delayMs={380}>
              <CategoryHeroMobileCard kind="portaria" alt={HERO_ALT} />
            </Reveal>
          </div>
        </div>
      </section>

      <MarqueeBand items={MARQUEE_ITEMS} />

      {/* Quem somos */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-surface overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-16 items-center">
          <Reveal className="md:col-span-6 order-2 md:order-1">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                01 · Quem Somos
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-[1.15]">
                Uma empresa de portaria com sede própria, não só um número de telefone
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  A PS Proteção nasceu em 1998 com um princípio simples: trabalho sério e
                  proximidade real com o cliente. Mais de 28 anos depois, mantemos estrutura
                  própria por trás de cada posto de portaria e controle de acesso que colocamos
                  em operação.
                </p>
                <p>
                  São mais de{" "}
                  <strong className="text-navy">3.000 colaboradores treinados</strong> e mais de{" "}
                  <strong className="text-navy">1.000 clientes atendidos</strong>, com a mesma
                  supervisão de perto que existia no primeiro contrato da empresa.
                </p>
                <p>
                  Da administradora de condomínio à indústria de grande porte, aplicamos o mesmo
                  padrão operacional e a mesma disciplina de supervisão em cada posto de portaria
                  profissional — não existe cliente pequeno demais para receber atenção da nossa
                  equipe de campo.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="md:col-span-6 order-1 md:order-2">
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
          </Reveal>
        </div>
      </section>

      {/* Apresentação */}
      <section className="relative py-24 md:py-[var(--spacing-section)] bg-gradient-to-b from-navy to-navy-deep overflow-hidden">
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

        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-16 items-center">
          <Reveal className="md:col-span-6">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel>02 · Gestão Completa do Posto</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-white leading-[1.15]">
                A gestão da portaria sai da sua{" "}
                <span className="text-yellow">rotina interna</span>
              </h2>
              <div className="text-white/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  Na terceirização de portaria, a PS Proteção assume a gestão de escala, encargos
                  trabalhistas e substituição de profissionais, mantendo o padrão de atendimento
                  definido em contrato com você.
                </p>
                <p>
                  Você recebe relatórios periódicos, sem precisar administrar folha de pagamento,
                  convenção coletiva ou processo seletivo — apenas o{" "}
                  <strong className="text-white">resultado combinado</strong>, todos os dias.
                </p>
              </div>
              <ul className="flex flex-col gap-3 max-w-[62ch] mx-auto md:mx-0">
                {[
                  "Uniforme, equipamentos e escala sob nossa gestão",
                  "Porteiro treinado, com POP específico do seu posto",
                  "Substituição imediata em faltas e afastamentos",
                  "Relatórios periódicos de passagem de plantão",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70 text-sm md:text-base">
                    <CheckCircle2 size={18} className="text-yellow shrink-0 mt-0.5" />
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
          </Reveal>

          <Reveal delayMs={100} className="md:col-span-6">
            <div className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_25px_55px_-25px_rgba(0,0,0,0.45)] max-w-md mx-auto md:max-w-none">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/assets/uniforme-psprotecao.webp"
                  alt="Porteiro treinado da PS Proteção, rigorosamente fardado em posto de portaria e controle de acesso"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div className="flex items-start gap-3 px-6 py-5 border-t border-white/10 bg-navy-deep">
                <ShieldCheck size={20} className="text-yellow shrink-0 mt-0.5" />
                <p className="font-heading text-white text-sm leading-snug">
                  Uniforme, POP e supervisão padronizados em 100% dos postos
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-14 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center">
                03 · Como Funciona
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-4 leading-tight">
                Da proposta à operação no seu posto
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                Quatro pilares sustentam a terceirização de portaria da PS Proteção, do primeiro
                diagnóstico à supervisão contínua no dia a dia.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.n} delayMs={i * 100}>
                <ProcessCard
                  number={pillar.n}
                  icon={pillar.icon}
                  title={pillar.title}
                  text={pillar.text}
                  accent={pillar.accent}
                  light
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhereWeOperate category="portaria" />

      {/* FAQ */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-12 text-center">
              <SectionLabel color="navy" align="center">
                05 · Perguntas Frequentes
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-tight">
                Dúvidas comuns sobre terceirização de portaria
              </h2>
            </div>
          </Reveal>
          <FaqAccordion items={FAQ_ITEMS} />
          <Reveal delayMs={150}>
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
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-navy to-navy-deep py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-center">
          <Reveal className="md:col-span-7 text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Pronto para contratar uma empresa de portaria profissional?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto md:mx-0">
              Fale com nossa equipe agora e receba uma proposta personalizada de terceirização de
              portaria e controle de acesso, sem compromisso, para o seu condomínio, empresa ou
              indústria.
            </p>
          </Reveal>
          <Reveal delayMs={100} className="md:col-span-5">
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
                href="/servicos/limpeza"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 font-heading font-semibold text-white transition-colors hover:bg-white/15"
              >
                <ArrowRight size={18} />
                Conhecer Limpeza Terceirizada
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
