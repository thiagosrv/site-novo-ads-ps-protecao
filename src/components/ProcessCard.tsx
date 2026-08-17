import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

export default function ProcessCard({
  number,
  icon: Icon,
  title,
  text,
  accent = false,
  light = false,
}: {
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
  accent?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-[20px] border p-6 md:p-7 transition-all duration-300",
        light
          ? clsx(
              "bg-white shadow-[0_15px_35px_-25px_rgba(0,15,105,0.35)]",
              accent ? "border-yellow-dark/40" : "border-navy/10 hover:border-navy/20"
            )
          : clsx(
              "bg-navy-deep",
              accent ? "border-yellow/30" : "border-white/10 hover:border-white/20"
            )
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <span
          className={clsx(
            "flex items-center justify-center w-10 h-10 rounded-full font-mono text-sm font-bold shrink-0",
            light
              ? accent
                ? "bg-yellow text-navy"
                : "bg-navy/5 text-navy"
              : accent
                ? "bg-yellow text-navy"
                : "bg-white/10 text-white"
          )}
        >
          {number}
        </span>
        <Icon size={20} className={clsx(light ? "text-yellow-dark" : "text-yellow", "shrink-0")} />
      </div>
      <h3 className={clsx("font-heading text-lg leading-snug mb-2", light ? "text-navy" : "text-white")}>
        {title}
      </h3>
      <p className={clsx("text-sm leading-relaxed", light ? "text-graphite/70" : "text-white/65")}>
        {text}
      </p>
    </div>
  );
}
