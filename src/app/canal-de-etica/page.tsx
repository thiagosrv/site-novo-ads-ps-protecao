import type { Metadata } from "next";
import Image from "next/image";
import {
  EyeOff,
  ShieldOff,
  SearchCheck,
  Clock,
  MessageSquareWarning,
  ShieldAlert,
  Scale,
  HandCoins,
  GitBranch,
  Banknote,
  HardHat,
  PackageX,
  HelpCircle,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EthicsReportForm from "@/components/EthicsReportForm";
import { ETHICS_REPORT_TYPES, ETHICS_PROCESS_STEPS, ETHICS_FAQ } from "@/lib/ethics";

export const metadata: Metadata = {
  title: "Canal de Ética | PS Proteção",
  description:
    "Canal de ética 100% anônimo da PS Proteção. Registre relatos de assédio, discriminação, corrupção ou descumprimento de normas com total sigilo, sem informar seu nome.",
  alternates: {
    canonical: "/canal-de-etica",
  },
};

const FEATURES = [
  {
    icon: EyeOff,
    title: "Sempre anônimo",
    text: "O formulário não pede seu nome em nenhum momento. Não há como identificar quem enviou o relato.",
  },
  {
    icon: ShieldOff,
    title: "Sem retaliação",
    text: "Garantimos proteção contra qualquer forma de retaliação a quem reporta de boa-fé.",
  },
  {
    icon: SearchCheck,
    title: "Investigação independente",
    text: "Toda denúncia é apurada por um canal isolado da liderança diretamente envolvida, com isenção e critério.",
  },
  {
    icon: Clock,
    title: "Resposta em até 15 dias úteis",
    text: "Caso informe um e-mail para retorno, você receberá um feedback sobre o andamento da investigação em até 15 dias úteis.",
  },
];

const REPORT_TYPE_ICONS: Record<string, typeof MessageSquareWarning> = {
  "Assédio moral": MessageSquareWarning,
  "Assédio sexual": ShieldAlert,
  Discriminação: Scale,
  "Corrupção ou suborno": HandCoins,
  "Conflito de interesses": GitBranch,
  "Fraude financeira": Banknote,
  "Descumprimento de normas de segurança": HardHat,
  "Furto ou desvio de patrimônio": PackageX,
  Outro: HelpCircle,
};

export default function CanalDeEticaPage() {
  return (
    <>
      <PageHero
        tag="Compromisso com a integridade"
        title="Canal de Ética"
        description="Um espaço seguro e 100% anônimo para reportar condutas que vão contra nossos valores. Sua voz é fundamental para mantermos um ambiente íntegro e transparente."
        showScrollCue
      />

      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="relative rounded-[24px] overflow-hidden aspect-[16/9] shadow-[0_25px_55px_-25px_rgba(0,15,105,0.35)] mb-14 md:mb-16">
              <Image
                src="/assets/etica.webp"
                alt="Colaboradora da PS Proteção consultando o celular durante o trabalho"
                fill
                quality={90}
                className="object-cover"
                sizes="(min-width: 1024px) 1152px, 100vw"
              />
              <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2">
                  <ShieldOff size={16} className="text-yellow-dark" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                    Também para quem está na linha de frente, todos os dias
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <Reveal>
                <h2 className="font-heading text-3xl md:text-4xl text-navy mb-6 leading-tight">
                  Nosso compromisso com a ética e a transparência
                </h2>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-graphite/70 text-lg leading-relaxed mb-10">
                  A PS Proteção mantém este canal para que colaboradores, clientes, fornecedores e
                  demais parceiros possam relatar, com segurança e sem se identificar, condutas que
                  violem nossos princípios éticos e de conduta. Todo relato é tratado com sigilo e
                  seriedade, e faz parte do nosso compromisso contínuo com a integridade da nossa
                  operação.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {FEATURES.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <Reveal key={feature.title} delayMs={120 + i * 60}>
                      <div className="bg-white rounded-2xl shadow-sm border border-navy/5 p-6 h-full">
                        <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center mb-4">
                          <Icon className="text-yellow" size={20} />
                        </div>
                        <h3 className="font-heading text-navy text-base mb-1.5">{feature.title}</h3>
                        <p className="text-graphite/70 text-sm leading-relaxed">{feature.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal delayMs={100}>
              <EthicsReportForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-[var(--spacing-section)] overflow-hidden bg-gradient-to-b from-navy to-navy-deep">
        <div
          className="absolute inset-0 texture-grid opacity-60 pointer-events-none"
          style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-heading text-3xl md:text-[48px] text-white mb-5 leading-tight">
                O que você pode reportar
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Estas são algumas categorias comuns de relato — mas o canal está aberto para
                qualquer conduta que viole nossos princípios éticos.
              </p>
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ETHICS_REPORT_TYPES.map((type) => {
              const Icon = REPORT_TYPE_ICONS[type.value] ?? HelpCircle;
              return (
                <div key={type.value} className="gradient-border-yellow rounded-2xl p-px h-full">
                  <div className="bg-white rounded-[calc(1rem-1px)] h-full p-6 flex flex-col">
                    <div className="w-11 h-11 rounded-full bg-yellow/10 flex items-center justify-center mb-4 shrink-0">
                      <Icon className="text-yellow-dark" size={18} />
                    </div>
                    <h3 className="font-heading text-navy text-base mb-1.5">{type.value}</h3>
                    <p className="text-graphite/70 text-sm leading-relaxed">{type.description}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl text-navy mb-5 leading-tight">
                Como funciona o processo
              </h2>
              <p className="text-graphite/70 text-lg leading-relaxed">
                Do envio do relato até a conclusão da apuração, cada etapa é conduzida com sigilo e
                critério.
              </p>
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ETHICS_PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="relative bg-white rounded-2xl shadow-sm border border-navy/5 p-6 h-full">
                <span className="font-heading text-3xl text-yellow-dark/30 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-navy text-base mt-3 mb-1.5">{step.title}</h3>
                <p className="text-graphite/70 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-navy mb-12 leading-tight text-center">
              Perguntas frequentes
            </h2>
          </Reveal>

          <div className="space-y-5">
            {ETHICS_FAQ.map((item, i) => (
              <Reveal key={item.question} delayMs={i * 60}>
                <div className="rounded-2xl border border-navy/10 bg-surface p-6">
                  <h3 className="font-heading text-navy text-base mb-2">{item.question}</h3>
                  <p className="text-graphite/70 text-sm leading-relaxed">{item.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
