"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, Smartphone, Radar, FileBarChart, FileCheck2, BellRing } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_MS = 6000;

const TECH_ITEMS = [
  {
    key: "acesso",
    icon: Smartphone,
    label: "Aplicativo de Controle de Acesso Personalizado",
    tag: "Aplicativo próprio",
    title: "Aplicativo de Controle de Acesso Personalizado",
    text: "App próprio para registro de entrada e saída de visitantes, prestadores de serviço e moradores. Cada posto de serviço tem regras de acesso configuradas conforme o perfil da instalação, e o histórico de movimentação fica disponível para consulta do cliente a qualquer momento.",
    image: "/assets/app-controle-de-acesso.webp",
  },
  {
    key: "bancada",
    icon: Radar,
    label: "Supervisão de Bancada",
    tag: "Dupla camada de supervisão",
    title: "Supervisão de Bancada",
    text: "A supervisão começa em campo: supervisores da própria PS Proteção visitam presencial e periodicamente cada posto, verificando postura, uniforme, escala e cumprimento do POP. Os dados registrados nessas visitas passam por uma segunda camada — a equipe interna de bancada, que reavalia cada ocorrência e decide as próximas ações: envio de novos uniformes e EPIs, contato direto com o supervisor de campo ou acionamento do cliente quando necessário.",
    image: "/assets/supervisao-bancada.webp",
  },
  {
    key: "relatorio",
    icon: FileBarChart,
    label: "Relatório de Supervisão Mensal",
    tag: "Indicadores mensais",
    title: "Relatório de Supervisão Mensal",
    text: "Documento entregue mensalmente ao cliente reunindo ocorrências registradas no período, resultado das visitas de supervisão, indicadores de assiduidade da equipe e recomendações de ajuste operacional quando necessário.",
    image: "/assets/relatorio.webp",
  },
  {
    key: "pop",
    icon: FileCheck2,
    label: "Implantação com POPs e SLAs",
    tag: "Processo formal",
    title: "Implantação com POPs e SLAs",
    text: "Cada operação nova é implantada com Procedimento Operacional Padrão (POP) específico para o posto de serviço e Acordo de Nível de Serviço (SLA) definido em contrato, formalizando prazos de resposta, escopo de atividades e critérios de qualidade.",
    image: "/assets/pop-sla.webp",
  },
  {
    key: "presenca",
    icon: BellRing,
    label: 'Dispositivo "Sempre Alerta"',
    tag: "Monitoramento sempre ativo",
    title: 'Dispositivo "Sempre Alerta"',
    text: "Dispositivo embarcado no equipamento do vigia ou porteiro que emite disparos sonoros e vibratórios em intervalos aleatórios ao longo do turno, exigindo confirmação de que o profissional está acordado e no posto. Cada resposta é registrada com horário, tempo de reação e localização no momento da confirmação. Se o alerta não for desativado dentro do prazo, a central de monitoramento recebe um aviso automático de ausência ou falha de resposta — permitindo intervenção imediata antes que o posto fique desguarnecido.",
    image: "/assets/sempre-alerta.webp",
  },
];

