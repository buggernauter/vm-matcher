const { isFinishedMatch, shouldRunOpenAIForMatch } = await import(
	new URL('./match-window.mts', import.meta.url).href
);

import type { PendingMatch, RunnableMatch } from './types.mts';
import type { WorldCup } from '../../src/types/index.ts';

// Matches placeholder values like 1A, 3EFGIJ, W73, RU101.
const UNRESOLVED_TEAM_PATTERN = /^(?:[12][A-Z]|3[A-Z/]+|W\d+|(?:L|RU)\d+)$/;

// Collects the finished matches that are still missing results and are allowed to trigger an OpenAI lookup.
export const getRunnableMatches = ({
	isForcedRun,
	now,
	schedule,
}: {
	isForcedRun: boolean;
	now: number;
	schedule: WorldCup[];
}) => {
	const runnableMatches: RunnableMatch[] = [];

	for (const day of schedule) {
		for (const match of day.matches) {
			const matchId = match.id;

			if (!isFinishedMatch(day.date, match.startTime, now)) {
				continue;
			}

			const runnableMatch: RunnableMatch = {
				awayTeam: match.awayTeam,
				date: day.date,
				groupOrRound: match.groupOrRound,
				hasBaseResult: Boolean(match.result),
				homeTeam: match.homeTeam,
				id: matchId,
				startTime: match.startTime,
			};

			if (!isForcedRun && !shouldRunOpenAIForMatch({ ...runnableMatch, now })) {
				continue;
			}

			runnableMatches.push(runnableMatch);
		}
	}

	return runnableMatches;
};

// Collects all upcoming matches where at least one team slot is still an unconfirmed placeholder
// (e.g. W73, 1B, 3EFGIJ). OpenAI resolves these based on official FIFA announcements.
export const getMatchesWithUnresolvedTeams = (schedule: WorldCup[]): PendingMatch[] => {
	const unresolvedMatches: PendingMatch[] = [];

	for (const day of schedule) {
		for (const match of day.matches) {
			if (match.result) {
				continue;
			}

			if (
				!UNRESOLVED_TEAM_PATTERN.test(match.homeTeam) &&
				!UNRESOLVED_TEAM_PATTERN.test(match.awayTeam)
			) {
				continue;
			}

			unresolvedMatches.push({
				awayTeam: match.awayTeam,
				date: day.date,
				groupOrRound: match.groupOrRound,
				homeTeam: match.homeTeam,
				id: match.id,
				startTime: match.startTime,
			});
		}
	}

	return unresolvedMatches;
};
