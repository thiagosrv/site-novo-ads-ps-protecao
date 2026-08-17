"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadCoverImage } from "@/lib/blog/actions";

export default function CoverImageUploader({
  imageUrl,
  imageAlt,
  onImageUrlChange,
  onImageAltChange,
}: {
  imageUrl: string;
  imageAlt: string;
  onImageUrlChange: (url: string) => void;
  onImageAltChange: (alt: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelected(file: File) {
    setError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadCoverImage(formData);

      if (!result.ok) {
        setError(result.error);
        return;
      }
      onImageUrlChange(result.url);
    } catch {
      setError("Falha inesperada ao enviar a imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
        Imagem de capa
      </span>

      {imageUrl ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-navy/10 bg-surface">
          <Image src={imageUrl} alt={imageAlt || ""} fill className="object-cover" sizes="640px" />
          <button
            type="button"
            onClick={() => onImageUrlChange("")}
            className="press-feedback absolute top-2 right-2 rounded-full bg-navy/70 p-1.5 text-white hover:bg-navy"
            aria-label="Remover imagem"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy/15 bg-surface text-graphite/50 transition-colors hover:border-tech-blue hover:text-tech-blue disabled:opacity-60"
        >
          {isUploading ? <Loader2 size={28} className="animate-spin" /> : <ImagePlus size={28} />}
          <span className="text-sm font-medium">
            {isUploading ? "Enviando..." : "Enviar imagem"}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void handleFileSelected(file);
        }}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <label className="mt-3 block">
        <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
          Texto alternativo (alt)
        </span>
        <input
          value={imageAlt}
          onChange={(e) => onImageAltChange(e.target.value)}
          placeholder="Descreva a imagem para acessibilidade e SEO"
          className="w-full rounded-xl border border-navy/10 bg-surface px-4 py-2.5 text-graphite placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-yellow/50"
        />
      </label>
    </div>
  );
}
