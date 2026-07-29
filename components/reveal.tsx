"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, type CSSProperties, type ElementType } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  as?: ElementType;
  /** Entrance style. Defaults to a fade-up. */
  variant?: "up" | "blur" | "left" | "right" | "scale" | "clip";
  /** Fraction of the element that must be visible before it fires. */
  threshold?: number;
};

/**
 * Fades content into view the first time it enters the viewport.
 * Pure CSS transitions driven by one IntersectionObserver per element.
 */
const Reveal = ({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "up",
  threshold = 0.12,
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already on screen at mount (above the fold) — skip the observer.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-variant={variant}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
