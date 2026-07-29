import { ImageResponse } from "next/og";

export const alt = "Ujen Basi — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social card — matches the site's dark editorial look. */
export default async function OpenGraphImage() {
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
          top: -220,
          left: 300,
          width: 800,
          height: 520,
          borderRadius: 9999,
          background: "#e8604c",
          opacity: 0.22,
          filter: "blur(140px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -180,
          right: -80,
          width: 620,
          height: 420,
          borderRadius: 9999,
          background: "#5b7cfa",
          opacity: 0.16,
          filter: "blur(140px)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 9999,
            background: "#4ade80",
          }}
        />
        <div
          style={{
            fontSize: 20,
            color: "#94a3b8",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Available for work
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 78,
            color: "#f8fafc",
            lineHeight: 1.05,
            letterSpacing: -2,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          I build &nbsp;
          <span style={{ color: "#e8604c" }}>softwares</span>
          &nbsp;for life.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#94a3b8",
            maxWidth: 880,
          }}
        >
          Various projects with case studies on how each one was actually
          solved.
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
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 30, color: "#f8fafc" }}>Ujen Basi</div>
          <div style={{ fontSize: 20, color: "#64748b" }}>
            Full Stack Developer · Kathmandu, Nepal
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#64748b" }}>
          ujenbasi.vercel.app
        </div>
      </div>
    </div>,
    size,
  );
}
