"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

const TECH_ITEMS = [
  {
    key: "acesso",
    label: "Aplicativo de Controle de Acesso Personalizado",
    tag: "Aplicativo próprio",
    title: "Aplicativo de Controle de Acesso Personalizado",
    text: "App próprio para registro de entrada e saída de visitantes, prestadores de serviço e moradores. Cada posto de serviço tem regras de acesso configuradas conforme o perfil da instalação, e o histórico de movimentação fica disponível para consulta do cliente a qualquer momento.",
    image: "/assets/app-controle-de-acesso.webp",
  },
  {
    key: "bancada",
    label: "Supervisão de Bancada",
    tag: "Dupla camada de supervisão",
    title: "Supervisão de Bancada",
    text: "A supervisão começa em campo: supervisores da própria PS Proteção visitam presencial e periodicamente cada posto, verificando postura, uniforme, escala e cumprimento do POP. Os dados registrados nessas visitas passam por uma segunda camada — a equipe interna de bancada, que reavalia cada ocorrência e decide as próximas ações: envio de novos uniformes e EPIs, contato direto com o supervisor de campo ou acionamento do cliente quando necessário.",
    image: "/assets/supervisao-bancada.webp",
  },
  {
    key: "relatorio",
    label: "Relatório de Supervisão Mensal",
    tag: "Indicadores mensais",
    title: "Relatório de Supervisão Mensal",
    text: "Documento entregue mensalmente ao cliente reunindo ocorrências registradas no período, resultado das visitas de supervisão, indicadores de assiduidade da equipe e recomendações de ajuste operacional quando necessário.",
    image: "/assets/relatorio.webp",
  },
  {
    key: "pop",
    label: "Implantação com POPs e SLAs",
    tag: "Processo formal",
    title: "Implantação com POPs e SLAs",
    text: "Cada operação nova é implantada com Procedimento Operacional Padrão (POP) específico para o posto de serviço e Acordo de Nível de Serviço (SLA) definido em contrato, formalizando prazos de resposta, escopo de atividades e critérios de qualidade.",
    image: "/assets/pop-sla.webp",
  },
  {
    key: "presenca",
    label: 'Dispositivo "Sempre Alerta"',
    tag: "Vigilância sempre ativa",
    title: 'Dispositivo "Sempre Alerta"',
    text: "Dispositivo embarcado no equipamento do vigia ou porteiro que emite disparos sonoros e vibratórios em intervalos aleatórios ao longo do turno, exigindo confirmação de que o profissional está acordado e no posto. Cada resposta é registrada com horário, tempo de reação e localização no momento da confirmação. Se o alerta não for desativado dentro do prazo, a central de monitoramento recebe um aviso automático de ausência ou falha de resposta — permitindo intervenção imediata antes que o posto fique desguarnecido.",
    image: "/assets/sempre-alerta.webp",
  },
];

export default function TechSolutions() {
  const [active, setActive] = useState(TECH_ITEMS[0].key);
  const activeItem = TECH_ITEMS.find((item) => item.key === active) ?? TECH_ITEMS[0];

  return (
    <section
      id="solucoes-adaptadas"
      className="py-20 md:py-[var(--spacing-section)] bg-surface"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                Tecnologia e processos próprios
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-4 leading-tight">
              Tecnologias Aplicadas a Serviços
            </h2>
            <p className="text-lg text-graphite/70 leading-relaxed">
              Ferramentas e processos que já operam nos postos de serviço da PS Proteção.
              Selecione um item para ver como funciona na prática.
            </p>
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch">
          <div
            role="tablist"
            aria-label="Tecnologias Aplicadas a Serviços"
            className="md:col-span-5 flex flex-col border-t border-navy/10"
          >
            {TECH_ITEMS.map((item, i) => {
              const isActive = item.key === active;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(item.key)}
                  className={`group flex items-center gap-4 text-left py-6 border-b border-navy/10 transition-colors ${
                    isActive ? "text-navy" : "text-graphite/60 hover:text-navy"
                  }`}
                >
                  <span
                    className={`font-mono text-sm shrink-0 ${
                      isActive ? "text-yellow" : "text-graphite/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-heading text-lg md:text-xl flex-1 leading-snug ${
                      isActive ? "text-navy" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  <ChevronRight
                    size={20}
                    className={`shrink-0 transition-transform ${
                      isActive ? "text-yellow translate-x-1" : "text-graphite/30"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="md:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-navy/10 bg-white h-full flex flex-col">
              <div className="relative h-64 md:h-80 bg-navy/5">
                <Image
                  key={activeItem.image}
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10">
                <span className="text-navy font-mono text-[11px] font-bold tracking-widest uppercase">
                  {activeItem.tag}
                </span>
                <h3 className="font-heading text-2xl text-navy mt-3 mb-4 leading-snug">
                  {activeItem.title}
                </h3>
                <p className="text-graphite/70 leading-relaxed">{activeItem.text}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
