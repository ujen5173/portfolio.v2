const ITEMS = [
  "Multi-tenant SaaS",
  "Backend architecture",
  "Database modelling",
  "Access control",
  "Design systems",
  "Payment flows",
];

const row = (ariaHidden: boolean) => (
  <div
    aria-hidden={ariaHidden || undefined}
    className="flex shrink-0 items-center"
  >
    {ITEMS.map((item) => (
      <span key={item} className="flex items-center">
        <span className="px-8 font-display text-xl font-medium tracking-[-0.02em] whitespace-nowrap text-ink-3 md:text-2xl">
          {item}
        </span>
        <span aria-hidden className="text-primary/60">
          —
        </span>
      </span>
    ))}
  </div>
);

/** A single quiet band of what I do. */
const Marquee = () => (
  <div className="marquee-mask w-full overflow-hidden border-y border-hairline py-6">
    <div className="animate-marquee flex w-max">
      {row(false)}
      {row(true)}
    </div>
  </div>
);

export default Marquee;
