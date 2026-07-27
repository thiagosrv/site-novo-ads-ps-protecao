import Image from "next/image";
import { Building2, Landmark } from "lucide-react";
import Reveal from "./Reveal";

export default function OurPresence() {
  return (
    <section
      id="presenca"
      className="py-20 md:py-[var(--spacing-section)] bg-surface"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] flex flex-col gap-20 md:gap-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <Reveal className="md:col-span-6 order-2 md:order-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                Presença Consolidada
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-[40px] text-navy mb-5 leading-tight text-center md:text-left">
              Presença consolidada na RMC e Piracicaba, expandindo por São Paulo
            </h2>
            <p className="text-lg text-graphite/70 leading-relaxed text-center md:text-left">
              Da sede própria em Americana, sustentamos operação ativa em mais de 60 municípios da
              Região Metropolitana de Campinas, do Circuito das Águas e da região de Piracicaba e
              Limeira. É uma presença física real — não apenas um raio de entrega no mapa — que
              segue em expansão para novas regiões do Estado de São Paulo, sempre com a mesma
              estrutura de supervisão e padrão operacional.
            </p>
          </Reveal>

          <Reveal className="md:col-span-6 order-1 md:order-2" delayMs={120}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[5/4]">
              <Image
                src="/assets/fachada.webp"
                alt="Fachada da sede da PS Proteção em Americana, SP"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2">
                  <Building2 size={16} className="text-yellow-dark" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                    Sede Própria · Americana, SP
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <Reveal className="md:col-span-5">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[5/4]">
              <Image
                src="/assets/historia.webp"
                alt="História da PS Proteção desde a fundação em 1998"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2">
                  <Landmark size={16} className="text-yellow-dark" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                    Fundação · 1998
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delayMs={120}>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                Nossas Raízes
              </span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl text-navy mb-5 leading-tight text-center md:text-left">
              Uma história de trabalho sério
            </h3>
            <p className="text-lg text-graphite/70 leading-relaxed text-center md:text-left">
              A PS Proteção nasceu em 1998, em Americana, pela mão de Antônio Farias — um
              nordestino que escolheu São Paulo para construir sua trajetória com um princípio
              simples: trabalho sério, proximidade real com o cliente e zero espaço para falhas
              em portaria. Mais de 28 anos depois, essa base familiar virou método: +3.000
              colaboradores treinados e +1.000 clientes atendidos, sem abrir mão do que deu
              origem à empresa.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
