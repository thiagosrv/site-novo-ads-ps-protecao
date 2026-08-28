import type { Metadata } from "next";
import Image from "next/image";
import {
  ShieldCheck,
  FileSearch,
  Brain,
  ClipboardCheck,
  Lock,
  MessageCircle,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WhatsAppCta from "@/components/WhatsAppCta";
import SectionLabel from "@/components/SectionLabel";
import ProcessCard from "@/components/ProcessCard";
import MarqueeBand from "@/components/MarqueeBand";

export const metadata: Metadata = {
  title: "Processo de Recrutamento e Triagem | PS Proteção",
  description:
    "Conheça o protocolo de Background Check da PS Proteção: dossiê de antecedentes, mapeamento psicológico e auditoria de histórico profissional aplicados a cada colaborador.",
  alternates: {
    canonical: "/sobre/recrutamento-e-triagem",
  },
};

const HERO_CHECKS = [
  "Dossiê de antecedentes criminais",
  "Mapeamento psicológico e comportamental",
  "Auditoria de histórico profissional",
  "Liberação para assumir o posto",
];

const STEPS = [
  {
    n: "1",
    icon: FileSearch,
    title: "Dossiê de Antecedentes Criminais e Documentais",
    text: "Realizamos um pente-fino investigativo. Exigimos e validamos todas as certidões negativas de antecedentes criminais nas esferas federal e estadual. Nenhum colaborador assume uma guarita ou posto de limpeza na PS Proteção sem ter um histórico comprovadamente limpo e regularizado.",
  },
  {
    n: "2",
    icon: Brain,
    title: "Mapeamento Psicológico e Comportamental",
    text: "O controle de acesso exige inteligência emocional, cordialidade e firmeza. Submetemos nossos candidatos a avaliações psicológicas para garantir que possuem o perfil exato para lidar com atendimento ao público, pressão e gerenciamento rápido de crises.",
  },
  {
    n: "3",
    icon: ClipboardCheck,
    title: "Auditoria de Histórico Profissional",
    text: "Não confiamos apenas no papel. Checamos ativamente as referências de empregos anteriores para atestar a conduta, o nível de comprometimento e a assiduidade de cada candidato.",
    accent: true,
  },
];

const TRUST_INDICATORS = [
  { icon: ClipboardCheck, label: "Triagem completa" },
  { icon: ShieldCheck, label: "Antecedentes auditados" },
  { icon: Lock, label: "Operação regularizada" },
];

export default function RecrutamentoTriagemPage() {
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
                  Sobre Nós · Recrutamento e Seleção
                </SectionLabel>
              </Reveal>
              <Reveal delayMs={100}>
                <h1 className="text-white font-heading text-4xl md:text-[3.4rem] font-bold leading-[1.1] mb-6">
                  Processo de Recrutamento e Triagem
                </h1>
              </Reveal>
              <Reveal delayMs={200}>
                <p className="text-white/80 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8">
                  A segurança da sua empresa começa antes de um profissional vestir o nosso
                  uniforme. Conheça o protocolo de Background Check que aplicamos a cada
                  colaborador.
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
                    Protocolo de checagem
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

      <MarqueeBand />

      {/* Recrutamento de alta performance */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-white overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-16 items-center">
          <Reveal className="md:col-span-6">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <SectionLabel color="navy">Tolerância zero</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-[1.15]">
                Recrutamento de alta performance e{" "}
                <span className="text-yellow-dark">Background Check rigoroso</span>
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4 max-w-[62ch] mx-auto md:mx-0">
                <p>
                  A segurança e a excelência operacional da sua empresa começam muito antes de um
                  profissional vestir o nosso uniforme e assumir o posto. Na{" "}
                  <strong className="text-navy">PS Proteção</strong>, entendemos que terceirizar
                  serviços de Portaria e Facilities significa confiar o seu patrimônio e a vida
                  das pessoas que circulam no seu espaço a terceiros.
                </p>
                <p>
                  Por isso, nosso processo seletivo não se baseia apenas em analisar currículos.
                  Para garantir total{" "}
                  <strong className="text-navy">conformidade legal</strong> e blindar nossos
                  clientes contra riscos operacionais e passivos, aplicamos um protocolo de{" "}
                  <strong className="text-navy">Background Check (Checagem de Antecedentes)</strong>{" "}
                  com tolerância zero para irregularidades.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="md:col-span-6">
            <div className="rounded-[24px] overflow-hidden border border-navy/10 bg-surface shadow-[0_25px_55px_-25px_rgba(0,15,105,0.35)] max-w-md mx-auto md:max-w-none">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/assets/entrevista-processo-selecao.webp"
                  alt="Briefing do processo seletivo PS Proteção com candidatos"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-start gap-3 px-6 py-5 border-t border-navy/10 bg-white">
                <ShieldCheck size={20} className="text-yellow-dark shrink-0 mt-0.5" />
                <p className="font-heading text-navy text-sm leading-snug">
                  100% dos candidatos passam por Background Check antes da contratação
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Barreira de entrada */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-navy">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-14 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <SectionLabel align="center">Como funciona</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[48px] text-white mb-4 leading-tight">
                Nossa barreira de entrada
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Três camadas de verificação aplicadas a todo candidato antes de assumir um posto
                — sem exceções.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
            <Reveal className="md:col-span-5 order-1">
              <div className="relative rounded-[24px] overflow-hidden border border-white/10 bg-white">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/assets/certificado-antecedentes-criminais.webp"
                    alt="Certificado de antecedentes criminais — checagem obrigatória PS Proteção"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-x-4 bottom-4">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2">
                    <Lock size={16} className="text-yellow-dark" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                      Background Check Completo
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="md:col-span-7 order-2 grid grid-cols-1 gap-4">
              {STEPS.map((step, i) => (
                <Reveal key={step.n} delayMs={i * 100}>
                  <ProcessCard
                    number={step.n}
                    icon={step.icon}
                    title={step.title}
                    text={step.text}
                    accent={step.accent}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Patrimônio em mãos seguras */}
      <section className="py-24 md:py-[var(--spacing-section)] bg-surface overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-16 items-center">
          <Reveal className="md:col-span-5 order-2 md:order-1">
            <div className="rounded-[24px] overflow-hidden border border-navy/10 bg-white shadow-[0_20px_50px_-25px_rgba(0,15,105,0.3)] max-w-md mx-auto md:max-w-none">
              <Image
                src="/assets/empresa-de-portaria-regularizada.webp"
                alt="Painel de gestão PS Proteção — operação regularizada"
                width={700}
                height={470}
                className="w-full h-auto object-cover"
              />
              <div className="flex items-center gap-3 px-6 py-4 border-t border-navy/10">
                <Lock size={18} className="text-yellow-dark shrink-0" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-navy">
                  Gestão auditada
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="md:col-span-7 order-1 md:order-2">
            <SectionLabel color="navy">O seu patrimônio em mãos seguras</SectionLabel>
            <p className="text-graphite/70 text-lg leading-relaxed max-w-[65ch] mx-auto md:mx-0 text-center md:text-left mb-8">
              Contratar uma empresa de portaria regularizada é o primeiro passo para uma
              terceirização segura. Com o processo de triagem da{" "}
              <strong className="text-navy">PS Proteção</strong>, você elimina os riscos da
              clandestinidade e tem a tranquilidade absoluta de que a primeira linha de defesa da
              sua empresa é formada por profissionais íntegros, auditados e de extrema confiança.
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
      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-center">
          <Reveal className="md:col-span-7 text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Quer conhecer nosso protocolo de perto?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto md:mx-0">
              Fale com nossa equipe e entenda como o Background Check da PS Proteção protege a
              sua empresa desde o primeiro dia de operação.
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
              <a
                href="https://protecaotalentos.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 font-heading font-semibold text-white transition-colors hover:bg-white/15"
              >
                <UserPlus size={18} />
                Trabalhe Conosco
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
