"use client";

import { useState, type ReactNode } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { ETHICS_REPORT_TYPES, buildEthicsWhatsAppUrl } from "@/lib/ethics";

const EMPTY_FORM = { reportType: "", description: "", name: "", email: "" };

const inputClass =
  "w-full rounded-xl border border-navy/10 bg-surface px-4 py-2.5 text-graphite placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-yellow/50 transition-shadow";

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono tracking-wide text-graphite/60 uppercase mb-1.5">
        {label} {required && <span className="text-yellow-dark">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function EthicsReportForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(false);

  const isValid = form.reportType.trim().length > 0 && form.description.trim().length >= 10;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    window.open(buildEthicsWhatsAppUrl(form), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_30px_70px_rgba(0,15,106,0.12)] border border-navy/5 p-8 md:p-10">
      <h2 className="font-heading text-2xl text-navy mb-1.5">Registrar Relato</h2>
      <p className="text-graphite/60 text-sm mb-6">
        Preencha o formulário abaixo para registrar sua denúncia ou relato.
      </p>

      <div className="flex items-start gap-3 rounded-xl bg-surface border-l-4 border-navy p-4 mb-7">
        <ShieldCheck className="text-navy shrink-0 mt-0.5" size={18} />
        <p className="text-graphite/70 text-sm leading-relaxed">
          <span className="font-semibold text-navy">Você pode ser anônimo.</span> Os campos de
          identificação são opcionais. Sua denúncia terá o mesmo peso e será investigada da mesma
          forma, independente de se identificar ou não.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Tipo de relato" required>
          <select
            value={form.reportType}
            onChange={(e) => setForm((f) => ({ ...f, reportType: e.target.value }))}
            className={inputClass}
          >
            <option value="">Selecione o tipo de relato</option>
            {ETHICS_REPORT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Descrição do relato" required>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className={inputClass}
            rows={5}
            placeholder="Descreva com o máximo de detalhes possível: quem, o quê, quando, onde e como. Quanto mais informações, melhor poderemos investigar."
          />
        </Field>

        <Field label="Seu nome (opcional)">
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
            placeholder="Pode deixar em branco para manter anonimato"
          />
        </Field>

        <Field label="E-mail para retorno (opcional)">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            placeholder="Para receber feedback da investigação"
          />
        </Field>

        {touched && !isValid && (
          <p className="text-sm text-red-600">
            Selecione o tipo de relato e descreva o ocorrido (mínimo 10 caracteres) para continuar.
          </p>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy hover:bg-navy-deep text-white font-heading font-semibold px-7 py-3.5 transition-colors"
        >
          <Send size={18} />
          Enviar Relato com Segurança
        </button>
      </form>
    </div>
  );
}
