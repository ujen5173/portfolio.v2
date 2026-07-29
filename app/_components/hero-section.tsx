import LineReveal from "@/components/line-reveal";
import Reveal from "@/components/reveal";
import { profile } from "@/lib/data/profile";
import { getGitHubUser } from "@/lib/github";
import Link from "next/link";
import GithubCard from "./github-card";
import LocalTime from "./local-time";

const FACTS = [
  { label: "Based", value: "Kathmandu, Nepal", clock: true },
  { label: "Focus", value: "Multi-tenant SaaS, APIs, design systems" },
  { label: "Languages", value: "Nepali (native), English (professional)" },
  { label: "Open for", value: "Engineering roles & freelance" },
];

const HeroSection = async () => {
  const user = await getGitHubUser();

  return (
    <section className="w-full">
      <div className="pt-20 md:pt-28 pb-24 md:pb-32 container-page">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden className="bg-primary rounded-full size-1.5" />
            <p className="font-mono text-ink-4 text-xs uppercase tracking-[0.2em]">
              {profile.role} — {profile.location}
            </p>
          </div>
        </Reveal>

        <LineReveal
          as="h1"
          baseDelay={140}
          className="mt-10 font-display font-medium text-display-xl text-ink leading-[1.02] tracking-[-0.035em]"
          // Line breaks are authored, not left to the browser — each line is
          // short enough to survive a 360px viewport without re-wrapping.
          lines={[
            <>I design and build</>,
            <>web products,</>,
            <>
              <span className="text-ink-4">from the</span> ground up.
            </>,
          ]}
        />

        <div className="gap-12 lg:gap-20 grid grid-cols-1 lg:grid-cols-[1.1fr_auto] mt-14">
          <div>
            <Reveal delay={520}>
              <p className="max-w-xl text-ink-3 text-lg text-pretty leading-relaxed">
                {profile.intro}
              </p>
            </Reveal>

            <Reveal delay={580}>
              <div className="flex flex-wrap items-center gap-3 mt-9">
                <Link
                  href="#work"
                  className="group inline-flex items-center gap-2.5 bg-primary hover:brightness-110 px-6 py-3 rounded-full font-medium text-primary-foreground text-sm transition-all duration-300"
                >
                  See my work
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-y-0.5 duration-300"
                  >
                    ↓
                  </span>
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3 border border-hairline-strong hover:border-primary/50 rounded-full font-medium text-ink-2 hover:text-ink text-sm transition-colors duration-300"
                >
                  Get in touch
                </a>
                <p className="hidden sm:block ml-2 font-mono text-ink-4 text-xs">
                  or press{" "}
                  <kbd className="px-1.5 py-0.5 border border-hairline rounded">
                    ⌘K
                  </kbd>
                </p>
              </div>
            </Reveal>

            <dl className="gap-x-10 gap-y-7 grid grid-cols-1 sm:grid-cols-2 mt-16">
              {FACTS.map((fact, i) => (
                <Reveal key={fact.label} delay={640 + i * 60}>
                  <dt className="font-mono text-[11px] text-ink-4 uppercase tracking-[0.16em]">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-ink-2 text-base">
                    {fact.value}
                    {fact.clock ? (
                      <span className="text-ink-4">
                        {" · "}
                        <LocalTime />
                      </span>
                    ) : null}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={420} className="w-full lg:w-[360px]">
            <GithubCard user={user} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
