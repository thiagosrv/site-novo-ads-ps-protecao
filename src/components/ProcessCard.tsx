import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

export default function ProcessCard({
  number,
  icon: Icon,
  title,
  text,
  accent = false,
}: {
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-[20px] border p-6 md:p-7 transition-all duration-300",
        accent
          ? "bg-white/[0.07] border-yellow/30"
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <span
          className={clsx(
            "flex items-center justify-center w-10 h-10 rounded-full font-mono text-sm font-bold shrink-0",
            accent ? "bg-yellow text-navy" : "bg-white/10 text-white"
          )}
        >
          {number}
        </span>
        <Icon size={20} className="text-yellow shrink-0" />
      </div>
      <h3 className="font-heading text-lg text-white leading-snug mb-2">{title}</h3>
      <p className="text-white/65 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
