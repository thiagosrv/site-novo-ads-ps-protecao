"use client";

import type { Editor } from "@tiptap/core";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Link2Off,
  Undo2,
  Redo2,
  MousePointerClick,
} from "lucide-react";

function isSafeUrl(href: string): boolean {
  const trimmed = href.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return true;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`press-feedback rounded-lg p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "bg-tech-blue/15 text-tech-blue" : "text-graphite/70 hover:bg-navy/5 hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}

export default function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  function handleLink() {
    const previousHref = editor!.getAttributes("link").href as string | undefined;
    const input = window.prompt("URL do link", previousHref ?? "https://");
    if (input === null) return;
    const href = input.trim();
    if (!href) {
      editor!.chain().focus().unsetLink().run();
      return;
    }
    if (!isSafeUrl(href)) {
      window.alert("Link inválido. Use um endereço http(s), uma âncora (#) ou um caminho interno (/).");
      return;
    }
    const external = !href.startsWith("/") && !href.startsWith("#");
    editor!
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href,
        target: external ? "_blank" : null,
        rel: external ? "noopener noreferrer" : null,
      })
      .run();
  }

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-navy/10 bg-surface p-2">
      <ToolbarButton
        label="Negrito"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        label="Itálico"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-navy/10" />
      <ToolbarButton
        label="Título 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        label="Título 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={16} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-navy/10" />
      <ToolbarButton
        label="Lista"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        label="Lista numerada"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        label="Citação"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={16} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-navy/10" />
      <ToolbarButton label="Inserir link" active={editor.isActive("link")} onClick={handleLink}>
        <Link2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        label="Remover link"
        disabled={!editor.isActive("link")}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Link2Off size={16} />
      </ToolbarButton>
      <ToolbarButton
        label="Inserir botão de CTA"
        onClick={() => editor.chain().focus().setCtaButton({ href: "", label: "Saiba mais" }).run()}
      >
        <MousePointerClick size={16} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-navy/10" />
      <ToolbarButton label="Desfazer" onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 size={16} />
      </ToolbarButton>
      <ToolbarButton label="Refazer" onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 size={16} />
      </ToolbarButton>
    </div>
  );
}
