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
  Building2,
  Factory,
  Home,
  HeartPulse,
  HardHat,
  Sparkles,
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
import {
  buildCategoryNestedPath,
  buildSegmentNestedPath,
  buildServiceNestedPath,
} from "@/lib/programmatic";
import { getSegmentBySlug } from "@/lib/segments";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Limpeza Terceirizada: Empresa de Limpeza | PS Proteção",
  description:
    "Empresa de limpeza terceirizada para empresas, indústrias e condomínios: equipe própria em CLT, cronograma e auditoria de qualidade. Proposta sem compromisso.",
  alternates: {
    canonical: "/servicos/limpeza",
  },
};

const HERO_ALT =
  "Profissional de limpeza da PS Proteção uniformizada em limpeza profissional de ambiente corporativo";

/** Margem de rolagem das âncoras: header fixo + barra de navegação fixa. */
const ANCHOR = "scroll-mt-32 md:scroll-mt-36";

const NAV_LINKS: AnchorLink[] = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#tipos-de-limpeza", label: "Tipos de limpeza" },
  { href: "#segmentos", label: "Segmentos" },
  { href: "#cobertura", label: "Onde atendemos" },
  { href: "#faq", label: "Perguntas" },
];

const HERO_CHECKS = [
  "Equipe própria em CLT, sem subcontratação",
  "Contratação mínima de 44h semanais por posto",
  "Escala dimensionada pela área e circulação do local",
  "Limpeza com cronograma: escopo, frequência e SLA por escrito",
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
    text: "Rotinas de higienização e cronograma de limpeza definidos em POP e auditados sem aviso prévio, para garantir o padrão combinado mês a mês.",
    accent: true,
  },
];

const MARQUEE_ITEMS = [
  "Empresa de Limpeza",
  "Limpeza Terceirizada",
  "Limpeza para Indústrias",
  "Equipe Própria em CLT",
  "Auditoria de Qualidade",
];

const DIFFERENTIALS = [
  "Limpeza profissional com EPIs e produtos certificados",
  "Cronograma e escala dimensionados por m² e fluxo de circulação",
  "Relatórios periódicos de execução e auditoria",
];

const AMERICANA = getCityBySlug("americana");

/** Caminho da página programática de limpeza em Americana para um segmento; null se o segmento não existir. */
function segmentHref(slug: string): string | null {
  const segment = getSegmentBySlug(slug);
  return segment && AMERICANA ? buildSegmentNestedPath("limpeza", segment, AMERICANA) : null;
}

/** Caminho da página programática de um serviço em Americana; null se o serviço não existir. */
function serviceHref(slug: string): string | null {
  const service = getServiceBySlug(slug);
  return service && AMERICANA ? buildServiceNestedPath(service, AMERICANA) : null;
}

const HUB_HREF = AMERICANA ? buildCategoryNestedPath("limpeza", AMERICANA) : "/servicos";

const CLEANING_TYPES = [
  {
    id: "industrias",
    icon: Factory,
    title: "Limpeza industrial",
    text: "Fábricas, galpões e centros logísticos, com rotina por área e turno, sem interromper a produção e respeitando as regras de acesso da planta.",
    href: serviceHref("servico-de-limpeza-industrial") ?? segmentHref("industrias"),
    linkLabel: "Ver limpeza industrial",
  },
  {
    id: "empresas",
    icon: Building2,
    title: "Limpeza comercial e corporativa",
    text: "Escritórios, edifícios comerciais e sedes de empresas, com frequência combinada em contrato e equipe uniformizada no ambiente de trabalho.",
    href: segmentHref("escritorios-de-advocacia-e-contabilidade"),
    linkLabel: "Ver limpeza para empresas",
  },
  {
    id: "condominios",
    icon: Home,
    title: "Limpeza de condomínios",
    text: "Áreas comuns de condomínios residenciais, empresariais e industriais, com cronograma de limpeza e conservação e reposição em faltas.",
    href: serviceHref("servico-de-limpeza-em-condominio") ?? segmentHref("condominios-residenciais"),
    linkLabel: "Ver limpeza de condomínios",
  },
  {
    id: "saude",
    icon: HeartPulse,
    title: "Limpeza hospitalar e de clínicas",
    text: "Hospitais, clínicas e laboratórios, com rotinas de higienização definidas em POP e alinhadas com o protocolo de cada estabelecimento.",
    href: segmentHref("hospitais"),
    linkLabel: "Ver limpeza em hospitais",
  },
  {
    id: "obras",
    icon: HardHat,
    title: "Limpeza pós-obra",
    text: "Limpeza de canteiros e de imóveis ao fim da obra, com equipe dimensionada pelo escopo e pelo prazo de entrega combinados.",
    href: segmentHref("obras-e-canteiros-de-obras"),
    linkLabel: "Ver limpeza de obras",
  },
  {
    id: "conservacao",
    icon: Sparkles,
    title: "Limpeza e conservação",
    text: "Rotina diária de limpeza e conservação com posto fixo, supervisão em campo e auditoria periódica sem aviso prévio.",
    href: HUB_HREF,
    linkLabel: "Ver limpeza em Americana",
  },
];

