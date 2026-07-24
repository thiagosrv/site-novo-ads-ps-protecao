import { MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import StatsRow from "@/components/StatsRow";
import TechSolutions from "@/components/TechSolutions";
import Reveal from "@/components/Reveal";

export default function TecnologiaPage() {
  return (
    <>
      <PageHero
        tag="Inteligência operacional"
        title="Tecnologia a serviço da supervisão"
        description="Combinamos supervisão humana especializada com aplicativos próprios, relatórios mensais e processos formais para dar visibilidade total sobre cada posto de serviço."
      />
      <StatsRow />

      <TechSolutions />

      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 text-center flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-white">
              Quer ver a tecnologia em ação?
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="text-white/70 text-lg max-w-xl">
              Solicite uma demonstração do nosso aplicativo de controle de acesso e do relatório
              de supervisão mensal.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <a
              href="https://wa.me/5519982892037"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow hover:bg-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 transition-colors"
            >
              <MessageCircle size={18} />
              Solicitar demonstração
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
