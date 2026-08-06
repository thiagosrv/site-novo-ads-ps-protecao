import clsx from "clsx";

export default function SectionLabel({
  children,
  color = "yellow",
  align = "left",
  className,
}: {
  children: React.ReactNode;
  color?: "yellow" | "navy";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 mb-5",
        align === "center" ? "justify-center" : "justify-center md:justify-start",
        className
      )}
    >
      <span className="w-8 h-px bg-yellow shrink-0" />
      <span
        className={clsx(
          "font-mono text-sm tracking-widest uppercase",
          color === "navy" ? "text-navy" : "text-yellow"
        )}
      >
        {children}
      </span>
    </div>
  );
}
