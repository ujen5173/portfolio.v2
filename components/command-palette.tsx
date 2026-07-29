"use client";

import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTheme } from "./theme-provider";

type Group = "Navigate" | "Case studies" | "Connect" | "Actions";

/**
 * Commands are plain data — no closures. The action is resolved by id when
 * one is chosen, which keeps refs and side effects out of the render path.
 */
type Command = {
  id: string;
  label: string;
  hint?: string;
  group: Group;
  keywords?: string;
};

const COMMANDS: Command[] = [
  {
    id: "top",
    label: "Go to top",
    group: "Navigate",
    keywords: "home hero start",
  },
  {
    id: "nav:#work",
    label: "Selected work",
    group: "Navigate",
    keywords: "projects portfolio case studies",
  },
  {
    id: "nav:#approach",
    label: "Approach",
    group: "Navigate",
    keywords: "principles philosophy how i work",
  },
  {
    id: "nav:#experience",
    label: "Experience",
    group: "Navigate",
    keywords: "timeline job career history",
  },
  {
    id: "nav:#stack",
    label: "Stack",
    group: "Navigate",
    keywords: "technologies tools languages skills",
  },
  {
    id: "nav:#activity",
    label: "GitHub activity",
    group: "Navigate",
    keywords: "commits repos open source now",
  },
  {
    id: "nav:#channels",
    label: "Channels I learned from",
    group: "Navigate",
    keywords: "youtube credits teachers learning resources",
  },
  {
    id: "nav:#setup",
    label: "My editor setup",
    group: "Navigate",
    keywords: "vscode config dotfiles extensions tools",
  },
  {
    id: "design",
    label: "Design notes",
    hint: "/design",
    group: "Navigate",
    keywords: "design system colour type motion process how built",
  },
  {
    id: "nav:#contact",
    label: "Contact & book a call",
    group: "Navigate",
    keywords: "email hire cal schedule",
  },

  ...projects.map((project): Command => ({
    id: `case:${project.slug}`,
    label: project.title,
    hint: project.category,
    group: "Case studies",
    keywords: `${project.tagline} ${project.stack.join(" ")}`,
  })),

  {
    id: "github",
    label: "Open GitHub",
    hint: "@ujen5173",
    group: "Connect",
    keywords: "repos code source",
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    hint: "in/ujen5173",
    group: "Connect",
    keywords: "profile network",
  },
  {
    id: "mail",
    label: "Send an email",
    hint: profile.email,
    group: "Connect",
    keywords: "contact reach out hire",
  },

  {
    id: "copy-email",
    label: "Copy email address",
    hint: profile.email,
    group: "Actions",
    keywords: "clipboard contact",
  },
  {
    id: "resume",
    label: "Open résumé",
    hint: "PDF",
    group: "Actions",
    keywords: "cv pdf hire download",
  },
  {
    id: "theme",
    label: "Toggle theme",
    hint: "light / dark",
    group: "Actions",
    keywords: "dark light mode appearance",
  },
  {
    id: "hello",
    label: "Say hello",
    hint: "👋",
    group: "Actions",
    keywords: "hi hey easter egg",
  },
];

/* ---------------------------------------------------------------- context */

const PaletteContext = createContext<{ open: () => void } | null>(null);

/** Lets any component (e.g. the header button) open the palette. */
export const useCommandPalette = () => {
  const ctx = useContext(PaletteContext);
  return ctx ?? { open: () => {} };
};

/* ------------------------------------------------------------------ fuzzy */

/**
 * Subsequence match with a small score: consecutive hits and word-start hits
 * rank higher. Enough for a few dozen commands, with no dependency.
 */
function fuzzyScore(haystack: string, needle: string): number | null {
  if (!needle) return 0;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();

  let score = 0;
  let hIndex = 0;
  let streak = 0;

  for (const char of n) {
    const found = h.indexOf(char, hIndex);
    if (found === -1) return null;

    if (found === hIndex && hIndex > 0) streak++;
    else streak = 0;

    score += streak * 3;
    if (found === 0 || h[found - 1] === " " || h[found - 1] === "/") score += 6;
    score -= (found - hIndex) * 0.4;

    hIndex = found + 1;
  }

  return score;
}

/* --------------------------------------------------------------- provider */

