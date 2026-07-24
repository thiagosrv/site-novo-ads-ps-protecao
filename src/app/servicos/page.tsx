import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import StatsRow from "@/components/StatsRow";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";

const SERVICES = [
  {
    id: "portaria",
    title: "Portaria e Controle de Acesso",
    image: "/assets/porteiro.webp",
    alt: "Porteiro PS Proteção — Controle de Acesso",
    description:
      "Profissionais treinados para realizar a gestão de acesso ao seu estabelecimento com organização, cordialidade e rigor nos procedimentos operacionais.",
    features: [
      "Controle de entrada e saída de pessoas",
      "Registro e identificação de visitantes",
      "Atendimento e triagem na portaria",
      "Procedimento Operacional Padrão (POP)",
      "Relatórios de ocorrências",
    ],
  },
  {
    id: "limpeza",
    title: "Limpeza e Conservação",
    image: "/assets/limpeza.webp",
    alt: "Limpeza e Conservação PS Proteção",
    description:
      "Equipes especializadas que mantêm seus ambientes impecáveis com rotinas de limpeza definidas, produtos adequados e profissionais uniformizados.",
    features: [
      "Limpeza de ambientes internos e externos",
      "Higienização de banheiros e copas",
      "Limpeza de vidros e esquadrias",
      "Coleta e descarte de resíduos",
      "Produtos e equipamentos inclusos",
    ],
  },
  {
    id: "zeladoria",
    title: "Zeladoria",
    image: "/assets/zelador.webp",
    alt: "Zeladoria PS Proteção",
    description:
      "Suporte completo de zeladoria para conservação, manutenção preventiva e organização das dependências do seu estabelecimento.",
    features: [
      "Manutenção preventiva básica",
      "Organização de áreas comuns",
      "Controle de materiais e estoque",
      "Suporte a demandas operacionais",
      "Comunicação direta com gestão",
    ],
  },
  {
    id: "administrativo",
    title: "Auxiliar Administrativo",
    image: "/assets/administrativo.webp",
    alt: "Auxiliar Administrativo PS Proteção",
    description:
      "Profissionais de suporte para otimizar processos internos, organizar documentações e apoiar a gestão operacional da sua empresa.",
    features: [
      "Organização de documentos e arquivos",
      "Suporte a processos internos",
      "Controle de correspondências",
      "Apoio em rotinas administrativas",
      "Atendimento interno e triagem",
    ],
  },
  {
    id: "recepcao",
    title: "Recepção",
    image: "/assets/recepcao.webp",
    alt: "Recepção PS Proteção",
    description:
      "Recepcionistas treinados para acolher, orientar e atender visitantes e colaboradores com excelência, sendo a face da sua empresa.",
    features: [
      "Atendimento presencial e telefônico",
      "Triagem e encaminhamento de visitas",
      "Controle de agenda e sala de reunião",
      "Imagem corporativa preservada",
      "Uniformização e postura profissional",
    ],
  },
  {
    id: "contabil",
    title: "Auxiliar Contábil",
    image: "/assets/contabil.webp",
    alt: "Auxiliar Contábil PS Proteção",
    description:
      "Suporte nas rotinas contábeis e financeiras, auxiliando na organização de documentos, lançamentos e processos de controle do seu negócio.",
    features: [
      "Organização de documentos fiscais",
      "Suporte em lançamentos contábeis",
      "Controle de contas a pagar/receber",
      "Apoio em conciliações financeiras",
      "Suporte ao contador da empresa",
    ],
  },
];

const FAQ_ITEMS = [
  {
    question: "Quais serviços de facilities a PS Proteção oferece?",
    answer:
      "A PS Proteção oferece seis serviços de facilities: portaria e controle de acesso, limpeza e conservação, zeladoria, recepção, auxiliar administrativo e auxiliar contábil. Todos podem ser contratados de forma isolada ou integrados em um único contrato de gestão terceirizada.",
  },
  {
    question: "É possível contratar mais de um serviço no mesmo contrato?",
    answer:
      "Sim. É possível integrar portaria, limpeza, zeladoria e recepção em um único contrato de facilities, com gestão unificada, supervisão centralizada e um só ponto de contato comercial — o que reduz custos administrativos e simplifica a rotina do cliente.",
  },
  {
    question: "Os produtos e equipamentos de limpeza estão inclusos no serviço?",
    answer:
      "Sim. No serviço de limpeza e conservação, a PS Proteção fornece os produtos, materiais e equipamentos necessários, além dos profissionais treinados. O cliente não precisa se preocupar com aquisição ou reposição de insumos.",
  },
  {
    question: "Qual a diferença entre portaria e controle de acesso?",
    answer:
      "A portaria cuida da recepção e do fluxo de pessoas na entrada do local. O controle de acesso é mais amplo: registra e autoriza a entrada e saída de visitantes, prestadores e veículos, com Procedimento Operacional Padrão (POP) e registros que aumentam a segurança do ambiente.",
  },
  {
    question: "A PS Proteção atende empresas de qualquer porte?",
    answer:
      "Sim. Atendemos desde pequenos comércios e condomínios até indústrias e centros de logística de grande porte. Cada operação é dimensionada conforme o tamanho do local, o horário de funcionamento e as necessidades específicas do cliente.",
  },
];

export default function ServicosPage() {
  return (
    <>
      <PageHero
        tag="Nosso portfólio"
        title="Serviços e Soluções em Facilities"
        description="Soluções completas para manter sua empresa funcionando com excelência, desde a portaria até o suporte administrativo."
      />
      <StatsRow />

      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mb-16 mx-auto text-center md:mx-0 md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Portfólio completo
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-[48px] text-navy leading-tight mb-4">
                Conheça cada serviço em detalhe
              </h2>
              <p className="text-graphite/70 text-lg leading-relaxed">
                Cada serviço da PS Proteção é estruturado com profissionais selecionados, processo
                de implantação definido e supervisão contínua.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delayMs={Math.min(i, 4) * 80}>
                <div
                  id={service.id}
                  className={`grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-navy/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] scroll-mt-28 ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[280px] md:min-h-[360px]">
                    <Image src={service.image} alt={service.alt} fill className="object-cover" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center gap-5 md:items-start md:text-left">
                    <h3 className="font-heading text-2xl md:text-3xl text-navy">{service.title}</h3>
                    <p className="text-graphite/70 leading-relaxed">{service.description}</p>
                    <ul className="flex flex-col gap-3 items-center md:items-start">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-graphite/80 text-[15px]">
                          <CheckCircle2 className="text-yellow-dark shrink-0" size={18} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="https://wa.me/5519982892037"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 self-center md:self-start mt-2 rounded-full bg-yellow hover:bg-yellow-dark text-navy font-heading font-semibold px-6 py-3 transition-colors"
                    >
                      <MessageCircle size={18} />
                      Solicitar proposta
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Dúvidas frequentes
                </span>
                <span className="w-8 h-px bg-yellow" />
              </div>
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight">
                Perguntas frequentes sobre nossos serviços
              </h2>
            </div>
          </Reveal>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <Reveal>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
                Precisa de mais de um serviço?
              </h2>
              <p className="text-white/70 text-lg max-w-xl">
                A PS Proteção oferece soluções integradas de Facilities. Fale conosco e receba uma
                proposta personalizada.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="https://wa.me/5519982892037"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow hover:bg-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 transition-colors"
              >
                <MessageCircle size={18} />
                Falar pelo WhatsApp
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 font-heading font-semibold text-white hover:bg-white/15 transition-colors"
              >
                <Mail size={18} />
                Enviar mensagem
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
