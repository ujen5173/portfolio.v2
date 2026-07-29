"use client";

import { useTheme } from "./theme-provider";

/**
 * Sun/moon morph toggle. The mask circle slides across the disc to carve
 * the moon out of the sun, so the two states are one continuous shape.
 */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`group relative grid size-9 place-items-center rounded-full border border-hairline text-ink-3 transition-colors duration-300 hover:border-primary/40 hover:text-primary ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[18px] overflow-visible"
        aria-hidden
      >
        <mask id="theme-toggle-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <circle
            cx={isDark ? 16 : 26}
            cy={isDark ? 8 : 0}
            r="9"
            fill="black"
            style={{
              transition:
                "cx 0.5s var(--ease-out-expo), cy 0.5s var(--ease-out-expo)",
            }}
          />
        </mask>

        <circle
          cx="12"
          cy="12"
          r={isDark ? 9 : 5.5}
          fill="currentColor"
          mask="url(#theme-toggle-mask)"
          style={{ transition: "r 0.5s var(--ease-spring)" }}
        />

        {/* Sun rays — retract into the disc in dark mode */}
        <g
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "scale(0.4) rotate(-60deg)" : "none",
            transformOrigin: "center",
            transition:
              "opacity 0.4s var(--ease-out-quint), transform 0.55s var(--ease-out-expo)",
          }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="12"
              y1="1.6"
              x2="12"
              y2="3.6"
              transform={`rotate(${deg} 12 12)`}
            />
          ))}
        </g>
      </svg>
    </button>
  );
};

export default ThemeToggle;
