import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/server/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: "/api/",
      userAgent: "*",
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}
