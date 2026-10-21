import Image from "next/image";
import type { ServiceCategory } from "@/lib/services";

export type HeroPhotoKind = "portaria" | "limpeza";

const HERO_PHOTO: Record<
  HeroPhotoKind,
  { desktopSrc: string; desktopPosition: string; mobileSrc: string; mobilePosition: string }
> = {
  portaria: {
    desktopSrc: "/brand/hero-novo.webp",
    desktopPosition: "object-[30%_0%]",
    mobileSrc: "/assets/uniforme-psprotecao.webp",
    mobilePosition: "object-[75%_20%]",
  },
  limpeza: {
    desktopSrc: "/assets/Sitewide-limpeza.webp",
    desktopPosition: "object-[80%_10%]",
    mobileSrc: "/assets/Sitewide-limpeza.webp",
    mobilePosition: "object-[66%_20%]",
  },
};

/** Categorias com foto de hero própria. As demais mantêm o hero padrão da página. */
export function getHeroPhotoKind(category: ServiceCategory): HeroPhotoKind | null {
  if (category === "portaria" || category === "vigilancia") return "portaria";
  if (category === "limpeza") return "limpeza";
  return null;
}

/**
 * Fundo do hero das páginas de Portaria/Controle de Acesso e de Limpeza, no mesmo desenho da home:
 * foto ancorada à direita com a borda esquerda esfumada no azul, para o texto não cobrir a pessoa.
 */
export function CategoryHeroBackground({ kind, alt }: { kind: HeroPhotoKind; alt: string }) {
  const photo = HERO_PHOTO[kind];
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-y-0 right-0 top-20 hidden w-[62%] md:block"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 28%)" }}
      >
        <Image
          src={photo.desktopSrc}
          alt={alt}
          fill
          priority
          sizes="62vw"
          className={`object-cover ${photo.desktopPosition}`}
        />
      </div>
      <div className="absolute inset-0 hero-gradient hidden md:block" />
      <div
        className="texture-halftone absolute inset-0 pointer-events-none opacity-20 hidden md:block"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 58%)" }}
        aria-hidden="true"
      />
      <div className="texture-halftone absolute inset-0 pointer-events-none opacity-10 md:hidden" aria-hidden="true" />
    </div>
  );
}

/** Foto em cartão exibida só no mobile, abaixo dos botões (igual à home). */
export function CategoryHeroMobileCard({ kind, alt }: { kind: HeroPhotoKind; alt: string }) {
  const photo = HERO_PHOTO[kind];
  return (
    <div className="md:hidden relative mt-10 w-full aspect-[16/9] rounded-2xl overflow-hidden">
      <Image
        src={photo.mobileSrc}
        alt={alt}
        fill
        quality={90}
        className={`object-cover ${photo.mobilePosition}`}
      />
    </div>
  );
}
