"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, MessageCircle, X } from "lucide-react";
import { useQuoteModal } from "./QuoteModalProvider";

const TALENTOS_URL = "https://protecaotalentos.online";
const BUBBLE_SESSION_KEY = "wa-bubble-seen";
const BUBBLE_APPEAR_DELAY_MS = 2500;
const BUBBLE_VISIBLE_MS = 5000;
const BUBBLE_TRANSITION_MS = 300;

export default function WhatsAppFloatingButton() {
  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [bubbleMounted, setBubbleMounted] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    if (sessionStorage.getItem(BUBBLE_SESSION_KEY)) return;

    const appearTimeout = setTimeout(() => {
      sessionStorage.setItem(BUBBLE_SESSION_KEY, "1");
      setBubbleMounted(true);
      requestAnimationFrame(() => setBubbleVisible(true));
    }, BUBBLE_APPEAR_DELAY_MS);

    return () => clearTimeout(appearTimeout);
  }, []);

  useEffect(() => {
    if (!bubbleVisible) return;

    const hideTimeout = setTimeout(() => setBubbleVisible(false), BUBBLE_VISIBLE_MS);
    return () => clearTimeout(hideTimeout);
  }, [bubbleVisible]);

  useEffect(() => {
    if (bubbleVisible || !bubbleMounted) return;

    const unmountTimeout = setTimeout(() => setBubbleMounted(false), BUBBLE_TRANSITION_MS);
    return () => clearTimeout(unmountTimeout);
  }, [bubbleVisible, bubbleMounted]);

  useEffect(() => {
    if (open) setBubbleVisible(false);
  }, [open]);

  useEffect(() => {
    if (open) {
      // Keep-mounted-during-exit: mounting is a side effect of the open
      // transition, not derivable at render time.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPanelMounted(true);
      const raf = requestAnimationFrame(() => setPanelVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setPanelVisible(false);
    const timeout = setTimeout(() => setPanelMounted(false), 180);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="fixed bottom-5 right-5 md:bottom-6 md:right-6 xl:bottom-8 xl:right-8 z-50">
      {panelMounted && (
        <div
          className={`popover-panel absolute bottom-[72px] right-0 w-72 rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-navy/10 overflow-hidden ${
            panelVisible ? "is-open" : ""
          }`}
        >
          <div className="flex items-center justify-between px-5 py-3.5 bg-navy">
            <span className="font-heading text-white text-sm">Como podemos ajudar?</span>
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setOpen(false)}
              className="press-feedback text-white/70 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openQuoteModal();
              }}
              className="press-feedback w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left hover:bg-surface"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                <MessageCircle size={19} />
              </span>
              <span>
                <span className="block font-heading text-sm text-navy">Falar com o Comercial</span>
                <span className="block text-xs text-graphite/60">Solicite uma proposta</span>
              </span>
            </button>

            <a
              href={TALENTOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="press-feedback w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left hover:bg-surface"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                <Briefcase size={19} />
              </span>
              <span>
                <span className="block font-heading text-sm text-navy">Vagas e Oportunidades</span>
                <span className="block text-xs text-graphite/60">Trabalhe conosco</span>
              </span>
            </a>
          </div>
        </div>
      )}

      {bubbleMounted && (
        <div
          role="status"
          className={`chat-bubble absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-2xl bg-white text-navy font-heading text-sm font-semibold px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] border border-navy/10 ${
            bubbleVisible ? "is-open" : ""
          }`}
        >
          Fale conosco agora!
          <span
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-3 w-3 rotate-45 bg-white border-r border-b border-navy/10"
            aria-hidden="true"
          />
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Fechar opções de contato" : "Fale conosco pelo WhatsApp"}
        onClick={() => setOpen((v) => !v)}
        className="press-feedback flex h-14 w-14 xl:h-16 xl:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 hover:scale-110 hover:shadow-xl"
      >
        {open ? (
          <X size={24} className="xl:size-7" />
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 xl:h-8 xl:w-8" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.64-1.03-5.13-2.9-7C17.08 3.03 14.58 2 12.04 2Zm5.8 14.14c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.83-.12-.42-.14-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.14.11.31.02.5-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.65-.17 1.33Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
