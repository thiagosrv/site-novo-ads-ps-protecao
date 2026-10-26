import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ClipboardCheck,
  UsersRound,
  BadgeCheck,
  Eye,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Building2,
  Factory,
  Home,
  Wrench,
  ConciergeBell,
  Briefcase,
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
  title: "Empresa de Facilities: Terceirização de Facilities | PS Proteção",
  description:
    "Empresa de facilities: portaria, limpeza, zeladoria e recepção em um só contrato, com equipe própria, supervisão ativa e cobertura em faltas. Proposta sem compromisso.",
  alternates: {
    canonical: "/servicos/facilities",
  },
};

const HERO_ALT = "Equipe de facilities da PS Proteção em posto de portaria e controle de acesso";

/** Margem de rolagem das âncoras: header fixo + barra de navegação fixa. */
const ANCHOR = "scroll-mt-32 md:scroll-mt-36";

const NAV_LINKS: AnchorLink[] = [
  { href: "#servicos", label: "Serviços" },
  { href: "#zeladoria", label: "Zeladoria" },
  { href: "#recepcao", label: "Recepção" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#cobertura", label: "Onde atendemos" },
  { href: "#faq", label: "Perguntas" },
];

const HERO_CHECKS = [
  "Portaria, limpeza, zeladoria e recepção em um único contrato",
  "Equipe própria em CLT, com seleção, treinamento e uniforme sob nossa gestão",
  "Cobertura garantida contratualmente em faltas",
  "Sem letras miúdas: escopo e SLA por escrito",
];

const PILLARS = [
  {
    n: "1",
    icon: ClipboardCheck,
    title: "Diagnóstico Integrado",
    text: "Levantamos portaria, limpeza, zeladoria e recepção do seu endereço de uma só vez, para dimensionar a equipe certa e fechar um único escopo de gestão de facilities, com Procedimento Operacional Padrão (POP) por posto.",
  },
  {
    n: "2",
    icon: BadgeCheck,
    title: "Equipe Treinada e Padronizada",
    text: "Profissionais selecionados e treinados pela PS Proteção, com uniforme e rotina definidos em POP, para que cada serviço de facilities siga o mesmo padrão de atendimento.",
  },
  {
    n: "3",
    icon: UsersRound,
    title: "Reserva Técnica sem Custo Extra",
    text: "Cobertura imediata em faltas, férias e desligamentos, com profissionais treinados e integrados aos protocolos do seu posto — o contratante nunca fica descoberto.",
  },
  {
    n: "4",
    icon: Eye,
    title: "Supervisão Ativa Contínua",
    text: "Inspetores em campo e supervisão de bancada acompanham o cumprimento da escala de todos os serviços, também no período noturno, com relatórios periódicos para a sua gestão.",
    accent: true,
  },
];

const MARQUEE_ITEMS = [
  "Empresa de Facilities",
  "Gestão de Facilities",
  "Facility Management",
  "Zeladoria Terceirizada",
  "Supervisão Ativa 24h",
];

const DIFFERENTIALS = [
  "Um único contrato para portaria, limpeza, zeladoria e recepção",
  "Uniforme, equipamentos e escala sob nossa gestão",
  "Substituição imediata em faltas e afastamentos",
  "Supervisão centralizada e relatórios periódicos",
];

const AMERICANA = getCityBySlug("americana");

/** Caminho da página programática de facilities em Americana para um segmento; null se o segmento não existir. */
function segmentHref(slug: string): string | null {
  const segment = getSegmentBySlug(slug);
  return segment && AMERICANA ? buildSegmentNestedPath("facilities", segment, AMERICANA) : null;
}

/** Caminho da página programática de um serviço em Americana; null se o serviço não existir. */
function serviceHref(slug: string): string | null {
  const service = getServiceBySlug(slug);
  return service && AMERICANA ? buildServiceNestedPath(service, AMERICANA) : null;
}

const HUB_HREF = AMERICANA ? buildCategoryNestedPath("facilities", AMERICANA) : "/servicos";

const CORE_SERVICES = [
  {
    id: "portaria",
    title: "Portaria e Controle de Acesso",
    image: "/brand/guarda-fachada.webp",
    alt: "Porteiro treinado da PS Proteção em frente à portaria de um empreendimento",
    position: "object-[70%_30%]",
    text: "Porteiro treinado, com triagem de visitantes, controle de entrada e saída e registro de ocorrências, em escalas diurnas, noturnas ou 24 horas.",
    items: [
      "Controle de entrada e saída de pessoas",
      "Registro e identificação de visitantes",
      "Procedimento Operacional Padrão (POP)",
    ],
    href: "/servicos/portaria",
    cta: "Conhecer Portaria Terceirizada",
  },
  {
    id: "limpeza",
    title: "Limpeza e Conservação",
    image: "/assets/limpeza.webp",
    alt: "Profissional de limpeza da PS Proteção higienizando uma estação de trabalho",
    position: "object-[50%_35%]",
    text: "Equipes de limpeza uniformizadas, com rotinas definidas, produtos e equipamentos inclusos, para empresas, indústrias e condomínios.",
    items: [
      "Limpeza de ambientes internos e externos",
      "Higienização de banheiros e copas",
      "Produtos e equipamentos inclusos",
    ],
    href: "/servicos/limpeza",
    cta: "Conhecer Limpeza Terceirizada",
  },
];

const SUPPORT_SERVICES = [
  {
    id: "zeladoria",
    icon: Wrench,
    title: "Zeladoria terceirizada",
    text: "Empresa de zeladoria para a conservação, a manutenção preventiva básica e a organização das áreas comuns de condomínios, empresas e indústrias.",
    href: serviceHref("servicos-terceirizados-para-condominios"),
    linkLabel: "Ver serviços para condomínios",
  },
  {
    id: "recepcao",
    icon: ConciergeBell,
    title: "Recepção terceirizada",
    text: "Recepcionista terceirizada para atendimento presencial e telefônico, triagem de visitas e controle de agenda, com profissionais treinados e uniformizados.",
    href: serviceHref("recepcao-terceirizada"),
    linkLabel: "Ver recepção terceirizada",
  },
  {
    id: "servicos-gerais",
    icon: Briefcase,
    title: "Serviços gerais e apoio administrativo",
    text: "Terceirização de serviços gerais, com auxiliar administrativo e auxiliar contábil, sob a mesma gestão e o mesmo contrato dos demais postos.",
    href: serviceHref("terceirizacao-de-servicos-gerais"),
    linkLabel: "Ver serviços gerais",
  },
];

const SEGMENT_CARDS = [
  {
    id: "condominios",
    icon: Home,
    title: "Facilities para condomínios",
    text: "Portaria, limpeza e zeladoria sob um só contrato, para a administradora e o síndico lidarem com um único interlocutor.",
    href: serviceHref("servicos-terceirizados-para-condominios") ?? segmentHref("condominios-empresariais"),
    linkLabel: "Ver serviços para condomínios",
  },
  {
    id: "empresas",
    icon: Building2,
    title: "Facilities para empresas",
    text: "Recepção, portaria, limpeza e apoio administrativo integrados, com padrão de atendimento único em escritórios e sedes.",
    href: segmentHref("edificios-comerciais") ?? segmentHref("complexos-corporativos"),
    linkLabel: "Ver facilities para empresas",
  },
  {
    id: "industrias",
    icon: Factory,
    title: "Facilities para indústrias",
    text: "Portaria, limpeza industrial e serviços gerais com escala dimensionada por turno e regras de acesso da planta.",
    href: segmentHref("industrias") ?? segmentHref("parques-industriais"),
    linkLabel: "Ver facilities para indústrias",
  },
];

const OTHER_SEGMENTS: { slug: string; label: string }[] = [
  { slug: "condominios-empresariais", label: "Condomínios empresariais" },
  { slug: "complexos-corporativos", label: "Complexos corporativos" },
  { slug: "edificios-comerciais", label: "Edifícios comerciais" },
  { slug: "parques-industriais", label: "Parques industriais" },
  { slug: "shopping-centers", label: "Shopping centers" },
];

const RELATED: RelatedLink[] = [
  {
    href: "/servicos/portaria",
    title: "Portaria terceirizada",
    text: "Porteiro treinado, portaria 24 horas e controle de acesso para condomínios, empresas e indústrias.",
  },
  {
    href: "/servicos/limpeza",
    title: "Limpeza terceirizada",
    text: "Limpeza industrial, comercial e de condomínios, com cronograma e auditoria de qualidade.",
  },
  {
    href: serviceHref("servico-de-portaria-e-limpeza") ?? "/servicos",
    title: "Portaria e limpeza no mesmo contrato",
    text: "Veja como combinamos os dois serviços com gestão unificada em Americana e região.",
  },
  {
    href: serviceHref("empresa-de-facilities") ?? HUB_HREF,
    title: "Empresa de facilities em Americana",
    text: "Atendimento com sede própria na cidade e o mesmo padrão de supervisão em cada contrato.",
  },
  {
    href: HUB_HREF,
    title: "Facilities em Americana e região",
    text: "Cobertura nas cidades da região, com um único ponto de contato para todos os serviços.",
  },
  {
    href: "/servicos",
    title: "Todos os serviços",
    text: "Portaria, limpeza, zeladoria, recepção e gestão completa de facilities.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O que é facility management e o que uma empresa de facilities faz?",
    answer:
      "Facility management é a **gestão dos serviços de apoio** que mantêm um local funcionando: portaria, limpeza, zeladoria, recepção e serviços gerais. Uma empresa de facilities assume a equipe, a escala, a supervisão e a cobertura de faltas desses serviços e entrega o resultado combinado em contrato. Assim, o condomínio ou a empresa deixa de gerenciar cada fornecedor separadamente.",
  },
  {
    question: "Quais serviços de facilities a PS Proteção terceiriza?",
    answer:
      "Terceirizamos **portaria e controle de acesso, limpeza e conservação, zeladoria, recepção**, auxiliar administrativo e auxiliar contábil. Você pode contratar cada serviço de forma isolada ou integrá-los em um único contrato de facilities terceirizado, com gestão unificada e um só ponto de contato. O escopo de cada posto fica descrito na proposta.",
  },
  {
    question: "Qual a vantagem da terceirização de facilities em um só contrato?",
    answer:
      "Em vez de administrar várias empresas, folhas de pagamento e coberturas de falta, você tem **um único contrato, uma supervisão centralizada e um só interlocutor**. A gestão dos postos sai da rotina interna e você acompanha o resultado por relatórios periódicos. Também fica mais simples padronizar uniforme, rotina e atendimento entre portaria, limpeza e zeladoria.",
  },
  {
    question: "Posso contratar só portaria e limpeza, sem os demais serviços?",
    answer:
      "Sim. **Portaria e limpeza** são a base de muitos contratos, e a zeladoria, a recepção e os serviços gerais podem ser acrescentados depois, conforme a operação cresce. O escopo e o SLA ficam definidos por escrito, sem fidelidade obrigatória. Se preferir, também é possível contratar apenas um dos serviços.",
  },
  {
    question: "A PS Proteção atua como empresa de zeladoria e com recepcionista terceirizada?",
    answer:
      "Sim. Como empresa de zeladoria, cuidamos da **conservação, da manutenção preventiva básica e da organização das áreas comuns**. Com a recepcionista terceirizada, entregamos atendimento presencial e telefônico, triagem de visitas e controle de agenda, com profissionais treinados e uniformizados. Ambos podem entrar no mesmo contrato da portaria e da limpeza.",
  },
  {
    question: "O que é terceirização de serviços gerais e mão de obra?",
    answer:
      "É a contratação de uma empresa para fornecer e gerir a equipe de apoio do seu local. Na PS Proteção, a **equipe é própria, em CLT, sem subcontratação**, e a empresa assume seleção, treinamento, escala, encargos e reposição. Você contrata o resultado dos postos, sem administrar folha de pagamento nem processo seletivo.",
  },
  {
    question: "Atendem condomínios, empresas e indústrias?",
    answer:
      "Sim. Atendemos **condomínios, empresas e indústrias**, com o mesmo padrão de supervisão. O que muda é o dimensionamento: o condomínio pede portaria, limpeza e zeladoria das áreas comuns, a empresa costuma incluir recepção e apoio administrativo, e a indústria pede escala por turno e regras de acesso da planta.",
  },
  {
    question: "Qual o prazo para implantar a terceirização de facilities?",
    answer:
      "A implantação de cada posto leva em média de **5 a 15 dias úteis**, contando diagnóstico, seleção e treinamento da equipe com POP específico. Em escopos com mais de um serviço, combinamos o cronograma por etapa na proposta, antes de qualquer assinatura. Nas primeiras semanas, a supervisão é intensiva para ajustar a rotina.",
  },
  {
    question: "Existe contrato de longo prazo ou fidelidade obrigatória?",
    answer:
      "Não há fidelidade obrigatória. Formalizamos um contrato de prestação de serviço com **escopo, escala e SLA definidos por escrito** para cada serviço incluído. A proposta é personalizada conforme o porte e o tipo do seu local, com valores claros antes de qualquer assinatura.",
  },
  {
    question: "Qual a área de atuação da PS Proteção em facilities?",
    answer:
      "Temos sede própria em Americana e atendemos condomínios, empresas e indústrias na **Região Metropolitana de Campinas** e no interior de São Paulo. Fale com nossa equipe para confirmar a cobertura no seu endereço e receber uma proposta personalizada, sem compromisso.",
  },
];

export default function ServicoFacilitiesPage() {
  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: "Facilities Terceirizado" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Terceirização de Facilities",
    name: "Empresa de Facilities: Terceirização de Facilities | PS Proteção",
    description:
      "Empresa de facilities: gestão de facilities e terceirização de serviços gerais, com portaria, limpeza, zeladoria terceirizada e recepcionista terceirizada em um só contrato, para condomínios, empresas e indústrias.",
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
        <CategoryHeroBackground kind="facilities" alt={HERO_ALT} />
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
                  Serviços · Facilities Terceirizado
                </span>
              </div>
            </Reveal>
            <Reveal delayMs={160}>
              <h1 className="text-white font-heading text-[40px] md:text-6xl font-bold leading-[1.05] mb-5">
                <span className="text-yellow">Empresa de Facilities</span>: Portaria, Limpeza e
                Zeladoria em um Só Contrato
              </h1>
            </Reveal>
            <Reveal delayMs={240}>
              <h2 className="text-white/90 font-heading text-xl md:text-2xl font-medium leading-snug mb-8">
                Terceirização de facilities com equipe própria, supervisão ativa e cobertura em
                faltas — proposta sem compromisso.
              </h2>
            </Reveal>
            <Reveal delayMs={320}>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
                <WhatsAppCta
                  href="https://wa.me/5519982892037"
                  label={
                    <>
                      <MessageCircle size={24} />
                      Contratar facilities terceirizado
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
              <CategoryHeroMobileCard kind="facilities" alt={HERO_ALT} />
            </Reveal>
          </div>
        </div>
      </section>

      <LpAnchorNav links={NAV_LINKS} ctaLabel="Pedir proposta" />

      <MarqueeBand items={MARQUEE_ITEMS} />

      {/* Serviços de facilities */}
      <section id="servicos" className={`py-20 md:py-[var(--spacing-section)] bg-white ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-14 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                01 · Serviços de Facilities
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-4 leading-tight">
                Serviços de facilities: portaria, limpeza, zeladoria e recepção
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                Portaria e limpeza formam o núcleo da gestão de facilities, e a zeladoria, a
                recepção e os serviços gerais entram no mesmo contrato quando você precisa.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {CORE_SERVICES.map((service, i) => (
              <Reveal key={service.id} delayMs={i * 100}>
                <div
                  id={service.id}
                  className={`h-full flex flex-col overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-[0_15px_35px_-25px_rgba(0,15,105,0.35)] ${ANCHOR}`}
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`object-cover ${service.position}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-7 md:p-8 text-center md:text-left">
                    <h3 className="font-heading text-2xl text-navy">{service.title}</h3>
                    <p className="text-graphite/70 leading-relaxed">{service.text}</p>
                    <ul className="flex flex-col gap-2.5 items-center md:items-start">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-graphite/80 text-[15px]">
                          <CheckCircle2 className="text-yellow-dark shrink-0" size={18} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="mt-auto inline-flex items-center justify-center md:justify-start gap-1.5 pt-2 font-heading font-semibold text-navy hover:text-yellow-dark transition-colors"
                    >
                      {service.cta}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <ul className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SUPPORT_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <li key={service.id} id={service.id} className={ANCHOR}>
                  <Reveal delayMs={i * 80} className="h-full">
                    <div className="flex h-full flex-col gap-3 rounded-2xl border border-navy/10 bg-surface p-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy">
                        <Icon size={22} className="text-yellow" />
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-navy">{service.title}</h3>
                      <p className="text-sm leading-relaxed text-graphite/70">{service.text}</p>
                      {service.href && (
                        <Link
                          href={service.href}
                          className="mt-auto inline-flex items-center gap-1.5 pt-2 font-heading text-sm font-semibold text-navy hover:text-yellow-dark"
                        >
                          {service.linkLabel}
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

      {/* Gestão integrada: um só contrato */}
      <section
        id="contrato-unico"
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
              <SectionLabel className="md:justify-start">02 · Um Só Contrato</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-white leading-[1.15]">
                Portaria, limpeza e zeladoria em um só contrato:{" "}
                <span className="text-yellow">um ponto de contato</span>
              </h2>
              <div className="text-white/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  Na gestão de facilities, a PS Proteção assume escala, encargos trabalhistas e
                  substituição de profissionais de todos os serviços de apoio, mantendo o padrão
                  definido em contrato com você.
                </p>
                <p>
                  Você não precisa administrar várias empresas, folhas de pagamento ou processos
                  seletivos — recebe apenas o{" "}
                  <strong className="text-white">resultado combinado</strong>, todos os dias, com
                  relatórios periódicos.
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
                  src="/assets/zelador.webp"
                  alt="Profissional de zeladoria da PS Proteção fazendo a inspeção de uma área comum"
                  fill
                  quality={90}
                  className="object-cover object-[50%_40%]"
                />
              </div>
              <div className="flex items-start gap-3 px-6 py-5 border-t border-white/10 bg-navy-deep">
                <ShieldCheck size={20} className="text-yellow shrink-0 mt-0.5" />
                <p className="font-heading text-white text-sm leading-snug">
                  Uniforme, POP e supervisão padronizados em todos os serviços do contrato
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className={`py-20 md:py-[var(--spacing-section)] bg-surface ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-14 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                03 · Como Funciona
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-4 leading-tight">
                Como funciona a gestão de facilities, da proposta à rotina
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                Quatro pilares sustentam a terceirização de facilities da PS Proteção, do primeiro
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
                    Receber proposta de facilities
                  </>
                }
                iconSize={18}
                className="px-7 py-3.5 text-[15px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Segmentos */}
      <section id="segmentos" className={`py-20 md:py-[var(--spacing-section)] bg-white ${ANCHOR}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-12 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy" align="center" className="md:justify-start">
                04 · Para Quem
              </SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy mb-4 leading-tight">
                Terceirização de serviços para condomínios, empresas e indústrias
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                O contrato é montado sob medida: a combinação de postos muda conforme o tipo de
                local, e o padrão de supervisão é o mesmo.
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SEGMENT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <li key={card.id} id={card.id} className={ANCHOR}>
                  <Reveal delayMs={i * 80} className="h-full">
                    <div className="flex h-full flex-col gap-3 rounded-2xl border border-navy/10 bg-surface p-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy">
                        <Icon size={22} className="text-yellow" />
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-navy">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-graphite/70">{card.text}</p>
                      {card.href && (
                        <Link
                          href={card.href}
                          className="mt-auto inline-flex items-center gap-1.5 pt-2 font-heading text-sm font-semibold text-navy hover:text-yellow-dark"
                        >
                          {card.linkLabel}
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delayMs={100}>
            <div className="mt-10 text-center md:text-left">
              <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-navy/60">
                Também atendemos
              </p>
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
            </div>
          </Reveal>
        </div>
      </section>

      <div id="cobertura" className={ANCHOR}>
        <WhereWeOperate category="facilities" number="05" />
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
                  proximidade real com o cliente. Hoje, essa mesma estrutura própria sustenta cada
                  posto de portaria, limpeza, zeladoria e recepção que colocamos em operação.
                </p>
                <p>
                  São mais de{" "}
                  <strong className="text-navy">3.000 colaboradores treinados</strong> e mais de{" "}
                  <strong className="text-navy">1.000 clientes atendidos</strong>, com supervisão
                  de perto desde o primeiro contrato da empresa. Da administradora de condomínio à
                  indústria de grande porte, aplicamos o mesmo padrão operacional em cada serviço
                  de facilities.{" "}
                  <Link
                    href="/sobre"
                    className="font-semibold text-navy underline decoration-yellow decoration-2 underline-offset-4 hover:text-yellow-dark transition-colors"
                  >
                    Conheça a nossa história
                  </Link>
                  .
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
                Dúvidas sobre terceirização de facilities e serviços gerais
              </h2>
            </div>
          </Reveal>
          <FaqAccordion items={FAQ_ITEMS} initialOpen={[0, 1]} multiple />
          <Reveal delayMs={150}>
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="text-graphite/70 text-sm md:text-base">
                Não encontrou sua dúvida aqui? Veja as{" "}
                <Link
                  href="/duvidas"
                  className="font-semibold text-navy underline decoration-yellow decoration-2 underline-offset-4 hover:text-yellow-dark transition-colors"
                >
                  perguntas frequentes do site
                </Link>{" "}
                ou fale direto com nossa equipe.
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
        title="Outros serviços e páginas de facilities"
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
              Pronto para contratar uma empresa de facilities?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto md:mx-0">
              Fale com nossa equipe agora e receba uma proposta personalizada de gestão de
              facilities, sem compromisso, para o seu condomínio, empresa ou indústria.
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
                href="/servicos"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 font-heading font-semibold text-white transition-colors hover:bg-white/15"
              >
                <ArrowRight size={18} />
                Ver todos os serviços
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
