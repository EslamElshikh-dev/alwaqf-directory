import type { MetadataRoute } from "next";
import { areas, neighborhoods, publicRecords, siteUrl } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/directory`, changeFrequency: "daily", priority: .9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: .5 },
    ...areas.map(area => ({ url: `${siteUrl}/areas/${area.slug}`, changeFrequency: "weekly" as const, priority: .8 })),
    ...neighborhoods.map(n => ({ url: `${siteUrl}/neighborhoods/${encodeURIComponent(n.slug)}`, changeFrequency: "monthly" as const, priority: .6 })),
    ...publicRecords.map(record => ({ url: `${siteUrl}/place/${record.id}`, changeFrequency: "monthly" as const, priority: .65 })),
  ];
}
