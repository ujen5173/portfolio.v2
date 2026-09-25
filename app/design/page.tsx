import Footer from "@/app/_components/footer";
import LineReveal from "@/components/line-reveal";
import Reveal from "@/components/reveal";
import {
  accessibilityNotes,
  colourNotes,
  flow,
  inkScale,
  intro,
  layoutNotes,
  motionNotes,
  revisions,
  surfaceScale,
  typeNotes,
  typeScale,
} from "@/lib/data/design-system";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design notes",
  description:
    "How this site is put together: colour, type, layout, motion, and the order the work happened in.",
  openGraph: {
    title: "Design notes — Ujen Basi",
    description:
      "How this site is put together: colour, type, layout, motion, and the order the work happened in.",
    url: "/design",
    type: "article",
  },
};

/** Section wrapper: number and title in the gutter, content on the measure. */
const Chapter = ({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="py-14 md:py-20 border-hairline border-t">
    <div className="gap-8 lg:gap-16 grid grid-cols-1 lg:grid-cols-[200px_1fr]">
      <div className="lg:top-28 lg:sticky lg:self-start">
        <p className="font-mono text-ink-4 text-xs tabular">{index}</p>
        <h2 className="mt-2 font-display font-medium text-ink text-xl tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);

/** Paragraph stack at a comfortable measure. */
const Notes = ({ items }: { items: readonly string[] }) => (
  <div className="space-y-4 max-w-2xl">
    {items.map((note, i) => (
      <Reveal key={i} delay={i * 50}>
        <p className="text-ink-3 text-base text-pretty leading-relaxed">
          {note}
        </p>
      </Reveal>
    ))}
  </div>
);

export default function DesignPage() {
  return (
    <>
      <main id="main" className="flex-1">
        <article className="pt-12 pb-20 container-page">
          <Reveal>
            <Link
              href="/"
              className="font-mono text-ink-4 hover:text-ink-2 text-xs link-underline"
            >
              ← Home
            </Link>
          </Reveal>

          <header className="mt-16 pb-14 border-hairline border-b">
            <Reveal>
              <p className="font-mono text-ink-4 text-xs uppercase tracking-[0.18em]">
                Design notes
              </p>
            </Reveal>

            <LineReveal
              as="h1"
              baseDelay={100}
              className="mt-6 font-display font-medium text-display-lg text-ink leading-[1.04] tracking-[-0.03em]"
              lines={[<>How this site</>, <>is put together.</>]}
            />

            <div className="space-y-4 mt-8 max-w-2xl">
              {intro.map((paragraph, i) => (
                <Reveal key={i} delay={220 + i * 60}>
                  <p className="text-ink-3 text-base md:text-lg text-pretty leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </header>
          <Chapter index="01" title="Colour / Color">
            <Notes items={colourNotes} />

            <Reveal delay={80}>
              <div className="mt-10">
                <p className="font-mono text-[11px] text-ink-4 uppercase tracking-[0.18em]">
                  Text
                </p>
                <dl className="gap-px grid grid-cols-2 sm:grid-cols-4 bg-hairline mt-4 border border-hairline rounded-xl overflow-hidden">
                  {inkScale.map((entry) => (
                    <div key={entry.token} className="bg-background p-4">
                      <span
                        aria-hidden
                        className="block rounded-md h-10"
                        style={{ background: `var(${entry.token})` }}
                      />
                      <dt className="mt-3 font-mono text-[11px] text-ink-2">
                        {entry.token}
                      </dt>
                      <dd className="mt-0.5 text-ink-4 text-xs">{entry.use}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6">
                <p className="font-mono text-[11px] text-ink-4 uppercase tracking-[0.18em]">
                  Surface
                </p>
                <dl className="gap-px grid grid-cols-2 sm:grid-cols-4 bg-hairline mt-4 border border-hairline rounded-xl overflow-hidden">
                  {surfaceScale.map((entry) => (
                    <div key={entry.token} className="bg-background p-4">
                      <span
                        aria-hidden
                        className="block border border-hairline rounded-md h-10"
                        style={{ background: `var(${entry.token})` }}
                      />
                      <dt className="mt-3 font-mono text-[11px] text-ink-2">
                        {entry.token}
                      </dt>
                      <dd className="mt-0.5 text-ink-4 text-xs">{entry.use}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 font-mono text-[11px] text-ink-4">
                Switch the theme in the header — these swatches read the same
                variables the site does.
              </p>
            </Reveal>
          </Chapter>
          <Chapter index="02" title="Type">
            <Notes items={typeNotes} />

            <div className="mt-10 border-hairline border-t">
              {typeScale.map((entry, i) => (
                <Reveal key={entry.token} delay={i * 50}>
                  <div className="py-6 border-hairline border-b">
                    <div className="flex flex-wrap justify-between items-baseline gap-x-6 gap-y-1">
                      <span className="font-mono text-[11px] text-ink-2">
                        {entry.label}
                      </span>
                      <span className="font-mono text-[11px] text-ink-4">
                        {entry.token}
                      </span>
                    </div>
                    <p
                      className="mt-3 font-display font-medium text-ink truncate tracking-[-0.03em]"
                      style={{ fontSize: `var(${entry.token})` }}
                    >
                      Designing systems
                    </p>
                    <p className="mt-2 text-ink-4 text-xs">{entry.use}</p>
                  </div>
                </Reveal>
              ))}

              <Reveal>
                <div className="py-6 border-hairline border-b">
                  <span className="font-mono text-[11px] text-ink-2">Body</span>
                  <p className="mt-3 max-w-2xl text-ink-3 text-base leading-relaxed">
                    Geist at 16px with 1.6 line height. This is the size most of
                    the writing on the site sits at.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="py-6 border-hairline border-b">
                  <span className="font-mono text-[11px] text-ink-2">Mono</span>
                  <p className="mt-3 font-mono text-ink-4 text-xs uppercase tracking-[0.18em]">
                    Labels · metadata · 01
                  </p>
                </div>
              </Reveal>
            </div>
          </Chapter>
          <Chapter index="03" title="Layout">
            <Notes items={layoutNotes} />
          </Chapter>
          <Chapter index="04" title="Motion">
            <Notes items={motionNotes} />
          </Chapter>
          <Chapter index="05" title="Accessibility">
            <ul className="space-y-3 max-w-2xl">
              {accessibilityNotes.map((note, i) => (
                <Reveal key={i} delay={i * 50} as="li">
                  <p className="text-ink-3 text-base text-pretty leading-relaxed">
                    {note}
                  </p>
                </Reveal>
              ))}
            </ul>
          </Chapter>
          <Chapter index="06" title="Order of work">
            <ol className="border-hairline border-t max-w-2xl">
              {flow.map((entry, i) => (
                <li key={entry.step}>
                  <Reveal delay={i * 50}>
                    <div className="py-6 border-hairline border-b">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-ink-4 text-xs tabular">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-medium text-ink text-base">
                          {entry.step}
                        </h3>
                      </div>
                      <p className="mt-2 pl-9 text-ink-3 text-sm text-pretty leading-relaxed">
                        {entry.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Chapter>
          <Chapter index="07" title="Things I removed">
            <Reveal>
              <p className="mb-8 max-w-2xl text-ink-3 text-base text-pretty leading-relaxed">
                The first version of this site had more in it. These came out,
                and the page is better for it.
              </p>
            </Reveal>

            <dl className="border-hairline border-t max-w-2xl">
              {revisions.map((entry, i) => (
                <Reveal key={entry.change} delay={i * 50}>
                  <div className="py-6 border-hairline border-b">
                    <dt className="text-ink-2 text-base">{entry.change}</dt>
                    <dd className="mt-2 text-ink-4 text-sm text-pretty leading-relaxed">
                      {entry.reason}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Chapter>

          <div className="pt-12 border-hairline border-t">
            <Reveal>
              <Link
                href="/#work"
                className="group inline-flex items-baseline gap-3 font-display font-medium text-display-sm text-ink hover:text-primary tracking-[-0.02em] transition-colors"
              >
                See the work
                <span
                  aria-hidden
                  className="text-ink-4 group-hover:text-primary transition-all group-hover:translate-x-1 duration-300"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
