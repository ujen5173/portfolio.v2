import NowPlaying from "@/components/now-playing";
import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import { getGitHubSummary, getRecentActivity } from "@/lib/github";
import SectionHeading from "./section-heading";

const LANGUAGE_BARS = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
  "bg-ink-4",
];

const KIND_LABEL: Record<string, string> = {
  push: "commit",
  create: "new repo",
  pr: "pull req",
  issue: "issue",
  star: "star",
  repo: "repo",
};

const KIND_COLOR: Record<string, string> = {
  push: "text-chart-5",
  create: "text-chart-2",
  pr: "text-chart-3",
  issue: "text-chart-4",
  star: "text-primary",
  repo: "text-ink-4",
};

/** "3 days ago" without pulling in a date library. */
function relative(iso: string) {
  const diff = Date.now() - Date.parse(iso);
  const minutes = Math.round(diff / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
}

const GitHubActivity = async () => {
  const [summary, activity] = await Promise.all([
    getGitHubSummary(),
    getRecentActivity(),
  ]);

  // The events API can be sparse — top the feed up with recently pushed repos.
  const seen = new Set(activity.map((item) => item.repo));
  const feed = [
    ...activity,
    ...summary.recent
      .filter((repo) => !seen.has(repo.name))
      .map((repo) => ({
        id: `repo-${repo.name}`,
        kind: "repo" as const,
        title: repo.description ?? `Working on ${repo.name}`,
        repo: repo.name,
        url: repo.url,
        at: repo.pushedAt,
      })),
  ].slice(0, 6);

  return (
    <section id="activity" className="w-full scroll-mt-24">
      <div className="container-page py-24 md:py-32">
        <SectionHeading
          eyebrow="Live from GitHub"
          index="05"
          title="What I'm working on now."
          description="Pulled from the GitHub API and revalidated hourly — as current as my last push, not my last portfolio update."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-4">
              <SpotlightCard className="panel rounded-2xl p-7 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-medium text-ink">
                    My current go-to stack:
                  </h3>
                  <span className="font-mono text-xs text-ink-4 tabular">
                    {summary.totalRepos} repos
                  </span>
                </div>

                {summary.languages.length > 0 ? (
                  <>
                    <div className="mt-7 flex h-2 w-full gap-0.5 overflow-hidden rounded-full">
                      {summary.languages.map((lang, i) => (
                        <span
                          key={lang.name}
                          className={LANGUAGE_BARS[i]}
                          style={{ width: `${Math.max(lang.share * 100, 2)}%` }}
                          title={`${lang.name} — ${Math.round(lang.share * 100)}%`}
                        />
                      ))}
                    </div>

                    <ul className="mt-7 space-y-3.5">
                      {summary.languages.map((lang, i) => (
                        <li
                          key={lang.name}
                          className="flex items-center gap-3 text-sm"
                        >
                          <span
                            aria-hidden
                            className={`size-2 shrink-0 rounded-full ${LANGUAGE_BARS[i]}`}
                          />
                          <span className="text-ink-2">{lang.name}</span>
                          <span className="ml-auto font-mono text-xs text-ink-4 tabular">
                            {Math.round(lang.share * 100)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-7 font-mono text-xs leading-relaxed text-ink-4">
                    Language data is rate limited right now — it returns on the
                    next hourly revalidation.
                  </p>
                )}
              </SpotlightCard>

              <NowPlaying className="flex-1" />
            </div>
          </Reveal>
          <Reveal delay={90} className="h-full">
            <SpotlightCard className="panel flex h-full flex-col rounded-2xl p-7 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium text-ink">
                  Recent activity
                </h3>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-4">
                  <span className="relative grid size-2 place-items-center">
                    <span
                      aria-hidden
                      className="absolute size-2 animate-pulse-ring rounded-full bg-chart-5"
                    />
                    <span className="size-1.5 rounded-full bg-chart-5" />
                  </span>
                  live
                </span>
              </div>

              {feed.length > 0 ? (
                <ul className="mt-6 flex flex-1 flex-col justify-between gap-0.5">
                  {feed.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group -mx-3 flex gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-foreground/[0.04]"
                      >
                        <span
                          className={`mt-0.5 w-16 shrink-0 font-mono text-[10px] tracking-wider uppercase ${KIND_COLOR[item.kind]}`}
                        >
                          {KIND_LABEL[item.kind]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-2 block text-sm text-ink-2 transition-colors group-hover:text-ink">
                            {item.title}
                          </span>
                          <span className="mt-1 block font-mono text-[11px] text-ink-4">
                            {item.repo} · {relative(item.at)}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 flex-1 font-mono text-xs leading-relaxed text-ink-4">
                  GitHub is rate limited right now — this refills on the next
                  hourly revalidation.
                </p>
              )}

              <div className="border-t border-hairline py-2 mt-4">
                <a
                  href="https://github.com/ujen5173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit link-underline mt-6 inline-block shrink-0 font-mono text-xs text-ink-4 hover:text-ink-2"
                >
                  Follow along on GitHub ↗
                </a>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
