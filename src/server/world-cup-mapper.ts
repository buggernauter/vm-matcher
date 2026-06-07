import { createMatchSide } from "../lib/wc-match";
import type { ApiFootballFixtureResponseItem } from "../types/api-football";
import type { MatchParticipant, MatchResult } from "../types/wc-match";

import { FINISHED_STATUS_CODES } from "./world-cup-constants";

export type MappedFixture = {
  awaySide?: MatchParticipant;
  date: string;
  homeSide?: MatchParticipant;
  result?: MatchResult;
  time: string;
};

const toScheduleDate = (fixtureDate: string) => {
  const [year, month, day] = new Intl.DateTimeFormat("sv-SE", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Europe/Stockholm",
    year: "numeric",
  })
    .format(new Date(fixtureDate))
    .split("-");

  return `${year}-${month}-${day}`;
};

const toScheduleTime = (fixtureDate: string) =>
  new Intl.DateTimeFormat("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Stockholm",
  })
    .format(new Date(fixtureDate))
    .replace(":", ".");

const mapFixtureResult = (fixture: ApiFootballFixtureResponseItem) => {
  const { away, home } = fixture.goals;

  if (home === null || away === null) {
    return;
  }

  if (!FINISHED_STATUS_CODES.has(fixture.fixture.status.short)) {
    return;
  }

  return {
    away,
    home,
  };
};

export const mapApiFootballFixture = (
  fixture: ApiFootballFixtureResponseItem,
): MappedFixture => ({
  awaySide: fixture.teams.away.name
    ? createMatchSide(fixture.teams.away.name)
    : undefined,
  date: toScheduleDate(fixture.fixture.date),
  homeSide: fixture.teams.home.name
    ? createMatchSide(fixture.teams.home.name)
    : undefined,
  result: mapFixtureResult(fixture),
  time: toScheduleTime(fixture.fixture.date),
});
