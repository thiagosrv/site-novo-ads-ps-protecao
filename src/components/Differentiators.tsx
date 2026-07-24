import { PackageCheck, GraduationCap, CalendarX, ScanLine } from "lucide-react";
import Reveal from "./Reveal";

const TIMELINE = [
  {
    n: "01",
    title: "Supervisão Ativa",
    text: "Gestores em campo realizando rondas surpresas e auditorias de posto 24/7 para garantir conformidade total.",
    highlight: true,
  },
  {
    n: "02",
    title: "Processos Definidos",
    text: "Cada posto possui um manual de normas e procedimentos (MNP) exclusivo, digitalizado e de fácil acesso.",
    highlight: false,
  },
];

const BENTO = [
  {
    icon: PackageCheck,
    title: "Implantação Estruturada",
    text: "Setup operacional rigoroso nos primeiros 30 dias para garantir o alinhamento total.",
    variant: "light" as const,
  },
  {
    icon: GraduationCap,
    title: "Treinamento Contínuo",
    text: "Capacitação técnica in-loco e reciclagens periódicas em nossa academia interna.",
    variant: "navy" as const,
  },
  {
    icon: CalendarX,
    title: "Cobertura de Faltas",
    text: "Reserva técnica mobilizada em minutos. Seu posto nunca fica descoberto.",
    variant: "light" as const,
  },
  {
    icon: ScanLine,
    title: "Tecnologia Embarcada",
    text: "Checkpoints digitais, relatórios em tempo real e monitoramento via App.",
    variant: "muted" as const,
  },
];

export default function Differentiators() {
  return (
    <section id="diferenciais" className="py-20 md:py-[var(--spacing-section)] px-6 md:px-[var(--spacing-grid-margin)] max-w-[var(--container-max)] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <Reveal className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                O Padrão PS Proteção
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-8 leading-tight">
              Por que escolher nossa inteligência operacional?
            </h2>
            <p className="text-lg text-graphite/70 mb-12 leading-relaxed">
              A terceirização tradicional falha pela falta de controle. Nós reinventamos o modelo
              através de uma arquitetura de supervisão que garante a execução do que foi
              planejado.
            </p>
          </Reveal>

          <div className="relative text-left">
            <div className="absolute left-[15px] top-4 w-0.5 h-[calc(100%-32px)] bg-navy/10" />
            <div className="space-y-10">
              {TIMELINE.map((step, i) => (
                <Reveal key={step.n} delayMs={i * 100} className="relative pl-12">
                  <div
                    className={`absolute left-0 top-1 w-8 h-8 rounded-full bg-surface border-2 flex items-center justify-center z-10 ${
                      step.highlight ? "border-yellow" : "border-navy/20"
                    }`}
                  >
                    <span className="font-mono text-xs text-navy font-bold">{step.n}</span>
                  </div>
                  <h4 className="font-heading text-xl text-navy mb-3">{step.title}</h4>
                  <p className="text-graphite/70 leading-relaxed">{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 md:mt-0">
          {BENTO.map((item, i) => {
            const Icon = item.icon;
            const isNavy = item.variant === "navy";
            const isMuted = item.variant === "muted";
            return (
              <Reveal
                key={item.title}
                delayMs={i * 80}
                className={`p-8 md:p-10 rounded-3xl border border-navy/10 hover:border-yellow/50 transition-all duration-300 relative overflow-hidden ${
                  isNavy
                    ? "bg-navy text-white shadow-xl sm:translate-y-8"
                    : isMuted
                      ? "bg-white/60 sm:translate-y-8"
                      : "bg-white"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border ${
                    isNavy ? "bg-white/10 border-white/20" : "bg-white shadow-sm border-navy/5"
                  }`}
                >
                  <Icon className={isNavy ? "text-yellow" : "text-navy"} size={26} />
                </div>
                <h3 className={`font-heading text-xl mb-4 ${isNavy ? "text-white" : "text-navy"}`}>
                  {item.title}
                </h3>
                <p className={isNavy ? "text-white/80" : "text-graphite/70"}>{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
