import { normalizeTeamName } from "@/lib/helper";
import type { MatchParticipant, WCMatch, WCMatchDay } from "../types/wc-match";

import type { MappedFixture } from "./world-cup-mapper";

type MatchCandidate = {
  date: string;
  dayIndex: number;
  match: WCMatch;
  matchIndex: number;
};

const getTeamName = (side: MatchParticipant) =>
  side.kind === "team" ? side.teamName : undefined;

const getTeamMatchScore = (candidate: WCMatch, fixture: MappedFixture) => {
  let score = 0;

  const staticHomeTeamName = getTeamName(candidate.homeSide);
  const staticAwayTeamName = getTeamName(candidate.awaySide);
  const apiHomeTeamName = fixture.homeSide
    ? getTeamName(fixture.homeSide)
    : undefined;
  const apiAwayTeamName = fixture.awaySide
    ? getTeamName(fixture.awaySide)
    : undefined;

  if (staticHomeTeamName && apiHomeTeamName) {
    score +=
      normalizeTeamName(staticHomeTeamName) ===
      normalizeTeamName(apiHomeTeamName)
        ? 4
        : -2;
  }

  if (staticAwayTeamName && apiAwayTeamName) {
    score +=
      normalizeTeamName(staticAwayTeamName) ===
      normalizeTeamName(apiAwayTeamName)
        ? 4
        : -2;
  }

  return score;
};

const findBestMatchingCandidate = (
  candidates: MatchCandidate[],
  fixture: MappedFixture,
  usedCandidates: Set<string>,
) => {
  const matchingDateAndTime = candidates.filter(
    (candidate) =>
      candidate.date === fixture.date &&
      candidate.match.time === fixture.time &&
      !usedCandidates.has(candidate.match.id),
  );

  if (matchingDateAndTime.length === 1) {
    return matchingDateAndTime[0];
  }

  const rankedCandidates = matchingDateAndTime
    .map((candidate) => ({
      candidate,
      score: getTeamMatchScore(candidate.match, fixture),
    }))
    .sort((left, right) => right.score - left.score);

  const bestCandidate = rankedCandidates[0];

  if (!bestCandidate || bestCandidate.score < 1) {
    return;
  }

  return bestCandidate.candidate;
};

const mergeFixtureDataIntoMatch = (
  match: WCMatch,
  fixture: MappedFixture,
): WCMatch => ({
  ...match,
  awaySide: fixture.awaySide ?? match.awaySide,
  homeSide: fixture.homeSide ?? match.homeSide,
  result: fixture.result ?? match.result,
});

export const mergeFixturesIntoMatchDays = (
  matchDays: WCMatchDay[],
  fixtures: MappedFixture[],
) => {
  const nextMatchDays = matchDays.map((day) => ({
    ...day,
    matches: day.matches.map((match) => ({ ...match })),
  }));
  const candidates = nextMatchDays.flatMap((day, dayIndex) =>
    day.matches.map((match, matchIndex) => ({
      date: day.date,
      dayIndex,
      match,
      matchIndex,
    })),
  );
  const usedCandidates = new Set<string>();
  let updatedMatchesCount = 0;

  for (const fixture of fixtures) {
    const matchingCandidate = findBestMatchingCandidate(
      candidates,
      fixture,
      usedCandidates,
    );

    if (!matchingCandidate) {
      continue;
    }

    const nextMatch = mergeFixtureDataIntoMatch(
      matchingCandidate.match,
      fixture,
    );

    nextMatchDays[matchingCandidate.dayIndex].matches[
      matchingCandidate.matchIndex
    ] = nextMatch;
    usedCandidates.add(matchingCandidate.match.id);

    if (fixture.result) {
      updatedMatchesCount += 1;
    }
  }

  return {
    matchDays: nextMatchDays,
    updatedMatchesCount,
  };
};
