export type SkillCategory =
  | "Languages"
  | "Frameworks"
  | "Data"
  | "Backend"
  | "Interface"
  | "Tooling";

export type Skill = {
  label: string;
  category: SkillCategory;
  /** Logo path under /public/skills, or null to render a lettermark. */
  src: string | null;
  /** invert: recolour black monochrome logos for dark; chip: light plate behind dark logos. */
  treatment?: "invert" | "chip";
};

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Frameworks",
  "Data",
  "Backend",
  "Interface",
  "Tooling",
];

export const skills: Skill[] = [
  {
    label: "TypeScript",
    category: "Languages",
    src: "/ts.png",
  },
  {
    label: "JavaScript",
    category: "Languages",
    src: "/js.webp",
  },

  {
    label: "Python",
    category: "Languages",
    src: "/python.webp",
  },
  {
    label: "Next.js",
    category: "Frameworks",
    src: "/next.svg",
  },
  {
    label: "React",
    category: "Frameworks",
    src: "/react.svg",
  },
  {
    label: "TanStack",
    category: "Frameworks",
    src: "/tanstack.png",
  },
  {
    label: "Express.js",
    category: "Frameworks",
    src: "/express.png",
  },
  {
    label: "PostgreSQL",
    category: "Data",
    src: "/postgresql.webp",
  },
  {
    label: "MongoDB",
    category: "Data",
    src: "/mongodb.webp",
    treatment: "chip",
  },
  {
    label: "Drizzle ORM",
    category: "Data",
    src: "/drizzle.webp",
    treatment: "chip",
  },
  {
    label: "Prisma",
    category: "Data",
    src: "/prisma.svg",
    treatment: "invert",
  },
  {
    label: "Redis",
    category: "Data",
    src: "/redis-logo.svg",
  },
  {
    label: "tRPC",
    category: "Backend",
    src: "/trpc.webp",
  },
  {
    label: "Better Auth",
    category: "Backend",
    src: "/better-auth.png",
  },
  {
    label: "Stripe",
    category: "Backend",
    src: "/stripe.png",
  },
  {
    label: "WebRTC",
    category: "Backend",
    src: "/webrtc.svg",
  },
  {
    label: "Tailwind CSS",
    category: "Interface",
    src: "/tailwindcss.webp",
  },
  {
    label: "shadcn/ui",
    category: "Interface",
    src: "/shadcn.svg",
    treatment: "invert",
  },
  {
    label: "Zustand",
    category: "Data",
    src: "/zustand.png",
  },
  {
    label: "Git",
    category: "Tooling",
    src: "/git.webp",
  },
  {
    label: "Supabase",
    category: "Tooling",
    src: "/supabase.webp",
  },
];
