const { isFinishedMatch, shouldRunOpenAIForMatch } = await import(
	new URL('./match-window.mts', import.meta.url).href,
);

import type { PendingPlayoffMatch, RunnableMatch } from './types.mts';
import type { WorldCup } from '../../src/types/index.ts';

const PLAYOFF_ROUND_PATTERN =
	/(?:16-delsfinal|åttondelsfinal|kvartsfinal|semifinal|bronsmatch|VM-final)/i;
const UNRESOLVED_PLAYOFF_SIDE_PATTERN = /^(?:[12][A-Z]|3[A-Z/]+|W\d+|(?:L|RU)\d+)$/;

const isPlayoffMatch = (groupOrRound: string) => PLAYOFF_ROUND_PATTERN.test(groupOrRound);
const hasUnresolvedPlayoffSide = (teamName: string) => UNRESOLVED_PLAYOFF_SIDE_PATTERN.test(teamName);

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

export const getPendingPlayoffMatches = (schedule: WorldCup[]) => {
	const pendingPlayoffMatches: PendingPlayoffMatch[] = [];

	for (const day of schedule) {
		for (const match of day.matches) {
			if (!isPlayoffMatch(match.groupOrRound) || match.result) {
				continue;
			}

			if (
				!hasUnresolvedPlayoffSide(match.homeTeam) &&
				!hasUnresolvedPlayoffSide(match.awayTeam)
			) {
				continue;
			}

			pendingPlayoffMatches.push({
				awayTeam: match.awayTeam,
				date: day.date,
				groupOrRound: match.groupOrRound,
				homeTeam: match.homeTeam,
				id: match.id,
				startTime: match.startTime,
			});
		}
	}

	return pendingPlayoffMatches;
};
