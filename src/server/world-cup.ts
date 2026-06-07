import { cache } from "react";

import {
  staticWcGroupTeamsByLabel,
  staticWcMatchDays,
} from "../dev-api/dev-wc";
import type {
  WCMatchDay,
  WorldCupMatchEntry,
  WorldCupResultSyncPayload,
  WorldCupSchedulePayload,
} from "../types/wc-match";

import { fetchApiFootballFixturesByCompetition } from "./api-football";
import { WORLD_CUP_LEAGUE_ID, WORLD_CUP_SEASON } from "./world-cup-constants";
import { mapApiFootballFixture } from "./world-cup-mapper";
import { mergeFixturesIntoMatchDays } from "./world-cup-merge";

const getSchedulePayloadBase = () => ({
  groupTeamsByLabel: staticWcGroupTeamsByLabel,
  matchDays: staticWcMatchDays,
});

export const getWorldCupSchedulePayload =
  async (): Promise<WorldCupSchedulePayload> => {
    const fixturesResponse = await fetchApiFootballFixturesByCompetition(
      WORLD_CUP_LEAGUE_ID,
      WORLD_CUP_SEASON,
    );
    const mappedFixtures = fixturesResponse.response.map(mapApiFootballFixture);
    const mergedSchedule = mergeFixturesIntoMatchDays(
      staticWcMatchDays,
      mappedFixtures,
    );

    return {
      groupTeamsByLabel: staticWcGroupTeamsByLabel,
      matchDays: mergedSchedule.matchDays,
      source: "hybrid",
      syncedAt: new Date().toISOString(),
    };
  };

export const getWorldCupResultSyncPayload =
  async (): Promise<WorldCupResultSyncPayload> => {
    const schedulePayload = await getWorldCupSchedulePayload();
    const updatedMatchesCount = schedulePayload.matchDays.reduce(
      (count, day) =>
        count + day.matches.filter((match) => match.result).length,
      0,
    );

    return {
      ...schedulePayload,
      updatedMatchesCount,
    };
  };

export const getStaticWorldCupSchedulePayload =
  (): WorldCupSchedulePayload => ({
    ...getSchedulePayloadBase(),
    source: "static",
    syncedAt: new Date().toISOString(),
  });

export const getBestAvailableWorldCupSchedulePayload = cache(
  async (): Promise<WorldCupSchedulePayload> => {
    try {
      return await getWorldCupSchedulePayload();
    } catch {
      return getStaticWorldCupSchedulePayload();
    }
  },
);

export const getWorldCupMatchEntries = (
  schedule: WorldCupSchedulePayload,
): WorldCupMatchEntry[] =>
  schedule.matchDays.flatMap((day, dayIndex) =>
    day.matches.map((match, matchIndex) => ({
      day,
      dayIndex,
      match,
      matchIndex,
    })),
  );

export const findWorldCupDayByDate = (
  schedule: WorldCupSchedulePayload,
  date: string,
): WCMatchDay | undefined =>
  schedule.matchDays.find((matchDay) => matchDay.date === date);

export const findWorldCupDayIndexByDate = (
  schedule: WorldCupSchedulePayload,
  date: string,
): number =>
  schedule.matchDays.findIndex((matchDay) => matchDay.date === date);

export const findWorldCupMatchEntryById = (
  schedule: WorldCupSchedulePayload,
  matchId: string,
): WorldCupMatchEntry | undefined =>
  getWorldCupMatchEntries(schedule).find((entry) => entry.match.id === matchId);

export const findAdjacentWorldCupDays = (
  schedule: WorldCupSchedulePayload,
  currentDate: string,
) => {
  const currentIndex = findWorldCupDayIndexByDate(schedule, currentDate);

  if (currentIndex === -1) {
    return {};
  }

  return {
    nextDay: schedule.matchDays[currentIndex + 1],
    previousDay: schedule.matchDays[currentIndex - 1],
  };
};
