import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import { principles } from "@/lib/data/profile";
import SectionHeading from "./section-heading";

/** Small line icons — drawn inline so there's no icon-font request. */
const ICONS: Record<string, React.ReactNode> = {
  schema: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v6c0 4.2 3 7.5 7.5 9 4.5-1.5 7.5-4.8 7.5-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  anchor: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 7.5V21M5 13a7 7 0 0 0 14 0" />
      <path d="M4 13h2M18 13h2" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5Z" />
      <path d="M4 19.5A1.5 1.5 0 0 1 5.5 21H19" />
    </>
  ),
  pulse: <path d="M3 12h4l2.5-6 4 12L16 12h5" />,
};

const Principles = () => (
  <section id="approach" className="w-full scroll-mt-24">
    <div className="py-24 md:py-32 container-page">
      <SectionHeading
        eyebrow="Approach"
        index="02"
        title="My Approach on building Full Stack Application."
        description="This is how i build application and how i learned and feel easy for me."
      />

      <div className="gap-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-hairline mt-14 border border-hairline rounded-2xl overflow-hidden">
        {principles.map((principle, i) => (
          <Reveal key={principle.title} delay={(i % 3) * 70} className="h-full">
            <SpotlightCard className="group flex flex-col bg-background p-7 md:p-8 h-full transition-colors duration-500">
              <div className="flex justify-between items-center">
                <span className="place-items-center grid border border-hairline group-hover:border-primary/40 rounded-xl size-10 text-ink-3 group-hover:text-primary transition-colors duration-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                    aria-hidden
                  >
                    {ICONS[principle.icon]}
                  </svg>
                </span>
                <span className="font-mono text-ink-4 text-xs tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-7 font-medium text-ink text-lg">
                {principle.title}
              </h3>
              <p className="mt-3 text-ink-3 text-sm text-pretty leading-relaxed">
                {principle.body}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Principles;
