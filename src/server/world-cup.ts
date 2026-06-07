import { cache } from "react";

import {
  staticWcGroupTeamsByLabel,
  staticWcMatchDays,
} from "../dev-api/dev-wc";
import type {
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
