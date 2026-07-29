"use client";

import { useTheme } from "@/components/theme-provider";
import { profile } from "@/lib/data/profile";
import { cn } from "@/lib/utils";
import { getCalApi } from "@calcom/embed-react";
import { useState } from "react";

const { booking, timezone } = profile;

const CAL_URL = `https://cal.com/${booking.calLink}`;

/**
 * A static clone of the cal.com booking header, with the real scheduler behind
 * a button.
 *
 * The inline <Cal> embed reserved ~560px of the footer and pulled in the whole
 * embed bundle on every page load. This renders the same information as markup
 * and only fetches Cal when someone actually intends to book — which also
 * means the section costs nothing for the majority who never click.
 */
const BookCall = () => {
  const { theme } = useTheme();
  const [duration, setDuration] = useState<number>(booking.defaultDuration);
  const [loading, setLoading] = useState(false);

  const openScheduler = async () => {
    setLoading(true);
    try {
      const cal = await getCalApi();

      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#e8734f" },
          light: { "cal-brand": "#b4491f" },
        },
      });

      cal("modal", {
        calLink: booking.calLink,
        config: { theme, layout: "month_view", duration: String(duration) },
      });
    } catch {
      // Embed blocked or offline — cal.com still works in a new tab.
      window.open(
        `${CAL_URL}?duration=${duration}`,
        "_blank",
        "noopener,noreferrer",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel relative overflow-hidden rounded-2xl">
      <div className="p-7 md:p-8">
        <div className="flex items-center gap-3">
          <span className="size-7 overflow-hidden rounded-full border border-hairline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/github/avatar"
              alt=""
              className="size-full object-cover"
            />
          </span>
          <p className="text-sm text-ink-3">{profile.name}</p>
        </div>

        <h3 className="mt-5 font-display text-2xl font-medium tracking-[-0.02em] text-ink">
          {booking.title}
        </h3>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-ink-3">
          {booking.description}
        </p>
        <div className="mt-7 flex items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="size-4 shrink-0 text-ink-4"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" />
          </svg>

          <div
            role="radiogroup"
            aria-label="Meeting length"
            className="inline-flex rounded-lg border border-hairline p-0.5"
          >
            {booking.durations.map((minutes) => {
              const isActive = minutes === duration;
              return (
                <button
                  key={minutes}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setDuration(minutes)}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-200",
                    isActive
                      ? "bg-foreground/8 text-ink"
                      : "text-ink-4 hover:text-ink-2",
                  )}
                >
                  {minutes}m
                </button>
              );
            })}
          </div>
        </div>
        <dl className="mt-5 space-y-3">
          <div className="flex items-center gap-3">
            <dt className="sr-only">Location</dt>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-4 shrink-0 text-ink-4"
              aria-hidden
            >
              <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
              <path d="m15.5 11 6-3.5v9l-6-3.5z" strokeLinejoin="round" />
            </svg>
            <dd className="text-sm text-ink-2">{booking.location}</dd>
          </div>

          <div className="flex items-center gap-3">
            <dt className="sr-only">Timezone</dt>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-4 shrink-0 text-ink-4"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
            </svg>
            <dd className="text-sm text-ink-2">{timezone}</dd>
          </div>
        </dl>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-hairline px-7 py-4 md:px-8">
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-mono text-xs text-ink-4 hover:text-ink-2"
        >
          open on cal.com ↗
        </a>

        <button
          type="button"
          onClick={openScheduler}
          disabled={loading}
          className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:opacity-70"
        >
          {loading ? "Opening…" : `Book ${duration} minutes`}
          <span
            aria-hidden
            className={cn(
              "transition-transform duration-300",
              loading ? "animate-pulse" : "group-hover:translate-x-0.5",
            )}
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default BookCall;
