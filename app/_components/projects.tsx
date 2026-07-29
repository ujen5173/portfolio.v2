import ProjectThumb from "@/components/project-thumb";
import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import { projects } from "@/lib/data/projects";
import { getFeaturedRepos, type GitHubRepo } from "@/lib/github";
import { findProjectThumbnail } from "@/lib/thumbnails";
import SectionHeading from "./section-heading";

const ACCENT_TEXT: Record<string, string> = {
  "chart-1": "text-chart-1",
  "chart-2": "text-chart-2",
  "chart-3": "text-chart-3",
  "chart-4": "text-chart-4",
  "chart-5": "text-chart-5",
};

const STATUS_STYLES: Record<string, string> = {
  Live: "border-chart-5/40 text-chart-5",
  "In development": "border-chart-4/40 text-chart-4",
  Archived: "border-hairline-strong text-ink-4",
};

const RepoStats = ({ repo }: { repo: GitHubRepo | undefined }) => {
  if (!repo) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-ink-4">
      <span className="tabular">★ {repo.stargazers_count}</span>
      {repo.forks_count > 0 ? (
        <span className="tabular">⑂ {repo.forks_count}</span>
      ) : null}
      {repo.language ? <span>{repo.language}</span> : null}
      <span>
        pushed{" "}
        {new Date(repo.pushed_at).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}
      </span>
    </div>
  );
};

const Projects = async () => {
  const repos = await getFeaturedRepos();

  return (
    <section id="work" className="w-full scroll-mt-24">
      <div className="py-24 md:py-32 container-page">
        <SectionHeading
          eyebrow="Selected work"
          index="01"
          title="Four projects, all built from scratch."
          description="Each one has a case study behind it: what the problem was, what I built, and what I'd change now. The repo numbers come straight from GitHub."
        />

        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 mt-14">
          {projects.map((project, i) => {
            const repo = repos.get(project.repoName);
            const thumb = findProjectThumbnail(project.slug);
            return (
              <Reveal
                key={project.slug}
                delay={(i % 2) * 80}
                className="h-full"
              >
                <SpotlightCard
                  href={`/work/${project.slug}`}
                  className="group flex flex-col p-7 md:p-9 hover:border-primary/30 rounded-2xl h-full transition-all hover:-translate-y-1 duration-500 panel"
                >
                  <div className="flex justify-between items-center gap-4">
                    <span
                      className={`font-mono text-xs ${ACCENT_TEXT[project.accent]}`}
                    >
                      0{i + 1} — {project.category}
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-[11px] text-ink-4 tabular">
                        {project.year}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] ${STATUS_STYLES[project.status]}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <ProjectThumb
                    src={thumb}
                    title={project.title}
                    accent={project.accent}
                    label={
                      project.liveUrl ??
                      `github.com/ujen5173/${project.repoName}`
                    }
                    priority={i < 2}
                    className="mt-6"
                  />

                  <h3 className="mt-7 font-display font-medium text-ink group-hover:text-primary text-3xl md:text-4xl leading-none tracking-[-0.03em] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-ink-2 text-base text-pretty">
                    {project.tagline}
                  </p>

                  <p className="mt-4 text-ink-3 text-sm text-pretty leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  <dl className="gap-x-5 gap-y-4 grid grid-cols-2 mt-6 py-5 border-hairline border-y">
                    {project.outcomes.map((outcome) => (
                      <div key={outcome.label}>
                        <dt className="font-mono text-[10px] text-ink-4 uppercase tracking-wider">
                          {outcome.label}
                        </dt>
                        <dd className="mt-1 text-ink-2 text-sm leading-snug text-pretty">
                          {outcome.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex flex-wrap gap-1.5 mt-6">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 border border-hairline rounded-full font-mono text-[10px] text-ink-3"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 ? (
                      <span className="px-2 py-1 font-mono text-[10px] text-ink-4">
                        +{project.stack.length - 5}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex justify-between items-end gap-4 mt-auto pt-7">
                    <RepoStats repo={repo} />
                    <span className="inline-flex items-center gap-2 font-mono text-ink-2 group-hover:text-primary text-xs transition-colors shrink-0">
                      Case study
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1 duration-300"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={80}>
          <a
            href="https://github.com/ujen5173?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 font-mono text-ink-4 hover:text-ink-2 text-xs link-underline"
          >
            More on GitHub ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
