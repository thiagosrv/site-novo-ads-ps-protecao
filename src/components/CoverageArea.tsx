import Link from "next/link";
import { MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { CITIES } from "@/lib/cities";

const NETWORK_DOTS = [
  { x: 235, y: 115 },
  { x: 265, y: 175 },
  { x: 150, y: 205 },
  { x: 205, y: 255 },
  { x: 260, y: 300 },
  { x: 175, y: 325 },
  { x: 305, y: 235 },
  { x: 120, y: 265 },
  { x: 215, y: 375 },
  { x: 270, y: 155 },
  { x: 140, y: 130 },
  { x: 320, y: 185 },
  { x: 100, y: 190 },
  { x: 240, y: 355 },
];

const HUB = { x: 190, y: 155 };

export default function CoverageArea() {
  return (
    <section
      id="cobertura"
      className="py-20 md:py-[var(--spacing-section)] bg-navy relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-yellow text-sm tracking-widest uppercase">
                Área de atuação
              </span>
              <span className="w-8 h-px bg-yellow" />
            </div>
            <h2 className="font-heading text-3xl md:text-[48px] text-white leading-tight mb-4">
              Atendemos em todo o Estado de São Paulo
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              Da sede em Americana à Região Metropolitana de Campinas, Circuito das Águas e
              interior paulista — mesma supervisão ativa, mesmo padrão de qualidade.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal className="lg:col-span-5 flex justify-center" delayMs={100}>
            <svg
              viewBox="0 0 400 440"
              className="w-full max-w-xs md:max-w-sm"
              aria-hidden="true"
            >
              <path
                d="M150,15 L230,10 L285,55 L340,95 L375,160 L370,225 L335,275 L350,330 L300,385 L230,425 L160,430 L100,395 L60,340 L45,270 L65,210 L40,150 L75,90 L120,45 Z"
                className="fill-white/[0.04] stroke-yellow/60"
                strokeWidth={2}
                strokeDasharray="7 6"
                strokeLinejoin="round"
              />

              {NETWORK_DOTS.map((dot, i) => (
                <g key={i}>
                  <line
                    x1={HUB.x}
                    y1={HUB.y}
                    x2={dot.x}
                    y2={dot.y}
                    className="stroke-white/10"
                    strokeWidth={1}
                    strokeDasharray="3 4"
                  />
                  <circle cx={dot.x} cy={dot.y} r={3.5} className="fill-tech-blue/70" />
                </g>
              ))}

              <circle cx={HUB.x} cy={HUB.y} r={12} className="fill-yellow/15" />
              <circle cx={HUB.x} cy={HUB.y} r={6} className="fill-yellow animate-pulse" />
              <text
                x={HUB.x + 16}
                y={HUB.y - 8}
                className="fill-white font-mono"
                fontSize={12}
                fontWeight={700}
              >
                Americana
              </text>
              <text
                x={HUB.x + 16}
                y={HUB.y + 8}
                className="fill-yellow font-mono"
                fontSize={10}
                letterSpacing={1}
              >
                SEDE
              </text>
            </svg>
          </Reveal>

          <Reveal className="lg:col-span-7" delayMs={180}>
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-5">
              <MapPin size={16} className="text-yellow shrink-0" />
              <span className="font-mono text-xs text-white/50 tracking-wide uppercase">
                {CITIES.length} municípios atendidos
              </span>
            </div>
            <ul className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="block px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-white/75 tracking-wide hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
