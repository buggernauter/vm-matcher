import {
  resolveMatchResultDisplay,
  resolveMatchSideDisplayName,
} from "../lib/wc-match";
import type {
  WCMatch,
  WCMatchDay,
  WorldCupMatchEntry,
  WorldCupSchedulePayload,
} from "../types/wc-match";

import { getAbsoluteUrl } from "./site";
import { findWorldCupDayByDate, getWorldCupMatchEntries } from "./world-cup";

export const WORLD_CUP_SCHEDULE_PATH = "/fotbolls-vm-2026";

const SWEDISH_LONG_DATE_FORMATTER = new Intl.DateTimeFormat("sv-SE", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Stockholm",
  year: "numeric",
});

export const getWorldCupDayPath = (date: string) =>
  `${WORLD_CUP_SCHEDULE_PATH}/${date}`;

export const getWorldCupMatchPath = (matchId: string) =>
  `${WORLD_CUP_SCHEDULE_PATH}/match/${encodeURIComponent(matchId)}`;

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

export const getMatchMetadataTitle = (entry: WorldCupMatchEntry) => {
  const teamsLabel = getMatchTeamsLabel(entry.match);
  const resultLabel = getMatchResultLabel(entry.match);

  if (resultLabel) {
    return `${teamsLabel} ${resultLabel} – Fotbolls-VM 2026`;
  }

  return `${teamsLabel} – Fotbolls-VM 2026`;
};

export const getMatchMetadataDescription = (entry: WorldCupMatchEntry) => {
  const teamsLabel = getMatchTeamsLabel(entry.match);
  const resultLabel = getMatchResultLabel(entry.match);
  const resultText = resultLabel ? ` Resultat: ${resultLabel}.` : "";
  const broadcasterText = entry.match.broadcaster
    ? ` Kanal: ${entry.match.broadcaster}.`
    : "";

  return `${teamsLabel} spelas ${formatLongSwedishDate(entry.day.date)} kl. ${entry.match.time}. ${entry.match.groupOrRound}.${broadcasterText}${resultText}`.trim();
};

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

export const buildSportsEventJsonLd = (
  entry: WorldCupMatchEntry,
  pathname: string,
) => {
  const resultLabel = getMatchResultLabel(entry.match);

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    description: `${entry.match.groupOrRound}. Svenska tiden är ${entry.match.time}.${entry.match.broadcaster ? ` Sänds på ${entry.match.broadcaster}.` : ""}`,
    endDate: `${entry.day.date}T${entry.match.time.replace(".", ":")}:00+02:00`,
    eventStatus: resultLabel
      ? "https://schema.org/EventCompleted"
      : "https://schema.org/EventScheduled",
    homeTeam: {
      "@type": "Fotbollslag",
      name: resolveMatchSideDisplayName(entry.match.homeSide),
    },
    inLanguage: "sv-SE",
    name: getMatchTeamsLabel(entry.match),
    startDate: `${entry.day.date}T${entry.match.time.replace(".", ":")}:00+02:00`,
    sport: "Association football",
    url: getAbsoluteUrl(pathname),
    ...(resultLabel
      ? {
          competitor: [
            {
              "@type": "Fotbollslag",
              name: resolveMatchSideDisplayName(entry.match.homeSide),
            },
            {
              "@type": "Fotbollslag",
              name: resolveMatchSideDisplayName(entry.match.awaySide),
            },
          ],
        }
      : {}),
    awayTeam: {
      "@type": "Fotbollslag",
      name: resolveMatchSideDisplayName(entry.match.awaySide),
    },
  };
};

export const buildDailySportsEventsJsonLd = (
  day: WCMatchDay,
  schedule: WorldCupSchedulePayload,
) =>
  day.matches
    .map((match) =>
      getWorldCupMatchEntries(schedule).find(
        (entry) => entry.match.id === match.id,
      ),
    )
    .filter((entry): entry is WorldCupMatchEntry => entry !== undefined)
    .map((entry) =>
      buildSportsEventJsonLd(entry, getWorldCupMatchPath(entry.match.id)),
    );

export const getDailyCanonicalUrl = (date: string) =>
  getAbsoluteUrl(getWorldCupDayPath(date));

export const getMatchCanonicalUrl = (matchId: string) =>
  getAbsoluteUrl(getWorldCupMatchPath(matchId));

export const getScheduleCanonicalUrl = () =>
  getAbsoluteUrl(WORLD_CUP_SCHEDULE_PATH);

export const getHomeCanonicalUrl = () => getAbsoluteUrl("/");

export const getUpcomingWorldCupDay = (
  schedule: WorldCupSchedulePayload,
): WCMatchDay => {
  const today = new Intl.DateTimeFormat("sv-SE", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Europe/Stockholm",
    year: "numeric",
  }).format(new Date());

  const matchDay =
    schedule.matchDays.find((day) => day.date >= today) ??
    schedule.matchDays[0];

  return matchDay;
};

export const getWorldCupMatchEntryForDay = (
  schedule: WorldCupSchedulePayload,
  date: string,
) => {
  const day = findWorldCupDayByDate(schedule, date);

  if (!day) {
    return [];
  }

  return getWorldCupMatchEntries(schedule).filter(
    (entry) => entry.day.date === date,
  );
};
