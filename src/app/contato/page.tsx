import { Clock, Phone, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";

const INFO_CARDS = [
  {
    icon: Phone,
    title: "Emergências 24h",
    text: "(19) 99781-8615 — plantão para ocorrências fora do horário comercial.",
  },
  {
    icon: Clock,
    title: "Horário de Atendimento",
    text: "Segunda a sexta, 08h–18h · Sábado, 08h–12h.",
  },
  {
    icon: Star,
    title: "Avaliações no Google",
    text: "Confira a experiência de quem já contratou a PS Proteção.",
    href: "https://share.google/T93Dj9U0KXU4r2ZRx",
  },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        tag="Fale conosco"
        title="Entre em Contato"
        description="Solicite uma proposta, tire dúvidas ou agende uma visita técnica. Nossa equipe responde rapidamente."
      />

      <section className="pt-16 md:pt-20 -mb-4">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-3 gap-6">
          {INFO_CARDS.map((card, i) => {
            const Icon = card.icon;
            const content = (
              <div className="bg-white rounded-2xl p-7 border border-navy/5 shadow-sm h-full flex flex-col gap-4">
                <div className="w-11 h-11 rounded-full bg-surface flex items-center justify-center">
                  <Icon className="text-navy" size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-navy text-base mb-1">{card.title}</h3>
                  <p className="text-graphite/70 text-sm leading-relaxed">{card.text}</p>
                </div>
              </div>
            );
            return (
              <Reveal key={card.title} delayMs={i * 80}>
                {card.href ? (
                  <a href={card.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