export default function TechSolutions({
  scrollTransition = false,
}: {
  scrollTransition?: boolean;
}) {
  const [active, setActive] = useState(TECH_ITEMS[0].key);
  const activeItem = TECH_ITEMS.find((item) => item.key === active) ?? TECH_ITEMS[0];
  const ActiveIcon = activeItem.icon;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(() => {
      setActive((current) => {
        const idx = TECH_ITEMS.findIndex((item) => item.key === current);
        return TECH_ITEMS[(idx + 1) % TECH_ITEMS.length].key;
      });
    }, AUTOPLAY_MS);

    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!scrollTransition) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 20%",
          scrub: 0.6,
        },
      });

      tl.to(section, { backgroundColor: "#F5F7FB" }, 0)
        .to(".ts-texture", { opacity: 0 }, 0)
        .to(".ts-heading", { color: "#000F6A" }, 0)
        .to(".ts-desc", { color: "rgba(21,26,37,0.7)" }, 0)
        .to(".ts-tab-wrap-inactive", { backgroundColor: "rgba(0,15,106,0.05)" }, 0)
        .to(".ts-tab-inner", { backgroundColor: "#FFFFFF" }, 0)
        .to(
          ".ts-tab-icon-inactive",
          { backgroundColor: "rgba(0,15,106,0.05)", color: "rgba(0,15,106,0.3)" },
          0
        )
        .to(".ts-tab-label", { color: "#151A25" }, 0)
        .to(".ts-tab-label-inactive", { opacity: 0.55 }, 0)
        .to(".ts-tab-chevron-inactive", { color: "rgba(0,15,106,0.25)" }, 0);
    }, section);

    return () => ctx.revert();
  }, [scrollTransition, active]);

  return (
    <section
      id="solucoes-adaptadas"
      ref={sectionRef}
      className={`relative py-20 md:py-[var(--spacing-section)] overflow-hidden ${
        scrollTransition ? "bg-navy" : "bg-gradient-to-b from-navy to-navy-deep"
      }`}
    >
      <div
        className="ts-texture absolute inset-0 texture-grid opacity-60 pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="mb-16 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
            <div className="inline-flex items-center gap-3 bg-tech-blue/10 border border-tech-blue/30 px-5 py-2 rounded-full mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-tech-blue animate-pulse" />
              <span className="font-mono text-tech-blue text-xs tracking-widest uppercase">
                Tecnologia e processos próprios
              </span>
            </div>
            <h2 className="ts-heading font-heading text-3xl md:text-[48px] text-white mb-4 leading-tight">
              Assim a Tecnologia Protege a <span className="text-yellow">SUA Operação</span>
            </h2>
            <p className="ts-desc text-lg text-white/70 leading-relaxed">
              É isso que vai rodar no posto da sua empresa a partir do primeiro dia de contrato.
              Selecione um item para ver como funciona na prática.
            </p>
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-stretch">
          <div
            role="tablist"
            aria-label="Assim a Tecnologia Protege a Sua Operação"
            className="md:col-span-5 flex flex-col gap-3"
          >
            {TECH_ITEMS.map((item) => {
              const isActive = item.key === active;
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(item.key)}
                  className={`group text-left rounded-2xl p-[1.5px] transition-all duration-300 ${
                    isActive
                      ? "gradient-border"
                      : "ts-tab-wrap-inactive bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <div
                    className={`ts-tab-inner relative flex items-center gap-4 rounded-[14px] px-5 py-5 overflow-hidden transition-colors duration-300 ${
                      isActive ? "bg-navy-deep" : "bg-navy-deep/50 group-hover:bg-navy-deep/80"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors duration-300 ${
                        isActive ? "bg-tech-blue text-white" : "ts-tab-icon-inactive bg-white/10 text-white/40"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span
                      className={`ts-tab-label font-heading text-base md:text-lg flex-1 leading-snug transition-colors duration-300 ${
                        isActive ? "text-white" : "ts-tab-label-inactive text-white/50"
                      }`}
                    >
                      {item.label}
                    </span>
                    <ChevronRight
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        isActive ? "text-tech-blue translate-x-1" : "ts-tab-chevron-inactive text-white/25"
                      }`}
                    />
                    {isActive && (
                      <span
                        key={item.key}
                        className="tech-progress-fill absolute bottom-0 left-0 h-[2px] bg-yellow"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="md:col-span-7 relative">
            <div
              className="absolute -inset-6 bg-tech-blue/10 rounded-[2.5rem] blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <svg
              className="absolute -top-2.5 -left-2.5 w-7 h-7 text-tech-blue/50 pointer-events-none"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <path d="M28 1H7a6 6 0 0 0-6 6v21" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg
              className="absolute -bottom-2.5 -right-2.5 w-7 h-7 text-tech-blue/50 pointer-events-none"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <path d="M0 27h21a6 6 0 0 0 6-6V0" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div className="relative gradient-border rounded-3xl p-[1.5px] h-full">
              <div
                key={activeItem.key}
                className="step-fade relative rounded-[22px] overflow-hidden bg-white h-full flex flex-col"
              >
                <div className="relative h-64 md:h-80 bg-navy/5">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                </div>
                <div className="p-8 md:p-10">
                  <span className="inline-flex items-center gap-2 text-tech-blue font-mono text-[11px] font-bold tracking-widest uppercase">
                    <ActiveIcon size={14} className="text-tech-blue" />
                    {activeItem.tag}
                  </span>
                  <h3 className="font-heading text-2xl text-navy mt-3 mb-4 leading-snug">
                    {activeItem.title}
                  </h3>
                  <p className="text-graphite/70 leading-relaxed">{activeItem.text}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
