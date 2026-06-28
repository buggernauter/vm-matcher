import type { WorldCup } from '../src/types/index.ts';
import type { OpenAIResponsePayload, PendingMatch, RunnableMatch } from './world-cup-results/types.mts';

const [
	{ fetchResultsFromOpenAI },
	{ readStoredSchedule, writeScheduleFile },
	{ getRunnableMatches, getMatchesWithUnresolvedTeams },
	{ getTeamRanking },
] = await Promise.all([
	import(new URL('./world-cup-results/openai-client.mts', import.meta.url).href),
	import(new URL('./world-cup-results/schedule-file.mts', import.meta.url).href),
	import(new URL('./world-cup-results/runnable-matches.mts', import.meta.url).href),
	import(new URL('../src/server/data/team-rankings.ts', import.meta.url).href),
]);

const isDryRun = process.argv.includes('--dry-run');
const isForcedRun = process.env.FORCE_RESULT_UPDATE === 'true';

const main = async () => {
	const storedSchedule: WorldCup[] = await readStoredSchedule();
	const runnableMatches: RunnableMatch[] = getRunnableMatches({
		isForcedRun,
		now: Date.now(),
		schedule: storedSchedule,
	});
	const unresolvedMatches: PendingMatch[] = getMatchesWithUnresolvedTeams(storedSchedule);

	if (runnableMatches.length === 0 && unresolvedMatches.length === 0) {
		console.log(
			JSON.stringify(
				{
					message:
						'Skipping OpenAI request because there are no finished unresolved matches and no upcoming matches with unconfirmed teams.',
					scheduledMatches: storedSchedule.reduce((count, day) => count + day.matches.length, 0),
				},
				null,
				2,
			),
		);
		return;
	}

	if (isDryRun) {
		console.log(
			JSON.stringify(
				{
					runnableMatches,
					scheduledMatches: storedSchedule.reduce((count, day) => count + day.matches.length, 0),
					unresolvedMatches,
				},
				null,
				2,
			),
		);
		return;
	}

	if (isForcedRun) {
		console.log('Force mode enabled. Running OpenAI update for runnable matches.');
	}

	const openAIResults: OpenAIResponsePayload = await fetchResultsFromOpenAI({
		pendingMatches: runnableMatches,
		unresolvedMatches,
	});
	const runnableMatchIds = new Set(runnableMatches.map((match) => match.id));
	const unresolvedMatchIds = new Set(unresolvedMatches.map((match) => match.id));
	let appliedResultCount = 0;
	let appliedTeamUpdateCount = 0;

	const mergedSchedule = storedSchedule.map((day) => ({
		...day,
		matches: day.matches.map((match) => {
			let nextMatch = match;
			const resultUpdate = openAIResults.results.find((result) => result.matchId === match.id);

			if (resultUpdate && runnableMatchIds.has(match.id)) {
				nextMatch = {
					...nextMatch,
					result: {
						awayScore: resultUpdate.awayScore,
						homeScore: resultUpdate.homeScore,
						sourceUrl: resultUpdate.sourceUrl,
					},
				};
				appliedResultCount += 1;
			}

			const teamUpdate = openAIResults.teamUpdates.find((item) => item.matchId === match.id);

			if (teamUpdate && unresolvedMatchIds.has(match.id)) {
				const homeTeamRanking = getTeamRanking(teamUpdate.homeTeam) ?? nextMatch.homeTeamRanking;
				const awayTeamRanking = getTeamRanking(teamUpdate.awayTeam) ?? nextMatch.awayTeamRanking;

				if (
					teamUpdate.homeTeam !== nextMatch.homeTeam ||
					teamUpdate.awayTeam !== nextMatch.awayTeam ||
					homeTeamRanking !== nextMatch.homeTeamRanking ||
					awayTeamRanking !== nextMatch.awayTeamRanking
				) {
					nextMatch = {
						...nextMatch,
						awayTeam: teamUpdate.awayTeam,
						awayTeamRanking,
						homeTeam: teamUpdate.homeTeam,
						homeTeamRanking,
					};
					appliedTeamUpdateCount += 1;
				}
			}

			return nextMatch;
		}),
	}));

	const didWriteFile = await writeScheduleFile(mergedSchedule);

	console.log(
		JSON.stringify(
			{
				resultsApplied: appliedResultCount,
				resultsFound: openAIResults.results.length,
				teamUpdatesApplied: appliedTeamUpdateCount,
				teamUpdatesFound: openAIResults.teamUpdates.length,
				updatedFile: didWriteFile,
			},
			null,
			2,
		),
	);
};

void main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
