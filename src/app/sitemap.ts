// This file is automatically detected by Next.js and is used to generate the sitemap.xml
// The output will be accessible at: https://dhakalnirajan.com.np/sitemap.xml

const siteUrl = 'https://dhakalnirajan.com.np';

/**
 * @returns {Array<{url: string, lastModified?: string | Date, changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never', priority?: number}>}
 */
export default async function sitemap() {
  // 1. Define Static Pages
  // Only the root URL is included based on your current page structure.
  const staticRoutes = [
    {
      url: siteUrl, // Corresponds to src/app/page.tsx
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1, // Highest priority for the homepage
    },
    // Add any other static pages here as you create them, e.g.:
    // {
    //   url: `${siteUrl}/projects`, // If you create src/app/projects/page.tsx
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];

  // 2. Define Dynamic Pages (e.g., Blog Posts or Portfolio Items)
  // If you ever add dynamic content, you must fetch the slugs here to include them in the sitemap.
  // Example:
  /*
  const projects = await fetchPortfolioItems(); // Replace with your actual data fetching logic

  const projectRoutes = projects.map((item) => ({
    url: `${siteUrl}/portfolio/${item.slug}`,
    lastModified: item.updatedAt || item.createdAt, // Use the latest modification date
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  */

  return [...staticRoutes]; // If you use dynamic routes, remember to spread them into this array!
}
