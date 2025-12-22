// GitHub API Types
// Can be safely imported by both server and client components

export interface GithubProfile {
  username: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GithubContributions {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface GithubActivity {
  action: string;
  repo: string;
  branch: string;
  time: string;
  icon: string;
}

export interface GithubData {
  profile: GithubProfile | null;
  contributions: GithubContributions | null;
  activities: GithubActivity[];
}
