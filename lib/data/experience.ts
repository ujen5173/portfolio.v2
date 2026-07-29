export type TimelineEntry = {
  kind: "work" | "education" | "milestone";
  period: string;
  title: string;
  org: string;
  location: string;
  summary: string;
  highlights: string[];
  stack?: string[];
  current?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    period: "Jan 2026 — June 2026",
    title: "Full Stack Developer",
    org: "ACID Integrations",
    location: "Remote",
    current: false,
    summary:
      "Building and maintaining production features across the stack, and steadily reshaping the frontend architecture underneath them.",
    highlights: [
      "Develop and maintain production-ready full-stack features with modern React and TypeScript.",
      "Refactored and modularised the frontend architecture, improving component reusability and reducing maintenance overhead.",
      "Improved backend database schema definitions, contributing to cleaner data models and easier feature development.",
      "Integrated an audio analysis module into a client project.",
      "Diagnosed and resolved application bugs, improving stability and developer productivity.",
      "Active in pull request reviews, Git-based workflows and Agile practices.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Git"],
  },
  {
    kind: "work",
    period: "Jul 2026 — Present",
    title: "Full Stack Developer",
    org: "Converge Solutions Pvt Ltd.",
    location: "Sanepa, Lalitpur",
    current: true,
    summary:
      "Building and maintaining production features across the stack, and steadily reshaping the frontend architecture underneath them.",
    highlights: [
      "Developing and maintaing production-ready full-stack applications with modern React and TypeScript.",
      "Handling a full stack GYM application for a client with AI/ML Integration.",
      "Key role in building system architecture and system design",
      "Design and build company website v2. www.convergesolns.com",
      "Developing a multi tanent KIOSK Banking system with AI and ML integration",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "tRPC",
      "Tanstack",
      "Zustand",
      "Git",
    ],
  },
  {
    kind: "milestone",
    period: "2023",
    title: "Hash reached 100+ stars",
    org: "Open source",
    location: "GitHub",
    summary:
      "A full-stack Hashnode clone became my most-starred repository — and taught me that documentation is a feature.",
    highlights: [
      "Shipped a complete publishing platform: editor, feeds, publications, payments.",
      "Wrote the architecture README that drove most of the project's traction.",
    ],
    stack: ["Next.js", "T3 Stack", "Drizzle", "Stripe"],
  },
  {
    kind: "education",
    period: "2022 — 2026",
    title: "Bachelor of Computer Applications",
    org: "Kathford International College",
    location: "Lalitpur, Nepal",
    summary:
      "Four years of fundamentals — data structures, databases, networks — running in parallel with everything I was building on the side.",
    highlights: [
      "Studied data structures, algorithms, database systems and software engineering.",
      "Built WorkForge, Readora and Ridezio alongside coursework.",
    ],
  },
];
