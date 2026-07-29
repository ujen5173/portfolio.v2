import PendingPill from "@/components/pending-pill";
import type { ApproachItem } from "@/lib/data/projects";

const ordinal = (index: number) => String(index + 1).padStart(2, "0");

/** Widths for the stand-in body lines — uneven, so they read as prose. */
const REDACTED_LINES = ["w-full", "w-[88%]", "w-[61%]"];

/**
 * A decision that hasn't been reached yet. The slot keeps the shape of a
 * written card — title bar, three lines — so the grid stays honest about how
 * much of the case study is still open rather than hiding the gap.
 */
const PendingCard = ({ index }: { index: number }) => (
  <div className="relative flex flex-col bg-background p-6 md:p-7 h-full overflow-hidden sheen">
    <div aria-hidden className="absolute inset-0 hatch pointer-events-none" />

    <div className="relative flex justify-between items-center gap-4">
      <span className="font-mono text-ink-4 text-xs tabular">
        {ordinal(index)}
      </span>

      <PendingPill label="In progress" />
    </div>

    <div aria-hidden className="relative space-y-2.5 mt-5">
      <div className="w-1/2 h-3 redact" />
      {REDACTED_LINES.map((width) => (
        <div key={width} className={`h-2 redact ${width}`} />
      ))}
    </div>

    <p className="relative mt-auto pt-7 font-mono text-[10px] text-ink-4 uppercase tracking-[0.18em]">
      Still processing — decision not reached yet
    </p>
  </div>
);

const ApproachCard = ({
  item,
  index,
}: {
  item: ApproachItem;
  index: number;
}) => {
  if (item.stillInProgress) return <PendingCard index={index} />;

  return (
    <div className="flex flex-col bg-background p-6 md:p-7 h-full">
      <span className="font-mono text-ink-4 text-xs tabular">
        {ordinal(index)}
      </span>
      {item.title ? (
        <h3 className="mt-3 font-medium text-ink text-base">{item.title}</h3>
      ) : null}
      {item.body ? (
        <p className="mt-3 text-ink-3 text-sm text-pretty leading-relaxed">
          {item.body}
        </p>
      ) : null}
    </div>
  );
};

export default ApproachCard;
