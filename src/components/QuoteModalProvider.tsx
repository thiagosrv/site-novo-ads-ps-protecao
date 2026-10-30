"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

// O modal (formulário em 2 etapas, máscara, consulta de CNPJ) pesa bastante e só
// aparece depois de um clique: fica fora do JS inicial de todas as páginas.
const loadQuoteModal = () => import("./QuoteModal");
const QuoteModal = dynamic(loadQuoteModal, { ssr: false });

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
  const [modalRequested, setModalRequested] = useState(false);
  const [prefillCity, setPrefillCity] = useState("");
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const openQuoteModal = useCallback((options?: OpenQuoteModalOptions) => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setPrefillCity(options?.city ?? "");
    setModalRequested(true);
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => setIsOpen(false), []);

  // Baixa o chunk do modal quando o navegador está ocioso, para o primeiro clique
  // abrir sem espera, sem competir com o carregamento da página.
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => void loadQuoteModal(), { timeout: 8000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => void loadQuoteModal(), 4000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (isOpen) return;
    previouslyFocused.current?.focus();
    previouslyFocused.current = null;
  }, [isOpen]);

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal }}>
      {children}
      {modalRequested && (
        <QuoteModal isOpen={isOpen} onClose={closeQuoteModal} prefillCity={prefillCity} />
      )}
    </QuoteModalContext.Provider>
  );
}
