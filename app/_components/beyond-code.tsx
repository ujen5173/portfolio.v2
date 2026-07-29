import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import { beyondCode } from "@/lib/data/profile";
import SectionHeading from "./section-heading";

/** The human section — what people actually remember afterwards. */
const BeyondCode = () => (
  <section id="beyond" className="w-full scroll-mt-24">
    <div className="container-page py-24 md:py-32">
      <SectionHeading
        eyebrow="Off the clock"
        index="06"
        title="A bit about me."
        description="You'll spend more time talking to me than reading my commits."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {beyondCode.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 70} className="h-full">
            <SpotlightCard className="panel group flex h-full flex-col rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30">
              <span className="font-mono text-xs text-ink-4 tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-base font-medium text-ink transition-colors duration-300 group-hover:text-primary">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-3">
                {item.body}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default BeyondCode;
