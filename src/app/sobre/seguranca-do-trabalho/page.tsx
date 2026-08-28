import type { Metadata } from "next";
import Image from "next/image";
import {
  HardHat,
  ShieldAlert,
  ClipboardList,
  GraduationCap,
  Activity,
  Users,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WhatsAppCta from "@/components/WhatsAppCta";
import SectionLabel from "@/components/SectionLabel";
import ProcessCard from "@/components/ProcessCard";
import MarqueeBand from "@/components/MarqueeBand";

export const metadata: Metadata = {
  title: "Segurança do Trabalho Integrada à Operação | PS Proteção",
  description:
    "Conformidade, prevenção e gestão de riscos fazem parte do nosso padrão operacional.",
  alternates: {
    canonical: "/sobre/seguranca-do-trabalho",
  },
};

const HERO_CHECKS = [
  "Gerenciamento de riscos ocupacionais (NR-1)",
  "CIPA — Comissão Interna de Prevenção",
  "Treinamentos e integração de equipes",
  "Acompanhamento operacional contínuo",
];

const NR1_STEPS = [
  {
    n: "01",
    icon: ShieldAlert,
    title: "Prevenção de riscos",
    text: "Identificação de perigos e acompanhamento das condições relacionadas às atividades executadas.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Procedimentos operacionais",
    text: "Orientações e processos estruturados de acordo com as particularidades de cada operação.",
  },
  {
    n: "03",
    icon: GraduationCap,
    title: "Treinamentos e integração",
    text: "Preparação das equipes para atuação segura, padronizada e compatível com o ambiente do cliente.",
    accent: true,
  },
  {
    n: "04",
    icon: Activity,
    title: "Acompanhamento contínuo",
    text: "Supervisão operacional para identificar desvios e fortalecer a prevenção durante a execução dos serviços.",
  },
];

const MARQUEE_ITEMS = [
  "NR-1 · Gerenciamento de Riscos Ocupacionais",
  "CIPA Ativa",
  "Segurança do Trabalho Integrada",
  "Conformidade Operacional",
];

export default function SegurancaDoTrabalhoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-40 pb-24 md:pt-48 md:pb-28 overflow-hidden">
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
                  Sobre Nós · Segurança do Trabalho
                </SectionLabel>
              </Reveal>
              <Reveal delayMs={100}>
                <h1 className="text-white font-heading text-4xl md:text-[3.4rem] font-bold leading-[1.1] mb-6">
                  Segurança do Trabalho Integrada à Operação
                </h1>
              </Reveal>
              <Reveal delayMs={200}>
                <p className="text-yellow text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed mb-6 font-heading font-semibold">
                  Conformidade, prevenção e gestão de riscos fazem parte do nosso padrão
                  operacional.
                </p>
                <div className="text-white/80 leading-relaxed flex flex-col gap-4 max-w-2xl mx-auto md:mx-0 mb-8">
                  <p>
                    Na PS Proteção, a Segurança do Trabalho não é tratada apenas como uma
                    exigência documental. Ela faz parte da estrutura de gestão das nossas
                    operações, desde a implantação até o acompanhamento contínuo das equipes.
                  </p>
                  <p>
                    Trabalhamos com processos orientados à prevenção, identificação de riscos,
                    capacitação dos colaboradores e acompanhamento operacional, fortalecendo a
                    conformidade com as Normas Regulamentadoras aplicáveis.
                  </p>
                </div>
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
                  <HardHat size={16} className="text-yellow" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
                    Padrão de segurança do trabalho
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

      {/* NR-1 */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-14 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel color="navy">NR-1 · Gerenciamento de Riscos Ocupacionais</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-[1.15] mb-6">
                Prevenção estruturada em cada etapa da operação
              </h2>
              <div className="text-graphite/70 text-lg leading-relaxed flex flex-col gap-4">
                <p>
                  Nossa gestão operacional considera as diretrizes da NR-1, com foco no
                  Gerenciamento de Riscos Ocupacionais, prevenção de acidentes e construção de
                  ambientes de trabalho mais seguros.
                </p>
                <p>
                  A atuação envolve integração entre operação, procedimentos, treinamento e
                  acompanhamento preventivo, contribuindo para uma terceirização mais organizada,
                  documentada e alinhada às exigências de Segurança e Saúde no Trabalho.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NR1_STEPS.map((step, i) => (
              <Reveal key={step.n} delayMs={i * 100}>
                <ProcessCard
                  number={step.n}
                  icon={step.icon}
                  title={step.title}
                  text={step.text}
                  accent={step.accent}
                  light
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CIPA */}
      <section className="relative py-24 md:py-[var(--spacing-section)] bg-navy overflow-hidden">
        <div
          className="absolute inset-0 texture-grid opacity-60 pointer-events-none"
          style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-16 items-center">
          <Reveal className="md:col-span-5 order-2 md:order-1">
            <div className="gradient-border-yellow rounded-[26px] p-[1.5px] shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)] max-w-[280px] mx-auto md:max-w-none">
              <div className="rounded-[calc(26px-1.5px)] bg-white p-8 md:p-9 flex flex-col items-center text-center gap-5">
                <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-yellow/10 blur-2xl" aria-hidden="true" />
                  <Image
                    src="/assets/CIPA.webp"
                    alt="Selo CIPA — Comissão Interna de Prevenção de Acidentes e de Assédio da PS Proteção"
                    fill
                    className="relative object-cover scale-[1.18]"
                  />
                </div>
                <div className="inline-flex items-center gap-2 bg-navy/5 rounded-full px-4 py-2">
                  <Users size={16} className="text-navy" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                    Estrutura de CIPA Ativa
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="md:col-span-7 order-1 md:order-2">
            <SectionLabel align="center" className="md:justify-start">
              CIPA · Prevenção também faz parte da cultura
            </SectionLabel>
            <h2 className="font-heading text-3xl md:text-[42px] text-white leading-[1.15] mb-6 text-center md:text-left">
              A prevenção está na cultura, não só no papel
            </h2>
            <div className="text-white/75 text-lg leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0 text-center md:text-left">
              <p>
                A PS Proteção mantém sua estrutura de CIPA — Comissão Interna de Prevenção de
                Acidentes e de Assédio, fortalecendo ações de prevenção, conscientização e
                melhoria contínua das condições de trabalho.
              </p>
              <p>
                Mais do que atender requisitos legais, buscamos incorporar a Segurança do
                Trabalho à rotina das equipes e à cultura operacional da empresa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Para o cliente */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="rounded-[28px] border border-navy/10 bg-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl md:text-3xl text-navy leading-tight mb-4">
                  Para o cliente, isso significa mais controle sobre a operação.
                </h2>
                <p className="text-graphite/70 leading-relaxed">
                  Uma terceirização estruturada em prevenção, procedimentos, treinamento e
                  supervisão reduz improvisos, fortalece a gestão de riscos e contribui para
                  operações mais seguras e previsíveis.
                </p>
              </div>
              <WhatsAppCta
                href="https://wa.me/5519982892037"
                label={
                  <>
                    <MessageCircle size={18} />
                    Falar com um especialista
                  </>
                }
                className="px-7 py-3.5 text-[15px] shrink-0"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
