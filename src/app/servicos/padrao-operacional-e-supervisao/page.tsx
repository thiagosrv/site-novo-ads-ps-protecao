import type { Metadata } from "next";
import Image from "next/image";
import {
  ShieldCheck,
  HardHat,
  GraduationCap,
  UsersRound,
  Car,
  ClipboardCheck,
  Lock,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WhatsAppCta from "@/components/WhatsAppCta";
import SectionLabel from "@/components/SectionLabel";
import ProcessCard from "@/components/ProcessCard";
import MarqueeBand from "@/components/MarqueeBand";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Padrão Operacional e Supervisão | PS Proteção",
  description:
    "Conheça a engenharia operacional da PS Proteção: uniformização, gestão de EPIs e NRs, treinamentos internos, reserva técnica e supervisão ativa com viaturas.",
  alternates: {
    canonical: "/servicos/padrao-operacional-e-supervisao",
  },
};

const HERO_CHECKS = [
  "Uniformização impecável em todos os postos",
  "Gestão e fiscalização diária de EPIs",
  "Treinamentos internos periódicos",
  "Supervisão ativa com viaturas dedicadas",
];

const PILLARS = [
  {
    n: "1",
    icon: HardHat,
    title: "Segurança do Trabalho e Gestão de EPIs",
    text: "Fornecimento integral e fiscalização diária para garantir o uso correto dos Equipamentos de Proteção Individual, em estrita conformidade com as Normas Regulamentadoras (NRs) do Ministério do Trabalho.",
  },
  {
    n: "2",
    icon: GraduationCap,
    title: "Capacitação Contínua: Treinamentos Internos",
    text: "Ciclos periódicos de treinamento — da cordialidade no atendimento ao público à operação de sistemas de triagem e resposta rápida a emergências — sempre com procedimentos padronizados e seguros.",
  },
  {
    n: "3",
    icon: UsersRound,
    title: "Reserva Técnica Dimensionada",
    text: "Uma reserva técnica estrategicamente dimensionada elimina o gargalo do absenteísmo: em faltas, afastamentos ou férias, acionamos imediatamente profissionais treinados e integrados aos nossos protocolos.",
  },
  {
    n: "4",
    icon: Car,
    title: "Supervisão Ativa com Viaturas",
    text: "Viaturas dedicadas exclusivamente à Supervisão Ativa realizam rondas e vistorias in loco constantes, avaliando o cumprimento das escalas e oferecendo suporte direto às equipes.",
    accent: true,
  },
];

const TRUST_INDICATORS = [
  { icon: Car, label: "Viaturas dedicadas" },
  { icon: ClipboardCheck, label: "Vistorias in loco" },
  { icon: ShieldCheck, label: "Padrão auditado" },
];

const MARQUEE_ITEMS = [
  "Padrão Operacional Rigoroso",
  "Supervisão Ativa 360°",
  "Segurança do Trabalho",
];

