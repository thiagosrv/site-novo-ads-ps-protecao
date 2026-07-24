import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqAccordion, { type FaqItem } from "./FaqAccordion";
import Reveal from "./Reveal";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Portaria interna (equipe própria) ou terceirizada: qual a melhor solução para minha empresa?",
    answer:
      "Para a maioria das empresas e condomínios, a terceirização sai na frente. Com uma equipe própria, sua empresa assume diretamente os encargos trabalhistas, o risco de rescisão, a gestão de escalas e a reposição em caso de falta — tudo isso recai sobre o seu RH. Com a portaria ou limpeza terceirizada da PS Proteção, você tem profissionais selecionados, treinados e substituídos automaticamente quando necessário, com um custo mensal previsível e sem surpresas trabalhistas. Na prática, o mesmo controle operacional, com muito menos risco e burocracia.",
  },
  {
    question: "Como funciona a implantação de um serviço terceirizado de portaria ou limpeza?",
    answer:
      "Nossa implantação segue 4 etapas: diagnóstico do posto (rotina, riscos e necessidades do local), dimensionamento e seleção da equipe ideal para o perfil da operação, treinamento com POP (Procedimento Operacional Padrão) específico para o seu espaço, e início da operação com supervisão intensiva nas primeiras semanas. O prazo médio é de 5 a 15 dias úteis — sem o desgaste de abrir processo seletivo, contratar e treinar uma equipe própria do zero.",
  },
  {
    question: "Terceirizar a portaria ou a limpeza compromete a qualidade ou a segurança da operação?",
    answer:
      "É o contrário: terceirizar com uma empresa especializada costuma elevar o padrão da operação. Cada posto da PS Proteção segue POP definido, passa por supervisão periódica em campo com dupla checagem (supervisor de campo e equipe de bancada) e gera relatórios de ocorrências e indicadores — um nível de controle que a maioria das empresas não sustenta com gestão interna.",
  },
  {
    question: "Terceirização sai mais caro do que contratar direto pela minha empresa (CLT)?",
    answer:
      "Olhando só o holerite, pode parecer mais barato contratar direto — mas o custo real de uma equipe própria inclui encargos, férias, 13º, rescisão, turnover, treinamento e o tempo de RH gasto em cada substituição. Na terceirização com a PS Proteção, tudo isso está embutido em uma única fatura mensal previsível, sem custos ocultos e sem o risco de ficar com o posto descoberto enquanto sua empresa contrata um substituto.",
  },
  {
    question: "Se eu terceirizar a portaria ou a limpeza, minha empresa perde o controle sobre a operação?",
    answer:
      "Não — você ganha mais visibilidade, não menos. Você recebe relatórios periódicos de supervisão, indicadores de assiduidade e um canal direto com nossa equipe para ajustes na operação. Postos com o dispositivo \"Sempre Alerta\" ainda geram dados de rastreabilidade em tempo real durante o turno — um nível de controle que a maioria das operações internas não tem.",
  },
  {
    question: "O que acontece quando o profissional terceirizado falta, tira férias ou pede demissão?",
    answer:
      "Mantemos equipe de reserva treinada especificamente para cobrir esses cenários, garantindo que o posto nunca fique desguarnecido. Essa é uma das maiores vantagens da terceirização frente à equipe própria: quando um funcionário CLT direto falta ou sai, sua empresa fica exposta até resolver sozinha — com a PS Proteção, a substituição é praticamente imediata.",
  },
  {
    question: "Quais os riscos trabalhistas para minha empresa ao contratar uma terceirizada?",
    answer:
      "A legislação prevê responsabilidade subsidiária do contratante em caso de inadimplência da terceirizada — por isso a escolha do fornecedor importa tanto quanto a decisão de terceirizar. A PS Proteção mantém rigor total em conformidade trabalhista, previdenciária e fiscal, com pagamentos em dia e documentação disponível para consulta, reduzindo esse risco ao mínimo para a sua empresa.",
  },
  {
    question: "Minha empresa ou condomínio é pequeno — ainda vale a pena terceirizar portaria ou limpeza?",
    answer:
      "Vale, e costuma ser ainda mais vantajoso para operações menores. Empresas pequenas e condomínios sentem mais o peso de manter uma estrutura própria de RH só para gerir um ou dois postos. Terceirizando, você paga por um serviço completo — seleção, treinamento, supervisão e reposição — sem montar essa estrutura internamente. Atendemos desde pequenos comércios e condomínios até indústrias de grande porte, com a operação dimensionada para cada caso.",
  },
  {
    question: "É possível trocar meu serviço atual por uma terceirizada sem travar a operação?",
    answer:
      "Sim. A transição é planejada para não deixar o posto descoberto: alinhamos o encerramento da operação anterior com o início da nossa equipe já treinada e com o POP definido para o seu local. O objetivo é que a mudança seja praticamente imperceptível para quem circula pelo espaço no dia a dia.",
  },
  {
    question: "Por que escolher a PS Proteção em vez de outra empresa de terceirização?",
    answer:
      "Atuamos há mais de 28 anos no setor de facilities, com mais de 3.000 colaboradores treinados e mais de 1.000 clientes atendidos na Região Metropolitana de Campinas e em todo o Estado de São Paulo. Unimos a solidez de uma empresa consolidada a tecnologia própria de supervisão — como o dispositivo \"Sempre Alerta\" e a dupla camada de supervisão de bancada — para entregar não só mão de obra terceirizada, mas uma operação monitorada e auditável do início ao fim.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomeFaq() {
  return (
    <section id="faq" className="py-20 md:py-[var(--spacing-section)] bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                Perguntas de quem vai contratar
              </span>
              <span className="w-8 h-px bg-yellow" />
            </div>
            <h2 className="font-heading text-3xl md:text-[48px] text-navy leading-tight mb-4">
              Perguntas frequentes de quem está contratando
            </h2>
            <p className="text-graphite/70 text-lg leading-relaxed">
              Reunimos as dúvidas mais comuns de gestores e empresas na hora de terceirizar
              portaria, limpeza e facilities.
            </p>
          </div>
        </Reveal>

        <FaqAccordion items={FAQ_ITEMS} />

        <Reveal delayMs={200}>
          <div className="text-center mt-10">
            <Link
              href="/duvidas"
              className="inline-flex items-center gap-2 text-navy font-heading font-semibold hover:text-navy-deep transition-colors"
            >
              Ver central de dúvidas completa
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
