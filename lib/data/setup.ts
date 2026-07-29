/** The things I open every day. */
export const dailyDrivers = [
  {
    name: "VS Code",
    role: "Editor",
    note: "Where almost everything gets written. Tuned once, then left alone.",
  },
  {
    name: "Zed",
    role: "Editor",
    note: "For when I want something that opens instantly and gets out of the way.",
  },
  {
    name: "Figma",
    role: "Design",
    note: "Layouts get decided here before a single line of JSX exists.",
  },
  {
    name: "Obsidian",
    role: "Notes",
    note: "Schema sketches, half-formed ideas, and the reading list I never finish.",
  },
  {
    name: "Git + GitHub",
    role: "Version control",
    note: "Small commits, readable history, and pull requests as the quality gate.",
  },
  {
    name: "pnpm",
    role: "Packages",
    note: "Fast installs and a lockfile that doesn't start arguments.",
  },
  {
    name: "Windows & Fedora",
    role: "Device",
    note: "Soon will get a mac though. Or Buy me one plzzzz :(",
  },
] as const;

/** How the editor actually looks and feels. */
export const editorSetup = [
  { label: "Theme", value: "Omni" },
  { label: "Icons", value: "Material Icon Theme" },
  { label: "Font", value: "Geist Mono" },
  { label: "Ligatures", value: "On" },
] as const;

/** The extensions I install first on any new machine. */
export const extensions = [
  {
    name: "Tailwind CSS IntelliSense",
    purpose: "Class autocomplete, including inside cn()",
  },
  { name: "ESLint", purpose: "Catches the mistakes types can't" },
  { name: "Prettier", purpose: "Formatting stops being a discussion" },
  { name: "Pretty TS Errors", purpose: "Makes TypeScript errors readable" },
  { name: "GitLens", purpose: "Blame and history without leaving the file" },
  { name: "ES7 React Snippets", purpose: "Boilerplate I'd rather not retype" },
  { name: "Auto Import", purpose: "Imports resolve themselves" },
  { name: "Tailwind Sorter", purpose: "One canonical class order" },
  { name: "Material Icon Theme", purpose: "Findable files in a long tree" },
  { name: "Omni", purpose: "The theme I keep coming back to" },
] as const;
