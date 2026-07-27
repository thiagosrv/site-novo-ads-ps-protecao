"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "ps-loading-shown";

const LOADING_SLIDES = [
  {
    src: "/loading/loading1.png",
    alt: "Profissional de segurança da PS Proteção em portaria monitorada",
  },
  {
    src: "/loading/loading2.png",
    alt: "Equipe de limpeza da PS Proteção em ambiente corporativo",
  },
  {
    src: "/loading/loading3.png",
    alt: "Profissional de segurança da PS Proteção treinado e capacitado",
  },
  {
    src: "/loading/loading4.png",
    alt: "Viaturas de supervisão ativa da PS Proteção",
  },
  {
    src: "/loading/loading5.png",
    alt: "Recepcionista da PS Proteção em ambiente corporativo",
  },
  {
    src: "/loading/loading6.png",
    alt: "Equipe da PS Proteção em atuação de campo",
  },
];

const FUNCTIONS = ["Portaria e Controle de Acesso", "Limpeza e Conservação", "Recepção e Atendimento"];

export default function LoadingScreen() {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const photoStageRef = useRef<HTMLDivElement>(null);
  const brandStageRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (pathname !== "/") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Gate is sessionStorage/pathname, only knowable client-side after mount — can't be computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldRender(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      const master = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setShouldRender(false);
        },
      });

      master
        .to(progress, {
          value: 100,
          duration: 2.6,
          ease: "power1.inOut",
          onUpdate: () => {
            if (percentRef.current) {
              percentRef.current.textContent = `${Math.round(progress.value)}%`;
            }
          },
        })
        .to(
          photoStageRef.current,
          { opacity: 0, y: -24, scale: 0.96, duration: 0.5, ease: "power2.in" },
          "+=0.15"
        )
        .fromTo(
          brandStageRef.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" }
        )
        .to(
          brandStageRef.current,
          { opacity: 0, y: -24, scale: 0.96, duration: 0.5, ease: "power2.in" },
          "+=1.1"
        )
        .to(
          containerRef.current,
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          "+=0.05"
        );

      const slideTl = gsap.timeline({ repeat: -1 });
      LOADING_SLIDES.forEach((_, i) => {
        const next = (i + 1) % LOADING_SLIDES.length;
        slideTl
          .to(slideRefs.current[i], { opacity: 0, duration: 0.7, ease: "power1.inOut" }, "+=1")
          .to(
            slideRefs.current[next],
            {
              opacity: 1,
              duration: 0.7,
              ease: "power1.inOut",
              onStart: () => setCaptionIndex(next % FUNCTIONS.length),
            },
            "<"
          );
      });
    });

    return () => ctx.revert();
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-navy p-3 sm:p-4 md:p-10"
    >
      <div className="relative w-full h-full rounded-[32px] bg-yellow flex items-center justify-center overflow-hidden">
        <div ref={photoStageRef} className="flex flex-col items-center w-full max-w-xs px-6">
          <div className="flex items-center justify-between w-full mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-navy">
              Carregando...
            </span>
            <span
              ref={percentRef}
              className="font-mono text-xs font-bold uppercase tracking-widest text-navy"
            >
              0%
            </span>
          </div>

          <div className="relative w-full h-[50vh] max-h-[440px] sm:h-auto sm:aspect-[4/5] sm:max-h-none rounded-2xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,15,106,0.25)]">
            {LOADING_SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <p className="mt-5 font-heading text-sm md:text-base text-navy text-center transition-opacity duration-300">
            {FUNCTIONS[captionIndex]}
          </p>
        </div>

        <div
          ref={brandStageRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: 0 }}
        >
          <h2 className="font-heading font-extrabold uppercase text-navy text-center leading-[0.95] tracking-tight whitespace-nowrap text-[clamp(2.5rem,11vw,7.5rem)]">
            PS Proteção
          </h2>
          <p className="mt-4 md:mt-6 font-heading font-medium text-navy text-center text-[clamp(1rem,2.6vw,1.75rem)]">
            Prontos para <span className="font-extrabold">servir</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
