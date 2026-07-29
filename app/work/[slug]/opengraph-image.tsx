import { getProject, projects } from "@/lib/data/projects";
import { ImageResponse } from "next/og";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const ACCENTS: Record<string, string> = {
  "chart-1": "#e8604c",
  "chart-2": "#5b9cf0",
  "chart-3": "#d06bd0",
  "chart-4": "#e0b64a",
  "chart-5": "#4ade80",
};

export default async function CaseStudyOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const accent = project ? ACCENTS[project.accent] : "#e8604c";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0c0d17",
        padding: 72,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -200,
          left: 200,
          width: 760,
          height: 480,
          borderRadius: 9999,
          background: accent,
          opacity: 0.2,
          filter: "blur(150px)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 9999,
            background: accent,
          }}
        />
        <div
          style={{
            fontSize: 20,
            color: accent,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {project?.category ?? "Case study"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 104,
            color: "#f8fafc",
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          {project?.title ?? "Case study"}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#cbd5e1",
            maxWidth: 940,
          }}
        >
          {project?.tagline ?? ""}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {(project?.stack ?? []).slice(0, 4).map((tech) => (
            <div
              key={tech}
              style={{
                fontSize: 20,
                color: "#94a3b8",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 9999,
                padding: "8px 18px",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 22, color: "#64748b" }}>Ujen Basi</div>
      </div>
    </div>,
    size,
  );
}
