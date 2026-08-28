"use client";

import { useState, type ReactNode } from "react";
import { Send, ShieldOff, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { ETHICS_REPORT_TYPES, submitEthicsReport } from "@/lib/ethics";

const EMPTY_FORM = { reportType: "", description: "", email: "" };

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

type Status = "idle" | "submitting" | "success" | "error";

export default function EthicsReportForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = form.reportType.trim().length > 0 && form.description.trim().length >= 10;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid || status === "submitting") return;

    setStatus("submitting");
    const result = await submitEthicsReport(form);
    if (result.ok) {
      setStatus("success");
      setForm(EMPTY_FORM);
      setTouched(false);
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-[2rem] shadow-[0_30px_70px_rgba(0,15,106,0.12)] border border-navy/5 p-8 md:p-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <CheckCircle2 className="text-green-600" size={28} />
        </div>
        <h2 className="font-heading text-2xl text-navy mb-2">Relato enviado</h2>
        <p className="text-graphite/70 text-sm leading-relaxed max-w-sm mb-7">
          Seu relato foi recebido com sucesso e será apurado com sigilo. Nenhuma informação de
          identificação foi coletada, a menos que você tenha optado por deixar um e-mail para
          retorno.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-navy hover:text-navy-deep underline underline-offset-4"
        >
          Registrar outro relato
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_30px_70px_rgba(0,15,106,0.12)] border border-navy/5 p-8 md:p-10">
      <h2 className="font-heading text-2xl text-navy mb-1.5">Registrar Relato</h2>
      <p className="text-graphite/60 text-sm mb-6">
        Preencha o formulário abaixo para registrar sua denúncia ou relato.
      </p>

      <div className="flex items-start gap-3 rounded-xl bg-surface border-l-4 border-navy p-4 mb-7">
        <ShieldOff className="text-navy shrink-0 mt-0.5" size={18} />
        <p className="text-graphite/70 text-sm leading-relaxed">
          <span className="font-semibold text-navy">Este formulário é 100% anônimo.</span> Não
          pedimos e não coletamos seu nome em nenhum momento. O campo de e-mail é opcional e serve
          apenas para você receber um retorno sobre a apuração, caso queira.
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
              <option key={type.value} value={type.value}>
                {type.value}
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
            placeholder="Descreva com o máximo de detalhes possível: o quê, quando, onde e como. Quanto mais informações, melhor poderemos investigar."
          />
        </Field>

        <Field label="E-mail para retorno (opcional)">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            placeholder="Deixe em branco para manter o anonimato total"
          />
        </Field>

        {touched && !isValid && (
          <p className="text-sm text-red-600">
            Selecione o tipo de relato e descreva o ocorrido (mínimo 10 caracteres) para continuar.
          </p>
        )}

        {status === "error" && (
          <div className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-100 p-4">
            <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={16} />
            <p className="text-red-700 text-sm leading-relaxed">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy hover:bg-navy-deep disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-semibold px-7 py-3.5 transition-colors"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send size={18} />
              Enviar Relato com Segurança
            </>
          )}
        </button>
      </form>
    </div>
  );
}
