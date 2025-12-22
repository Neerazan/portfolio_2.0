import "server-only";

// Re-export types for convenience
export type {
  ContributionDay,
  ContributionWeek, GithubActivity, GithubContributions, GithubData, GithubProfile
} from "./github.types";

import type {
  GithubActivity,
  GithubContributions,
  GithubData,
  GithubProfile,
} from "./github.types";

// =============================================================================
// CONFIG
// =============================================================================

const GITHUB_USERNAME = "neerazan";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const REVALIDATE_SECONDS = 3600; // 1 hour

// =============================================================================
// HELPERS
// =============================================================================

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

function parseEventType(
  event: { type: string; payload?: { action?: string; ref_type?: string } }
): { action: string; icon: string } | null {
  switch (event.type) {
    case "PushEvent":
      return { action: "Pushed to", icon: "↑" };
    case "PullRequestEvent":
      return {
        action: event.payload?.action === "opened" ? "Opened PR in" : "Updated PR in",
        icon: "⎇",
      };
    case "CreateEvent":
      return {
        action: event.payload?.ref_type === "repository" ? "Created" : "Created branch in",
        icon: "+",
      };
    case "PullRequestReviewEvent":
      return { action: "Reviewed PR in", icon: "✓" };
    default:
      return null;
  }
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

export async function getGithubProfile(): Promise<GithubProfile | null> {
  // We'll now fetch this in getGithubData via GraphQL for efficiency and to get total stars
  return null;
}

export async function getGithubContributionsAndProfile(): Promise<{ profile: GithubProfile, contributions: GithubContributions } | null> {
  if (!GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set, skipping GitHub fetch");
    return null;
  }

  const query = `
    query ($login: String!) {
      user(login: $login) {
        login
        avatarUrl
        url
        repositories(first: 100, ownerAffiliations: OWNER) {
          totalCount
          nodes {
            stargazerCount
          }
        }
        followers {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { login: GITHUB_USERNAME },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error("GitHub GraphQL API error:", response.status);
      return null;
    }

    const { data, errors } = await response.json();

    if (errors) {
      console.error("GitHub GraphQL errors:", errors);
      return null;
    }

    const user = data?.user;
    if (!user) return null;

    const calendar = user.contributionsCollection?.contributionCalendar;
    const totalStars = user.repositories?.nodes?.reduce(
      (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
      0
    ) || 0;

    return {
      profile: {
        username: user.login,
        avatarUrl: user.avatarUrl,
        htmlUrl: user.url,
        publicRepos: user.repositories?.totalCount || 0,
        followers: user.followers?.totalCount || 0,
        totalStars,
      },
      contributions: {
        totalContributions: calendar?.totalContributions || 0,
        weeks: calendar?.weeks || [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch GitHub data via GraphQL:", error);
    return null;
  }
}

export async function getGithubActivity(limit = 4): Promise<GithubActivity[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`,
      {
        headers: GITHUB_TOKEN
          ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
          : {},
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );

    if (!response.ok) {
      console.error("GitHub Events API error:", response.status);
      return [];
    }

    const events = await response.json();
    const activities: GithubActivity[] = [];

    for (const event of events) {
      if (activities.length >= limit) break;

      const parsed = parseEventType(event);
      if (!parsed) continue;

      activities.push({
        action: parsed.action,
        repo: event.repo?.name?.split("/")[1] || event.repo?.name || "unknown",
        branch: event.payload?.ref?.replace("refs/heads/", "") || "",
        time: getRelativeTime(event.created_at),
        icon: parsed.icon,
      });
    }

    return activities;
  } catch (error) {
    console.error("Failed to fetch GitHub activity:", error);
    return [];
  }
}

// =============================================================================
// COMBINED FETCHER
// =============================================================================

export async function getGithubData(): Promise<GithubData> {
  const [mainData, activities] = await Promise.all([
    getGithubContributionsAndProfile(),
    getGithubActivity(4),
  ]);

  return {
    profile: mainData?.profile || null,
    contributions: mainData?.contributions || null,
    activities,
  };
}
