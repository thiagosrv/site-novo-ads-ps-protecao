"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deletePost, setPostStatus } from "@/lib/blog/actions";
import type { PostStatus } from "@/lib/blog/queries";

export function StatusToggleButton({ id, status }: { id: string; status: PostStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const nextStatus: PostStatus = status === "published" ? "draft" : "published";
    startTransition(async () => {
      await setPostStatus(id, nextStatus);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="press-feedback rounded-full border border-navy/10 px-3 py-1.5 text-xs font-medium text-graphite/70 hover:border-navy/20 hover:text-navy disabled:opacity-50"
    >
      {status === "published" ? "Despublicar" : "Publicar"}
    </button>
  );
}

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
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
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleConfirm() {
    startTransition(async () => {
      await deletePost(id);
      setIsOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="press-feedback rounded-full p-2 text-graphite/40 hover:bg-red-50 hover:text-red-600"
        aria-label={`Excluir ${title}`}
      >
        <Trash2 size={16} />
      </button>

      {mounted && (
        <div
          className={`modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm ${open ? "is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`modal-panel relative w-full max-w-sm rounded-[1.5rem] bg-white p-6 shadow-2xl ${open ? "is-open" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-lg text-navy">Excluir post</h2>
            <p className="mt-2 text-sm text-graphite/70">
              Tem certeza que deseja excluir <strong>{title}</strong>? Essa ação não pode ser
              desfeita.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="press-feedback rounded-full border border-navy/10 px-4 py-2 text-sm font-medium text-graphite/70 hover:text-navy"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
                className="press-feedback rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isPending ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
