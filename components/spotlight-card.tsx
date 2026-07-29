"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef, type ElementType } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Intrinsic tag name. Ignored when `href` is set. */
  as?: ElementType;
  /** Internal route — renders a next/link. Use `external` for outside URLs. */
  href?: string;
  external?: boolean;
} & Record<string, unknown>;

/**
 * Publishes the cursor position as --mx/--my so the `.spotlight` gradient can
 * follow it. Writes are rAF-throttled to one per frame.
 *
 * `href` is a string rather than an `as={Link}` prop so this stays usable from
 * server components — functions can't cross that boundary.
 */
const SpotlightCard = ({
  children,
  className,
  as: Tag = "div",
  href,
  external = false,
  ...props
}: SpotlightCardProps) => {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || frame.current) return;

    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  };

  const classes = cn("spotlight", className);

  if (href && !external) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onPointerMove={onPointerMove}
        className={classes}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onPointerMove={onPointerMove}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Tag
      ref={ref as React.Ref<never>}
      onPointerMove={onPointerMove}
      className={classes}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default SpotlightCard;
