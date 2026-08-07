import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import StatsRow from "@/components/StatsRow";
import TechSolutions from "@/components/TechSolutions";
import MarqueeBand from "@/components/MarqueeBand";
import Reveal from "@/components/Reveal";
import QuoteTriggerButton from "@/components/QuoteTriggerButton";

const MARQUEE_ITEMS = [
  "Aplicativo de Controle de Acesso",
  "Supervisão de Bancada em Dupla Camada",
  "Relatórios Mensais de Indicadores",
  'Dispositivo "Sempre Alerta" 24h',
];

export const metadata: Metadata = {
  title: "Tecnologia a Serviço da Supervisão | PS Proteção",
  description:
    "Aplicativo próprio de controle de acesso, supervisão de bancada, relatórios mensais e o dispositivo \"Sempre Alerta\" — tecnologia embarcada em cada posto de serviço.",
  alternates: {
    canonical: "/tecnologia",
  },
};

export default function TecnologiaPage() {
  return (
    <>
      <PageHero
        tag="Inteligência operacional"
        title="Tecnologia a serviço da supervisão"
        description="Combinamos supervisão humana especializada com aplicativos próprios, relatórios mensais e processos formais para dar visibilidade total sobre cada posto de serviço."
      />
      <StatsRow />

      <MarqueeBand items={MARQUEE_ITEMS} />

      <TechSolutions />

      <section className="bg-gradient-to-br from-navy to-navy-deep py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 texture-grid opacity-50 pointer-events-none"
          style={{ maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 80%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10">
          <Reveal>
            <div className="gradient-border rounded-[28px] p-[1.5px] max-w-3xl mx-auto">
              <div className="rounded-[26px] bg-navy-deep/80 backdrop-blur-md px-8 py-12 md:px-14 md:py-16 text-center flex flex-col items-center gap-6">
                <h2 className="font-heading text-3xl md:text-4xl text-white">
                  Quer ver a{" "}
                  <span className="bg-gradient-to-r from-yellow to-tech-blue bg-clip-text text-transparent">
                    tecnologia
                  </span>{" "}
                  em ação?
                </h2>
                <p className="text-white/70 text-lg max-w-xl">
                  Solicite uma demonstração do nosso aplicativo de controle de acesso e do
                  relatório de supervisão mensal.
                </p>
                <QuoteTriggerButton className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 hover:opacity-90 transition-opacity">
                  <MessageCircle size={18} />
                  Solicitar demonstração
                </QuoteTriggerButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
