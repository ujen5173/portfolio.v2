import Reveal from "@/components/reveal";
import { timeline } from "@/lib/data/experience";
import SectionHeading from "./section-heading";

const KIND_LABEL: Record<string, string> = {
  work: "Role",
  education: "Education",
  milestone: "Milestone",
};

const Experience = () => (
  <section id="experience" className="w-full scroll-mt-24">
    <div className="container-page py-24 md:py-32">
      <SectionHeading
        eyebrow="Experience"
        index="03"
        title="Where I've been shipping."
      />

      <ol className="mt-14 border-t border-hairline">
        {timeline.map((entry, i) => (
          <li key={entry.title}>
            <Reveal delay={i * 70}>
              <div className="group grid grid-cols-1 gap-x-14 gap-y-6 border-b border-hairline py-10 transition-colors duration-500 lg:grid-cols-[minmax(0,260px)_1fr] lg:py-12">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={`size-1.5 shrink-0 rounded-full ${
                        entry.current ? "bg-chart-5" : "bg-ink-4/50"
                      }`}
                    />
                    <p className="font-mono text-[11px] tracking-[0.16em] text-ink-4 uppercase">
                      {KIND_LABEL[entry.kind]}
                    </p>
                    {entry.current ? (
                      <span className="rounded-full border border-chart-5/40 px-2 py-0.5 font-mono text-[10px] text-chart-5">
                        now
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 font-mono text-sm text-ink-3">
                    {entry.period}
                  </p>

                  <h3 className="mt-3 font-display text-2xl leading-tight font-medium tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-primary">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-base text-ink-2">{entry.org}</p>
                  <p className="mt-1 font-mono text-xs text-ink-4">
                    {entry.location}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="max-w-2xl text-base leading-relaxed text-pretty text-ink-2 md:text-lg">
                    {entry.summary}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {entry.highlights.map((highlight, j) => (
                      <li key={j} className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-primary/60"
                        />
                        <p className="max-w-2xl text-sm leading-relaxed text-pretty text-ink-3">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {entry.stack ? (
                    <div className="mt-7 flex flex-wrap gap-1.5">
                      {entry.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] text-ink-4"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
