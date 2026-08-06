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
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import WhatsAppCta from "@/components/WhatsAppCta";

export const metadata: Metadata = {
  title: "Processo de Recrutamento e Triagem | PS Proteção",
  description:
    "Conheça o protocolo de Background Check da PS Proteção: dossiê de antecedentes, mapeamento psicológico e auditoria de histórico profissional aplicados a cada colaborador.",
  alternates: {
    canonical: "/sobre/recrutamento-e-triagem",
  },
};

const STEPS = [
  {
    n: "1",
    icon: FileSearch,
    title: "Dossiê de Antecedentes Criminais e Documentais",
    text: "Realizamos um pente-fino investigativo. Exigimos e validamos todas as certidões negativas de antecedentes criminais nas esferas federal e estadual. Nenhum colaborador assume uma guarita ou posto de limpeza na PS Proteção sem ter um histórico comprovadamente limpo e regularizado.",
    image: "/assets/pop-sla.webp",
  },
  {
    n: "2",
    icon: Brain,
    title: "Mapeamento Psicológico e Comportamental",
    text: "O controle de acesso exige inteligência emocional, cordialidade e firmeza. Submetemos nossos candidatos a avaliações psicológicas para garantir que possuem o perfil exato para lidar com atendimento ao público, pressão e gerenciamento rápido de crises.",
    image: "/assets/recepcao.webp",
  },
  {
    n: "3",
    icon: ClipboardCheck,
    title: "Auditoria de Histórico Profissional",
    text: "Não confiamos apenas no papel. Checamos ativamente as referências de empregos anteriores para atestar a conduta, o nível de comprometimento e a assiduidade de cada candidato.",
    image: "/assets/relatorio.webp",
    last: true,
  },
];

export default function RecrutamentoTriagemPage() {
  return (
    <>
      <PageHero
        tag="Sobre Nós · Recrutamento e Seleção"
        title="Processo de Recrutamento e Triagem"
        description="A segurança da sua empresa começa antes de um profissional vestir o nosso uniforme. Conheça o protocolo de Background Check que aplicamos a cada colaborador."
      />

      {/* Contexto */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="flex flex-col gap-6 text-center md:text-left">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Tolerância zero
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-[44px] text-navy leading-tight">
                Recrutamento de Alta Performance e{" "}
                <span className="text-yellow-dark">Background Check Rigoroso</span>
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4">
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
          <Reveal delayMs={100}>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <Image
                src="/assets/empresa-de-portaria-regularizada.png"
                alt="Empresa de portaria regularizada — padrão PS Proteção de conformidade"
                width={800}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-5 left-5 bg-yellow text-navy px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
                <ShieldCheck size={18} />
                <span className="font-heading font-bold text-sm leading-none">
                  Tolerância zero a irregularidades
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Barreira de entrada — processo visual conectado */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-navy">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="mb-16 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-yellow text-sm tracking-widest uppercase">
                  Como funciona
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-[48px] text-white mb-4 leading-tight">
                Nossa barreira de entrada
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Três camadas de verificação aplicadas a todo candidato antes de assumir um posto
                — sem exceções.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <Reveal className="md:col-span-5">
              <div className="relative rounded-3xl overflow-hidden h-full min-h-[320px] md:min-h-[560px]">
                <Image
                  src="/assets/certificado-antecedentes-criminais.png"
                  alt="Certificado de antecedentes criminais — checagem obrigatória PS Proteção"
                  fill
                  className="object-cover"
                />
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

            <div className="md:col-span-7 flex flex-col">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal
                    key={step.n}
                    delayMs={i * 100}
                    className="relative pl-14 pb-10 last:pb-0"
                  >
                    {!step.last && (
                      <span className="absolute left-[15px] top-9 w-0.5 h-[calc(100%-16px)] bg-white/15" />
                    )}
                    <span
                      className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        step.last
                          ? "bg-yellow text-navy"
                          : "bg-white/10 border border-white/20 text-white"
                      }`}
                    >
                      {step.n}
                    </span>
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div className="relative w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0">
                        <Image src={step.image} alt={step.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={16} className="text-yellow shrink-0" />
                          <h3 className="font-heading text-lg md:text-xl text-white leading-snug">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Fechamento */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)] text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                O seu patrimônio em mãos seguras
              </span>
              <span className="w-8 h-px bg-yellow" />
            </div>
            <p className="text-graphite/70 text-lg leading-relaxed">
              Contratar uma empresa de portaria regularizada é o primeiro passo para uma
              terceirização segura. Com o processo de triagem da{" "}
              <strong className="text-navy">PS Proteção</strong>, você elimina os riscos da
              clandestinidade e tem a tranquilidade absoluta de que a primeira linha de defesa
              da sua empresa é formada por profissionais íntegros, auditados e de extrema
              confiança.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <Reveal>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
                Quer conhecer nosso protocolo de perto?
              </h2>
              <p className="text-white/70 text-lg max-w-xl">
                Fale com nossa equipe e entenda como o Background Check da PS Proteção protege a
                sua empresa desde o primeiro dia de operação.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <WhatsAppCta
                href="https://wa.me/5519982892037"
                label={
                  <>
                    <MessageCircle size={18} />
                    Falar pelo WhatsApp
                  </>
                }
                className="px-7 py-3.5 text-[15px]"
              />
              <a
                href="https://protecaotalentos.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 font-heading font-semibold text-white hover:bg-white/15 transition-colors"
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
