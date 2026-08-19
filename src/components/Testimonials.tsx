import { Star } from "lucide-react";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    text: "Empresa extremamente competente e confiável. Profissionais qualificados, atendimento de qualidade e ótimo suporte. A PS Proteção se destaca pelo comprometimento e pela excelência nos serviços de portaria e segurança. Recomendo!",
    name: "Nathane Silva",
    reviewCount: "3 avaliações no Google",
    initial: "N",
    rating: 5,
    featured: false,
  },
  {
    text: "Ótimo atendimento e excelente prestação de serviços. Equipe profissional, responsável e muito competente!",
    name: "Rodolfo Pina",
    reviewCount: "3 avaliações no Google",
    initial: "R",
    rating: 5,
    featured: true,
  },
  {
    text: "Ótima experiência com a PS Proteção! Atendimento excelente, equipe prestativa e serviço de qualidade. Empresa séria, confiável e comprometida com seus clientes. Recomendo!",
    name: "Karla Karina",
    reviewCount: "1 avaliação no Google",
    initial: "K",
    rating: 5,
    featured: false,
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1 text-yellow-dark mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function InitialAvatar({ initial, featured }: { initial: string; featured: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center font-heading font-semibold text-lg ${
        featured ? "bg-white/15 text-white" : "bg-navy/10 text-navy"
      }`}
    >
      {initial}
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
              <Stars count={t.rating} />
              <blockquote
                className={`leading-relaxed mb-8 flex-1 ${
                  t.featured ? "text-white/85" : "text-graphite/70"
                }`}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <InitialAvatar initial={t.initial} featured={t.featured} />
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
                    {t.reviewCount}
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
              href="https://g.page/r/CXDiGqbtS-XSEAE/review"
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
