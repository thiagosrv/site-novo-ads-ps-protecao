import Image from "next/image";
import { Star } from "lucide-react";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    text: "A PS Proteção transformou completamente a gestão de portaria da nossa planta industrial. Os profissionais são bem treinados, pontuais e seguem os procedimentos à risca. A supervisão periódica nos dá total segurança sobre a operação.",
    name: "Carlos Silva",
    role: "Diretor de Operações · Indústria Metalúrgica, Americana/SP",
    avatar: "/assets/carlos.webp",
    featured: false,
  },
  {
    text: "Trabalhamos com a PS Proteção há mais de 5 anos em nosso grupo educacional. A equipe de limpeza mantém todas as unidades impecáveis e o suporte de recepção representa muito bem nossa instituição. Parceria de altíssima qualidade.",
    name: "Ana Paula Rodrigues",
    role: "Gestora de RH · Grupo Educacional, Campinas/SP",
    avatar: "/assets/ana.webp",
    featured: true,
  },
  {
    text: "Nosso centro de distribuição exige rigor operacional 24h. A PS Proteção entrega com excelência: relatórios pontuais, supervisão constante e equipe sempre pronta para reposição em caso de ausências. Recomendo sem hesitação.",
    name: "Roberto Mendes",
    role: "Gerente Administrativo · Centro de Distribuição, Sumaré/SP",
    avatar: "/assets/roberto.webp",
    featured: false,
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1 text-yellow-dark mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-[var(--spacing-section)] bg-surface">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="mb-16 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <span className="w-8 h-px bg-yellow" />
              <span className="font-mono text-navy text-sm tracking-widest uppercase">
                Reputação
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-4 leading-tight">
              O que dizem sobre nós?
            </h2>
            <p className="text-lg text-graphite/70 leading-relaxed">
              A confiança dos nossos clientes é o nosso maior patrimônio. Veja o que gestores e
              líderes dizem sobre a PS Proteção.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delayMs={i * 100}
              className={`p-8 rounded-3xl border h-full flex flex-col ${
                t.featured
                  ? "bg-navy text-white border-navy shadow-xl md:-translate-y-4"
                  : "bg-white border-navy/10"
              }`}
            >
              <Stars />
              <blockquote
                className={`leading-relaxed mb-8 flex-1 ${
                  t.featured ? "text-white/85" : "text-graphite/70"
                }`}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div>
                  <strong
                    className={`block font-heading text-base ${
                      t.featured ? "text-white" : "text-navy"
                    }`}
                  >
                    {t.name}
                  </strong>
                  <span
                    className={`text-xs leading-snug ${
                      t.featured ? "text-white/60" : "text-graphite/60"
                    }`}
                  >
                    {t.role}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={300}>
          <div className="mt-12 bg-white rounded-3xl border border-navy/10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-dark">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-graphite/70 max-w-sm">
                Veja mais avaliações e conheça nossa reputação no Google Meu Negócio.
              </p>
            </div>
            <a
              href="https://share.google/T93Dj9U0KXU4r2ZRx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-heading font-semibold tracking-wide text-white transition-all duration-300 hover:bg-navy/90 hover:-translate-y-0.5 shrink-0"
            >
              <Star size={16} />
              Ver avaliações no Google
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
