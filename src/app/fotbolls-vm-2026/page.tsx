import type { Metadata } from "next";
import { WorldCupScheduleContainer } from "@/features/world-cup";
import { getBestAvailableWorldCupSchedulePayload } from "@/server/world-cup";
import {
  buildWebsiteJsonLd,
  getScheduleCanonicalUrl,
} from "@/server/world-cup-seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/fotbolls-vm-2026",
  },
  description:
    "Se hela spelschemat för Fotbolls-VM 2026 med svenska tider, dagens matcher, resultat, gruppspel och slutspel.",
  openGraph: {
    description:
      "Se hela spelschemat för Fotbolls-VM 2026 med svenska tider, dagens matcher, resultat, gruppspel och slutspel.",
    title: "Fotbolls-VM 2026 spelschema – matcher, tider och resultat",
    url: getScheduleCanonicalUrl(),
  },
  title: "Fotbolls-VM 2026 spelschema – matcher, tider och resultat",
  twitter: {
    description:
      "Se hela spelschemat för Fotbolls-VM 2026 med svenska tider, dagens matcher, resultat, gruppspel och slutspel.",
    title: "Fotbolls-VM 2026 spelschema – matcher, tider och resultat",
  },
};

export default async function WorldCupSchedulePage() {
  const schedule = await getBestAvailableWorldCupSchedulePayload();

  return (
    <WorldCupScheduleContainer
      schedule={schedule}
      websiteJsonLd={buildWebsiteJsonLd()}
    />
  );
}