export const CommandPaletteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const router = useRouter();
  const { toggle: toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const flash = useCallback((message: string) => setToast(message), []);

  // The toast owns its own dismissal, so no timer ref has to survive renders.
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  /** Ranked matches for the current query. */
  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return COMMANDS;

    return COMMANDS.map((command) => {
      const target = `${command.label} ${command.hint ?? ""} ${command.keywords ?? ""}`;
      const score = fuzzyScore(target, trimmed);
      return score === null ? null : { command, score };
    })
      .filter(
        (entry): entry is { command: Command; score: number } => entry !== null,
      )
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.command);
  }, [query]);

  /** Grouped for display, preserving the ranked order. */
  const grouped = useMemo(() => {
    const buckets = new Map<Group, Command[]>();
    for (const command of results) {
      const bucket = buckets.get(command.group) ?? [];
      bucket.push(command);
      buckets.set(command.group, bucket);
    }
    return [...buckets.entries()];
  }, [results]);

  /** Flat order matching what's rendered, so arrow keys track the visuals. */
  const flat = useMemo(() => grouped.flatMap(([, items]) => items), [grouped]);

  const execute = useCallback(
    (id: string) => {
      if (id.startsWith("nav:")) {
        const hash = id.slice(4);
        if (window.location.pathname !== "/") router.push(`/${hash}`);
        else
          document
            .querySelector(hash)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (id.startsWith("case:")) {
        router.push(`/work/${id.slice(5)}`);
        return;
      }

      switch (id) {
        case "design":
          router.push("/design");
          break;
        case "top":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "github":
          window.open("https://github.com/ujen5173", "_blank", "noopener");
          break;
        case "linkedin":
          window.open("https://linkedin.com/in/ujen5173", "_blank", "noopener");
          break;
        case "mail":
          window.location.href = `mailto:${profile.email}`;
          break;
        case "copy-email":
          navigator.clipboard
            .writeText(profile.email)
            .then(() => flash("Email copied to clipboard"))
            .catch(() => flash("Couldn't reach the clipboard"));
          break;
        case "resume":
          window.open("/resume.pdf", "_blank", "noopener");
          break;
        case "theme":
          toggleTheme();
          break;
        case "hello":
          flash("Hello — thanks for poking around. — Ujen");
          break;
      }
    },
    [flash, router, toggleTheme],
  );

  const runAt = useCallback(
    (index: number) => {
      const command = flat[index];
      if (!command) return;
      close();
      // Let the dialog unmount before scrolling or navigating.
      requestAnimationFrame(() => execute(command.id));
    },
    [close, execute, flat],
  );
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }
      if (event.key === "Escape") {
        close();
        return;
      }
      // "/" opens too, as long as you aren't typing in a field.
      if (
        event.key === "/" &&
        !isOpen &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = overflow;
      cancelAnimationFrame(id);
    };
  }, [isOpen]);
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (flat.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((prev) => (prev + 1) % flat.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((prev) => (prev - 1 + flat.length) % flat.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      runAt(active);
    }
  };

  let renderIndex = -1;

  return (
    <PaletteContext.Provider value={{ open }}>
      {children}

      {/* Toast for clipboard / easter-egg feedback */}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 transition-all duration-300",
          toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        {toast ? (
          <div className="panel rounded-full px-5 py-2.5 font-mono text-xs text-ink shadow-2xl">
            {toast}
          </div>
        ) : null}
      </div>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
        >
          <button
            type="button"
            aria-label="Close command palette"
            onClick={close}
            className="absolute inset-0 cursor-default bg-background/75 backdrop-blur-sm"
            style={{ animation: "pop-in 0.2s ease-out both" }}
          />

          <div
            className="panel relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            style={{ animation: "pop-in 0.3s var(--ease-out-expo) both" }}
          >
            <div className="flex items-center gap-3 border-b border-hairline px-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-4 shrink-0 text-ink-4"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search projects, sections, actions…"
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-ink-4"
              />
              <kbd className="hidden shrink-0 rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-ink-4 sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {flat.length === 0 ? (
                <p className="px-3 py-8 text-center font-mono text-xs text-ink-4">
                  Nothing matches “{query}”. Try “work”, “resume” or “email”.
                </p>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-ink-4 uppercase">
                      {group}
                    </p>
                    {items.map((command) => {
                      renderIndex++;
                      const index = renderIndex;
                      const isActive = index === active;
                      return (
                        <button
                          key={command.id}
                          type="button"
                          data-index={index}
                          onMouseEnter={() => setActive(index)}
                          onClick={() => runAt(index)}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                            isActive
                              ? "bg-primary/10 text-ink"
                              : "text-ink-2 hover:bg-foreground/5",
                          )}
                        >
                          <span className="truncate">{command.label}</span>
                          <span className="flex shrink-0 items-center gap-2">
                            {command.hint ? (
                              <span className="hidden font-mono text-[11px] text-ink-4 sm:block">
                                {command.hint}
                              </span>
                            ) : null}
                            <span
                              aria-hidden
                              className={cn(
                                "font-mono text-xs transition-opacity",
                                isActive
                                  ? "text-primary opacity-100"
                                  : "opacity-0",
                              )}
                            >
                              ↵
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-hairline px-4 py-2.5 font-mono text-[10px] text-ink-4">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto hidden sm:block">
                no command-palette library
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </PaletteContext.Provider>
  );
};
