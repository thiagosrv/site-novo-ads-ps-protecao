"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, readAndClearQuotePayload } from "@/lib/quote";

const REDIRECT_DELAY_MS = 3000;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ObrigadoContent() {
  const [name, setName] = useState("");
  const [waUrl, setWaUrl] = useState(() => buildWhatsAppUrl());
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(REDIRECT_DELAY_MS / 1000));
  const redirectedRef = useRef(false);

  useEffect(() => {
    const payload = readAndClearQuotePayload();
    const url = buildWhatsAppUrl(payload?.message);
    // Payload only exists in sessionStorage, only knowable client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWaUrl(url);
    if (payload?.name) setName(payload.name);

    function redirect() {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      window.location.href = url;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-18320528244/71ZkCI2S3t0cEPSm9J9E",
        value: 1.0,
        currency: "BRL",
        event_callback: redirect,
        event_timeout: REDIRECT_DELAY_MS,
      });
    }

    const fallbackTimer = setTimeout(redirect, REDIRECT_DELAY_MS + 500);
    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  function handleManualRedirect() {
    redirectedRef.current = true;
    window.location.href = waUrl;
  }

  return (
    <section className="min-h-[calc(100vh-1px)] bg-navy flex items-center py-16 md:py-20">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative order-2 md:order-1 aspect-[4/5] max-h-[480px] rounded-[2rem] overflow-hidden bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <Image
            src="/loading/loading3.png"
            alt="Profissional de segurança da PS Proteção treinado e capacitado"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2 text-center md:text-left">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-yellow mb-6">
            <span className="w-8 h-px bg-yellow" />
            Solicitação recebida
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] text-white leading-tight mb-4">
            {name ? `Obrigado, ${name}!` : "Obrigado pela sua solicitação!"}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            Você será redirecionado ao WhatsApp para falar diretamente com nossa equipe comercial
            em {secondsLeft}s.
          </p>

          <div className="w-full max-w-md mx-auto md:mx-0 h-1.5 rounded-full bg-white/10 overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-yellow to-yellow-dark transition-[width] duration-1000 ease-linear"
              style={{
                width: `${Math.max(
                  0,
                  100 - (secondsLeft / Math.ceil(REDIRECT_DELAY_MS / 1000)) * 100
                )}%`,
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleManualRedirect}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} />
            Ir para o WhatsApp agora
          </button>

          <p className="text-white/40 text-sm mt-4">
            O redirecionamento não aconteceu?{" "}
            <button
              type="button"
              onClick={handleManualRedirect}
              className="underline underline-offset-2 hover:text-white/70 transition-colors"
            >
              Clique aqui
            </button>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
