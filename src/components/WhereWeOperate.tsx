import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Factory,
  GraduationCap,
  HardHat,
  HeartPulse,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
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

type OperatingPlace = {
  icon: LucideIcon;
  label: string;
  copy: (categoryLabel: string) => string;
};

const OPERATING_PLACES: OperatingPlace[] = [
  {
    icon: Factory,
    label: "Indústrias",
    copy: (c) => `${c} adaptada a regime de turnos e ao processo produtivo.`,
  },
  {
    icon: Building2,
    label: "Empresas",
    copy: (c) => `${c} para escritórios, comércios e centros corporativos.`,
  },
  {
    icon: GraduationCap,
    label: "Instituições de Ensino",
    copy: (c) => `${c} compatível com a rotina de escolas e faculdades.`,
  },
  {
    icon: HeartPulse,
    label: "Instituições de Saúde",
    copy: (c) => `${c} seguindo protocolos de biossegurança hospitalar.`,
  },
  {
    icon: HardHat,
    label: "Obras",
    copy: (c) => `${c} adaptada ao avanço físico do canteiro de obras.`,
  },
];

function OperatingPlaceIcon({ place, index }: { place: OperatingPlace; index: number }) {
  const Icon = place.icon;
  return (
    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-yellow/30 bg-navy-deep shadow-[0_0_0_6px_rgba(7,19,56,1)]">
      <Icon size={24} className="text-yellow" />
      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-yellow font-mono text-[10px] font-bold text-navy">
        {index + 1}
      </span>
    </div>
  );
}

function OperatingPlaceText({
  place,
  categoryLabel,
}: {
  place: OperatingPlace;
  categoryLabel: string;
}) {
  return (
    <div className="max-w-[168px] text-center">
      <p className="font-heading text-sm font-semibold text-white leading-snug">{place.label}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-white/50">{place.copy(categoryLabel)}</p>
    </div>
  );
}

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
          <div className="mb-16 max-w-2xl mx-auto text-center">
            <SectionLabel align="center">04 · Onde Operamos</SectionLabel>
            <h2 className="font-heading text-3xl md:text-[48px] text-white mb-4 leading-tight">
              Cobertura ativa em <span className="text-yellow">{CITIES.length}+ cidades</span>, para
              todo tipo de operação
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Da sede própria em Americana, aplicamos {categoryLabel.toLowerCase()} com o mesmo
              padrão de supervisão em indústrias, empresas, instituições de ensino e de saúde, e
              canteiros de obra por toda a Região Metropolitana de Campinas e o interior de São
              Paulo.
            </p>
          </div>
        </GsapReveal>

        {/* Tipos de operação: linha do tempo com nó central por item. Desktop usa uma
            grade de 3 linhas (texto / ícone / texto) para que o ícone fique sempre
            alinhado à mesma linha horizontal mesmo alternando o texto acima/abaixo.
            Mobile usa uma linha do tempo vertical dedicada, não um reflow do layout
            desktop — leitura sequencial de cima para baixo, sem quebra de linha de
            texto disputando espaço com os ícones. */}
        <GsapReveal>
          <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-yellow/60">
            Tipos de operação atendidos
          </p>

          {/* Desktop / tablet */}
          <div className="relative mb-20 hidden md:block md:mb-24">
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${OPERATING_PLACES.length}, minmax(0, 1fr))`,
                gridTemplateRows: "minmax(92px, auto) auto minmax(92px, auto)",
              }}
            >
              <div
                className="relative z-0 flex items-center"
                style={{ gridColumn: "1 / -1", gridRow: 2 }}
                aria-hidden="true"
              >
                <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow/25 to-transparent" />
              </div>
              {OPERATING_PLACES.flatMap((place, i) => {
                const isUp = i % 2 === 0;
                return [
                  <div
                    key={`${place.label}-top`}
                    style={{ gridColumn: i + 1, gridRow: 1 }}
                    className="flex items-end justify-center px-2 pb-4"
                  >
                    {isUp && <OperatingPlaceText place={place} categoryLabel={categoryLabel} />}
                  </div>,
                  <div
                    key={`${place.label}-icon`}
                    style={{ gridColumn: i + 1, gridRow: 2 }}
                    className="flex items-center justify-center px-2"
                  >
                    <OperatingPlaceIcon place={place} index={i} />
                  </div>,
                  <div
                    key={`${place.label}-bottom`}
                    style={{ gridColumn: i + 1, gridRow: 3 }}
                    className="flex items-start justify-center px-2 pt-4"
                  >
                    {!isUp && <OperatingPlaceText place={place} categoryLabel={categoryLabel} />}
                  </div>,
                ];
              })}
            </div>
          </div>

          {/* Mobile: linha do tempo vertical dedicada */}
          <div className="relative mb-16 md:hidden">
            <div
              className="pointer-events-none absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-yellow/30 via-yellow/15 to-transparent"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-8">
              {OPERATING_PLACES.map((place, i) => (
                <div key={place.label} className="relative flex items-start gap-5">
                  <OperatingPlaceIcon place={place} index={i} />
                  <div className="max-w-[calc(100%-80px)] pt-3">
                    <p className="font-heading text-sm font-semibold text-white leading-snug">
                      {place.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                      {place.copy(categoryLabel)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GsapReveal>

        {/* Cidades atendidas: ficha/diretório em lista numerada, não cards. */}
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-yellow/60">
          Cidades com cobertura ativa
        </p>
        <div className="mx-auto max-w-3xl grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {FEATURED_CITIES.map((city, i) => (
            <GsapReveal key={city.slug} delayMs={i * 40}>
              <Link
                href={buildCategoryNestedPath(category, city)}
                className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 transition-colors hover:border-yellow/30"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-yellow/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-heading text-base font-semibold text-white transition-colors group-hover:text-yellow">
                      {city.name}
                    </p>
                    <p className="text-xs text-white/40">{city.region}</p>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-yellow"
                />
              </Link>
            </GsapReveal>
          ))}
        </div>

        <GsapReveal delayMs={200}>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-[24px] border border-yellow/20 bg-white/5 backdrop-blur-sm px-8 py-7 md:flex-row">
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