export default function PadraoOperacionalPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-navy to-navy-deep pt-40 pb-24 md:pt-48 md:pb-28 overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-12 items-center">
            <div className="md:col-span-7 text-center md:text-left">
              <Reveal>
                <SectionLabel align="center" className="md:justify-start">
                  Serviços · Operação 360°
                </SectionLabel>
              </Reveal>
              <Reveal delayMs={100}>
                <h1 className="text-white font-heading text-4xl md:text-[3.4rem] font-bold leading-[1.1] mb-6">
                  Padrão Operacional e Supervisão Ativa
                </h1>
              </Reveal>
              <Reveal delayMs={200}>
                <p className="text-white/80 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8">
                  A excelência de uma operação de Portaria e Facilities se comprova na rotina —
                  na postura, no preparo e na infraestrutura de apoio. Unimos presença visual
                  ostensiva a uma engenharia operacional robusta, para que o seu fluxo de
                  trabalho jamais seja interrompido.
                </p>
                <WhatsAppCta
                  href="https://wa.me/5519982892037"
                  label={
                    <>
                      <MessageCircle size={18} />
                      Fale com um especialista
                    </>
                  }
                  className="px-7 py-3.5 text-[15px]"
                />
              </Reveal>
            </div>

            <Reveal delayMs={150} className="md:col-span-5">
              <div className="relative bg-white/5 border border-white/10 rounded-[24px] p-6 md:p-7 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-6">
                  <Lock size={16} className="text-yellow" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
                    Padrão 360°
                  </span>
                </div>
                <ul className="flex flex-col">
                  {HERO_CHECKS.map((item, i) => (
                    <li key={item} className="relative flex items-start gap-3 pb-5 last:pb-0">
                      {i !== HERO_CHECKS.length - 1 && (
                        <span className="absolute left-[9px] top-6 w-px h-[calc(100%-8px)] bg-white/15" />
                      )}
                      <CheckCircle2
                        size={19}
                        className={i === HERO_CHECKS.length - 1 ? "text-yellow shrink-0" : "text-white/40 shrink-0"}
                      />
                      <span className="text-white/85 text-sm leading-snug pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MarqueeBand items={MARQUEE_ITEMS} />

      {/* Impacto visual */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-gradient-to-b from-white to-surface overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-16 items-center">
          <Reveal className="md:col-span-6">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel color="navy">Apresentação ostensiva</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-[1.15]">
                Uniformização impecável em{" "}
                <span className="text-yellow-dark">cada posto</span>
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  A percepção de segurança de qualquer instalação começa pela estética e
                  organização. Nossos profissionais assumem guaritas, recepções e pontos de
                  controle de acesso veicular rigorosamente fardados.
                </p>
                <p>
                  Exigimos um padrão de uniformização impecável, projetado para transmitir{" "}
                  <strong className="text-navy">autoridade, respeito e organização</strong>{" "}
                  imediata a qualquer visitante, auditor ou fornecedor que chegue à sua empresa.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="md:col-span-6">
            <div className="rounded-[24px] overflow-hidden border border-navy/10 bg-surface shadow-[0_25px_55px_-25px_rgba(0,15,105,0.35)] max-w-md mx-auto md:max-w-none">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/assets/uniforme-psprotecao.webp"
                  alt="Profissional PS Proteção rigorosamente fardado em posto de monitoramento"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div className="flex items-start gap-3 px-6 py-5 border-t border-navy/10 bg-white">
                <ShieldCheck size={20} className="text-yellow-dark shrink-0 mt-0.5" />
                <p className="font-heading text-navy text-sm leading-snug">
                  Uniforme e postura padronizados em 100% dos postos
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engenharia operacional */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-gradient-to-b from-navy-deep to-navy">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-14 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel align="center">Engenharia operacional</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[48px] text-white mb-4 leading-tight">
                Infraestrutura que sustenta o padrão
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Quatro pilares operacionais garantem que o padrão apresentado na portaria seja
                sustentado todos os dias, sem exceções.
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
                />
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={400} className="mt-6 md:mt-8">
            <div className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src="/assets/treinamento-operacional.webp"
                  alt="Treinamento interno PS Proteção — Procedimento Operacional para Portaria"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3 px-6 py-5">
                <GraduationCap size={20} className="text-yellow shrink-0" />
                <span className="font-heading text-white text-sm md:text-base leading-snug">
                  Treinamentos internos periódicos, com procedimentos operacionais padronizados
                  para cada posto
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Controle e respaldo */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-gradient-to-b from-surface to-white overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-16 items-center">
          <Reveal className="md:col-span-5 order-2 md:order-1">
            <div className="rounded-[24px] overflow-hidden border border-navy/10 bg-white shadow-[0_20px_50px_-25px_rgba(0,15,105,0.3)] max-w-md mx-auto md:max-w-none">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/assets/supervisao-bancada.webp"
                  alt="Supervisão ativa PS Proteção — controle e respaldo operacional"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3 px-6 py-4 border-t border-navy/10">
                <Lock size={18} className="text-yellow-dark shrink-0" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-navy">
                  Supervisão dupla camada
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="md:col-span-7 order-1 md:order-2">
            <SectionLabel color="navy">Controle e respaldo</SectionLabel>
            <p className="text-graphite/70 text-lg leading-relaxed max-w-[65ch] mx-auto md:mx-0 text-center md:text-left mb-8">
              Não deixamos nossa equipe operando sem suporte. Nossos inspetores avaliam
              constantemente as condições do posto e o cumprimento das escalas, atestando que o
              padrão de qualidade prometido em contrato é exatamente o que está sendo executado
              no seu dia a dia.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TRUST_INDICATORS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-5 py-4"
                >
                  <Icon size={18} className="text-yellow-dark shrink-0" />
                  <span className="font-heading text-navy text-sm leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-navy to-navy-deep py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-center">
          <Reveal className="md:col-span-7 text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Quer conhecer nosso padrão operacional de perto?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto md:mx-0">
              Fale com nossa equipe e entenda como a supervisão ativa da PS Proteção garante que
              o combinado em contrato é cumprido todos os dias.
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
                Ver Todos os Serviços
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
