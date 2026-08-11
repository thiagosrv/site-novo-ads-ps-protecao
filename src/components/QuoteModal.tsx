"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { QUOTE_SERVICE_CATEGORIES, buildQuoteMessage, saveQuotePayload } from "@/lib/quote";

const EMPTY_FORM = { name: "", email: "", phone: "", cnpj: "", city: "" };

const inputClass =
  "w-full rounded-xl border border-navy/10 bg-surface px-4 py-2.5 text-graphite placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-yellow/50 transition-shadow";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono tracking-wide text-graphite/60 uppercase mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function QuoteModal({
  isOpen,
  onClose,
  prefillCity,
}: {
  isOpen: boolean;
  onClose: () => void;
  prefillCity: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    // Reset gate is the isOpen transition itself, only knowable after render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(1);
    setTouched(false);
    setForm({ ...EMPTY_FORM, city: prefillCity });
  }, [isOpen, prefillCity]);

  useEffect(() => {
    if (isOpen) {
      // Keep-mounted-during-exit: mounting is a side effect of the isOpen
      // transition, not derivable at render time.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      const raf = requestAnimationFrame(() => setOpen(true));
      return () => cancelAnimationFrame(raf);
    }
    setOpen(false);
    const timeout = setTimeout(() => setMounted(false), 250);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const isStep1Valid =
    form.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(form.email.trim()) &&
    form.phone.trim().length >= 8 &&
    form.cnpj.trim().length >= 11 &&
    form.city.trim().length > 1;

  function handleNext() {
    setTouched(true);
    if (isStep1Valid) setStep(2);
  }

  function handleSelectService(serviceLabel: string) {
    const message = buildQuoteMessage(form, serviceLabel);
    saveQuotePayload({ message, name: form.name });
    onClose();
    router.push("/obrigado");
  }

  return (
    <div
      className={`modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm ${open ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`modal-panel relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto ${open ? "is-open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="press-feedback absolute top-5 right-5 text-graphite/50 hover:text-navy"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <span className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${step === 1 ? "bg-yellow" : "bg-yellow/40"}`} />
          <span className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${step === 2 ? "bg-yellow" : "bg-navy/10"}`} />
        </div>

        <div key={step} className="step-fade">
        {step === 1 ? (
          <>
            <h2 className="font-heading text-2xl text-navy mb-1">Solicitar cotação</h2>
            <p className="text-graphite/60 text-sm mb-6">
              Etapa 1 de 2 — conte um pouco sobre você e sua empresa.
            </p>

            <div className="space-y-4">
              <Field label="Nome">
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                  placeholder="Seu nome completo"
                />
              </Field>
              <Field label="E-mail">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={inputClass}
                  placeholder="voce@empresa.com.br"
                />
              </Field>
              <Field label="Telefone">
                <input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className={inputClass}
                  placeholder="(19) 99999-9999"
                />
              </Field>
              <Field label="CNPJ">
                <input
                  value={form.cnpj}
                  onChange={(e) => setForm((f) => ({ ...f, cnpj: e.target.value }))}
                  className={inputClass}
                  placeholder="00.000.000/0000-00"
                />
              </Field>
              <Field label="Cidade">
                <input
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className={inputClass}
                  placeholder="Sua cidade"
                />
              </Field>
            </div>

            {touched && !isStep1Valid && (
              <p className="text-sm text-red-600 mt-3">
                Preencha nome, e-mail, telefone, CNPJ e cidade para continuar.
              </p>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="press-feedback mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 hover:opacity-90"
            >
              Continuar
              <ArrowRight size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="press-feedback inline-flex items-center gap-1.5 text-graphite/60 hover:text-navy text-sm mb-4"
            >
              <ArrowLeft size={16} />
              Voltar
            </button>
            <h2 className="font-heading text-2xl text-navy mb-1">Qual serviço você precisa?</h2>
            <p className="text-graphite/60 text-sm mb-6">Etapa 2 de 2 — escolha uma opção.</p>

            <div className="grid grid-cols-2 gap-3">
              {QUOTE_SERVICE_CATEGORIES.map(({ category, label }) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleSelectService(label)}
                  className="press-feedback rounded-2xl border border-navy/10 bg-surface hover:bg-yellow/10 hover:border-yellow px-4 py-5 text-center font-heading font-semibold text-navy text-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
