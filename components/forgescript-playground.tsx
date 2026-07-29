"use client";

import {
  FORGESCRIPT_EXAMPLE,
  parseForgeScript,
  type ForgeTask,
} from "@/lib/forgescript";
import { useMemo, useState, useSyncExternalStore } from "react";

/** No clock on the server, so relative dates wait for hydration. */
const subscribe = () => () => {};
const getServerToday = () => null;

let today: Date | null = null;
const getToday = () => (today ??= new Date());

const TYPE_STYLES: Record<string, string> = {
  feature: "border-chart-5/40 text-chart-5",
  bug: "border-destructive/40 text-destructive",
  chore: "border-hairline-strong text-ink-3",
  improvement: "border-chart-2/40 text-chart-2",
  docs: "border-chart-3/40 text-chart-3",
  research: "border-chart-4/40 text-chart-4",
};

const Chip = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    className={`px-2 py-0.5 border rounded-full font-mono text-[10px] ${className}`}
  >
    {children}
  </span>
);

const TaskCard = ({ task }: { task: ForgeTask }) => (
  <div className="bg-background p-4 border border-hairline rounded-xl">
    <div className="flex items-start gap-3">
      <Chip className={TYPE_STYLES[task.type]}>{task.type}</Chip>
      <p className="mt-0.5 text-ink text-sm leading-snug">{task.title}</p>
    </div>

    <div className="flex flex-wrap items-center gap-1.5 mt-3">
      {task.assignees.map((person) => (
        <Chip key={person} className="border-hairline text-ink-2">
          @{person}
        </Chip>
      ))}
      {task.reviewer ? (
        <Chip className="border-primary/40 text-primary">
          review @{task.reviewer}
        </Chip>
      ) : null}
      {task.tags.map((tag) => (
        <Chip key={tag} className="border-hairline text-ink-3">
          +{tag}
        </Chip>
      ))}
      {task.due.date ? (
        <Chip className="border-hairline text-ink-3 tabular">
          {task.due.date.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </Chip>
      ) : null}
      {task.project ? (
        <Chip className="border-hairline text-ink-4">^{task.project}</Chip>
      ) : null}
    </div>

    {task.subtasks.length > 0 ? (
      <ul className="space-y-1.5 mt-3 pl-1">
        {task.subtasks.map((subtask) => (
          <li
            key={subtask}
            className="flex items-start gap-2 text-ink-3 text-xs"
          >
            <span
              aria-hidden
              className="mt-1 border border-hairline-strong rounded-[3px] size-3 shrink-0"
            />
            {subtask}
          </li>
        ))}
      </ul>
    ) : null}
  </div>
);

/**
 * Live ForgeScript parser. Dates are relative to "now", so parsing waits for
 * the client clock rather than rendering a server date that would then change.
 */
const ForgeScriptPlayground = () => {
  const [source, setSource] = useState(FORGESCRIPT_EXAMPLE);
  const now = useSyncExternalStore(subscribe, getToday, getServerToday);

  const result = useMemo(
    () => (now ? parseForgeScript(source, now) : null),
    [source, now],
  );

  return (
    <div className="mt-8 pt-8 border-hairline border-t">
      <div className="flex flex-wrap justify-between items-baseline gap-3">
        <p className="font-mono text-[10px] text-ink-4 uppercase tracking-[0.18em]">
          Try it — this is the real parser
        </p>
        <button
          type="button"
          onClick={() => setSource(FORGESCRIPT_EXAMPLE)}
          className="font-mono text-ink-4 hover:text-ink-2 text-[10px] uppercase tracking-[0.18em] link-underline"
        >
          Reset
        </button>
      </div>

      <p className="mt-3 max-w-2xl text-ink-3 text-sm leading-relaxed">
        Edit the text on the left. Every task on the right is built from it as
        you type — <span className="text-ink-2">#</span> type,{" "}
        <span className="text-ink-2">@</span> assignee,{" "}
        <span className="text-ink-2">@@</span> reviewer,{" "}
        <span className="text-ink-2">+</span> tag,{" "}
        <span className="text-ink-2">~</span> due date,{" "}
        <span className="text-ink-2">^</span> project, indented dashes for
        subtasks.
      </p>

      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 mt-5">
        <div className="bg-foreground/[0.025] border border-hairline rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-hairline border-b">
            <span className="font-mono text-[10px] text-ink-4 uppercase tracking-widest">
              forgescript
            </span>
          </div>
          <textarea
            value={source}
            onChange={(event) => setSource(event.target.value)}
            spellCheck={false}
            aria-label="ForgeScript input"
            className="bg-transparent p-4 focus:outline-none w-full min-h-[300px] font-mono text-ink-2 text-[12.5px] leading-relaxed resize-y"
          />
        </div>

        <div className="space-y-3">
          {result === null ? (
            <div className="bg-surface p-4 border border-hairline rounded-xl h-24 animate-pulse" />
          ) : result.tasks.length === 0 ? (
            <div className="bg-surface p-6 border border-hairline rounded-xl text-ink-4 text-sm">
              Nothing to create yet. Type a line.
            </div>
          ) : (
            result.tasks.map((task) => <TaskCard key={task.line} task={task} />)
          )}

          {result && result.warnings.length > 0 ? (
            <div className="bg-destructive/[0.045] p-4 border border-hairline rounded-xl">
              <p className="font-mono text-[10px] text-destructive uppercase tracking-[0.18em]">
                {result.warnings.length} warning
                {result.warnings.length > 1 ? "s" : ""} — nothing is thrown away
              </p>
              <ul className="space-y-1 mt-2.5">
                {result.warnings.map((warning, i) => (
                  <li key={i} className="text-ink-3 text-xs">
                    <span className="font-mono text-ink-4 tabular">
                      line {warning.line}
                    </span>{" "}
                    — {warning.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {result ? (
        <p className="mt-4 font-mono text-ink-4 text-xs tabular">
          {result.tasks.length} task
          {result.tasks.length === 1 ? "" : "s"},{" "}
          {result.tasks.reduce((sum, task) => sum + task.subtasks.length, 0)}{" "}
          subtasks — one paste, one save.
        </p>
      ) : null}
    </div>
  );
};

export default ForgeScriptPlayground;
