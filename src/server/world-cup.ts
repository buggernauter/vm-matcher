import { cache } from "react";

import { staticGroupTeamsByLabel, staticGameDays } from "../dev-api/dev-wc";
import type { WorldCupSchedulePayload } from "../types/wc-match";

import { fetchApiFootballFixturesByCompetition } from "./api-football";
import { WORLD_CUP_LEAGUE_ID, WORLD_CUP_SEASON } from "./world-cup-constants";
import { mapApiFootballFixture } from "./world-cup-mapper";
import { mergeFixturesIntoMatchDays } from "./world-cup-merge";

const getSchedulePayloadBase = () => ({
  groupTeamsByLabel: staticGroupTeamsByLabel,
  matchDays: staticGameDays,
});

export const getWorldCupSchedulePayload =
  async (): Promise<WorldCupSchedulePayload> => {
    const fixturesResponse = await fetchApiFootballFixturesByCompetition(
      WORLD_CUP_LEAGUE_ID,
      WORLD_CUP_SEASON,
    );
    const mappedFixtures = fixturesResponse.response.map(mapApiFootballFixture);
    const mergedSchedule = mergeFixturesIntoMatchDays(
      staticGameDays,
      mappedFixtures,
    );

    return {
      groupTeamsByLabel: staticGroupTeamsByLabel,
      matchDays: mergedSchedule.matchDays,
      source: "hybrid",
      syncedAt: new Date().toISOString(),
    };
  };

export const getStaticWCPayload = (): WorldCupSchedulePayload => ({
  ...getSchedulePayloadBase(),
  source: "static",
  syncedAt: new Date().toISOString(),
});

export const getBestAvailableWorldCupSchedulePayload = cache(
  async (): Promise<WorldCupSchedulePayload> => {
    try {
      return await getWorldCupSchedulePayload();
    } catch {
      return getStaticWCPayload();
    }
  },
);
