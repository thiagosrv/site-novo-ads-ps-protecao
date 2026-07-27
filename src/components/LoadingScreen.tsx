"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [captionIndex, setCaptionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          delay: 0.2,
        });

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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-navy p-4 md:p-10"
    >
      <div className="relative w-full h-full rounded-[32px] bg-yellow flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center w-full max-w-xs px-6">
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

          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,15,106,0.25)]">
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
      </div>
    </div>
  );
}
