import type { Inspiration } from "@/lib/data/projects";

const ACCENT_BORDER: Record<string, string> = {
  "chart-1": "before:bg-chart-1/50",
  "chart-2": "before:bg-chart-2/50",
  "chart-3": "before:bg-chart-3/50",
  "chart-4": "before:bg-chart-4/50",
  "chart-5": "before:bg-chart-5/50",
};

const ACCENT_TEXT: Record<string, string> = {
  "chart-1": "text-chart-1",
  "chart-2": "text-chart-2",
  "chart-3": "text-chart-3",
  "chart-4": "text-chart-4",
  "chart-5": "text-chart-5",
};

const InspirationNote = ({
  inspiration,
  accent,
}: {
  inspiration: Inspiration;
  accent: string;
}) => (
  <aside
    className={`relative bg-surface mt-10 py-7 pr-6 pl-7 md:pl-9 border border-hairline rounded-2xl overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-[3px] ${ACCENT_BORDER[accent]}`}
  >
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${ACCENT_TEXT[accent]}`}
    >
      {inspiration.eyebrow}
    </p>

    <p className="mt-4 max-w-xl font-display font-medium text-ink text-xl text-pretty leading-snug tracking-[-0.02em]">
      {inspiration.headline}
    </p>

    <div className="space-y-4 mt-5 max-w-2xl">
      {inspiration.body.map((paragraph) => (
        <p
          key={paragraph.slice(0, 24)}
          className="text-ink-3 text-sm text-pretty leading-relaxed"
        >
          {paragraph}
        </p>
      ))}
    </div>
  </aside>
);

export default InspirationNote;
