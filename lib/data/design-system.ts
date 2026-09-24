/**
 * Content for /design. Kept as data so the page stays layout-only, same as
 * every other section on the site.
 */

export const intro = [
  "This site is a portfolio, so it has two readers. One is skimming for thirty seconds to decide whether to keep going. The other has decided to keep going and wants detail. Most of the decisions below come from trying to serve both without building two sites.",
  "The rule I kept coming back to: if an element doesn't help either reader, remove it.",
];

/** Colour ramp, rendered live from the CSS variables. */
export const inkScale = [
  { token: "--ink", use: "Headings" },
  { token: "--ink-2", use: "Body text" },
  { token: "--ink-3", use: "Secondary text" },
  { token: "--ink-4", use: "Labels, metadata" },
];

export const surfaceScale = [
  { token: "--background", use: "Page" },
  { token: "--surface", use: "Cards and panels" },
  { token: "--hairline", use: "Dividers" },
  { token: "--primary", use: "Accent" },
];

export const colourNotes = [
  "There is one accent colour. It marks links, the current item, and one word in most headings. Everything else is grey.",
  "The text ramp has four steps because that is how many levels I can actually tell apart: heading, body, secondary, metadata. A fifth step would be a step I'd have to guess at.",
  "Light and dark use the same token names with different values, so no component knows which theme it is in.",
];

/** Type scale — sizes are read from the CSS custom properties. */
export const typeScale = [
  {
    token: "--text-display-xl",
    label: "Display XL",
    use: "Page headline. One per page.",
  },
  {
    token: "--text-display-lg",
    label: "Display L",
    use: "Case study titles, contact heading.",
  },
  { token: "--text-display-md", label: "Display M", use: "Section headings." },
  {
    token: "--text-display-sm",
    label: "Display S",
    use: "Sub-headings, next-project link.",
  },
];

export const typeNotes = [
  "Three families. Bricolage Grotesque for headings, Geist for body text, Geist Mono for labels, numbers and code.",
  "Display sizes are fluid. Each one is a clamp() between a small-screen size and a large-screen size, so there are no breakpoint jumps.",
  "The line breaks in the homepage headline are written by hand rather than left to the browser. Three lines that read well beat automatic wrapping that changes on every screen width.",
];

export const layoutNotes = [
  "One container, capped at 1280px, with padding that steps up at two breakpoints. Everything on the site sits in it.",
  "Sections are separated by space, not by boxes. A 1px hairline does the dividing where a divider is genuinely needed.",
  "Cards are used for things that are actually separate objects — a project, a principle, a booking. Lists are used for everything else.",
];

export const motionNotes = [
  "There is one entrance animation: content fades in and moves up 14px over 0.7 seconds. It is used everywhere, with a small delay to stagger items in a row.",
  "Headlines are the exception. Their lines rise from behind a mask, one after another.",
  "Hover states are colour changes between 200ms and 500ms. Nothing scales up, nothing bounces.",
  "All of it is CSS transitions triggered by an IntersectionObserver. There is no animation library.",
  "Under prefers-reduced-motion every animation is switched off and content renders in its final position.",
];

export const accessibilityNotes = [
  "Body text sits at or above 4.5:1 against its background in both themes. Metadata is the lowest contrast on the page and is never the only place information appears.",
  "Focus rings are visible on every interactive element and use the accent colour at a 3px offset.",
  "A skip link is the first thing in the tab order.",
  "The command palette is fully keyboard driven: arrows to move, enter to select, escape to close.",
  "Images that carry no information have empty alt text so screen readers skip them.",
];

/** The order the work actually happened in. */
export const flow = [
  {
    step: "Content before layout",
    body: "I wrote the copy first and put it in TypeScript files under lib/data. No component holds its own text. This meant I was designing around real sentences instead of placeholder text, and it is why editing the site now means editing a data file.",
  },
  {
    step: "Type scale",
    body: "Four display sizes and the body sizes, decided before any colour. If the page reads well in black and white at the right sizes, colour is a small job afterwards.",
  },
  {
    step: "Colour",
    body: "Dark theme first, because it is the one I expect most people to see. One accent, a four-step grey ramp, a surface and a hairline. Light theme came later using the same token names.",
  },
  {
    step: "One section end to end",
    body: "I built the work section completely — heading, cards, hover states, responsive behaviour — before starting any other section. It set the patterns the rest copied.",
  },
  {
    step: "Everything else",
    body: "The remaining sections reused the section heading component, the card treatment and the spacing decided in step four. Most of them took under an hour because nothing new had to be invented.",
  },
  {
    step: "Motion last",
    body: "Added after the whole page worked without it. If a layout needs animation to look finished, the layout is not finished.",
  },
];

export const revisions = [
  {
    change: "Removed the animated canvas behind the hero",
    reason:
      "It was the first thing you saw and it said nothing about the work. It also cost a canvas loop running on every page load.",
  },
  {
    change: "Removed the coloured background glows",
    reason:
      "Four blurred colour blobs behind a dark page is a look that a lot of sites landed on at once. It made the page harder to read and dated it.",
  },
  {
    change: "Cut the section that displayed my editor config as JSON",
    reason:
      "A wall of settings is not interesting to read. The same information as a short list of tools is.",
  },
  {
    change: "Rewrote the type scale smaller",
    reason:
      "The first headline size was 152px at desktop width. It looked impressive in isolation and pushed everything useful below the fold.",
  },
];
