import CopyButton from "@/components/copy-button";
import LineReveal from "@/components/line-reveal";
import Reveal from "@/components/reveal";
import { profile } from "@/lib/data/profile";
import Link from "next/link";
import React from "react";
import BackToTop from "./back-to-top";
import BookCall from "./book-call";
import LocalTime from "./local-time";

const Footer = () => (
  <footer id="contact" className="border-hairline border-t w-full scroll-mt-24">
    <div className="py-24 md:py-32 container-page">
      <Reveal>
        <p className="font-mono text-ink-4 text-xs uppercase tracking-[0.18em]">
          Contact
        </p>
      </Reveal>

      <LineReveal
        as="h2"
        className="mt-8 font-display font-medium text-display-lg text-ink leading-[1.06] tracking-[-0.03em]"
        lines={[<React.Fragment key={"123"}>Let&apos;s talk.</React.Fragment>]}
      />

      <div className="gap-x-16 gap-y-16 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] mt-14">
        <div>
          <Reveal delay={80}>
            <p className="max-w-md text-ink-3 text-base text-pretty leading-relaxed">
              I&apos;m open to software engineering roles and freelance work —
              full product builds, backends that have become hard to change, or
              a design system that needs some discipline.
            </p>
          </Reveal>

          <Reveal delay={130}>
            <div className="flex flex-wrap items-baseline gap-4 mt-10">
              <a
                href={`mailto:${profile.email}`}
                className="text-ink hover:text-primary text-xl md:text-2xl link-underline"
              >
                {profile.email}
              </a>
              <CopyButton
                value={profile.email}
                label="Copy email address"
                className="font-mono text-ink-4 hover:text-ink-2 text-xs"
              >
                <span aria-hidden>copy</span>
              </CopyButton>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <ul className="mt-12 border-hairline border-t">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex justify-between items-baseline gap-6 py-4 border-hairline border-b"
                  >
                    <span className="text-ink-2 group-hover:text-primary text-base transition-colors">
                      {social.label}
                    </span>
                    <span className="font-mono text-ink-4 text-xs">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Availability lives here rather than in the hero. */}
          <Reveal delay={220}>
            <p className="flex items-center gap-2.5 mt-10 font-mono text-ink-4 text-xs">
              <span
                aria-hidden
                className={
                  profile.available
                    ? "size-1.5 rounded-full bg-chart-5"
                    : "size-1.5 rounded-full bg-ink-4"
                }
              />
              {profile.available
                ? "Available for new work"
                : "Not currently available"}
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <p className="mb-4 font-mono text-ink-4 text-xs">
            Or pick a time directly
          </p>
          <BookCall />
        </Reveal>
      </div>

      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mt-24 pt-8 border-hairline border-t font-mono text-ink-4 text-xs">
        <p>
          {profile.name} · {new Date().getFullYear()}
        </p>

        <Link href="/design" className="hover:text-ink-2 link-underline">
          Design notes
        </Link>

        <p>
          Kathmandu <LocalTime />
        </p>

        <BackToTop />
      </div>
    </div>
  </footer>
);

export default Footer;
