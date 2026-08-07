import Reveal from "./Reveal";

export default function PageHero({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative bg-gradient-to-b from-navy to-navy-deep pt-36 pb-48 md:pt-44 md:pb-56 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
        viewBox="0 0 1440 400"
        aria-hidden="true"
      >
        <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="80" x2="80" y1="0" y2="400" />
        <line className="stroke-yellow" strokeDasharray="4 4" strokeWidth="0.5" x1="1360" x2="1360" y1="0" y2="400" />
        <circle className="fill-yellow" cx="80" cy="200" r="4" />
        <circle className="fill-yellow" cx="1360" cy="120" r="4" />
      </svg>

      <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-5 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/90">
              {tag}
            </span>
          </div>
        </Reveal>
        <Reveal delayMs={100}>
          <h1 className="text-white font-heading text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
            {title}
          </h1>
        </Reveal>
        <Reveal delayMs={200}>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
