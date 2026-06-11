import type { MetadataRoute } from "next";

import { getScheduleCanonicalUrl } from "@/server/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "daily",

      priority: 1,

      url: getScheduleCanonicalUrl(),
    },
  ];
}