const OTHER_SEGMENTS: { slug: string; label: string }[] = [
  { slug: "galpoes-logisticos", label: "Galpões" },
  { slug: "centros-de-distribuicao", label: "Centros de distribuição" },
  { slug: "transportadoras", label: "Transportadoras" },
  { slug: "escolas", label: "Escolas" },
  { slug: "faculdades", label: "Faculdades" },
  { slug: "clinicas", label: "Clínicas" },
  { slug: "laboratorios-de-analises-clinicas", label: "Laboratórios" },
  { slug: "shopping-centers", label: "Shopping centers" },
  { slug: "hoteis", label: "Hotéis" },
  { slug: "supermercados", label: "Supermercados" },
  { slug: "atacadistas-e-atacarejos", label: "Atacadistas" },
  { slug: "academias", label: "Academias" },
];

const RELATED: RelatedLink[] = [
  {
    href: "/servicos/portaria",
    title: "Portaria terceirizada",
    text: "Porteiro treinado, portaria 24 horas e controle de acesso para condomínios, empresas e indústrias.",
  },
  {
    href: "/servicos/facilities",
    title: "Facilities: portaria, limpeza e zeladoria",
    text: "Limpeza, portaria e zeladoria em um só contrato, com um único ponto de contato.",
  },
  {
    href: "/servicos/facilities#zeladoria",
    title: "Zeladoria terceirizada",
    text: "Zelador para a rotina do condomínio ou da empresa, integrado à equipe de limpeza.",
  },
  {
    href: serviceHref("empresa-de-limpeza-terceirizada") ?? HUB_HREF,
    title: "Empresa de limpeza terceirizada",
    text: "Veja como atendemos Americana e região, com equipe própria e sede na cidade.",
  },
  {
    href: HUB_HREF,
    title: "Limpeza em Americana e região",
    text: "Cobertura nas cidades da região, com o mesmo padrão de supervisão em cada contrato.",
  },
  {
    href: "/servicos",
    title: "Todos os serviços",
    text: "Portaria, limpeza, zeladoria, recepção e gestão completa de facilities.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qual o prazo para contratar e implantar a limpeza terceirizada?",
    answer:
      "O prazo médio é de **5 a 15 dias úteis**. Nesse período fazemos o levantamento da área e do fluxo de circulação, dimensionamos a equipe e iniciamos a operação com supervisão intensiva. Nas primeiras semanas, ajustamos rotina, horários e frequência junto com o responsável do local.",
  },
  {
    question: "O que significa terceirizar a limpeza da minha empresa?",
    answer:
      "Terceirizar limpeza é contratar uma **empresa de limpeza** para assumir equipe, EPIs, produtos e escala. Na terceirização de limpeza da PS Proteção, você não administra seleção, folha de pagamento nem reposição em faltas. Recebe o resultado combinado em contrato, com cronograma, supervisão e relatórios periódicos.",
  },
  {
    question: "Como contratar uma empresa de limpeza terceirizada?",
    answer:
      "O primeiro passo é pedir uma proposta. Entendemos o tipo de local, a área, o fluxo de pessoas e a frequência desejada, e enviamos uma proposta personalizada, **sem compromisso**. Aprovada a proposta, formalizamos o contrato com escopo, escala e SLA por escrito e iniciamos a implantação.",
  },
  {
    question: "A PS Proteção faz limpeza industrial, comercial e de condomínios?",
    answer:
      "Sim. Atuamos com **limpeza industrial**, **limpeza comercial e corporativa** e **limpeza de condomínios**, com a mesma equipe própria em CLT e o mesmo padrão de supervisão. O que muda é o cronograma: a indústria pede rotina por turno e área, o escritório pede frequência diária e o condomínio pede conservação das áreas comuns.",
  },
  {
    question: "Vocês fazem limpeza hospitalar e em clínicas?",
    answer:
      "Atendemos hospitais, clínicas e laboratórios com **rotinas de higienização definidas em POP**, equipe treinada e supervisão em campo. Os protocolos específicos de cada estabelecimento, como áreas críticas e produtos autorizados, são alinhados com o contratante na implantação. Fale com nossa equipe para descrever o seu ambiente e receber a proposta.",
  },
  {
    question: "A empresa faz limpeza pós-obra?",
    answer:
      "Sim, atendemos **obras e canteiros** com limpeza dimensionada pelo escopo e pelo prazo de entrega. Definimos com você as áreas, a frequência e o momento da limpeza fina, e a equipe é montada de acordo com a metragem e o volume de resíduos. Descreva a obra no pedido de proposta para termos o dimensionamento correto.",
  },
  {
    question: "Como funciona o cronograma de limpeza e a auditoria de qualidade?",
    answer:
      "As rotinas e a frequência de cada área são definidas em **POP** e combinadas em contrato, formando um cronograma de limpeza. A supervisão acompanha a execução em campo e as **auditorias periódicas são feitas sem aviso prévio**. Os resultados aparecem em relatórios de execução, para que o padrão combinado seja mantido mês a mês.",
  },
  {
    question: "Existe uma carga horária mínima de contratação?",
    answer:
      "Sim. Trabalhamos com **contratação mínima de 44h semanais por posto**. Esse modelo garante rotina de higienização consistente e dimensionamento adequado da equipe para o seu ambiente. A carga final é calculada pela área, pela circulação de pessoas e pelo escopo da limpeza.",
  },
  {
    question: "Preciso assinar contrato de longo prazo?",
    answer:
      "Não há fidelidade obrigatória. Formalizamos um contrato de prestação de serviço com **escopo, escala e SLA definidos por escrito**. A proposta é personalizada conforme o porte e o tipo do seu local, com valores claros antes de qualquer assinatura.",
  },
  {
    question: "Qual a área de atuação da PS Proteção?",
    answer:
      "Temos sede própria em Americana e atendemos condomínios, empresas e indústrias na **Região Metropolitana de Campinas** e no interior de São Paulo, com o mesmo padrão de qualidade em todos os contratos. Fale com nossa equipe para confirmar a cobertura no seu endereço e receber a proposta.",
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
    name: "Limpeza Terceirizada: Empresa de Limpeza | PS Proteção",
    description:
      "Empresa de limpeza terceirizada com equipe própria em CLT, cronograma, auditoria de qualidade e contratação mínima de 44h semanais, para limpeza industrial, comercial, de condomínios, hospitalar e pós-obra.",
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
        <CategoryHeroBackground kind="limpeza" alt={HERO_ALT} />
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
                  Serviços · Limpeza Terceirizada
                </span>
              </div>
            </Reveal>
            <Reveal delayMs={160}>
              <h1 className="text-white font-heading text-[40px] md:text-6xl font-bold leading-[1.05] mb-5">
                <span className="text-yellow">Limpeza Terceirizada</span> para Empresas, Indústrias e
                Condomínios
              </h1>
            </Reveal>
            <Reveal delayMs={240}>
              <h2 className="text-white/90 font-heading text-xl md:text-2xl font-medium leading-snug mb-8">
                Empresa de limpeza com equipe própria em CLT, cronograma e auditoria de qualidade —
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
                      Contratar limpeza terceirizada
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
              <CategoryHeroMobileCard kind="limpeza" alt={HERO_ALT} />
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
                Da proposta à limpeza com cronograma no seu local
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                Quatro pilares sustentam a terceirização de limpeza da PS Proteção, do primeiro
                diagnóstico ao cronograma e à auditoria de qualidade contínua.
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
                    Receber proposta de limpeza
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
          <Reveal className="md:col-span-6">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel className="md:justify-start">02 · Gestão Completa da Limpeza</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-white leading-[1.15]">
                Terceirizar limpeza tira a operação da sua{" "}
                <span className="text-yellow">rotina interna</span>
              </h2>
              <div className="text-white/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  Terceirizar limpeza remove da sua empresa a gestão de EPIs, produtos químicos e
                  escala de equipe, deixando isso sob nossa responsabilidade contratual.
                </p>
                <p>
                  Na terceirização de limpeza, você recebe uma limpeza com cronograma e relatórios
                  periódicos, sem precisar administrar folha de pagamento ou processo seletivo —
                  apenas o <strong className="text-white">resultado combinado</strong>, todos os
                  dias.
                </p>
              </div>
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

          <Reveal delayMs={100} className="md:col-span-6">
            <div className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_25px_55px_-25px_rgba(0,0,0,0.45)] max-w-md mx-auto md:max-w-none">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/assets/limpeza.webp"
                  alt="Limpeza profissional: colaboradora da PS Proteção uniformizada higienizando estação de trabalho em escritório"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div className="flex items-start gap-3 px-6 py-5 border-t border-white/10 bg-navy-deep">
                <SprayCan size={20} className="text-yellow shrink-0 mt-0.5" />
                <p className="font-heading text-white text-sm leading-snug">
                  Equipe uniformizada e supervisão em 100% dos contratos
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tipos de limpeza */}
      <section id="tipos-de-limpeza" className={`py-20 md:py-[var(--spacing-section)] bg-surface ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-12 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                03 · Tipos de Limpeza
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy mb-4 leading-tight">
                Limpeza industrial, comercial, de condomínios, hospitalar e pós-obra
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                A equipe é a mesma e o padrão de supervisão também. O que muda é a rotina, o
                cronograma e os cuidados de cada tipo de ambiente.
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CLEANING_TYPES.map((type, i) => {
              const Icon = type.icon;
              return (
                <li key={type.id} id={type.id} className={ANCHOR}>
                  <Reveal delayMs={(i % 3) * 80} className="h-full">
                    <div className="flex h-full flex-col gap-3 rounded-2xl border border-navy/10 bg-white p-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy">
                        <Icon size={22} className="text-yellow" />
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-navy">{type.title}</h3>
                      <p className="text-sm leading-relaxed text-graphite/70">{type.text}</p>
                      {type.href && (
                        <Link
                          href={type.href}
                          className="mt-auto inline-flex items-center gap-1.5 pt-2 font-heading text-sm font-semibold text-navy hover:text-yellow-dark"
                        >
                          {type.linkLabel}
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
      <section id="segmentos" className={`py-20 md:py-24 bg-white ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                04 · Ambientes Atendidos
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy mb-4 leading-tight">
                Limpeza para empresas, galpões, escolas, comércio e mais
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed mb-8">
                Veja como atendemos cada ambiente em Americana e região:
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <ul className="flex flex-wrap justify-center md:justify-start gap-2">
              {OTHER_SEGMENTS.map(({ slug, label }) => {
                const href = segmentHref(slug);
                return href ? (
                  <li key={slug}>
                    <Link
                      href={href}
                      className="press-feedback inline-flex rounded-full border border-navy/15 bg-surface px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-yellow hover:bg-yellow/10"
                    >
                      {label}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      <div id="cobertura" className={ANCHOR}>
        <WhereWeOperate category="limpeza" number="05" />
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
                  própria por trás de cada contrato de limpeza terceirizada que colocamos em
                  operação.
                </p>
                <p>
                  São mais de{" "}
                  <strong className="text-navy">3.000 colaboradores treinados</strong> e mais de{" "}
                  <strong className="text-navy">1.000 clientes atendidos</strong>, com a mesma
                  supervisão de perto que existia no primeiro contrato da empresa. Da
                  administradora de condomínio à indústria de grande porte, aplicamos o mesmo
                  padrão operacional em cada contrato.
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
                Dúvidas sobre limpeza terceirizada para empresas, indústrias e condomínios
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
        title="Outros serviços e páginas de limpeza"
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
              Pronto para contratar uma empresa de limpeza profissional?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto md:mx-0">
              Fale com nossa equipe agora e receba uma proposta personalizada de limpeza para
              empresas, indústrias ou condomínios, sem compromisso.
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
                href="/servicos/portaria"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 font-heading font-semibold text-white transition-colors hover:bg-white/15"
              >
                <ArrowRight size={18} />
                Conhecer Portaria Terceirizada
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
