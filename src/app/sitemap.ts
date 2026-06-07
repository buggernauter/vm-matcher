import type { MetadataRoute } from "next";

import {
  getBestAvailableWorldCupSchedulePayload,
  getWorldCupMatchEntries,
} from "@/server/world-cup";
import {
  getMatchCanonicalUrl,
  getScheduleCanonicalUrl,
  getWorldCupDayPath,
} from "@/server/world-cup-seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const schedule = await getBestAvailableWorldCupSchedulePayload();
  const lastModified = new Date(schedule.syncedAt);
  const matchEntries = getWorldCupMatchEntries(schedule);

  return [
    {
      changeFrequency: "hourly",
      lastModified,
      priority: 1,
      url: getScheduleCanonicalUrl(),
    },
    ...schedule.matchDays.map((day) => ({
      changeFrequency: "daily" as const,
      lastModified,
      priority: 0.8,
      url: new URL(getWorldCupDayPath(day.date), `${getScheduleCanonicalUrl()}/`)
        .toString(),
    })),
    ...matchEntries.map((entry) => ({
      changeFrequency: "daily" as const,
      lastModified,
      priority: 0.7,
      url: getMatchCanonicalUrl(entry.match.id),
    })),
  ];
}
