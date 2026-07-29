import Reveal from "@/components/reveal";
import { projects } from "@/lib/data/projects";
import Link from "next/link";

export const metadata = { title: "404 — Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center">
      <div className="container-page py-32">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.24em] text-primary uppercase">
            Error 404
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 max-w-[16ch] font-display text-display-lg leading-[0.94] tracking-[-0.02em] text-ink">
            This route was never <em className="text-primary">defined</em>.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-3">
            The page you asked for doesn&apos;t exist — which, to be fair, is
            exactly what a well-behaved server should tell you. Here&apos;s
            where to go instead.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_40px_-8px_var(--primary)]"
            >
              <span aria-hidden>←</span> Back home
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-hairline-strong px-6 py-3 text-sm text-ink-2 transition-colors hover:border-primary/50 hover:text-ink"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-16 border-t border-hairline pt-8">
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-4 uppercase">
              Case studies
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-1 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group -mx-3 flex items-baseline justify-between gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <span className="text-base text-ink-2 transition-colors group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="font-mono text-[11px] text-ink-4">
                      {project.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
