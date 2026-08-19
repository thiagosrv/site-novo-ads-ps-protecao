import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";

const SERVICES = [
  {
    tag: "ESTRATÉGICO",
    title: "Portaria e Controle de Acesso",
    image: "/assets/porteiro.webp",
    alt: "Porteiro da PS Proteção em posto de controle de acesso",
    bullets: ["Rondas e controle de acesso desarmados", "Triagem técnica de visitantes"],
  },
  {
    tag: "FACILITIES",
    title: "Limpeza Profissional",
    image: "/assets/limpeza.webp",
    alt: "Equipe de limpeza profissional em ambiente corporativo",
    bullets: ["Cronograma de higiene customizado", "Equipamentos de alta performance"],
  },
  {
    tag: "HOSPITALIDADE",
    title: "Recepção e Atendimento",
    image: "/assets/recepcao.webp",
    alt: "Recepcionista da PS Proteção atendendo em portaria corporativa",
    bullets: ["Atendimento bilíngue (opcional)", "Protocolos de hospitalidade corporativa"],
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-white py-20 md:py-[var(--spacing-section)] border-t border-navy/5 relative overflow-hidden">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Nossas Soluções
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-[48px] text-navy leading-tight">
                Serviços que protegem e valorizam seu ativo.
              </h2>
            </div>
            <Link
              href="/servicos"
              className="group flex items-center gap-3 text-navy font-bold font-heading text-base hover:text-navy-deep transition-colors shrink-0"
            >
              <span className="border-b-2 border-yellow pb-1">Ver todos os serviços</span>
              <span className="w-10 h-10 rounded-full bg-surface flex items-center justify-center group-hover:bg-yellow transition-all">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.title}
              delayMs={i * 100}
              className="group bg-surface rounded-[2rem] overflow-hidden border border-navy/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="h-72 relative overflow-hidden p-3">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-navy/90 backdrop-blur-md text-white font-mono text-[11px] px-4 py-1.5 rounded-full border border-white/10 tracking-widest">
                    {service.tag}
                  </span>
                </div>
              </div>
              <div className="p-8 pt-4">
                <h3 className="font-heading text-2xl text-navy mb-4 leading-snug">{service.title}</h3>
                <ul className="space-y-4 mb-10">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-graphite/70">
                      <BadgeCheck className="text-yellow-dark shrink-0 mt-0.5" size={20} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/servicos"
                  className="inline-flex items-center justify-between w-full text-navy font-bold group-hover:text-navy-deep transition-colors border-t border-navy/10 pt-6"
                >
                  Conhecer solução
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
