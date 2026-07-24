import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const ARTICLES = [
  {
    tag: "Segurança Patrimonial",
    title: "Como a supervisão ativa reduz custos operacionais em 15%",
    image: "/assets/supervisao-bancada.webp",
    alt: "Supervisor analisando relatórios operacionais em bancada de monitoramento",
  },
  {
    tag: "Facilities Management",
    title: "5 erros comuns na contratação de limpeza terceirizada",
    image: "/assets/implantacao3.webp",
    alt: "Equipe reunida discutindo plano de implantação operacional",
  },
  {
    tag: "Inovação",
    title: "O futuro do controle de acesso: IA e biometria facial",
    image: "/assets/app-controle-de-acesso.webp",
    alt: "Aplicativo de controle de acesso da PS Proteção em uso",
  },
];

export default function IntelligenceHub() {
  return (
    <section id="blog" className="py-20 md:py-[var(--spacing-section)] bg-surface">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                Intelligence Hub
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-4">
              Inteligência operacional para decisões mais seguras
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <Reveal
              key={article.title}
              delayMs={i * 100}
              className="group bg-white rounded-3xl overflow-hidden border border-navy/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <article>
                <div className="h-56 relative overflow-hidden bg-navy/5">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <span className="text-navy font-mono text-[11px] font-bold tracking-widest uppercase">
                    {article.tag}
                  </span>
                  <h3 className="font-heading text-xl text-navy mt-3 mb-6 leading-snug group-hover:text-navy-deep transition-colors">
                    {article.title}
                  </h3>
                  <a href="#" className="text-navy font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Ler artigo <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
