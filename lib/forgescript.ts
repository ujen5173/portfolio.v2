/**
 * ForgeScript — the plain-text task format from WorkForge, ported to run in
 * the browser so the case study can be tried rather than described.
 *
 * One line is one task. Everything before the first sigil is the title;
 * after that, tokens can appear in any order.
 */

export type TaskType =
  "feature" | "bug" | "chore" | "improvement" | "docs" | "research";

const TYPE_ALIASES: Record<string, TaskType> = {
  feature: "feature",
  feat: "feature",
  bug: "bug",
  chore: "chore",
  task: "chore",
  improvement: "improvement",
  improve: "improvement",
  docs: "docs",
  research: "research",
};

export type ForgeTask = {
  line: number;
  title: string;
  type: TaskType;
  assignees: string[];
  reviewer: string | null;
  tags: string[];
  due: { token: string; date: Date | null };
  project: string | null;
  subtasks: string[];
};

export type ForgeWarning = { line: number; message: string };

export type ForgeResult = { tasks: ForgeTask[]; warnings: ForgeWarning[] };

const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, days: number) => {
  const next = startOfDay(date);
  next.setDate(next.getDate() + days);
  return next;
};

/** Both absolute forms from the spec, plus the relative words people type. */
function resolveDue(token: string, now: Date): Date | null {
  const value = token.toLowerCase();

  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (iso) {
    const date = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    return date.getMonth() === Number(iso[2]) - 1 ? date : null;
  }

  const slashed = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);
  if (slashed) {
    const date = new Date(
      Number(slashed[3]),
      Number(slashed[1]) - 1,
      Number(slashed[2]),
    );
    return date.getMonth() === Number(slashed[1]) - 1 ? date : null;
  }

  if (value === "today") return startOfDay(now);
  if (value === "tomorrow") return addDays(now, 1);
  if (value === "next-week") return addDays(now, 7);
  if (value === "eow") return addDays(now, (5 - now.getDay() + 7) % 7 || 7);
  if (value === "eom")
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  if (value === "next-month")
    return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

  const weekday = WEEKDAYS.indexOf(value);
  if (weekday >= 0) return addDays(now, (weekday - now.getDay() + 7) % 7 || 7);

  return null;
}

const emptyTask = (line: number): ForgeTask => ({
  line,
  title: "",
  type: "chore",
  assignees: [],
  reviewer: null,
  tags: [],
  due: { token: "", date: null },
  project: null,
  subtasks: [],
});

export function parseForgeScript(input: string, now: Date): ForgeResult {
  const tasks: ForgeTask[] = [];
  const warnings: ForgeWarning[] = [];

  input.split("\n").forEach((raw, index) => {
    const line = index + 1;
    const indented = /^[\t ]+/.test(raw);
    const text = raw.trim();

    if (!text) return;

    // Indented dash — a subtask hanging off the task above it.
    if (indented && text.startsWith("-")) {
      const title = text.slice(1).trim();
      const parent = tasks.at(-1);
      if (!parent) {
        warnings.push({ line, message: "Subtask with no task above it" });
        return;
      }
      if (title) parent.subtasks.push(title);
      return;
    }

    const task = emptyTask(line);
    const titleParts: string[] = [];
    let seenToken = false;

    for (const token of text.split(/\s+/)) {
      const value = token.slice(token.startsWith("@@") ? 2 : 1);

      if (token.startsWith("#") && value) {
        seenToken = true;
        const type = TYPE_ALIASES[value.toLowerCase()];
        if (type) task.type = type;
        else
          warnings.push({
            line,
            message: `Unknown type #${value} — treated as a plain task`,
          });
        continue;
      }

      if (token.startsWith("@@") && value) {
        seenToken = true;
        task.reviewer = value;
        continue;
      }

      if (token.startsWith("@") && value) {
        seenToken = true;
        if (!task.assignees.includes(value)) task.assignees.push(value);
        continue;
      }

      if (token.startsWith("+") && value) {
        seenToken = true;
        if (!task.tags.includes(value)) task.tags.push(value);
        continue;
      }

      if (token.startsWith("^") && value) {
        seenToken = true;
        task.project = value;
        continue;
      }

      if (token.startsWith("~") && value) {
        seenToken = true;
        const date = resolveDue(value, now);
        if (date) task.due = { token: value, date };
        else warnings.push({ line, message: `Cannot read the date ~${value}` });
        continue;
      }

      if (seenToken) {
        warnings.push({ line, message: `Ignored stray text "${token}"` });
        continue;
      }

      titleParts.push(token);
    }

    task.title = titleParts.join(" ");
    if (!task.title) {
      warnings.push({ line, message: "Line has no title — skipped" });
      return;
    }

    tasks.push(task);
  });

  return { tasks, warnings };
}

export const FORGESCRIPT_EXAMPLE = `Fix auth redirect loop #bug @prabin @@ujen +auth +critical ~tomorrow ^workforge-core
  - Reproduce on magic link flow
  - Check middleware order

Add leave balance widget #feature @sita @ram @@ujen +dashboard ~eow ^workforge-hr
  - Design widget layout
  - Connect leave balance API

Update onboarding copy #chore @ujen +copy ~friday ^workforge-landing

Research WebSocket vs SSE for notifications #research @@prabin +infra ~next-week`;
