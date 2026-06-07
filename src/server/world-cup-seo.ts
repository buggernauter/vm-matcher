import {
  resolveMatchResultDisplay,
  resolveMatchSideDisplayName,
} from "../lib/wc-match";
import type { WCMatch, WorldCupMatchEntry } from "../types/wc-match";

import { getAbsoluteUrl } from "./site";

export const WORLD_CUP_SCHEDULE_PATH = "/fotbolls-vm-2026";

const SWEDISH_LONG_DATE_FORMATTER = new Intl.DateTimeFormat("sv-SE", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Stockholm",
  year: "numeric",
});

export const formatLongSwedishDate = (date: string) =>
  SWEDISH_LONG_DATE_FORMATTER.format(new Date(`${date}T12:00:00`));

export const getMatchTeamsLabel = (match: WCMatch) =>
  `${resolveMatchSideDisplayName(match.homeSide)} - ${resolveMatchSideDisplayName(match.awaySide)}`;

export const getMatchResultLabel = (match: WCMatch) =>
  resolveMatchResultDisplay(match.result);

export const getMatchSummaryLabel = (entry: WorldCupMatchEntry) => {
  const resultLabel = getMatchResultLabel(entry.match);
  const baseLabel = `${getMatchTeamsLabel(entry.match)}, ${entry.day.label} kl. ${entry.match.time}`;

  return resultLabel ? `${baseLabel}, resultat ${resultLabel}` : baseLabel;
};

export const getDayMetadataTitle = (date: string) =>
  `Matcher ${formatLongSwedishDate(date)} – Fotbolls-VM 2026`;

export const getDayMetadataDescription = (date: string) =>
  `Se alla matcher i Fotbolls-VM 2026 den ${formatLongSwedishDate(date)} med svenska tider, kanal och resultat.`;

export const buildWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  description:
    "Se hela spelschemat för Fotbolls-VM 2026 med svenska tider, dagens matcher, resultat, gruppspel och slutspel.",
  inLanguage: "sv-SE",
  name: "VM matcher",
  url: getAbsoluteUrl("/"),
});

export const buildBreadcrumbJsonLd = (
  items: Array<{ name: string; url: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    item: item.url,
    name: item.name,
    position: index + 1,
  })),
});

export const getScheduleCanonicalUrl = () =>
  getAbsoluteUrl(WORLD_CUP_SCHEDULE_PATH);

export const getHomeCanonicalUrl = () => getAbsoluteUrl("/");
