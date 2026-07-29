"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ProjectThumbProps = {
  /** Resolved public path, or null to render the generated placeholder. */
  src: string | null;
  title: string;
  /** Accent token name, e.g. "chart-1". */
  accent: string;
  /** Text shown in the fake browser address bar. */
  label?: string;
  className?: string;
  priority?: boolean;
};

const ACCENT_TEXT: Record<string, string> = {
  "chart-1": "text-chart-1",
  "chart-2": "text-chart-2",
  "chart-3": "text-chart-3",
  "chart-4": "text-chart-4",
  "chart-5": "text-chart-5",
};

/**
 * A project screenshot presented in a browser window.
 *
 * The image drifts and scales gently on hover, and clicking the expand
 * control opens a full-screen viewer. When no screenshot exists yet, a
 * generated placeholder stands in so the layout never shows a broken image.
 */
const ProjectThumb = ({
  src,
  title,
  accent,
  label,
  className,
  priority = false,
}: ProjectThumbProps) => {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const frame = (
    <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
      {/* Window chrome — reads as "this is a real product". */}
      <div className="flex items-center gap-2 px-3 py-2 border-hairline border-b">
        <span className="flex gap-1.5" aria-hidden>
          <span className="bg-ink-4/40 rounded-full size-2" />
          <span className="bg-ink-4/40 rounded-full size-2" />
          <span className="bg-ink-4/40 rounded-full size-2" />
        </span>
        <span className="bg-foreground/[0.05] mx-auto px-3 py-0.5 rounded-full max-w-[60%] font-mono text-[10px] text-ink-4 truncate">
          {label ?? title.toLowerCase()}
        </span>
      </div>

      <div className="relative bg-background aspect-[16/8.2] overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={`${title} screenshot`}
            width={1040}
            height={940}
            priority={priority}
            className="w-full h-full object-top object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        ) : (
          // Placeholder: initials over a ruled field, tinted by the accent.
          <div className="absolute inset-0 place-items-center grid overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--hairline) 1px, transparent 1px), linear-gradient(to bottom, var(--hairline) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <span
              aria-hidden
              className={cn(
                "relative opacity-30 font-display font-medium text-6xl md:text-7xl tracking-[-0.04em] group-hover:scale-105 transition-transform duration-[900ms]",
                ACCENT_TEXT[accent] ?? "text-primary",
              )}
            >
              {title.slice(0, 2)}
            </span>
            <span className="bottom-3 absolute font-mono text-[10px] text-ink-4">
              screenshot coming soon
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={(event) => {
            // The thumb usually sits inside a link — don't navigate.
            event.preventDefault();
            event.stopPropagation();
            setOpen(true);
          }}
          aria-label={`Expand ${title} screenshot`}
          className="right-2.5 bottom-2.5 z-10 absolute place-items-center grid bg-background/85 opacity-0 focus-visible:opacity-100 group-hover:opacity-100 backdrop-blur-sm border border-hairline hover:border-primary/40 rounded-lg size-8 text-ink-3 hover:text-primary transition-all duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
            aria-hidden
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7.5 7.5M3 21l7.5-7.5" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className={className}>{frame}</div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshot`}
          className="z-[95] fixed inset-0 flex justify-center items-center p-4 md:p-10"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-background/92 backdrop-blur-md cursor-zoom-out"
            style={{ animation: "pop-in 0.2s ease-out both" }}
          />

          <div
            className="relative w-full max-w-6xl"
            style={{ animation: "pop-in 0.3s var(--ease-out-expo) both" }}
          >
            <div className="bg-surface shadow-2xl border border-hairline rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5 border-hairline border-b">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="bg-ink-4/40 rounded-full size-2.5" />
                  <span className="bg-ink-4/40 rounded-full size-2.5" />
                  <span className="bg-ink-4/40 rounded-full size-2.5" />
                </span>
                <span className="bg-foreground/[0.05] mx-auto px-4 py-1 rounded-full font-mono text-[11px] text-ink-4 truncate">
                  {label ?? title.toLowerCase()}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close screenshot"
                  className="font-mono text-ink-4 hover:text-ink text-xs transition-colors"
                >
                  ESC
                </button>
              </div>

              <div className="relative bg-background aspect-16/10">
                {src ? (
                  <Image
                    src={src}
                    alt={`${title} screenshot`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1152px"
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 place-items-center grid">
                    <p className="font-mono text-ink-4 text-xs">
                      No screenshot for {title} yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProjectThumb;
