import Reveal from "@/components/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  /** Index shown at the far right, e.g. "02". */
  index?: string;
  description?: React.ReactNode;
};

/** One header shape, used by every section. */
const SectionHeading = ({
  eyebrow,
  title,
  index,
  description,
}: SectionHeadingProps) => (
  <div>
    <Reveal>
      <div className="flex items-center gap-4 border-b border-hairline pb-4">
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
          {eyebrow}
        </p>
        {index ? (
          <span className="ml-auto font-mono text-xs text-ink-4 tabular">
            {index}
          </span>
        ) : null}
      </div>
    </Reveal>

    <Reveal delay={70}>
      <h2 className="mt-9 max-w-3xl font-display text-display-md leading-[1.06] font-medium tracking-[-0.03em] text-balance text-ink">
        {title}
      </h2>
    </Reveal>

    {description ? (
      <Reveal delay={120}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-ink-3 md:text-lg">
          {description}
        </p>
      </Reveal>
    ) : null}
  </div>
);

export default SectionHeading;
