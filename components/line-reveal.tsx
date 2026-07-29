"use client";

import { cn } from "@/lib/utils";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type LineRevealProps = {
  /** One entry per visual line. Lines rise into place in order. */
  lines: ReactNode[];
  className?: string;
  as?: ElementType;
  baseDelay?: number;
};

/**
 * Reveals a headline one line at a time from behind a clipping mask.
 * Lines are authored explicitly rather than measured, so the break points
 * are a design decision instead of whatever the browser happens to do.
 */
const LineReveal = ({
  lines,
  className,
  as: Tag = "h1",
  baseDelay = 0,
}: LineRevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const id = requestAnimationFrame(() => el.classList.add("is-visible"));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("line-reveal", className)}
      style={{ "--line-base": `${baseDelay}ms` } as CSSProperties}
    >
      {lines.map((line, i) => (
        <span key={i}>
          <span style={{ "--line-index": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
};

export default LineReveal;
