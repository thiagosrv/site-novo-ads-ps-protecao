"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStoredConsent, storeConsent } from "@/lib/cookieConsent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (getStoredConsent()) return;
    const showTimer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const enterTimer = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(enterTimer);
  }, [visible]);

  const decide = (status: "accepted" | "rejected") => {
    storeConsent(status);
    setEntered(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimento de cookies"
      className={`fixed z-40 bottom-24 inset-x-4 md:inset-x-auto md:bottom-6 md:left-6 md:right-auto md:max-w-md transition-all duration-300 ${
        entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-navy/10 p-5 md:p-6">
        <p className="font-heading text-sm font-bold text-navy mb-2">
          Sua privacidade é importante para nós
        </p>
        <p className="text-graphite/70 text-sm leading-relaxed mb-4">
          Utilizamos cookies essenciais ao funcionamento do site e, mediante seu consentimento,
          cookies analíticos para entender como você utiliza nosso conteúdo. Você pode aceitar
          todos os cookies ou rejeitar os não essenciais a qualquer momento. Saiba mais em nossa{" "}
          <Link href="/privacidade" className="text-navy underline hover:text-yellow-dark transition-colors">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="press-feedback flex-1 rounded-full border border-navy/15 px-4 py-2.5 text-sm font-heading font-semibold text-navy hover:bg-surface"
          >
            Rejeitar não essenciais
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="press-feedback flex-1 rounded-full bg-gradient-to-r from-yellow to-yellow-dark px-4 py-2.5 text-sm font-heading font-semibold text-navy hover:shadow-lg hover:shadow-yellow/25"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
