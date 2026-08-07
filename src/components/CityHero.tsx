import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppCta from "./WhatsAppCta";
import type { City } from "@/lib/cities";

export default function CityHero({ city }: { city: City }) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-navy pt-28 pb-16 md:pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/background-mobile.webp"
          alt={`Profissional de segurança da PS Proteção em portaria monitorada em ${city.name}`}
          fill
          priority
          className="object-cover object-[75%_center] md:hidden"
        />
        <Image
          src="/brand/guarda-fachada.png"
          alt={`Profissional de segurança da PS Proteção em portaria monitorada em ${city.name}`}
          fill
          priority
          className="hidden object-cover object-[75%_center] md:block"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Doodles técnicos decorativos */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
        viewBox="0 0 1440 800"
        aria-hidden="true"
      >
        <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="80" x2="80" y1="0" y2="800" />
        <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="1360" x2="1360" y1="0" y2="800" />
        <circle className="fill-yellow" cx="80" cy="400" r="4" />
        <circle className="fill-yellow" cx="1360" cy="200" r="4" />
        <path className="stroke-yellow" d="M 80 200 L 200 200 L 200 320" fill="none" strokeDasharray="2 2" />
      </svg>

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] w-full">
        <div className="max-w-2xl mx-auto text-center md:mx-0 md:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-5 py-2 rounded-full mb-8 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                Atuação em {city.name}
              </span>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <h1 className="text-white font-heading text-4xl md:text-6xl font-bold leading-[1.1] mb-8">
              Terceirização com controle, supervisão e{" "}
              <span className="text-yellow">padrão operacional</span> em{" "}
              <span className="text-yellow">{city.name}</span>.
            </h1>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="text-white/80 text-lg mb-10 max-w-xl leading-relaxed">
              Portaria, limpeza, zeladoria e recepção terceirizadas para empresas, condomínios e
              indústrias em {city.name} e em toda a {city.region}, com supervisão ativa e
              tecnologia embarcada.
            </p>
          </Reveal>

          <Reveal delayMs={300}>
            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
              <WhatsAppCta
                city={city.name}
                className="px-7 py-3.5 text-[15px] hover:scale-[1.03] shadow-[0_8px_24px_rgba(252,191,7,0.25)]"
                label={
                  <>
                    Solicitar diagnóstico em {city.name}
                    <ArrowRight size={18} />
                  </>
                }
              />
              <Link
                href="/servicos"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-[15px] font-heading font-semibold tracking-wide text-white text-center transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5"
              >
                Conhecer nossas soluções
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
