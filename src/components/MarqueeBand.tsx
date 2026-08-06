const DEFAULT_ITEMS = [
  "Processo de Seleção Rigoroso",
  "Recrutamento de Alta Performance",
  "Recrutamento e Triagem",
];

export default function MarqueeBand({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  // Repeated enough times per half so the track always exceeds viewport
  // width — the loop point (translateX(-50%)) stays hidden off-screen
  // on any screen size, keeping the scroll visually infinite.
  const sequence = Array.from({ length: 8 }, () => items).flat();

  return (
    <div className="relative overflow-hidden bg-yellow py-3">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((loop) => (
          <div key={loop} className="flex items-center shrink-0" aria-hidden={loop === 1}>
            {sequence.map((item, i) => (
              <span
                key={`${loop}-${i}`}
                className="inline-flex items-center gap-3 px-6 font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-navy-deep whitespace-nowrap"
              >
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-navy-deep/40" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
