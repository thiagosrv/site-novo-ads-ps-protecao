"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { QUOTE_WHATSAPP_NUMBER, buildWhatsAppUrl } from "@/lib/quote";

const ORIGEM_PAGINA = "/lp-psprotecao";
const MESSAGE = "Olá! Vi a apresentação da PS Proteção e gostaria de falar com meu consultor.";

// Fora do componente: a regra react-hooks/immutability trata `window` como
// variável externa e barra a atribuição dentro do corpo do componente.
function pushWhatsAppClick(posicao: string) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "clique_whatsapp",
    numero: QUOTE_WHATSAPP_NUMBER,
    origem_pagina: ORIGEM_PAGINA,
    posicao_cta: posicao,
  });
}

type Props = {
  className?: string;
  // "premium" é o botão de destaque do hero; "default" é o fechamento discreto.
  variant?: "default" | "premium";
  // Onde o botão está na página — vai para o dataLayer para separar os cliques.
  posicao?: string;
  label?: string;
};

// Link direto para o consultor (sem modal de cotação): quem chega por aqui já
// está em contato com um vendedor.
export default function LpWhatsAppLink({
  className,
  variant = "default",
  posicao = "fechamento",
  label = "Falar com meu consultor no WhatsApp",
}: Props) {
  const premium = variant === "premium";

  return (
    <a
      href={buildWhatsAppUrl(MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => pushWhatsAppClick(posicao)}
      className={
        (premium
          ? "group press-scale-only relative inline-flex items-center justify-center gap-3 rounded-full h-14 pl-6 pr-2 bg-gradient-to-r from-yellow via-yellow to-yellow-dark text-navy font-heading font-bold tracking-wide text-[15px] ring-1 ring-white/40 shadow-[0_10px_30px_rgba(252,191,7,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#25D366] hover:via-[#25D366] hover:to-[#1fae59] hover:text-white hover:shadow-[0_12px_32px_rgba(37,211,102,0.35)] "
          : "press-scale-only inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark text-navy font-heading font-semibold tracking-wide px-7 py-3.5 text-[15px] transition-all duration-300 hover:from-[#25D366] hover:to-[#1fae59] hover:text-white hover:shadow-lg hover:shadow-[#25D366]/25 ") +
        (className ?? "")
      }
    >
      <MessageCircle size={premium ? 20 : 18} aria-hidden="true" />
      {label}
      {premium && (
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-yellow transition-colors duration-300 group-hover:bg-white group-hover:text-[#1fae59]"
          aria-hidden="true"
        >
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      )}
    </a>
  );
}
