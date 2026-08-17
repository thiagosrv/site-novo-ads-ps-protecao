import Link from "next/link";
import { MapPin, ArrowRight, MessageCircle } from "lucide-react";
import GsapReveal from "@/components/GsapReveal";
import SectionLabel from "@/components/SectionLabel";
import WhatsAppCta from "@/components/WhatsAppCta";
import { CITIES, getCityBySlug, type City } from "@/lib/cities";
import { buildCategoryNestedPath } from "@/lib/programmatic";
import { CATEGORY_LABEL, type ServiceCategory } from "@/lib/services";

const FEATURED_CITY_SLUGS = [
  "americana",
  "santa-barbara-d-oeste",
  "piracicaba",
  "campinas",
  "nova-odessa",
  "sumare",
  "valinhos",
  "vinhedo",
  "limeira",
  "indaiatuba",
];

const FEATURED_CITIES: City[] = FEATURED_CITY_SLUGS.map((slug) => getCityBySlug(slug)).filter(
  (city): city is City => Boolean(city)
);

export default function WhereWeOperate({ category }: { category: ServiceCategory }) {
  const categoryLabel = CATEGORY_LABEL[category];

  return (
    <section className="relative py-24 md:py-[var(--spacing-section)] bg-gradient-to-b from-navy-deep to-navy overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
        viewBox="0 0 1440 600"
        aria-hidden="true"
      >
        <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="80" x2="80" y1="0" y2="600" />
        <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="1360" x2="1360" y1="0" y2="600" />
        <circle className="fill-yellow" cx="80" cy="300" r="4" />
        <circle className="fill-yellow" cx="1360" cy="180" r="4" />
      </svg>

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <GsapReveal>
          <div className="mb-14 max-w-2xl mx-auto text-center">
            <SectionLabel align="center">Onde Operamos</SectionLabel>
            <h2 className="font-heading text-3xl md:text-[48px] text-white mb-4 leading-tight">
              Cobertura ativa em <span className="text-yellow">{CITIES.length}+ cidades</span> de São Paulo
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Da sede própria em Americana, supervisionamos {categoryLabel.toLowerCase()} em
              condomínios, empresas e indústrias por toda a Região Metropolitana de Campinas e o
              interior de São Paulo. Escolha sua cidade e veja a cobertura na prática.
            </p>
          </div>
        </GsapReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {FEATURED_CITIES.map((city, i) => (
            <GsapReveal key={city.slug} delayMs={i * 60}>
              <Link
                href={buildCategoryNestedPath(category, city)}
                className="group flex h-full flex-col rounded-[20px] border border-white/10 bg-white/5 p-5 transition-colors hover:border-yellow/40 hover:bg-white/10"
              >
                <MapPin size={20} className="text-yellow mb-3" />
                <p className="font-heading text-yellow font-semibold text-base leading-snug">
                  {city.name}
                </p>
                <p className="text-white/45 text-xs mt-1 mb-4 line-clamp-1">{city.region}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-white/70 text-[11px] font-mono uppercase tracking-wide transition-colors group-hover:text-yellow">
                  Ver cobertura
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </GsapReveal>
          ))}
        </div>

        <GsapReveal delayMs={200}>
          <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-[24px] border border-yellow/20 bg-white/5 backdrop-blur-sm px-8 py-7 md:flex-row">
            <p className="text-center text-sm text-white/80 md:text-left md:text-base">
              Atendemos mais de <strong className="text-yellow">{CITIES.length} municípios</strong> na
              Região Metropolitana de Campinas e interior de São Paulo. Não encontrou sua cidade na
              lista?
            </p>
            <WhatsAppCta
              label={
                <>
                  <MessageCircle size={18} />
                  Confirmar cobertura na minha cidade
                </>
              }
              className="shrink-0 whitespace-nowrap px-6 py-3 text-sm"
            />
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
