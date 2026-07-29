import Reveal from "@/components/reveal";
import { dailyDrivers, editorSetup, extensions } from "@/lib/data/setup";
import SectionHeading from "./section-heading";

const Setup = () => (
  <section id="setup" className="w-full scroll-mt-24">
    <div className="container-page py-24 md:py-32">
      <SectionHeading
        eyebrow="Setup"
        index="08"
        title="What I work in every day."
        description="Nothing exotic. A setup I've tuned once and stopped thinking about, which is rather the point."
      />

      <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-4 uppercase">
              Daily drivers
            </p>
          </Reveal>

          <dl className="mt-6 border-t border-hairline">
            {dailyDrivers.map((tool, i) => (
              <Reveal key={tool.name} delay={i * 50}>
                <div className="group border-b border-hairline py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-base font-medium text-ink transition-colors duration-300 group-hover:text-primary">
                      {tool.name}
                    </dt>
                    <span className="shrink-0 font-mono text-[11px] text-ink-4">
                      {tool.role}
                    </span>
                  </div>
                  <dd className="mt-1.5 max-w-md text-sm leading-relaxed text-pretty text-ink-3">
                    {tool.note}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="space-y-14">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.18em] text-ink-4 uppercase">
                Editor
              </p>
            </Reveal>

            <Reveal delay={60}>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
                {editorSetup.map((item) => (
                  <div key={item.label} className="bg-background px-5 py-4">
                    <dt className="font-mono text-[10px] tracking-wider text-ink-4 uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-ink-2">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-[11px] tracking-[0.18em] text-ink-4 uppercase">
                  Extensions
                </p>
                <span className="font-mono text-[11px] text-ink-4 tabular">
                  {String(extensions.length).padStart(2, "0")}
                </span>
              </div>
            </Reveal>

            <ul className="mt-6 border-t border-hairline">
              {extensions.map((extension, i) => (
                <Reveal key={extension.name} delay={(i % 5) * 40}>
                  <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-3">
                    <span className="text-sm text-ink-2">{extension.name}</span>
                    <span className="text-xs text-ink-4">
                      {extension.purpose}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Setup;
