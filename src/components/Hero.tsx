import Image from "next/image";
import { ArrowRight, CheckCircle2, Radio } from "lucide-react";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex items-center overflow-hidden bg-navy pt-28 pb-16 md:pt-20"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/guarda-fachada.png"
          alt="Profissional de segurança da PS Proteção em frente a uma portaria monitorada"
          fill
          priority
          className="object-cover object-[75%_center]"
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

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7">
          <Reveal>
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-5 py-2 rounded-full mb-8 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                Inteligência Operacional Ativa
              </span>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <h1 className="text-white font-heading text-4xl md:text-6xl font-bold leading-[1.1] mb-8">
              Terceirização com <span className="text-yellow">controle</span>, supervisão e padrão
              operacional.
            </h1>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="text-white/80 text-lg mb-10 max-w-xl leading-relaxed">
              Elevamos o nível de segurança e gestão do seu patrimônio com processos rigorosos e
              tecnologia de ponta integrada à supervisão humana especializada.
            </p>
          </Reveal>

          <Reveal delayMs={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contato"
                className="bg-yellow text-navy px-8 py-4 rounded-full font-heading text-base font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(252,191,7,0.3)]"
              >
                Solicitar diagnóstico operacional
                <ArrowRight size={20} />
              </a>
              <a
                href="#servicos"
                className="border border-white/30 text-white px-8 py-4 rounded-full font-heading text-base font-bold hover:bg-white/10 transition-colors text-center"
              >
                Conhecer nossas soluções
              </a>
            </div>
          </Reveal>
        </div>

        {/* Painel flutuante */}
        <Reveal delayMs={400} className="hidden md:block md:col-span-5">
          <div className="glass-card p-8 rounded-3xl shadow-2xl border-t border-l border-white/20">
            <div className="flex justify-between items-center mb-8">
              <span className="font-mono text-white/60 text-[11px] tracking-widest">
                OPERATIONAL_STATUS
              </span>
              <Radio className="text-yellow" size={22} />
            </div>

            <div className="space-y-5">
              <div className="p-5 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="text-xs font-mono text-white/50 mb-2">SUPERVISÃO 24H</div>
                <div className="flex justify-between items-end">
                  <span className="font-heading text-2xl text-white">Ativa</span>
                  <div className="flex gap-1.5 h-10 items-end">
                    <div className="w-1.5 bg-yellow/40 h-5 rounded-t-sm" />
                    <div className="w-1.5 bg-yellow/60 h-7 rounded-t-sm" />
                    <div className="w-1.5 bg-yellow/80 h-6 rounded-t-sm" />
                    <div className="w-1.5 bg-yellow h-10 rounded-t-sm" />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="text-xs font-mono text-white/50 mb-2">COBERTURA DE POSTOS</div>
                <div className="flex justify-between items-center">
                  <span className="font-heading text-2xl text-white">100%</span>
                  <CheckCircle2 className="text-green-400" size={26} />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow/20 flex items-center justify-center border border-yellow/30">
                <Image
                  src="/brand/logo-ps-protecao.png"
                  alt="Selo PS Proteção"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <div className="font-heading text-base text-white mb-1">PS Command Center</div>
                <div className="text-[13px] text-white/60">Monitoramento em tempo real</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
