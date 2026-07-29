import Footer from "@/app/_components/footer";
import ApproachCard from "@/components/approach-card";
import CodeBlock from "@/components/code-block";
import ForgeScriptPlayground from "@/components/forgescript-playground";
import InspirationNote from "@/components/inspiration-note";
import LineReveal from "@/components/line-reveal";
import PendingPill from "@/components/pending-pill";
import ProjectThumb from "@/components/project-thumb";
import Reveal from "@/components/reveal";
import { getProject, projects } from "@/lib/data/projects";
import { getFeaturedRepos } from "@/lib/github";
import { findProjectThumbnail } from "@/lib/thumbnails";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

/** A chapter: mono label in the gutter, content on the measure. */
const Chapter = ({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="py-16 md:py-24 border-hairline border-t">
    <div className="gap-10 lg:gap-16 grid grid-cols-1 lg:grid-cols-[200px_1fr]">
      <div className="lg:top-28 lg:sticky lg:self-start">
        <p className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
          {label}
        </p>
        <h2 className="mt-3 font-display font-medium text-ink text-xl leading-tight tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const repos = await getFeaturedRepos();
  const repo = repos.get(project.repoName);
  const thumb = findProjectThumbnail(project.slug);

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const pendingDecisions = project.approach.filter(
    (item) => item.stillInProgress,
  ).length;

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Status", value: project.status },
    { label: "Stack", value: project.stack.join(", ") },
  ];

  return (
    <>
      <main id="main" className="flex-1">
        <article className="pt-12 pb-20 container-page">
          <Reveal>
            <Link
              href="/#work"
              className="font-mono text-ink-4 hover:text-ink-2 text-xs link-underline"
            >
              ← Work
            </Link>
          </Reveal>
          <header className="mt-16 pb-14 border-hairline border-b">
            <Reveal>
              <p className="font-mono text-ink-4 text-xs uppercase tracking-[0.18em]">
                {project.category}
              </p>
            </Reveal>

            <LineReveal
              as="h1"
              baseDelay={100}
              className="mt-6 font-display font-medium text-display-lg text-ink leading-[1.04] tracking-[-0.03em]"
              lines={[project.title]}
            />

            <Reveal delay={220}>
              <p className="mt-6 max-w-2xl text-ink-2 text-lg text-pretty leading-relaxed">
                {project.tagline}
              </p>
            </Reveal>

            <Reveal delay={280}>
              <p className="mt-6 max-w-2xl text-ink-3 text-base text-pretty leading-relaxed">
                {project.summary}
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="flex flex-wrap items-center gap-8 mt-10">
                <a
                  href={
                    repo?.html_url ??
                    `https://github.com/ujen5173/${project.repoName}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-primary text-sm link-underline"
                >
                  View source
                </a>
                {repo ? (
                  <span className="font-mono text-ink-4 text-xs tabular">
                    ★ {repo.stargazers_count}
                  </span>
                ) : null}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-3 hover:text-ink text-sm link-underline"
                  >
                    Live site
                  </a>
                ) : null}
              </div>
            </Reveal>

            <dl className="gap-8 grid grid-cols-1 sm:grid-cols-2 mt-14">
              {meta.map((item, i) => (
                <Reveal key={item.label} delay={i * 50}>
                  <dt className="font-mono text-ink-4 text-xs">{item.label}</dt>
                  <dd className="mt-1.5 text-ink-2 text-sm">{item.value}</dd>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={220} className="group block mt-14">
              <ProjectThumb
                src={thumb}
                title={project.title}
                accent={project.accent}
                label={
                  project.liveUrl ?? `github.com/ujen5173/${project.repoName}`
                }
                priority
              />
            </Reveal>
          </header>
          <Chapter label="01 — Context" title="The problem">
            <div className="space-y-5 max-w-2xl">
              {project.problem.map((paragraph, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p
                    className={
                      i === 0
                        ? "text-lg leading-relaxed text-pretty text-ink-2"
                        : "text-base leading-relaxed text-pretty text-ink-3"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {project.inspiration ? (
              <Reveal delay={120}>
                <InspirationNote
                  inspiration={project.inspiration}
                  accent={project.accent}
                />
              </Reveal>
            ) : null}
          </Chapter>
          <Chapter label="02 — Decisions" title="How I approached it">
            <div className="gap-px grid grid-cols-1 sm:grid-cols-2 bg-hairline border border-hairline rounded-2xl overflow-hidden">
              {project.approach.map((item, i) => (
                <Reveal
                  key={item.title ?? `pending-${i}`}
                  delay={i * 60}
                  className="h-full"
                >
                  <ApproachCard item={item} index={i} />
                </Reveal>
              ))}
            </div>

            {pendingDecisions > 0 ? (
              <Reveal delay={240}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-5">
                  <div aria-hidden className="flex items-center gap-1.5">
                    {project.approach.map((item, i) => (
                      <span
                        key={i}
                        className={`h-0.75 w-7 rounded-full ${
                          item.stillInProgress
                            ? "bg-hairline-strong"
                            : "bg-primary"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-mono text-ink-4 text-xs">
                    {project.approach.length - pendingDecisions} of{" "}
                    {project.approach.length} decisions written up — the rest
                    are still being made.
                  </p>
                </div>
              </Reveal>
            ) : null}

            {project.demo === "forgescript" ? (
              <Reveal delay={120}>
                <ForgeScriptPlayground />
              </Reveal>
            ) : null}
          </Chapter>
          <Chapter label="03 — Structure" title="How it fits together">
            <dl className="border-hairline border-t max-w-3xl">
              {project.architecture.map((layer, i) => (
                <Reveal key={layer.label} delay={i * 50}>
                  <div className="gap-x-10 gap-y-3 grid grid-cols-1 md:grid-cols-[120px_1fr] py-6 border-hairline border-b">
                    <dt className="font-mono text-ink-4 text-xs uppercase tracking-[0.14em]">
                      {layer.label}
                    </dt>
                    <dd>
                      <p className="font-mono text-ink-2 text-sm">
                        {layer.items.join("  ·  ")}
                      </p>
                      {layer.note ? (
                        <p className="mt-2 text-ink-3 text-sm leading-relaxed">
                          {layer.note}
                        </p>
                      ) : null}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Chapter>
          <Chapter label="04 — Problem solving" title="What was actually hard">
            <div className="space-y-4">
              {project.challenges.map((challenge, i) => (
                <Reveal key={i}>
                  <div className="border border-hairline rounded-2xl overflow-hidden">
                    <div className="bg-destructive/[0.045] p-6 md:p-8 border-hairline border-b">
                      <div className="flex items-center gap-3">
                        <span className="place-items-center grid border border-destructive/30 rounded-md size-6 font-mono text-[10px] text-destructive shrink-0 tabular">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="font-mono text-[10px] text-destructive uppercase tracking-[0.22em]">
                          Problem
                        </p>
                      </div>
                      <p className="mt-4 max-w-2xl text-ink-2 text-base text-pretty leading-relaxed">
                        {challenge.problem}
                      </p>
                    </div>

                    {challenge.solution ? (
                      <div className="p-6 md:p-8">
                        <div className="flex items-center gap-3">
                          <span className="place-items-center grid border border-chart-5/40 rounded-md size-6 font-mono text-[11px] text-chart-5 shrink-0">
                            ✓
                          </span>
                          <p className="font-mono text-[10px] text-chart-5 uppercase tracking-[0.22em]">
                            Solution
                          </p>
                        </div>
                        <p className="mt-4 max-w-2xl text-ink-3 text-base text-pretty leading-relaxed">
                          {challenge.solution}
                        </p>

                        {challenge.snippet ? (
                          <div className="mt-6">
                            <CodeBlock
                              code={challenge.snippet.code}
                              lang={challenge.snippet.lang}
                            />
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="relative p-6 md:p-8 overflow-hidden">
                        <div
                          aria-hidden
                          className="absolute inset-0 hatch pointer-events-none"
                        />
                        <div className="relative flex flex-wrap justify-between items-center gap-3">
                          <p className="font-mono text-[10px] text-ink-4 uppercase tracking-[0.22em]">
                            Solution
                          </p>
                          <PendingPill label="Unsolved" />
                        </div>
                        <p className="relative mt-4 max-w-2xl text-ink-3 text-base text-pretty leading-relaxed">
                          Still working this one out. It goes here once the
                          answer holds up.
                        </p>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Chapter>
          <Chapter label="05 — Result" title="Where it landed">
            <dl className="gap-px grid grid-cols-2 md:grid-cols-4 bg-hairline border border-hairline rounded-2xl overflow-hidden">
              {project.outcomes.map((outcome, i) => (
                <Reveal key={outcome.label} delay={i * 60} className="h-full">
                  <div className="bg-background p-6 h-full">
                    <dt className="font-mono text-[10px] text-ink-4 uppercase tracking-[0.18em]">
                      {outcome.label}
                    </dt>
                    <dd className="mt-3 text-ink-2 text-base leading-snug">
                      {outcome.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={100}>
              <div className="relative bg-surface mt-10 p-6 md:p-8 border border-hairline rounded-2xl overflow-hidden">
                {project.retrospectivePending ? (
                  <div
                    aria-hidden
                    className="absolute inset-0 hatch pointer-events-none"
                  />
                ) : null}

                <div className="relative flex justify-between items-center gap-4">
                  <p className="font-mono text-ink-4 text-xs">
                    What I&apos;d do differently
                  </p>
                  {project.retrospectivePending ? (
                    <PendingPill label="Too early" />
                  ) : null}
                </div>

                <p className="relative mt-3 max-w-2xl text-ink-3 text-base text-pretty leading-relaxed">
                  {project.retrospective ??
                    "Too early to answer this honestly. The project is still being built, and the lessons worth writing down are the ones that survive shipping."}
                </p>
              </div>
            </Reveal>
          </Chapter>
          <nav className="pt-12 border-hairline border-t">
            <Reveal>
              <Link href={`/work/${next.slug}`} className="group block">
                <p className="font-mono text-ink-4 text-xs">Next</p>
                <div className="flex justify-between items-baseline gap-6 mt-3">
                  <h2 className="font-display font-medium text-display-sm text-ink group-hover:text-primary tracking-[-0.02em] transition-colors">
                    {next.title}
                  </h2>
                  <span
                    aria-hidden
                    className="text-ink-4 group-hover:text-primary transition-all group-hover:translate-x-1 duration-300"
                  >
                    →
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-ink-3 text-base">
                  {next.tagline}
                </p>
              </Link>
            </Reveal>
          </nav>
        </article>
      </main>

      <Footer />
    </>
  );
}
