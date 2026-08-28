"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1600;

function easeOutPower2(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export default function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    el.textContent = `${prefix}0${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    let rafId: number;

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        const current = Math.round(target * easeOutPower2(progress));
        el.textContent = `${prefix}${current}${suffix}`;
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
