import type { Metadata } from "next";
import { MessageCircle, Layers, Building2, Settings2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import QuoteTriggerButton from "@/components/QuoteTriggerButton";

export const metadata: Metadata = {
  title: "Perguntas Frequentes | PS Proteção",
  description:
    "Dúvidas comuns sobre implantação, prazos, custos e processos de terceirização de portaria, limpeza e facilities com a PS Proteção.",
  alternates: {
    canonical: "/duvidas",
  },
};

const CATEGORIES = [
  {
    key: "geral",
    icon: Settings2,
    title: "Processo e Operação",
    items: [
      {
        question: "Como funciona o processo de implantação de uma nova operação?",
        answer:
          "Nossa implantação segue 4 etapas: diagnóstico do posto, dimensionamento e seleção da equipe, treinamento com POP (Procedimento Operacional Padrão) e início das operações com supervisão intensiva. Todo o processo é acompanhado por nossa equipe técnica.",
      },
      {
        question: "Em quais regiões a PS Proteção atua?",
        answer:
          "Atendemos Americana, Campinas e toda a Região Metropolitana de Campinas, incluindo Sumaré, Hortolândia, Paulínia, Valinhos, Vinhedo, Indaiatuba, Santa Bárbara d'Oeste, Nova Odessa, Limeira, Piracicaba e mais de 30 municípios da região.",
      },
      {
        question: "A PS Proteção oferece cobertura em caso de faltas?",
        answer:
          "Sim. Contamos com equipe de reserva operacional para garantir a cobertura imediata de faltas e ausências, assegurando que o posto de serviço nunca fique sem atendimento. Essa é uma das nossas principais garantias de continuidade operacional.",
      },
      {
        question: "Como é feito o acompanhamento da qualidade do serviço?",
        answer:
          "Realizamos supervisões periódicas em campo, verificação de rotinas, postura e cumprimento de procedimentos. Além disso, geramos relatórios regulares e mantemos canal direto com o cliente para alinhamentos e ajustes na operação.",
      },
      {
        question: "Quais documentações são necessárias para contratação?",
        answer:
          "A documentação necessária depende do tipo e escopo do serviço. Nossa equipe comercial orienta todo o processo de contratação de forma clara e ágil. Entre em contato para iniciar um diagnóstico gratuito das suas necessidades.",
      },
      {
        question: "É possível personalizar a operação para a minha empresa?",
        answer:
          "Absolutamente. Cada operação é estruturada com base nas necessidades específicas do cliente — fluxo de acesso, horários, perfil das instalações e demandas particulares. Desenvolvemos um POP personalizado para cada posto de serviço.",
      },
    ],
  },
  {
    key: "servicos",
    icon: Layers,
    title: "Serviços",
    items: [
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
    ],
  },
  {
    key: "empresa",
    icon: Building2,
    title: "Sobre a Empresa",
    items: [
      {
        question: "Há quanto tempo a PS Proteção atua no mercado?",
        answer:
          "A PS Proteção atua há mais de 28 anos no setor de facilities. Fundada em 1998 em Americana, SP, a empresa se especializou em portaria, limpeza, zeladoria e serviços de apoio para empresas da Região Metropolitana de Campinas.",
      },
      {
        question: "Onde fica a sede da PS Proteção?",
        answer:
          "A sede da PS Proteção fica na Rua São Gabriel, 1623, Vila Belvedere, em Americana, SP. A partir dela, a empresa atende Americana, Campinas e mais de 30 municípios da Região Metropolitana de Campinas.",
      },
      {
        question: "Quantos colaboradores e clientes a PS Proteção possui?",
        answer:
          "A PS Proteção conta com mais de 3.000 colaboradores treinados e já atendeu mais de 1.000 clientes ao longo de seus 28 anos de atuação, com supervisão ativa em campo e relatórios periódicos.",
      },
      {
        question: "A PS Proteção é uma empresa regularizada?",
        answer:
          "Sim. A PS Proteção é uma empresa legalmente constituída, inscrita no CNPJ 47.425.584/0001-00, com sede física em Americana, SP, e atuação regularizada na prestação de serviços de facilities.",
      },
      {
        question: "Como a PS Proteção garante a qualidade dos serviços?",
        answer:
          "A qualidade é garantida por supervisão periódica em campo, Procedimento Operacional Padrão (POP) personalizado por posto, equipe de reserva para cobertura de faltas e relatórios regulares de ocorrências enviados ao cliente.",
      },
    ],
  },
];

export default function DuvidasPage() {
  return (
    <>
      <PageHero
        tag="Central de ajuda"
        title="Perguntas Frequentes"
        description="Reunimos as dúvidas mais comuns sobre nossos processos, serviços e a empresa. Não encontrou o que procurava? Fale direto com nossa equipe."
      />

      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-4xl mx-auto px-6 md:px-[var(--spacing-grid-margin)] flex flex-col gap-16">
          {CATEGORIES.map((category, ci) => {
            const Icon = category.icon;
            return (
              <div key={category.key}>
                <Reveal delayMs={ci * 60}>
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                    <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center shrink-0">
                      <Icon className="text-yellow" size={20} />
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl text-navy">
                      {category.title}
                    </h2>
                  </div>
                </Reveal>
                <FaqAccordion items={category.items} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 text-center flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-white">
              Não encontrou sua resposta?
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="text-white/70 text-lg max-w-xl">
              Fale diretamente com nossa equipe comercial pelo WhatsApp e tire suas dúvidas em
              tempo real.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <QuoteTriggerButton className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow hover:bg-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 transition-colors">
              <MessageCircle size={18} />
              Falar pelo WhatsApp
            </QuoteTriggerButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
