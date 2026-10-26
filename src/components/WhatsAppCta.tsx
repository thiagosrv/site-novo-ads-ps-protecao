"use client";

import clsx from "clsx";
import { useQuoteModal } from "./QuoteModalProvider";
import WhatsAppIcon from "./WhatsAppIcon";

// A geometria do botão (círculo do ícone, folgas) é definida em `em` a partir do
// tamanho de fonte que o ponto de uso informa; padding e a sombra amarela antiga
// vindos de `className` são descartados para não desalinhar o círculo.
const PADDING_CLASS = /(?:^|\s)(?:[\w-]+:)*-?p[xytrbl]?-(?:\[[^\]]+\]|[\w./]+)/g;
const YELLOW_SHADOW_CLASS = /shadow-\[[^\]]*252,191,7[^\]]*\]/g;

export default function WhatsAppCta({
  className,
  city,
  onClick,
}: {
  // Mantidos para os pontos de uso não precisarem mudar: o texto do botão é
  // sempre "Fale Conosco" e a navegação acontece pelo modal de orçamento.
  href?: string;
  label?: React.ReactNode;
  iconSize?: number;
  className?: string;
  city?: string;
  onClick?: () => void;
}) {
  const { openQuoteModal } = useQuoteModal();
  const extra = className?.replace(PADDING_CLASS, " ").replace(YELLOW_SHADOW_CLASS, "");

  return (
    <button
      type="button"
      aria-label="Fale conosco pelo WhatsApp"
      onClick={() => {
        onClick?.();
        openQuoteModal({ city });
      }}
      className={clsx(
        "press-scale-only cursor-pointer group relative inline-flex items-center gap-[0.7em] overflow-hidden rounded-full p-[0.3em] pr-[1.6em] text-center font-heading font-semibold tracking-wide text-white",
        "bg-gradient-to-r from-[#17A04F] via-[#0F8A52] to-[#0A6E58]",
        "shadow-[0_10px_24px_-8px_rgba(10,110,88,0.6),inset_0_1px_0_rgba(255,255,255,0.28)]",
        "transition-all duration-300 hover:shadow-[0_14px_30px_-8px_rgba(10,110,88,0.7),inset_0_1px_0_rgba(255,255,255,0.28)] hover:brightness-110",
        "focus-visible:ring-2 focus-visible:ring-[#0F8A52] focus-visible:ring-offset-2 motion-reduce:transition-none",
        extra
      )}
    >
      <span className="flex h-[2.5em] w-[2.5em] shrink-0 items-center justify-center rounded-full bg-white text-[#25D366] shadow-sm transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none">
        <WhatsAppIcon className="h-[1.4em] w-[1.4em]" />
      </span>
      <span aria-hidden="true" className="grid flex-1 place-items-center overflow-hidden py-[0.1em]">
        <span className="col-start-1 row-start-1 whitespace-nowrap transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 group-focus-visible:-translate-y-full group-focus-visible:opacity-0 motion-reduce:transition-none">
          Fale Conosco
        </span>
        <span className="col-start-1 row-start-1 inline-flex translate-y-full items-center gap-[0.5em] whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
          <span className="h-[0.5em] w-[0.5em] rounded-full bg-[#7CFFB2] animate-pulse motion-reduce:animate-none" />
          Estamos Online
        </span>
      </span>
    </button>
  );
}
