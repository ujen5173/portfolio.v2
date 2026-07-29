import { CommandPaletteProvider } from "@/components/command-palette";
import { THEME_SCRIPT, ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/data/profile";
import { bricolage, geistMono, geistSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import Header from "./_components/header";
import SiteBackground from "./_components/site-background";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Full stack developer in Kathmandu, Nepal. I build multi-tenant SaaS, access-control models and the interfaces on top of them — with case studies on how each one was actually solved.",
  keywords: [
    "Ujen Basi",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "tRPC",
    "PostgreSQL",
    "Multi-tenant SaaS",
    "Nepal",
    "Kathmandu",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description:
      "Multi-tenant SaaS, access-control models and query plans — with case studies on how each problem was actually solved.",
    url: profile.siteUrl,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description:
      "Full stack developer in Kathmandu. Case studies on multi-tenant SaaS, RBAC and database design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0d17" },
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
  ],
};

/** Structured data so recruiters' tooling (and search) parses the profile. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: profile.socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
  knowsAbout: [
    "TypeScript",
    "Next.js",
    "PostgreSQL",
    "tRPC",
    "Multi-tenant architecture",
    "Design systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark h-full scroll-smooth antialiased",
        geistSans.variable,
        geistMono.variable,
        bricolage.variable,
        "font-sans",
      )}
    >
      <head>
        {/* Resolve the theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="relative flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <ThemeProvider>
          <CommandPaletteProvider>
            <SiteBackground />
            <Header />
            {children}
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
