import Link from "next/link";
import { Star } from "lucide-react";
import Reveal from "./Reveal";

const STATS = [
  { value: "+28", label: "ANOS DE MERCADO" },
  { value: "150+", label: "OPERAÇÕES ATIVAS" },
  { value: "+3.000", label: "COLABORADORES TREINADOS POR NÓS" },
  { value: "+30", label: "MUNICÍPIOS COM COBERTURA ATIVA" },
];

export default function StatsBar() {
  return (
    <section className="relative z-20 -mt-10 md:-mt-14 px-6 md:px-[var(--spacing-grid-margin)]">
      <Reveal>
        <div className="max-w-[var(--container-max)] mx-auto gradient-border-yellow rounded-3xl p-[1.5px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.2)]">
          <div className="bg-white rounded-[calc(1.5rem-1.5px)] p-8 md:p-12 xl:p-14">
            <div className="flex justify-center mb-8">
              <Link
                href="https://share.google/hnbDKKadI4SNmQKKm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center gap-1 text-graphite/80 hover:text-navy transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <strong className="font-mono text-sm text-navy">4.8</strong>
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow text-yellow" />
                    ))}
                  </span>
                </span>
                <span className="font-mono text-[11px] xl:text-xs tracking-widest">
                  70 AVALIAÇÕES NO GOOGLE
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-3xl md:text-[48px] xl:text-[56px] text-navy mb-2">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[11px] xl:text-xs text-graphite/60 tracking-widest">{stat.label}</div>
                </div>
              ))}
              <div className="text-center col-span-2 md:col-span-1">
                <div className="font-heading text-3xl md:text-[48px] xl:text-[56px] text-yellow-dark mb-2">
                  24h
                </div>
                <div className="font-mono text-[11px] xl:text-xs text-navy tracking-widest font-bold">
                  SUPERVISÃO COM RELATÓRIOS
                </div>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-navy/10 text-center">
              <p className="font-mono text-[11px] xl:text-xs text-graphite/60 tracking-widest uppercase">
                Mais de <strong className="text-navy">500 operações</strong> atendidas ao longo de{" "}
                <strong className="text-navy">28 anos</strong> de história — parcerias que já ultrapassam{" "}
                <strong className="text-yellow-dark">15 anos</strong> de confiança
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
