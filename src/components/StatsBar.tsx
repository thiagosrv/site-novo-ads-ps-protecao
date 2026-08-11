import Link from "next/link";
import { Star } from "lucide-react";
import Reveal from "./Reveal";

const STATS = [
  { value: "+27", label: "ANOS DE MERCADO" },
  { value: "150+", label: "OPERAÇÕES ATIVAS" },
  { value: "1k+", label: "PROFISSIONAIS" },
  { value: "100", label: "CIDADES ATENDIDAS" },
];

export default function StatsBar() {
  return (
    <section className="relative z-20 -mt-10 md:-mt-14 px-6 md:px-[var(--spacing-grid-margin)]">
      <Reveal>
        <div className="max-w-[var(--container-max)] mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 md:p-12 border border-navy/5">
          <div className="flex justify-center mb-8">
            <Link
              href="https://share.google/hnbDKKadI4SNmQKKm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-graphite/80 hover:text-navy transition-colors"
            >
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow text-yellow" />
                ))}
              </span>
              <span className="font-mono text-[11px] tracking-widest">
                <strong className="text-navy">4.8</strong> · 70 AVALIAÇÕES NO GOOGLE
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-3xl md:text-[48px] text-navy mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] text-graphite/60 tracking-widest">{stat.label}</div>
              </div>
            ))}
            <div className="text-center col-span-2 md:col-span-1">
              <div className="font-heading text-3xl md:text-[48px] text-yellow-dark mb-2">
                24h
              </div>
              <div className="font-mono text-[11px] text-navy tracking-widest font-bold">
                SUPERVISÃO COM RELATÓRIOS
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
