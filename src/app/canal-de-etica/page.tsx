import type { Metadata } from "next";
import { EyeOff, Shield, SearchCheck, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EthicsReportForm from "@/components/EthicsReportForm";

export const metadata: Metadata = {
  title: "Canal de Ética | PS Proteção",
  description:
    "Canal confidencial de ética e transparência da PS Proteção. Registre relatos de assédio, discriminação, corrupção ou descumprimento de normas com total sigilo.",
  alternates: {
    canonical: "/canal-de-etica",
  },
};

const FEATURES = [
  {
    icon: EyeOff,
    title: "100% Confidencial",
    text: "Você pode se identificar ou permanecer anônimo — o tratamento do relato é o mesmo em ambos os casos.",
  },
  {
    icon: Shield,
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

export default function CanalDeEticaPage() {
  return (
    <>
      <PageHero
        tag="Compromisso com a integridade"
        title="Canal de Ética"
        description="Um espaço seguro e confidencial para reportar condutas que vão contra nossos valores. Sua voz é fundamental para mantermos um ambiente íntegro e transparente."
      />

      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl text-navy mb-6 leading-tight">
                Nosso compromisso com a ética e a transparência
              </h2>
            </Reveal>
            <Reveal delayMs={80}>
              <p className="text-graphite/70 text-lg leading-relaxed mb-10">
                A PS Proteção mantém este canal para que colaboradores, clientes, fornecedores e
                demais parceiros possam relatar, com segurança, condutas que violem nossos
                princípios éticos e de conduta. Todo relato é tratado com sigilo e seriedade, e faz
                parte do nosso compromisso contínuo com a integridade da nossa operação.
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
      </section>
    </>
  );
}
