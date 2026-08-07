"use client";

import type { ReactNode } from "react";
import { useQuoteModal } from "./QuoteModalProvider";

export default function QuoteTriggerButton({
  children,
  className,
  city,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  city?: string;
  ariaLabel?: string;
}) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => openQuoteModal({ city })}
      className={className}
    >
      {children}
    </button>
  );
}
