import Reveal from "@/components/reveal";
import { skillCategories, skills } from "@/lib/data/skills";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SectionHeading from "./section-heading";

/**
 * The stack, grouped by layer. Logos and names only — no blurbs, no
 * cross-links. It's an index, and it should read like one.
 */
const Skills = () => (
  <section id="stack" className="w-full scroll-mt-24">
    <div className="py-24 md:py-32 container-page">
      <SectionHeading eyebrow="Stack" index="04" title="What I build with." />

      <div className="space-y-12 mt-14">
        {skillCategories.map((category, categoryIndex) => {
          const items = skills.filter((skill) => skill.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <Reveal>
                <div className="flex items-center gap-4">
                  <p className="font-mono text-[11px] text-ink-4 uppercase tracking-[0.2em]">
                    {category}
                  </p>
                  <span aria-hidden className="flex-1 bg-hairline h-px" />
                  <span className="font-mono text-[11px] text-ink-4 tabular">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>

              <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 mt-5">
                {items.map((skill, i) => (
                  <Reveal
                    key={skill.label}
                    delay={(categoryIndex % 2) * 40 + (i % 6) * 45}
                  >
                    <div className="group flex items-center gap-3 hover:bg-surface px-4 py-3.5 border border-hairline hover:border-primary/35 rounded-xl transition-all duration-300">
                      <span
                        className={cn(
                          "place-items-center grid size-7 shrink-0",
                          skill.treatment === "chip" &&
                            "rounded-md bg-white/90 p-1",
                        )}
                      >
                        {skill.src ? (
                          <Image
                            src={`/skills${skill.src}`}
                            alt=""
                            width={48}
                            height={48}
                            className={cn(
                              "size-full object-contain group-hover:scale-110 transition-transform duration-300",
                              skill.treatment === "invert" && "dark:invert",
                            )}
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="font-display font-medium text-ink-4 group-hover:text-primary text-sm transition-colors duration-300"
                          >
                            {skill.label.slice(0, 2)}
                          </span>
                        )}
                      </span>

                      <span className="text-ink-2 group-hover:text-ink text-sm truncate transition-colors duration-300">
                        {skill.label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
