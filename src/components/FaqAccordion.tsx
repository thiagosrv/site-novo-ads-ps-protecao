"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

export type FaqItem = { question: string; answer: string };

/**
 * FAQ_ITEMS content marks emphasis with **bold** — parsed here for display.
 * The plain-text JSON-LD schema strips the same markers via stripFaqMarkup
 * (src/lib/faqMarkup.ts, kept out of this client module so server code can
 * import it without pulling in a client component).
 */
function renderWithBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-navy">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.question} delayMs={Math.min(i, 6) * 60}>
            <div className="bg-white rounded-2xl border border-navy/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="press-feedback w-full flex items-center justify-between gap-4 text-left px-6 py-5"
              >
                <span className="font-heading text-[13.6px] md:text-[15.3px] text-navy">
                  {renderWithBold(item.question)}
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-navy/50 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-[13.6px] text-graphite/70 leading-relaxed">
                    {renderWithBold(item.answer)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
