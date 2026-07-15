import { MetadataRoute } from "next";
import { getProjectsMeta } from "@/lib/projects";
import { getJournalMeta } from "@/lib/journal";
import { SITE_URL } from "@/lib/constants";

const baseUrl = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjectsMeta().map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const journal = getJournalMeta().map((j) => ({
    url: `${baseUrl}/journal/${j.slug}`,
    lastModified: new Date(j.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...projects,
    ...journal,
  ];
}
