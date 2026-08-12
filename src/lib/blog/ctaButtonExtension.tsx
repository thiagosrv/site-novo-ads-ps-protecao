"use client";

import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import type { ReactNodeViewProps } from "@tiptap/react";
import { Link2, Trash2 } from "lucide-react";
import clsx from "clsx";

// Generalizes the WhatsAppCta.tsx visual style (gradient yellow pill, navy
// text, press-feedback) for an arbitrary href/label — this exact class
// string is what gets baked into body_html, so it must exist verbatim here
// for Tailwind's build-time scanner to compile it into the stylesheet.
export const CTA_BUTTON_CLASS_NAME =
  "press-scale-only inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark px-6 py-3 font-heading text-sm font-semibold tracking-wide text-navy shadow-sm transition-transform hover:-translate-y-0.5";

export type CtaButtonAttrs = { href: string; label: string };

function isExternalHref(href: string): boolean {
  return !href.startsWith("/") && !href.startsWith("#");
}

function sanitizeHref(href: string): string {
  return /^\s*javascript:/i.test(href) ? "#" : href;
}

function CtaButtonView({ node, updateAttributes, deleteNode, selected }: ReactNodeViewProps) {
  const { href, label } = node.attrs as CtaButtonAttrs;

  return (
    <NodeViewWrapper
      as="div"
      contentEditable={false}
      className={clsx(
        "not-prose my-4 rounded-xl border-2 border-dashed p-4 transition-colors",
        selected ? "border-tech-blue bg-tech-blue/5" : "border-graphite/15 bg-surface"
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className={CTA_BUTTON_CLASS_NAME}>
          <Link2 size={16} />
          {label || "Texto do botão"}
        </span>
        <span className="text-xs text-graphite/50">Botão de CTA</span>
        <button
          type="button"
          onClick={deleteNode}
          className="ml-auto rounded-full p-1.5 text-graphite/40 transition-colors hover:bg-red-50 hover:text-red-600"
          aria-label="Remover botão"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-medium text-graphite/70">
          Texto do botão
          <input
            type="text"
            value={label}
            onChange={(e) => updateAttributes({ label: e.target.value })}
            placeholder="Fale conosco"
            className="rounded-lg border border-graphite/15 px-3 py-1.5 text-sm text-graphite focus:border-tech-blue focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-graphite/70">
          Link (URL)
          <input
            type="text"
            value={href}
            onChange={(e) => updateAttributes({ href: e.target.value })}
            placeholder="https://wa.me/... ou /contato"
            className="rounded-lg border border-graphite/15 px-3 py-1.5 text-sm text-graphite focus:border-tech-blue focus:outline-none"
          />
        </label>
      </div>
    </NodeViewWrapper>
  );
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    ctaButton: {
      setCtaButton: (attrs: CtaButtonAttrs) => ReturnType;
    };
  }
}

export const CtaButton = Node.create({
  name: "ctaButton",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      href: { default: "" },
      label: { default: "Saiba mais" },
    };
  },

  parseHTML() {
    return [{ tag: "a[data-cta-button]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const href = sanitizeHref(String(HTMLAttributes.href ?? ""));
    const label = String(HTMLAttributes.label ?? "");
    const external = isExternalHref(href);

    return [
      "a",
      mergeAttributes(
        {
          "data-cta-button": "true",
          href,
          class: CTA_BUTTON_CLASS_NAME,
        },
        external ? { target: "_blank", rel: "noopener noreferrer" } : {}
      ),
      label,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CtaButtonView);
  },

  addCommands() {
    return {
      setCtaButton:
        (attrs: CtaButtonAttrs) =>
        ({ chain }) =>
          chain().insertContent({ type: this.name, attrs }).run(),
    };
  },
});
