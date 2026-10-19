import type { Metadata } from "next";
import Image from "next/image";
import {
  ClipboardCheck,
  ConciergeBell,
  DoorOpen,
  Eye,
  FileText,
  GraduationCap,
  LifeBuoy,
  MapPin,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { SEALS } from "@/lib/seals";
import LpWhatsAppLink from "@/components/lp/LpWhatsAppLink";

// Apresentação linkada no e-mail de boas-vindas. Fica fora do índice do
// Google (noindex), não entra no sitemap e não tem formulário nem modal de
// cotação — o contato já está em atendimento com um consultor.
export const metadata: Metadata = {
  title: "Apresentação institucional | PS Proteção",
  description:
    "Como a PS Proteção estrutura, implanta e supervisiona cada operação de portaria, limpeza e facilities.",
  alternates: { canonical: "/lp-psprotecao" },
  robots: { index: false, follow: false },
};

const AUTHORITY_FACTS = [
  {
    icon: Users,
    value: "+3.000",
    title: "Colaboradores treinados por nós",
    text: "Equipes próprias, registradas em CLT, capacitadas em nossa academia interna.",
  },
  {
    icon: MapPin,
    value: "+1.000",
    title: "Clientes atendidos desde 1998",
    text: "Empresas e condomínios atendidos ao longo da nossa história. Hoje, operação ativa em +30 municípios da RMC e do interior de São Paulo.",
  },
  {
    icon: Eye,
    value: "24h",
    title: "Supervisão com relatórios",
    text: "Gestores em campo, rondas surpresa e auditorias de posto com registro.",
  },
];

const OPERATIONS = [
  {
    icon: DoorOpen,
    title: "Portaria e controle de acesso",
    text: "Recepção, identificação e registro de entradas e saídas, com rotina definida para cada posto.",
    image: "/assets/porteiro.webp",
    imageAlt: "Porteiro da PS Proteção na central de portaria com monitoramento por câmeras",
  },
  {
    icon: Sparkles,
    title: "Limpeza e conservação",
    text: "Higienização por rotina em POP, com materiais, frequência e auditoria periódica.",
    image: "/assets/limpeza.webp",
    imageAlt: "Profissional de limpeza higienizando um ambiente corporativo",
  },
  {
    icon: Wrench,
    title: "Zeladoria",
    text: "Cuidado cotidiano das áreas comuns e apoio à manutenção do dia a dia do local.",
    image: "/assets/zelador.webp",
    imageAlt: "Zelador da PS Proteção inspecionando uma área comum do prédio",
  },
  {
    icon: ConciergeBell,
    title: "Recepção e apoio administrativo",
    text: "Atendimento ao público e suporte às rotinas administrativas, com padrão de postura.",
    image: "/assets/recepcao.webp",
    imageAlt: "Recepcionista da PS Proteção atendendo em um balcão de recepção",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico do posto",
    text: "Análise do ambiente, fluxos de acesso e pontos críticos para definir o escopo adequado ao local.",
    image: "/assets/implantacao2.webp",
  },
  {
    n: "02",
    title: "Dimensionamento e implantação",
    text: "Seleção por perfil da operação, treinamento, uniformização e definição das rotinas do posto.",
    image: "/assets/implantacao3.webp",
  },
  {
    n: "03",
    title: "Supervisão e auditoria",
    text: "Acompanhamento periódico de postura, rotinas e cumprimento de horários, com apoio em campo.",
    image: "/assets/implantacao4.webp",
  },
  {
    n: "04",
    title: "Relatórios e melhoria contínua",
    text: "Registro de ocorrências, ajustes operacionais e alinhamentos com o cliente.",
    image: "/assets/implantacao5.webp",
  },
];

const PROCEDURES = [
  {
    icon: FileText,
    title: "Manual de normas e procedimentos",
    text: "Cada posto tem seu MNP/POP, digitalizado e de fácil acesso para a equipe.",
  },
  {
    icon: ScanSearch,
    title: "Triagem em 3 etapas",
    text: "Antecedentes criminais e documentais, avaliação psicológica e auditoria do histórico profissional.",
  },
  {
    icon: GraduationCap,
    title: "Treinamento contínuo",
    text: "Capacitação no posto e reciclagens periódicas, ajustadas à rotina de cada local.",
  },
  {
    icon: LifeBuoy,
    title: "Reserva técnica",
    text: "Equipe treinada para cobrir faltas e substituições, mantendo o posto sempre guarnecido.",
  },
  {
    icon: ClipboardCheck,
    title: "Checkpoints e relatórios",
    text: "Registro digital de rondas e ocorrências para acompanhar a operação com evidência.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança do trabalho",
    text: "Práticas alinhadas à NR-5 e atuação da CIPA para proteger quem está em campo.",
  },
];

export default function LpPsProtecaoPage() {
  return (
    <>
      {/* 1. Hero de apresentação */}
      <section className="relative flex items-center overflow-hidden py-14 md:py-20 md:min-h-[640px] bg-gradient-to-br from-navy via-navy to-navy-deep">
        <div className="absolute inset-0 z-0">
          {/* Mesma receita da home: foto à direita com borda esfumada no azul. */}
          <div
            className="absolute inset-y-0 right-0 hidden w-[62%] md:block"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 28%)" }}
          >
            <Image
              src="/brand/hero-novo.webp"
              alt="Profissional de segurança da PS Proteção em frente a uma portaria monitorada"
              fill
              priority
              sizes="62vw"
              className="object-cover object-[30%_0%]"
            />
          </div>
          <div className="absolute inset-0 hero-gradient hidden md:block" />
          <div
            className="texture-halftone absolute inset-0 pointer-events-none opacity-20 hidden md:block"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 58%)" }}
            aria-hidden="true"
          />
          <div className="texture-halftone absolute inset-0 pointer-events-none opacity-10 md:hidden" aria-hidden="true" />
        </div>

        {/* Doodles técnicos decorativos */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
          viewBox="0 0 1440 800"
          aria-hidden="true"
        >
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="80" x2="80" y1="0" y2="800" />
          <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="1360" x2="1360" y1="0" y2="800" />
          <circle className="fill-yellow" cx="80" cy="400" r="4" />
          <circle className="fill-yellow" cx="1360" cy="200" r="4" />
          <path className="stroke-yellow" d="M 80 200 L 200 200 L 200 320" fill="none" strokeDasharray="2 2" />
        </svg>

        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] w-full">
          <div className="max-w-2xl mx-auto text-center md:mx-0 md:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-5 py-2 rounded-full mb-8 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                  Apresentação institucional · Desde 1998
                </span>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <h1 className="font-heading text-4xl md:text-6xl font-bold leading-[1.1] text-white mb-6">
                Operação terceirizada com <span className="text-yellow">método, supervisão</span> e
                padrão.
              </h1>
            </Reveal>

            <Reveal delayMs={200}>
              <p className="text-lg text-white/80 leading-relaxed max-w-xl mx-auto md:mx-0 mb-10">
                Fundada em 1998, em Americana, a PS Proteção cuida de portaria, limpeza e facilities
                com processos escritos, equipe própria e supervisão que acompanha cada posto. Esta
                apresentação mostra, em poucos minutos, como trabalhamos.
              </p>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
                <LpWhatsAppLink variant="premium" posicao="hero" label="Falar com meu consultor" />
                <a
                  href="#implantacao"
                  className="inline-flex items-center justify-center h-14 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 text-[15px] font-heading font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5"
                >
                  Ver como trabalhamos
                </a>
              </div>
            </Reveal>

            <Reveal delayMs={380}>
              <div className="md:hidden relative mt-10 w-full aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src="/assets/uniforme-psprotecao.webp"
                  alt="Profissional de segurança da PS Proteção em frente a uma portaria monitorada"
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover object-[75%_20%]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Cards de autoridade */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mb-12 text-center md:text-left mx-auto md:mx-0">
              <SectionLabel color="navy">Quem sustenta a operação</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[44px] text-navy leading-tight">
                Uma história construída posto a posto.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            <Reveal className="sm:col-span-2 lg:col-span-6">
              <div className="rounded-3xl bg-navy text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                  <p className="font-mono text-xs tracking-widest uppercase text-yellow mb-4">
                    Fundação · 1998
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl leading-snug mb-4">
                    Nascemos em Americana, pela mão de Antônio Farias.
                  </h3>
                  <p className="text-white/75 leading-relaxed">
                    O princípio fundador segue valendo: trabalho sério, proximidade real com o cliente
                    e nenhum espaço para falhas. Quase três décadas depois, essa base virou método — com
                    SLAs, indicadores mensais e conformidade com a LGPD.
                  </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 md:p-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/5]">
                    <Image
                      src="/assets/fundador.webp"
                      alt="Antônio Farias, fundador da PS Proteção, em frente à sede da empresa"
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover object-[45%_30%]"
                    />
                    <div className="absolute inset-x-4 bottom-4">
                      <span className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                        Antônio Farias · Fundador
                      </span>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/5]">
                    <Image
                      src="/assets/fachada.webp"
                      alt="Fachada da sede da PS Proteção em Americana, com viaturas de ronda"
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-4 bottom-4">
                      <span className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                        Sede · Americana, SP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {AUTHORITY_FACTS.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <Reveal
                  key={fact.title}
                  delayMs={(i + 1) * 80}
                  className="last:sm:col-span-2 lg:col-span-2 lg:last:col-span-2"
                >
                  <div className="h-full rounded-3xl bg-white border border-navy/10 p-8">
                    <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center mb-6">
                      <Icon size={22} className="text-navy" aria-hidden="true" />
                    </div>
                    <p className="font-heading text-4xl text-navy mb-2">{fact.value}</p>
                    <h3 className="font-heading text-lg text-navy mb-2">{fact.title}</h3>
                    <p className="text-graphite/70 text-sm leading-relaxed">{fact.text}</p>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delayMs={400} className="sm:col-span-2 lg:col-span-6">
              <div className="rounded-3xl bg-white border border-navy/10 p-8">
                <p className="font-mono text-xs tracking-widest uppercase text-graphite/60 mb-6">
                  Selos e parcerias
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-6 items-center justify-items-center">
                  {SEALS.map((seal) => (
                    <li key={seal.src}>
                      <Image
                        src={seal.src}
                        alt={seal.alt}
                        width={144}
                        height={144}
                        className="h-28 w-28 object-contain"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Resumo de operações */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-4">
            <div className="text-center md:text-left">
              <SectionLabel color="navy">Resumo de operações</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-5">
                O que colocamos em campo.
              </h2>
              <p className="text-graphite/70 leading-relaxed">
                Serviços presenciais, executados por equipes próprias e treinadas, para empresas e
                condomínios. Cada posto é desenhado a partir da rotina real do local.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {OPERATIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delayMs={i * 80}>
                  <div className="h-full rounded-3xl bg-surface overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute left-4 bottom-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center">
                        <Icon size={20} className="text-navy" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-heading text-xl text-navy mb-3">{item.title}</h3>
                      <p className="text-graphite/70 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Técnicas de implantação e procedimentos */}
      <section id="implantacao" className="py-20 md:py-[var(--spacing-section)] bg-navy scroll-mt-4">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mb-14 text-center md:text-left mx-auto md:mx-0">
              <SectionLabel>Implantação e procedimentos</SectionLabel>
              <h2 className="font-heading text-3xl md:text-[44px] text-white leading-tight mb-5">
                Como implantamos e sustentamos cada posto.
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Do diagnóstico ao início da operação levam, em média, de 5 a 15 dias úteis — com
                supervisão intensiva nas primeiras semanas.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delayMs={i * 100}>
                <div className="h-full rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                  <div className="relative h-36">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-xs tracking-widest text-yellow mb-3">{step.n}</p>
                    <h3 className="font-heading text-lg text-white mb-2 leading-snug">{step.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h3 className="font-heading text-2xl text-white mb-8 text-center md:text-left">
              Procedimentos que mantêm o padrão
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {PROCEDURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delayMs={(i % 3) * 80}>
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-yellow" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base text-white mb-1.5">{item.title}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Fechamento */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <SectionLabel color="navy" align="center">
              Próximo passo
            </SectionLabel>
            <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-5">
              Os detalhes da sua operação, direto com seu consultor.
            </h2>
            <p className="text-graphite/70 leading-relaxed mb-8">
              Esta apresentação resume como trabalhamos. O seu caso, com escopo, prazos e condições,
              é alinhado com o consultor que já acompanha seu atendimento.
            </p>
            <LpWhatsAppLink />
          </Reveal>
        </div>
      </section>
    </>
  );
}
