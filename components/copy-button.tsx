"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type CopyButtonProps = {
  value: string;
  className?: string;
  children?: React.ReactNode;
  label?: string;
};

/** Copies a value and swaps its label to a confirmation for two seconds. */
const CopyButton = ({ value, className, children, label }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the value is still selectable on the page */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label ?? `Copy ${value}`}
      className={cn("group/copy inline-flex items-center gap-2", className)}
    >
      {children ?? value}
      <span
        aria-hidden
        className={cn(
          "font-mono text-xs transition-all duration-300",
          copied
            ? "text-primary opacity-100"
            : "opacity-0 group-hover/copy:opacity-60",
        )}
      >
        {copied ? "copied" : "copy"}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
};

export default CopyButton;
