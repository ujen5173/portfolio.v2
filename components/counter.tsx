"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  /** ms */
  duration?: number;
  suffix?: string;
  className?: string;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Counts up from zero the first time it scrolls into view. */
const Counter = ({
  to,
  duration = 1500,
  suffix = "",
  className,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Reduced motion: land on the final value instead of animating to it.
        if (reduced) setValue(to);
        else frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="tabular">{value}</span>
      {suffix}
    </span>
  );
};

export default Counter;
