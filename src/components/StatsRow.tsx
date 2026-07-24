import { Users2, Building2, CalendarCheck2, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import StatCounter from "./StatCounter";

const STATS = [
  { icon: Users2, value: "3000+", label: "Colaboradores Treinados" },
  { icon: Building2, value: "1000+", label: "Clientes Atendidos" },
  { icon: CalendarCheck2, value: "28+", label: "Anos de Experiência" },
  { icon: ShieldCheck, value: "100%", label: "Supervisão Ativa com Relatórios" },
];

export default function StatsRow() {
  return (
    <section className="relative z-20 -mt-10 md:-mt-14 px-6 md:px-[var(--spacing-grid-margin)]">
      <Reveal>
        <div className="max-w-[var(--container-max)] mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 md:p-12 border border-navy/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-4">
                  <Icon className="text-navy" size={22} />
                </div>
                <div className="font-heading text-3xl md:text-[40px] text-navy mb-2">
                  <StatCounter value={stat.value} />
                </div>
                <div className="font-mono text-[11px] text-graphite/60 tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
