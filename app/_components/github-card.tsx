import SpotlightCard from "@/components/spotlight-card";
import type { GitHubUser } from "@/lib/github";

/**
 * Live GitHub profile card. The avatar is served through /api/github/avatar
 * so it always reflects the latest picture while staying cached.
 */
const GithubCard = ({ user }: { user: GitHubUser | null }) => {
  const stats = [
    { label: "Followers", value: user?.followers },
    { label: "Repos", value: user?.public_repos },
    { label: "Following", value: user?.following },
  ];

  const memberSince = user?.created_at
    ? new Date(user.created_at).getFullYear()
    : null;

  return (
    <SpotlightCard
      external
      href={user?.html_url ?? "https://github.com/ujen5173"}
      target="_blank"
      rel="noopener noreferrer"
      className="panel group block rounded-2xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/30"
    >
      <div className="flex items-center gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-hairline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/api/github/avatar"
            alt={`${user?.name ?? "Ujen Basi"} on GitHub`}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">
            {user?.name ?? "Ujen Basi"}
          </p>
          <p className="font-mono text-xs text-primary">
            @{user?.login ?? "ujen5173"}
          </p>
          {memberSince ? (
            <p className="mt-0.5 font-mono text-[11px] text-ink-4">
              since {memberSince}
            </p>
          ) : null}
        </div>

        <span
          aria-hidden
          className="self-start text-ink-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        >
          ↗
        </span>
      </div>

      <dl className="mt-6 grid grid-cols-3 divide-x divide-hairline border-t border-hairline pt-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-3 first:pl-0 last:pr-0">
            <dd className="text-lg font-medium text-ink tabular">
              {stat.value ?? "—"}
            </dd>
            <dt className="mt-0.5 font-mono text-[10px] tracking-wider text-ink-4 uppercase">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </SpotlightCard>
  );
};

export default GithubCard;
