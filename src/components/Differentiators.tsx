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
  },
  {
    icon: GraduationCap,
    title: "Treinamento Contínuo",
    text: "Capacitação técnica in-loco e reciclagens periódicas em nossa academia interna.",
  },
  {
    icon: CalendarX,
    title: "Cobertura de Faltas",
    text: "Reserva técnica mobilizada em minutos. Seu posto nunca fica descoberto.",
  },
  {
    icon: ScanLine,
    title: "Tecnologia Embarcada",
    text: "Checkpoints digitais, relatórios em tempo real e monitoramento via App.",
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
            return (
              <Reveal
                key={item.title}
                delayMs={i * 80}
                className={`group gradient-border-yellow rounded-3xl p-[1.5px] shadow-[0_10px_25px_-10px_rgba(0,0,0,0.2)] transition-shadow duration-500 hover:shadow-[0_22px_45px_-12px_rgba(0,0,0,0.3)] ${
                  i % 2 === 1 ? "sm:translate-y-8" : ""
                }`}
              >
                <div className="relative h-full rounded-[calc(1.5rem-1.5px)] bg-gradient-to-br from-navy via-navy to-navy-deep overflow-hidden p-8 md:p-10">
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-tech-blue/25 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border bg-white/10 border-white/20">
                      <Icon className="text-yellow" size={26} />
                    </div>
                    <h3 className="font-heading text-xl mb-4 text-yellow transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(252,191,7,0.55)]">
                      {item.title}
                    </h3>
                    <p className="text-white/80 transition-colors duration-300 group-hover:text-white">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
