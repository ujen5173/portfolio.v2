import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

/** UI / body text. */
export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

/** Code, labels, metadata — the "technical" voice. */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/**
 * Display face. Bricolage has real character in its terminals and tight
 * spacing at large sizes, which keeps headlines from looking generic.
 */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
