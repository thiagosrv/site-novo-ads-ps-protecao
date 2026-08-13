"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { SeoAnalysisResult, SeoCheck, SeoCheckCategory } from "@/lib/seo/analyzeSeo";

const CATEGORY_LABELS: Record<SeoCheckCategory, string> = {
  basic: "Básico",
  title: "Título e meta descrição",
  additional: "Adicional",
  eeat: "Assinatura de autoridade (E-E-A-T)",
};

const CATEGORY_ORDER: SeoCheckCategory[] = ["basic", "title", "additional", "eeat"];

function scoreTone(score: number): { text: string; bg: string; label: string } {
  if (score >= 80) return { text: "text-green-700", bg: "bg-green-100", label: "Ótimo" };
  if (score >= 50) return { text: "text-amber-700", bg: "bg-amber-100", label: "Pode melhorar" };
  return { text: "text-red-700", bg: "bg-red-100", label: "Precisa de atenção" };
}

function CheckRow({ check }: { check: SeoCheck }) {
  const Icon = check.status === "pass" ? CheckCircle2 : check.status === "warning" ? AlertTriangle : XCircle;
  const color =
    check.status === "pass" ? "text-green-600" : check.status === "warning" ? "text-amber-600" : "text-red-600";

  return (
    <li className="flex items-start gap-2 py-1.5 text-sm">
      <Icon size={16} className={`mt-0.5 shrink-0 ${color}`} />
      <span className="text-graphite/80">{check.message}</span>
    </li>
  );
}

export default function SeoPanel({
  analysis,
  focusKeyword,
  onFocusKeywordChange,
  secondaryKeywords,
  onSecondaryKeywordsChange,
}: {
  analysis: SeoAnalysisResult;
  focusKeyword: string;
  onFocusKeywordChange: (value: string) => void;
  secondaryKeywords: string;
  onSecondaryKeywordsChange: (value: string) => void;
}) {
  const tone = scoreTone(analysis.score);
  const checksByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    checks: analysis.checks.filter((c) => c.category === category),
  }));

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${tone.bg}`}>
          <span className={`font-heading text-xl font-bold ${tone.text}`}>{analysis.score}</span>
        </div>
        <div>
          <p className={`font-heading text-sm font-semibold ${tone.text}`}>{tone.label}</p>
          <p className="text-xs text-graphite/50">{analysis.wordCount} palavras no corpo do post.</p>
        </div>
      </div>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
          Palavra-chave foco
        </span>
        <input
          value={focusKeyword}
          onChange={(e) => onFocusKeywordChange(e.target.value)}
          placeholder="ex: portaria terceirizada"
          className="w-full rounded-xl border border-navy/10 bg-surface px-4 py-2.5 text-graphite placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-yellow/50"
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
          Palavras-chave secundárias (LSI)
        </span>
        <input
          value={secondaryKeywords}
          onChange={(e) => onSecondaryKeywordsChange(e.target.value)}
          placeholder="ex: vigilância patrimonial, ronda noturna, controle de acesso"
          className="w-full rounded-xl border border-navy/10 bg-surface px-4 py-2.5 text-graphite placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-yellow/50"
        />
        <span className="mt-1 block text-xs text-graphite/40">
          Termos relacionados, separados por vírgula — reforçam a densidade semântica do conteúdo.
        </span>
      </label>

      <div className="mt-5 space-y-5">
        {checksByCategory.map(({ category, checks }) =>
          checks.length === 0 ? null : (
            <div key={category}>
              <h3 className="text-xs font-mono uppercase tracking-wide text-graphite/50">
                {CATEGORY_LABELS[category]}
              </h3>
              <ul className="mt-1 divide-y divide-navy/5">
                {checks.map((check) => (
                  <CheckRow key={check.id} check={check} />
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}
