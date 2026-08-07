import type { Metadata } from "next";
import { Clock, Phone, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import MarqueeBand from "@/components/MarqueeBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contato | PS Proteção",
  description:
    "Solicite uma proposta, tire dúvidas ou agende uma visita técnica. Telefone, WhatsApp, e-mail e endereço da PS Proteção em Americana, SP.",
  alternates: {
    canonical: "/contato",
  },
};

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
    href: "https://g.page/r/CXDiGqbtS-XSEAE/review",
  },
];

const MARQUEE_ITEMS = [
  "Resposta em Até 1 Hora Útil",
  "Atendimento 24 Horas por Dia",
  "Diagnóstico Operacional Gratuito",
  "Canal Dedicado por Área",
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        tag="Fale conosco"
        title="Entre em Contato"
        description="Solicite uma proposta, tire dúvidas ou agende uma visita técnica. Nossa equipe responde rapidamente."
      />

      <section className="relative z-20 -mt-24 md:-mt-28 pb-10 md:pb-14 px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="max-w-[var(--container-max)] mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.14)] border border-navy/5 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-navy/5 overflow-hidden">
            {INFO_CARDS.map((card) => {
              const Icon = card.icon;
              const content = (
                <div className="p-8 md:p-10 flex flex-col gap-4 text-center md:text-left h-full">
                  <div className="w-12 h-12 rounded-full bg-yellow/10 flex items-center justify-center mx-auto md:mx-0">
                    <Icon className="text-yellow-dark" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading text-navy text-lg mb-1.5">{card.title}</h3>
                    <p className="text-graphite/70 text-sm leading-relaxed">{card.text}</p>
                  </div>
                </div>
              );
              return card.href ? (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full hover:bg-surface/70 transition-colors"
                >
                  {content}
                </a>
              ) : (
                <div key={card.title} className="h-full hover:bg-surface/50 transition-colors">
                  {content}
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      <MarqueeBand items={MARQUEE_ITEMS} />

      <ContactSection />
    </>
  );
}
