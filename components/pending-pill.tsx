/** Shared marker for anything on a case study that isn't settled yet. */
const PendingPill = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-2 bg-surface px-2.5 py-1 border border-hairline rounded-full font-mono text-[10px] text-ink-3 uppercase tracking-[0.18em] shrink-0">
    <span aria-hidden className="relative grid place-items-center size-1.5">
      <span className="absolute bg-primary/50 rounded-full size-1.5 animate-pulse-ring" />
      <span className="relative bg-primary rounded-full size-1.5" />
    </span>
    {label}
  </span>
);

export default PendingPill;
