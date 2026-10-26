import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ClipboardCheck,
  GraduationCap,
  UsersRound,
  Car,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Building2,
  Clock,
  KeyRound,
  Home,
  Factory,
  HardHat,
  ChevronRight,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WhatsAppCta from "@/components/WhatsAppCta";
import SectionLabel from "@/components/SectionLabel";
import ProcessCard from "@/components/ProcessCard";
import MarqueeBand from "@/components/MarqueeBand";
import WhereWeOperate from "@/components/WhereWeOperate";
import LpAnchorNav, { type AnchorLink } from "@/components/LpAnchorNav";
import RelatedServices, { type RelatedLink } from "@/components/RelatedServices";
import Breadcrumbs, { buildBreadcrumbSchema } from "@/components/Breadcrumbs";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import { CategoryHeroBackground, CategoryHeroMobileCard } from "@/components/CategoryHeroMedia";
import { SITE_URL } from "@/lib/seo";
import { stripFaqMarkup } from "@/lib/faqMarkup";
import { getCityBySlug } from "@/lib/cities";
import { buildCategoryNestedPath, buildSegmentNestedPath } from "@/lib/programmatic";
import { getSegmentBySlug } from "@/lib/segments";

export const metadata: Metadata = {
  title: "Portaria Terceirizada: Empresa de Portaria | PS Proteção",
  description:
    "Empresa de portaria terceirizada para condomínios, empresas e indústrias: porteiro treinado, portaria 24 horas e controle de acesso. Proposta sem compromisso.",
  alternates: {
    canonical: "/servicos/portaria",
  },
};

const HERO_ALT = "Porteiro treinado da PS Proteção em posto de portaria e controle de acesso";

/** Margem de rolagem das âncoras: header fixo + barra de navegação fixa. */
const ANCHOR = "scroll-mt-32 md:scroll-mt-36";

const NAV_LINKS: AnchorLink[] = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#escalas", label: "Escalas" },
  { href: "#segmentos", label: "Segmentos" },
  { href: "#cobertura", label: "Onde atendemos" },
  { href: "#faq", label: "Perguntas" },
];

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

const MARQUEE_ITEMS = [
  "Portaria Terceirizada",
  "Empresa de Portaria",
  "Porteiro Treinado",
  "Controle de Acesso",
  "Portaria 24 Horas",
];

const DIFFERENTIALS = [
  "Uniforme, equipamentos e escala sob nossa gestão",
  "Porteiro treinado, com POP específico do seu posto",
  "Substituição imediata em faltas e afastamentos",
  "Relatórios periódicos de passagem de plantão",
];

const STATS = [
  { value: "1998", label: "Desde" },
  { value: "3.000+", label: "Colaboradores treinados" },
  { value: "1.000+", label: "Clientes atendidos" },
];

const AMERICANA = getCityBySlug("americana");

/** Caminho da página programática de portaria em Americana para um segmento; null se o segmento não existir. */
function segmentHref(slug: string): string | null {
  const segment = getSegmentBySlug(slug);
  return segment && AMERICANA ? buildSegmentNestedPath("portaria", segment, AMERICANA) : null;
}

const HUB_HREF = AMERICANA ? buildCategoryNestedPath("portaria", AMERICANA) : "/servicos";
const PORTARIA_24H_HREF = `${HUB_HREF}/portaria-24-horas`;

const SCALES = [
  {
    icon: Clock,
    title: "Portaria 24 horas",
    text: "Cobertura contínua, dia e noite, com revezamento de porteiros treinados e supervisão também no período noturno.",
    href: PORTARIA_24H_HREF,
    linkLabel: "Ver portaria 24 horas",
  },
  {
    icon: UsersRound,
    title: "Escalas 12x36, diurna e noturna",
    text: "Escala desenhada para o horário do seu posto — incluindo 12x36 —, com folgas e substituições sob nossa gestão.",
  },
  {
    icon: KeyRound,
    title: "Controle de acesso",
    text: "Identificação e registro de visitantes, prestadores e entregas, seguindo o POP do seu endereço. É a segurança do acesso feita por pessoas treinadas.",
  },
];

