import PageContent from "@/src/components/shared/PageContent";
import { getGithubData } from "@/src/lib/github";

export const revalidate = 3600; // ISR: revalidate every hour

export default async function Page() {
  // Fetch GitHub data server-side with ISR
  const githubData = await getGithubData();

  return <PageContent githubData={githubData} />;
}
