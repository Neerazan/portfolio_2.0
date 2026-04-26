import type { GithubData } from "@/src/lib/github.types";
import ClientPageContent from "./ClientPageContent";

interface PageContentProps {
  githubData: GithubData;
}

// Server component — no dynamic imports with ssr:false here
export default function PageContent({ githubData }: PageContentProps) {
  return <ClientPageContent githubData={githubData} />;
}
