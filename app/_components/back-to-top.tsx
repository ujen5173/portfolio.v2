"use client";

const BackToTop = () => (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="group inline-flex items-center gap-2 self-start font-mono text-xs text-ink-4 transition-colors hover:text-ink-2"
  >
    Back to top
    <span
      aria-hidden
      className="transition-transform duration-300 group-hover:-translate-y-1"
    >
      ↑
    </span>
  </button>
);

export default BackToTop;
