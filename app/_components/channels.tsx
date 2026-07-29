import ChannelAvatar from "@/components/channel-avatar";
import Reveal from "@/components/reveal";
import { featuredChannels, otherChannels } from "@/lib/data/channels";
import { findChannelAvatar } from "@/lib/thumbnails";
import SectionHeading from "./section-heading";

/**
 * Credit where it's due. Two tiers: the few that genuinely changed how I work
 * get a sentence, the rest are a plain index — enough to show breadth without
 * turning the section into a wall.
 */
const Channels = () => (
  <section id="channels" className="w-full scroll-mt-24">
    <div className="py-24 md:py-32 container-page">
      <SectionHeading
        eyebrow="Credits"
        index="07"
        title="I was taught by the internet."
        description="No bootcamp and no mentor  — just these people explaining things for free. The one rule I stuck to: never only watch. Build it again yourself afterwards, from an empty file ground up."
      />
      <ul className="mt-14 border-hairline border-t">
        {featuredChannels.map((channel, i) => (
          <li key={channel.url}>
            <Reveal delay={i * 60}>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group items-center gap-x-10 gap-y-4 grid grid-cols-1 md:grid-cols-[minmax(0,300px)_1fr_auto] py-7 md:py-8 border-hairline border-b"
              >
                <div className="flex items-center gap-4">
                  <span className="w-6 font-mono text-ink-4 text-xs shrink-0 tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <ChannelAvatar
                    src={findChannelAvatar(channel.handle)}
                    name={channel.name}
                    size={44}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />

                  <span className="min-w-0">
                    <span className="block font-medium text-ink group-hover:text-primary text-base truncate transition-colors duration-300">
                      {channel.name}
                    </span>
                    <span className="block mt-0.5 font-mono text-[11px] text-ink-4 truncate">
                      {channel.handle}
                    </span>
                  </span>
                </div>

                <p className="max-w-xl text-ink-3 text-sm text-pretty leading-relaxed">
                  {channel.note}
                </p>

                <span className="flex md:justify-end items-center gap-5">
                  <span className="font-mono text-[11px] text-ink-4">
                    {channel.topic}
                  </span>
                  <span
                    aria-hidden
                    className="text-ink-4 group-hover:text-primary transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal delay={80}>
        <p className="mt-14 font-mono text-[11px] text-ink-4 uppercase tracking-[0.18em]">
          Also in rotation
        </p>
      </Reveal>

      <ul className="gap-x-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {otherChannels.map((channel, i) => (
          <li key={channel.url}>
            <Reveal delay={(i % 3) * 50}>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 py-3 border-hairline border-b"
              >
                <ChannelAvatar
                  src={findChannelAvatar(channel.handle)}
                  name={channel.name}
                  size={26}
                />
                <span className="text-ink-2 group-hover:text-primary text-sm truncate transition-colors duration-300">
                  {channel.name}
                </span>
                <span className="ml-auto font-mono text-[11px] text-ink-4 shrink-0">
                  {channel.topic}
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Channels;
