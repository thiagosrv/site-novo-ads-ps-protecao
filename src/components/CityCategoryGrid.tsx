import Link from "next/link";
import { ShieldCheck, SprayCan, Wrench, Eye, Headset, Users, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import type { City } from "@/lib/cities";
import { CATEGORY_LABEL, type ServiceCategory } from "@/lib/services";
import { CATEGORY_ORDER, buildCategoryNestedPath } from "@/lib/programmatic";

const ICON_BY_CATEGORY: Record<ServiceCategory, typeof ShieldCheck> = {
  portaria: ShieldCheck,
  limpeza: SprayCan,
  facilities: Wrench,
  vigilancia: Eye,
  jardinagem: SprayCan,
  recepcao: Headset,
  geral: Users,
};

const CATEGORY_TEXT: Record<ServiceCategory, string> = {
  portaria: "Controle de acesso, recepção de visitantes e registro de ocorrências.",
  limpeza: "Equipe treinada, produtos e equipamentos inclusos, com padrão de conservação.",
  facilities: "Manutenção preventiva, zeladoria e gestão integrada de serviços prediais.",
  vigilancia: "Rondas periódicas, controle de perímetro e monitoramento patrimonial.",
  jardinagem: "Manutenção de áreas verdes, paisagismo e zeladoria de jardins.",
  recepcao: "Atendimento profissional para visitantes, clientes e colaboradores.",
  geral: "Suporte administrativo e contábil com processos documentados.",
};

export default function CityCategoryGrid({ city }: { city: City }) {
  return (
    <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                Explore por categoria
              </span>
              <span className="w-8 h-px bg-yellow" />
            </div>
            <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-4">
              Serviços por categoria em {city.name}
            </h2>
            <p className="text-graphite/70 text-lg leading-relaxed">
              Cada categoria tem uma página dedicada com escopo, prazo de implantação e perguntas
              frequentes específicas para {city.name}.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_ORDER.map((category, i) => {
            const Icon = ICON_BY_CATEGORY[category];
            return (
              <Reveal key={category} delayMs={i * 60}>
                <Link
                  href={buildCategoryNestedPath(category, city)}
                  className="group h-full flex flex-col p-7 rounded-3xl border border-navy/10 bg-white hover:border-yellow/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center mb-6">
                    <Icon className="text-yellow" size={22} />
                  </div>
                  <h3 className="font-heading text-lg text-navy mb-3">
                    {CATEGORY_LABEL[category]} em {city.name}
                  </h3>
                  <p className="text-graphite/70 text-sm leading-relaxed mb-5">
                    {CATEGORY_TEXT[category]}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-yellow-dark text-sm font-semibold">
                    Ver detalhes
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
