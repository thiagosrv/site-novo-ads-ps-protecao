import Image from "next/image";
import { Award, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppCta from "./WhatsAppCta";

const STEPS = [
  {
    n: "1",
    title: "Diagnóstico do Posto de Serviço",
    text: "Realizamos uma análise do ambiente, fluxos de acesso, pontos críticos e necessidades operacionais, definindo o escopo adequado para o local.",
    image: "/assets/implantacao2.webp",
  },
  {
    n: "2",
    title: "Dimensionamento e Implantação da Equipe",
    text: "Selecionamos profissionais conforme o perfil da operação, com treinamento, uniformização e definição das rotinas de trabalho e procedimentos do posto.",
    image: "/assets/implantacao3.webp",
  },
  {
    n: "3",
    title: "Supervisão e Auditoria Operacional",
    text: "Acompanhamento periódico com supervisores, verificação de postura, rotinas, cumprimento de horários e apoio aos colaboradores em campo.",
    image: "/assets/implantacao4.webp",
  },
  {
    n: "4",
    title: "Relatórios e Melhoria Contínua",
    text: "Registro de ocorrências, ajustes operacionais e alinhamentos com o cliente para manter a operação eficiente, organizada e compatível com as necessidades do local.",
    image: "/assets/implantacao5.webp",
    last: true,
  },
];

export default function Implementation() {
  return (
    <section id="implantacao" className="py-20 md:py-[var(--spacing-section)] bg-navy">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-yellow text-sm tracking-widest uppercase">
                Nossa metodologia
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-[48px] text-white mb-4 leading-tight">
              Como estruturamos cada operação?
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Cada posto da PS Proteção é implantado com processo técnico estruturado, supervisão
              contínua e melhoria constante — garantindo resultados desde o primeiro dia.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <Reveal className="md:col-span-5">
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[320px] md:min-h-[560px]">
              <Image
                src="/assets/implantacao1.webp"
                alt="Planejamento de operação PS Proteção"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2">
                  <Award size={16} className="text-yellow-dark" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                    Processo Técnico Certificado
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-7 flex flex-col">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delayMs={i * 100} className="relative pl-14 pb-10 last:pb-0">
                {!step.last && (
                  <span className="absolute left-[15px] top-9 w-0.5 h-[calc(100%-16px)] bg-white/15" />
                )}
                <span
                  className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    step.last ? "bg-yellow text-navy" : "bg-white/10 border border-white/20 text-white"
                  }`}
                >
                  {step.n}
                </span>
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image src={step.image} alt={step.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg md:text-xl text-white mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delayMs={400}>
          <div className="mt-4 flex justify-center">
            <WhatsAppCta
              href="https://wa.me/5519982892037"
              className="px-7 py-3.5 text-[15px]"
              label={
                <>
                  <MessageCircle size={18} />
                  Solicitar Proposta Personalizada
                </>
              }
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