const SEGMENT_CARDS = [
  {
    id: "condominios",
    icon: Home,
    title: "Portaria para condomínios",
    text: "Condomínios residenciais, empresariais e horizontais, incluindo loteamentos fechados: porteiro treinado e sem o custo de administrar folha, férias e faltas.",
    href: segmentHref("condominios-residenciais"),
  },
  {
    id: "empresas",
    icon: Building2,
    title: "Portaria para empresas",
    text: "Escritórios, edifícios comerciais e complexos corporativos, com recepção de visitantes e identificação de prestadores na entrada.",
    href: segmentHref("complexos-corporativos"),
  },
  {
    id: "industrias",
    icon: Factory,
    title: "Portaria para indústrias",
    text: "Fábricas, parques industriais e centros logísticos, com escala adaptada a turnos, fluxo de caminhões e controle de entrada de terceiros.",
    href: segmentHref("condominios-industriais"),
  },
  {
    id: "obras",
    icon: HardHat,
    title: "Portaria para obras",
    text: "Controle de acesso de funcionários, fornecedores e visitantes em canteiros, acompanhando o avanço físico da obra.",
    href: segmentHref("obras-e-canteiros-de-obras"),
  },
];

const OTHER_SEGMENTS: { slug: string; label: string }[] = [
  { slug: "escolas", label: "Escolas" },
  { slug: "faculdades", label: "Faculdades" },
  { slug: "hospitais", label: "Hospitais" },
  { slug: "clinicas", label: "Clínicas" },
  { slug: "shopping-centers", label: "Shopping centers" },
  { slug: "hoteis", label: "Hotéis" },
  { slug: "supermercados", label: "Supermercados" },
  { slug: "academias", label: "Academias" },
];

