import { tracks } from "@/lib/data/listening";
import { cn } from "@/lib/utils";

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

const NowPlaying = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "panel flex flex-col gap-5 rounded-2xl p-7 md:p-8",
      className,
    )}
  >
    <div className="flex items-center justify-between">
      <p className="font-mono text-[10px] tracking-[0.18em] text-ink-4 uppercase">
        Songs that get me work
      </p>
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-ink-4 uppercase">
        <SpotifyMark />
        Spotify
      </span>
    </div>

    <div className="flex flex-col divide-y divide-hairline max-h-52 overflow-auto">
      {tracks.map((track, i) => (
        <li
          key={track.title}
          className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
        >
          <span
            className={cn(
              "font-mono text-xs tabular",
              ACCENT_TEXT[i % ACCENT_TEXT.length],
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">
              {track.title}
            </p>
            <p className="truncate text-xs text-ink-3">
              {track.artist} · {track.album}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[10px] text-ink-4 tabular">
            {clock(track.duration)}
          </span>
        </li>
      ))}
    </div>
  </div>
);

export default NowPlaying;
