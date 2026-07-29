"use client";

import { tracks } from "@/lib/data/listening";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

/** Wall-clock seconds each track gets on screen before the next one starts. */
const TRACK_SECONDS = 24;
const TICK_MS = 250;
const BARS = 44;

const ACCENT_BAR = [
  "bg-chart-1",
  "bg-chart-3",
  "bg-chart-5",
  "bg-chart-2",
  "bg-chart-4",
];

const ACCENT_TEXT = [
  "text-chart-1",
  "text-chart-3",
  "text-chart-5",
  "text-chart-2",
  "text-chart-4",
];

const clock = (seconds: number) => {
  const whole = Math.max(Math.floor(seconds), 0);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
};

/**
 * Bar heights derived from the title, so the shape is different per track but
 * identical on the server and the client.
 */
function waveform(seed: string) {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    state = (state ^ seed.charCodeAt(i)) * 16777619;
  }

  return Array.from({ length: BARS }, (_, i) => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const noise = 0.3 + ((state >>> 8) % 1000) / 1400;
    const arc = 0.62 + Math.sin((i / (BARS - 1)) * Math.PI) * 0.38;
    return Math.min(noise * arc, 1);
  });
}

const SpotifyMark = () => (
  <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-hidden>
    <circle cx="12" cy="12" r="12" fill="#1DB954" />
    <g
      fill="none"
      stroke="#0d1211"
      strokeWidth="1.9"
      strokeLinecap="round"
      opacity="0.9"
    >
      <path d="M6.1 9.1c4.1-1.2 8.6-.8 12 1.3" />
      <path d="M7 12.4c3.4-1 7.1-.6 9.9 1.1" />
      <path d="M7.9 15.5c2.7-.8 5.6-.5 7.9.9" />
    </g>
  </svg>
);

const Control = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="grid size-7 place-items-center rounded-full text-ink-3 transition-colors hover:bg-foreground/[0.06] hover:text-ink"
  >
    {children}
  </button>
);

/**
 * A now-playing card driven by a local list rather than an API. The clock is
 * compressed so a visitor sees the queue move, and the waveform is scrubbable.
 */
const NowPlaying = ({ className }: { className?: string }) => {
  const [{ index, progress }, setState] = useState({ index: 0, progress: 0 });
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;

    const step = TICK_MS / (TRACK_SECONDS * 1000);
    const id = setInterval(() => {
      setState((current) => {
        const next = current.progress + step;
        return next >= 1
          ? { index: (current.index + 1) % tracks.length, progress: 0 }
          : { index: current.index, progress: next };
      });
    }, TICK_MS);

    return () => clearInterval(id);
  }, [playing]);

  const track = tracks[index];
  const bars = useMemo(() => waveform(track.title), [track.title]);
  const accent = index % ACCENT_BAR.length;
  const upNext = [1, 2].map((step) => tracks[(index + step) % tracks.length]);

  const move = (delta: number) =>
    setState(({ index: current }) => ({
      index: (current + delta + tracks.length) % tracks.length,
      progress: 0,
    }));

  const scrub = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    setState((current) => ({
      index: current.index,
      progress: Math.min(Math.max(ratio, 0), 0.995),
    }));
  };

  return (
    <div
      className={cn(
        "panel flex flex-col justify-between gap-6 rounded-2xl p-7 md:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink-4 uppercase">
            Listening to
          </p>
          <p
            className="mt-3 truncate font-display text-2xl font-medium tracking-[-0.02em] text-ink"
            title={track.title}
          >
            {track.title}
          </p>
          <p className="mt-1.5 truncate text-sm text-ink-3">
            {track.artist} · {track.album}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-wider text-ink-4 uppercase">
          <SpotifyMark />
          Spotify
        </span>
      </div>

      <div>
        <button
          type="button"
          onClick={scrub}
          aria-label={`Scrub ${track.title}`}
          className="relative h-12 w-full cursor-pointer"
        >
          <span className="absolute inset-0 flex items-center gap-[2px]">
            {bars.map((height, i) => (
              <span
                key={i}
                aria-hidden
                className="flex-1 rounded-full bg-hairline-strong opacity-70"
                style={{ height: `${height * 100}%` }}
              />
            ))}
          </span>

          {/* The played portion is the same waveform, clipped to the cursor. */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center gap-[2px]"
            style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}
          >
            {bars.map((height, i) => (
              <span
                key={i}
                className={cn("flex-1 rounded-full", ACCENT_BAR[accent])}
                style={{ height: `${height * 100}%` }}
              />
            ))}
          </span>
        </button>

        <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-ink-4 tabular">
          <span className={ACCENT_TEXT[accent]}>
            {clock(progress * track.duration)}
          </span>
          <span>{clock(track.duration)}</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-hairline pt-5">
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink-4 uppercase">
            Up next
          </p>
          <ul className="mt-2 space-y-1">
            {upNext.map((next) => (
              <li key={next.title} className="truncate text-xs text-ink-3">
                {next.title}{" "}
                <span className="text-ink-4">— {next.artist}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Control label="Previous track" onClick={() => move(-1)}>
            <svg viewBox="0 0 24 24" className="size-3" fill="currentColor">
              <path d="M7 5h2v14H7zm12 0v14l-9-7z" />
            </svg>
          </Control>
          <Control
            label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="size-3" fill="currentColor">
                <path d="M8 5h3v14H8zm5 0h3v14h-3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-3" fill="currentColor">
                <path d="M8 5l11 7-11 7z" />
              </svg>
            )}
          </Control>
          <Control label="Next track" onClick={() => move(1)}>
            <svg viewBox="0 0 24 24" className="size-3" fill="currentColor">
              <path d="M15 5h2v14h-2zM5 5l9 7-9 7z" />
            </svg>
          </Control>
          <span className="ml-2 font-mono text-[10px] text-ink-4 tabular">
            {String(index + 1).padStart(2, "0")}/{tracks.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