const RELATED: RelatedLink[] = [
  {
    href: "/servicos/limpeza",
    title: "Limpeza terceirizada",
    text: "Equipe própria em CLT, cronograma e auditoria para empresas, indústrias e condomínios.",
  },
  {
    href: "/servicos/facilities",
    title: "Facilities: portaria, limpeza e zeladoria",
    text: "Portaria, limpeza e zeladoria em um só contrato, com um único ponto de contato.",
  },
  {
    href: "/servicos/facilities#recepcao",
    title: "Recepção terceirizada",
    text: "Recepcionista treinada para atender visitantes e organizar o fluxo da entrada.",
  },
  {
    href: PORTARIA_24H_HREF,
    title: "Portaria 24 horas",
    text: "Cobertura contínua com revezamento de porteiros e supervisão noturna.",
  },
  {
    href: HUB_HREF,
    title: "Portaria em Americana e região",
    text: "Veja como atendemos Americana e as cidades vizinhas, com sede própria na região.",
  },
  {
    href: "/servicos",
    title: "Todos os serviços",
    text: "Portaria, limpeza, zeladoria, recepção e gestão completa de facilities.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qual o prazo para contratar e implantar a portaria terceirizada?",
    answer:
      "O prazo médio é de **5 a 15 dias úteis**. Nesse período fazemos o diagnóstico do posto, selecionamos e treinamos a equipe com um POP específico para o seu endereço e iniciamos a operação. Nas primeiras semanas, a supervisão é intensiva para ajustar rotina, horários e fluxo de visitantes.",
  },
  {
    question: "O que uma empresa de portaria entrega além do porteiro?",
    answer:
      "Além do porteiro treinado, a PS Proteção entrega a **gestão completa do posto**: escala, uniforme, cobertura em faltas e férias, triagem de visitantes, controle de acesso e registro de ocorrências. Tudo com supervisão ativa e relatórios periódicos de passagem de plantão. Você não administra folha, convenção coletiva nem processo seletivo.",
  },
  {
    question: "Como funciona a portaria 24 horas e a escala 12x36?",
    answer:
      "Na portaria 24 horas, porteiros se revezam em escalas que cobrem o dia e a noite, sem deixar o posto descoberto. A escala 12x36, com 12 horas de trabalho e 36 de descanso, é uma das mais usadas para esse formato, e também montamos escalas diurnas e noturnas conforme o horário do seu posto. Em faltas e férias, a reserva técnica assume sem custo extra.",
  },
  {
    question: "Qual a diferença entre portaria e controle de acesso?",
    answer:
      "A portaria é o posto de atendimento da entrada; o **controle de acesso** é o conjunto de regras que define quem pode entrar, quando e para onde. Na prática, o porteiro treinado identifica e registra visitantes, prestadores e entregas, segue o POP do local e comunica ocorrências. Para empresas e indústrias, o controle de acesso também organiza a entrada de terceiros e caminhões.",
  },
  {
    question: "A portaria terceirizada serve para condomínio, empresa e indústria?",
    answer:
      "Sim. Atendemos **condomínios** residenciais, empresariais e horizontais, **empresas** e edifícios comerciais, **indústrias** e centros logísticos e **obras**, além de escolas, clínicas e hospitais. O padrão de supervisão é o mesmo, mas o POP e a escala mudam conforme a realidade de cada posto, do fluxo de moradores ao de caminhões.",
  },
  {
    question: "A PS Proteção também faz recepção junto com a portaria?",
    answer:
      "Sim. Quando o posto precisa de atendimento de visitantes além da identificação na entrada, oferecemos a **recepção terceirizada**, com recepcionista treinada e integrada ao mesmo padrão de supervisão. Também é possível contratar portaria, recepção, limpeza e zeladoria em um único contrato de facilities, com um só ponto de contato.",
  },
  {
    question: "O que está incluído na segurança do acesso?",
    answer:
      "Nosso serviço é a **segurança do acesso feita por pessoas**: porteiro treinado, identificação e registro de visitantes, triagem na entrada, POP específico do posto, comunicação de ocorrências e supervisão ativa. É uma equipe desarmada, voltada à rotina de portaria e controle de acesso de condomínios, empresas e indústrias.",
  },
  {
    question: "Os porteiros da equipe têm certificação?",
    answer:
      "Sim. Nossos profissionais são selecionados e formados conforme o **curso SESP/SSP**, com treinamento interno periódico. A supervisão de campo acompanha o cumprimento do padrão combinado em cada posto, inclusive no período noturno, e os relatórios de passagem de plantão registram o que aconteceu no turno.",
  },
  {
    question: "Preciso assinar contrato de longo prazo? Como funciona o orçamento?",
    answer:
      "Não há fidelidade obrigatória. Formalizamos um contrato de prestação de serviço com **escopo, escala e SLA por escrito**. Para o orçamento, entendemos o porte da operação — condomínio, empresa ou indústria —, os horários e o número de postos, e enviamos uma proposta personalizada, **sem compromisso**, com valores claros antes de qualquer assinatura.",
  },
  {
    question: "Qual a área de atuação da PS Proteção?",
    answer:
      "Temos sede própria em Americana e atendemos condomínios, empresas e indústrias na **Região Metropolitana de Campinas** e no interior de São Paulo, com o mesmo padrão operacional em todos os postos. Fale com nossa equipe para confirmar a cobertura no seu endereço e receber a proposta.",
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
    name: "Portaria Terceirizada: Empresa de Portaria | PS Proteção",
    description:
      "Empresa de portaria terceirizada: porteiro treinado, portaria 24 horas, controle de acesso, seleção, escala, uniforme e supervisão de equipe certificada, para condomínios, empresas e indústrias.",
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
      acceptedAnswer: { "@type": "Answer", text: stripFaqMarkup(item.answer) },
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
      <section className="relative flex items-center overflow-hidden pt-[110px] pb-16 md:pt-[130px] md:pb-24 md:min-h-[92vh] bg-gradient-to-br from-navy via-navy to-navy-deep">
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
              <h1 className="text-white font-heading text-[40px] md:text-6xl font-bold leading-[1.05] mb-5">
                <span className="text-yellow">Portaria Terceirizada</span> para Condomínios, Empresas
                e Indústrias
              </h1>
            </Reveal>
            <Reveal delayMs={240}>
              <h2 className="text-white/90 font-heading text-xl md:text-2xl font-medium leading-snug mb-8">
                Empresa de portaria com porteiro treinado, supervisão ativa e cobertura em faltas —
                proposta sem compromisso.
              </h2>
            </Reveal>
            <Reveal delayMs={320}>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
                <WhatsAppCta
                  href="https://wa.me/5519982892037"
                  label={
                    <>
                      <MessageCircle size={24} />
                      Contratar portaria terceirizada
                    </>
                  }
                  iconSize={24}
                  className="px-[38px] py-[20px] text-[19px]"
                />
                <a
                  href="#como-funciona"
                  className="press-feedback group inline-flex items-center gap-1 px-2 py-3 font-heading text-base font-semibold text-white/90 transition-colors hover:text-white"
                >
                  Saiba mais
                  <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                </a>
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

      <LpAnchorNav links={NAV_LINKS} ctaLabel="Pedir proposta" />

      <MarqueeBand items={MARQUEE_ITEMS} />

      {/* Como funciona */}
      <section id="como-funciona" className={`py-20 md:py-[var(--spacing-section)] bg-white ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-14 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                01 · Como Funciona
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-4 leading-tight">
                Da proposta ao porteiro treinado no seu posto
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

          <Reveal delayMs={150}>
            <div className="mt-12 flex justify-center md:justify-start">
              <WhatsAppCta
                label={
                  <>
                    <MessageCircle size={18} />
                    Receber proposta de portaria
                  </>
                }
                iconSize={18}
                className="px-7 py-3.5 text-[15px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gestão completa (diferenciais) */}
      <section
        id="diferenciais"
        className={`relative py-20 md:py-[var(--spacing-section)] bg-gradient-to-b from-navy to-navy-deep overflow-hidden ${ANCHOR}`}
      >
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

        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-16 items-center">
          <Reveal className="md:col-span-7">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel className="md:justify-start">02 · Gestão Completa do Posto</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-white leading-[1.15]">
                Terceirização de portaria: a gestão do posto sai da sua{" "}
                <span className="text-yellow">rotina interna</span>
              </h2>
              <p className="text-white/70 leading-relaxed max-w-[62ch] mx-auto md:mx-0">
                Na terceirização de portaria, a PS Proteção assume escala, encargos trabalhistas e
                substituição de profissionais, mantendo o padrão de atendimento definido em
                contrato. Você recebe o{" "}
                <strong className="text-white">resultado combinado</strong>, todos os dias, sem
                administrar folha de pagamento ou processo seletivo.
              </p>
              <ul className="flex flex-col gap-3 max-w-[62ch] mx-auto md:mx-0 text-left">
                {DIFFERENTIALS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/75 text-sm md:text-base">
                    <CheckCircle2 size={18} className="text-yellow shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="md:col-span-5">
            <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 max-w-md mx-auto md:max-w-none">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-yellow/70 mb-6">
                PS Proteção em números
              </p>
              <dl className="grid grid-cols-1 divide-y divide-white/10">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <dt className="text-white/70 text-sm">{stat.label}</dt>
                    <dd className="font-heading text-3xl md:text-4xl font-bold text-yellow">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Escalas e controle de acesso */}
      <section id="escalas" className={`py-20 md:py-[var(--spacing-section)] bg-surface ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-12 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                03 · Escalas e Controle de Acesso
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy mb-4 leading-tight">
                Portaria 24 horas, diurna ou noturna: a escala do seu posto
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                Montamos a escala e o controle de acesso conforme o horário, o fluxo e o tipo de
                local — do condomínio residencial à indústria com turnos.
              </p>
            </div>
          </Reveal>

          <ul id="controle-de-acesso" className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 ${ANCHOR}`}>
            {SCALES.map((scale, i) => {
              const Icon = scale.icon;
              return (
                <li key={scale.title}>
                  <Reveal delayMs={i * 100} className="h-full">
                    <div className="flex h-full flex-col gap-3 rounded-2xl border border-navy/10 bg-white p-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5">
                        <Icon size={22} className="text-navy" />
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-navy">{scale.title}</h3>
                      <p className="text-sm leading-relaxed text-graphite/70">{scale.text}</p>
                      {scale.href && (
                        <Link
                          href={scale.href}
                          className="mt-auto inline-flex items-center gap-1.5 pt-2 font-heading text-sm font-semibold text-navy hover:text-yellow-dark"
                        >
                          {scale.linkLabel}
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Segmentos */}
      <section id="segmentos" className={`py-20 md:py-[var(--spacing-section)] bg-white ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-12 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                04 · Segmentos Atendidos
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy mb-4 leading-tight">
                Portaria para condomínios, empresas, indústrias e obras
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                O mesmo padrão de supervisão, com POP e escala adaptados à realidade de cada tipo de
                posto.
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {SEGMENT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <li key={card.id} id={card.id} className={ANCHOR}>
                  <Reveal delayMs={i * 80} className="h-full">
                    <div className="flex h-full flex-col gap-3 rounded-2xl border border-navy/10 bg-surface p-6 md:p-7">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy">
                        <Icon size={22} className="text-yellow" />
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-navy">{card.title}</h3>
                      <p className="text-sm md:text-base leading-relaxed text-graphite/70">{card.text}</p>
                      {card.href && (
                        <Link
                          href={card.href}
                          className="mt-auto inline-flex items-center gap-1.5 pt-2 font-heading text-sm font-semibold text-navy hover:text-yellow-dark"
                        >
                          Ver portaria em Americana
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delayMs={150}>
            <div className="mt-10 text-center md:text-left">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
                Também atendemos
              </p>
              <ul className="flex flex-wrap justify-center md:justify-start gap-2">
                {OTHER_SEGMENTS.map(({ slug, label }) => {
                  const href = segmentHref(slug);
                  return (
                    <li key={slug}>
                      {href ? (
                        <Link
                          href={href}
                          className="press-feedback inline-flex rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-yellow hover:bg-yellow/10"
                        >
                          {label}
                        </Link>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <div id="cobertura" className={ANCHOR}>
        <WhereWeOperate category="portaria" number="05" />
      </div>

      {/* Quem somos */}
      <section id="quem-somos" className={`py-20 md:py-[var(--spacing-section)] bg-surface overflow-hidden ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16 items-center">
          <Reveal className="md:col-span-6 order-2 md:order-1">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                06 · Quem Somos
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-[1.15]">
                Sede própria e estrutura de pronto atendimento há mais de 28 anos
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  A PS Proteção nasceu em 1998 com um princípio simples: trabalho sério e
                  proximidade real com o cliente. Mais de 28 anos depois, mantemos estrutura
                  própria por trás de cada posto de portaria e controle de acesso que colocamos em
                  operação.
                </p>
                <p>
                  Da administradora de condomínio à indústria de grande porte, aplicamos o mesmo
                  padrão operacional e a mesma disciplina de supervisão em cada posto — não existe
                  cliente pequeno demais para receber atenção da nossa equipe de campo.
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

      {/* FAQ */}
      <section id="faq" className={`py-20 md:py-[var(--spacing-section)] bg-white ${ANCHOR}`}>
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-12 text-center">
              <SectionLabel color="navy" align="center">
                07 · Perguntas Frequentes
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-tight">
                Dúvidas sobre terceirização de portaria e controle de acesso
              </h2>
            </div>
          </Reveal>
          <FaqAccordion items={FAQ_ITEMS} initialOpen={[0, 1]} multiple />
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

      <RelatedServices
        id="servicos-relacionados"
        label="08 · Continue Navegando"
        title="Outros serviços e páginas de portaria"
        links={RELATED}
      />

      {/* CTA */}
      <section
        id="orcamento"
        className={`bg-gradient-to-br from-navy to-navy-deep py-20 md:py-28 relative overflow-hidden ${ANCHOR}`}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-center">
          <Reveal className="md:col-span-7 text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Pronto para contratar uma empresa de portaria profissional?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto md:mx-0">
              Fale com nossa equipe agora e receba uma proposta personalizada de portaria
              terceirizada e controle de acesso, sem compromisso, para o seu condomínio, empresa ou
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
