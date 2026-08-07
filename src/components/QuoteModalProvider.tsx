"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import QuoteModal from "./QuoteModal";

type OpenQuoteModalOptions = {
  city?: string;
};

type QuoteModalContextValue = {
  openQuoteModal: (options?: OpenQuoteModalOptions) => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return ctx;
}

export default function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillCity, setPrefillCity] = useState("");

  const openQuoteModal = useCallback((options?: OpenQuoteModalOptions) => {
    setPrefillCity(options?.city ?? "");
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => setIsOpen(false), []);

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal }}>
      {children}
      <QuoteModal isOpen={isOpen} onClose={closeQuoteModal} prefillCity={prefillCity} />
    </QuoteModalContext.Provider>
  );
}
