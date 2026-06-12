const [{ worldCupData }, { buildWorldCupMatchId }, { isFinishedMatch, shouldRunOpenAIForMatch }] =
	await Promise.all([
		import(new URL('../../src/server/data/data.ts', import.meta.url).href),
		import(new URL('../../src/server/data/match-id.ts', import.meta.url).href),
		import(new URL('./match-window.mts', import.meta.url).href),
	]);

import type { RunnableMatch, StoredMatchResult } from './types.mts';

// Collects the finished matches that are still missing results and are allowed to trigger an OpenAI lookup.
export const getRunnableMatches = ({
	existingResults,
	isForcedRun,
	now,
}: {
	existingResults: Record<string, StoredMatchResult>;
	isForcedRun: boolean;
	now: number;
}) => {
	const runnableMatches: RunnableMatch[] = [];

	for (const day of worldCupData) {
		for (const [matchIndex, match] of day.matches.entries()) {
			const matchId = buildWorldCupMatchId({
				awayTeam: match.awayTeam,
				date: day.date,
				homeTeam: match.homeTeam,
				matchIndex,
				startTime: match.startTime,
			});

			if (!isFinishedMatch(day.date, match.startTime, now)) {
				continue;
			}

			const runnableMatch: RunnableMatch = {
				awayTeam: match.awayTeam,
				date: day.date,
				hasBaseResult: Boolean(match.result),
				hasStoredResult: Boolean(existingResults[matchId]),
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
