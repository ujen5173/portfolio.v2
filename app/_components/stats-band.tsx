import Counter from "@/components/counter";
import Reveal from "@/components/reveal";
import { stats } from "@/lib/data/profile";

/** Four honest numbers, counted up on scroll. */
const StatsBand = () => (
  <section className="w-full border-y border-hairline">
    <div className="container-page">
      <dl className="grid grid-cols-2 gap-px bg-hairline lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 70} className="h-full">
            <div className="group h-full bg-background px-4 py-10 transition-colors duration-500 hover:bg-surface md:px-7 md:py-12">
              <dd className="font-display text-4xl leading-none font-medium tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-primary md:text-5xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-4 font-mono text-[11px] tracking-[0.14em] text-ink-2 uppercase">
                {stat.label}
              </dt>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-ink-4">
                {stat.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);

export default StatsBand;
