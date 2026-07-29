/**
 * Fixed background: a ruled grid for structure, one soft tint at the top,
 * and a whisper of grain so the large flat areas don't look synthetic.
 * No coloured glows — the depth comes from structure, not from gradients.
 */
const SiteBackground = () => (
  <div
    aria-hidden
    className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    <div
      className="rule-grid absolute inset-0"
      style={{
        maskImage:
          "radial-gradient(ellipse 120% 80% at 50% 0%, black 20%, transparent 75%)",
      }}
    />
    <div className="absolute inset-x-0 top-0 h-[55vh] bg-[linear-gradient(to_bottom,var(--tint),transparent)]" />
  </div>
);

export default SiteBackground;
