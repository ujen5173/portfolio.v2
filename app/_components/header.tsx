"use client";

import { useCommandPalette } from "@/components/command-palette";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
  { href: "/resume.pdf", label: "Resume" },
];

const Header = () => {
  const { open } = useCommandPalette();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  const navHref = (href: string) => (isHome ? href : `/${href}`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/85 backdrop-blur-sm transition-colors duration-300",
        scrolled ? "border-b border-hairline" : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-2.5"
        >
          {/* Live GitHub avatar, proxied and cached through our own route. */}
          <span className="size-7 shrink-0 overflow-hidden rounded-full border border-hairline transition-colors duration-300 group-hover:border-primary/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/github/avatar"
              alt=""
              width={56}
              height={56}
              className="size-full object-cover"
            />
          </span>
          <span className="text-sm font-medium text-ink transition-colors duration-300 group-hover:text-primary">
            Ujen Basi
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={navHref(link.href)}
                  className={cn(
                    "link-underline text-sm text-ink-3 hover:text-ink",
                    link.href.includes("resume") &&
                      "text-primary underline underline-offset-2",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={open}
            aria-label="Search"
            className="hidden size-9 place-items-center rounded-full text-ink-4 transition-colors hover:text-ink-2 sm:grid"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-4"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid size-9 place-items-center text-ink-2 md:hidden"
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={cn(
                  "absolute inset-x-0 h-px bg-current transition-all duration-300",
                  menuOpen ? "top-1 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 h-px bg-current transition-all duration-300",
                  menuOpen ? "top-1 -rotate-45" : "top-2.5",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-hairline transition-all duration-300 md:hidden",
          menuOpen ? "max-h-80 border-t" : "max-h-0",
        )}
      >
        <ul className="container-page py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={navHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-hairline py-4 text-base text-ink-2 last:border-0"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
