export const GITHUB_USERNAME = "ujen5173";

const GITHUB_API = "https://api.github.com";

/** Revalidate GitHub data every hour to stay fresh without hammering the API. */
const REVALIDATE_SECONDS = 3600;

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GitHubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  pushed_at: string;
  created_at: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: { message: string; sha: string }[];
    ref_type?: string;
    action?: string;
    number?: number;
    /** Fields can be absent on redacted or partial events — treat as optional. */
    pull_request?: { title?: string; html_url?: string; number?: number };
    issue?: { title?: string; html_url?: string; number?: number };
  };
};

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGitHubUser(): Promise<GitHubUser | null> {
  return githubFetch<GitHubUser>(`/users/${GITHUB_USERNAME}`);
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = await githubFetch<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
  );
  return repos?.filter((repo) => !repo.fork) ?? [];
}

/** Repos featured on the homepage, keyed by repo name. */
const FEATURED_REPO_NAMES = [
  "workforge.team",
  "-theReadora-",
  "Ridezio",
  "hash",
] as const;

export async function getFeaturedRepos(): Promise<Map<string, GitHubRepo>> {
  const repos = await getGitHubRepos();
  const byName = new Map<string, GitHubRepo>();
  for (const name of FEATURED_REPO_NAMES) {
    const repo = repos.find((r) => r.name === name);
    if (repo) byName.set(name, repo);
  }
  return byName;
}

/* -------------------------------------------------------------------------
   Derived stats — computed from the repo list, so no extra API budget spent
   ------------------------------------------------------------------------- */

export type LanguageSlice = {
  name: string;
  count: number;
  /** 0–1 share of the total */
  share: number;
};

export type GitHubSummary = {
  totalStars: number;
  totalRepos: number;
  totalForks: number;
  languages: LanguageSlice[];
  recent: {
    name: string;
    url: string;
    description: string | null;
    language: string | null;
    stars: number;
    pushedAt: string;
  }[];
  firstRepoYear: number | null;
};

export async function getGitHubSummary(): Promise<GitHubSummary> {
  const repos = await getGitHubRepos();

  const counts = new Map<string, number>();
  let totalStars = 0;
  let totalForks = 0;

  for (const repo of repos) {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    if (repo.language) {
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
  }

  const languageTotal = [...counts.values()].reduce((a, b) => a + b, 0);
  const languages: LanguageSlice[] = [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      share: languageTotal ? count / languageTotal : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const recent = [...repos]
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
    }));

  const firstRepoYear = repos.reduce<number | null>((acc, repo) => {
    const year = new Date(repo.created_at).getFullYear();
    return acc === null || year < acc ? year : acc;
  }, null);

  return {
    totalStars,
    totalRepos: repos.length,
    totalForks,
    languages,
    recent,
    firstRepoYear,
  };
}

export type ActivityItem = {
  id: string;
  kind: "push" | "create" | "pr" | "issue" | "star";
  title: string;
  repo: string;
  url: string;
  at: string;
};

/** Recent public activity — the "currently building" signal. */
export async function getRecentActivity(): Promise<ActivityItem[]> {
  const events = await githubFetch<GitHubEvent[]>(
    `/users/${GITHUB_USERNAME}/events/public?per_page=30`,
  );
  if (!events) return [];

  const items: ActivityItem[] = [];

  for (const event of events) {
    if (items.length >= 6) break;

    const repo = event.repo.name.split("/")[1] ?? event.repo.name;
    const repoUrl = `https://github.com/${event.repo.name}`;

    switch (event.type) {
      case "PushEvent": {
        const commit = event.payload.commits?.at(-1);
        if (!commit) continue;
        items.push({
          id: event.id,
          kind: "push",
          title: commit.message.split("\n")[0].slice(0, 88),
          repo,
          url: `${repoUrl}/commit/${commit.sha}`,
          at: event.created_at,
        });
        break;
      }
      case "CreateEvent": {
        if (event.payload.ref_type !== "repository") continue;
        items.push({
          id: event.id,
          kind: "create",
          title: `Created ${repo}`,
          repo,
          url: repoUrl,
          at: event.created_at,
        });
        break;
      }
      case "PullRequestEvent": {
        const pr = event.payload.pull_request;
        if (!pr) continue;
        const number = pr.number ?? event.payload.number;
        // Titles are occasionally absent on partial events — fall back to #N.
        const subject = pr.title ?? (number ? `pull request #${number}` : null);
        if (!subject) continue;
        items.push({
          id: event.id,
          kind: "pr",
          title: `${event.payload.action === "closed" ? "Merged" : "Opened"} ${subject}`,
          repo,
          url: pr.html_url ?? repoUrl,
          at: event.created_at,
        });
        break;
      }
      case "IssuesEvent": {
        const issue = event.payload.issue;
        if (!issue?.title) continue;
        items.push({
          id: event.id,
          kind: "issue",
          title: issue.title,
          repo,
          url: issue.html_url ?? repoUrl,
          at: event.created_at,
        });
        break;
      }
      case "WatchEvent": {
        items.push({
          id: event.id,
          kind: "star",
          title: `Starred ${repo}`,
          repo,
          url: repoUrl,
          at: event.created_at,
        });
        break;
      }
      default:
        continue;
    }
  }

  return items;
}
