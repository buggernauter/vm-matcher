import type { MetadataRoute } from "next";

import { getBestAvailableWorldCupSchedulePayload } from "@/server/world-cup";
import { getScheduleCanonicalUrl } from "@/server/world-cup-seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const schedule = await getBestAvailableWorldCupSchedulePayload();

  return [
    {
      changeFrequency: "hourly",

      lastModified: new Date(schedule.syncedAt),

      priority: 1,

      url: getScheduleCanonicalUrl(),
    },
  ];
}
