"use client";

import { MessageCircle } from "lucide-react";
import clsx from "clsx";
import { useQuoteModal } from "./QuoteModalProvider";

export default function WhatsAppCta({
  href: _href,
  label,
  className,
  city,
  onClick,
}: {
  // Kept so existing call sites don't need to change; navigation now happens
  // through the quote modal instead of a direct link.
  href?: string;
  label: React.ReactNode;
  className?: string;
  city?: string;
  onClick?: () => void;
}) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openQuoteModal({ city });
      }}
      className={clsx(
        "press-scale-only group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-center font-heading font-semibold tracking-wide bg-gradient-to-r from-yellow to-yellow-dark text-navy transition-all duration-300 hover:from-[#25D366] hover:to-[#1fae59] hover:text-white hover:shadow-lg hover:shadow-[#25D366]/25",
        className
      )}
    >
      <span className="inline-flex items-center justify-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
        {label}
      </span>
      <span className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <MessageCircle size={18} />
        Estamos Online
      </span>
    </button>
  );
}
