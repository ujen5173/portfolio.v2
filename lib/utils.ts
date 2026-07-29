import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge can't tell a custom font-size (`text-display-xl`) from a
 * custom colour (`text-ink-2`) — it groups both under `text-*` and drops the
 * first. Declaring the theme's own scales keeps both from being merged away.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-sm", "display-md", "display-lg", "display-xl"] },
      ],
      "text-color": [{ text: ["ink", "ink-2", "ink-3", "ink-4"] }],
      "font-family": [{ font: ["display", "serif", "sans", "mono", "heading"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
