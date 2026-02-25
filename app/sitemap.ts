import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/sanity/queries";
import { PROJECTS } from "@/app/data/projects";

const SITE_URL = "https://neilsandoz.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic project pages — try Sanity, fall back to static
  let slugs: string[] = [];
  try {
    slugs = await getAllProjectSlugs();
  } catch {}
  if (!slugs.length) slugs = PROJECTS.map((p) => p.slug);

  const projectPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
