import type { WorldCup } from '../src/types/index.ts';
import type {
	OpenAIResponsePayload,
	PendingPlayoffMatch,
	RunnableMatch,
} from './world-cup-results/types.mts';

const [
	{ fetchResultsFromOpenAI },
	{ readStoredSchedule, writeScheduleFile },
	{ getPendingPlayoffMatches, getRunnableMatches },
	{ getTeamRanking },
] = await Promise.all([
	import(new URL('./world-cup-results/openai-client.mts', import.meta.url).href),
	import(new URL('./world-cup-results/schedule-file.mts', import.meta.url).href),
	import(new URL('./world-cup-results/runnable-matches.mts', import.meta.url).href),
	import(new URL('../src/server/data/team-rankings.ts', import.meta.url).href),
]);

const isDryRun = process.argv.includes('--dry-run');
const isForcedRun = process.env.FORCE_RESULT_UPDATE === 'true';

// Main flow: find runnable matches, optionally ask OpenAI for results, then persist any new scores.
const main = async () => {
	const storedSchedule: WorldCup[] = await readStoredSchedule();
	const runnableMatches: RunnableMatch[] = getRunnableMatches({
		isForcedRun,
		now: Date.now(),
		schedule: storedSchedule,
	});
	const pendingPlayoffMatches: PendingPlayoffMatch[] = getPendingPlayoffMatches(storedSchedule);

	if (runnableMatches.length === 0 && (!isForcedRun || pendingPlayoffMatches.length === 0)) {
		console.log(
			JSON.stringify(
				{
					message:
						'Skipping OpenAI request because no finished unresolved match is inside the result-check window and no forced playoff refresh is active.',
					pendingPlayoffMatches: pendingPlayoffMatches.length,
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
					pendingPlayoffMatches,
					runnableMatches,
					scheduledMatches: storedSchedule.reduce((count, day) => count + day.matches.length, 0),
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
		playoffMatchesToResolve: pendingPlayoffMatches,
	});
	const runnableMatchIds = new Set(runnableMatches.map((match) => match.id));
	const knownPlayoffMatchIds = new Set(pendingPlayoffMatches.map((match) => match.id));
	let appliedResultCount = 0;
	let appliedPlayoffTeamCount = 0;

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

			const playoffUpdate = openAIResults.playoffTeams.find((item) => item.matchId === match.id);

			if (playoffUpdate && knownPlayoffMatchIds.has(match.id)) {
				const homeTeamRanking = getTeamRanking(playoffUpdate.homeTeam) ?? nextMatch.homeTeamRanking;
				const awayTeamRanking = getTeamRanking(playoffUpdate.awayTeam) ?? nextMatch.awayTeamRanking;

				if (
					playoffUpdate.homeTeam !== nextMatch.homeTeam ||
					playoffUpdate.awayTeam !== nextMatch.awayTeam ||
					homeTeamRanking !== nextMatch.homeTeamRanking ||
					awayTeamRanking !== nextMatch.awayTeamRanking
				) {
					nextMatch = {
						...nextMatch,
						awayTeam: playoffUpdate.awayTeam,
						awayTeamRanking,
						homeTeam: playoffUpdate.homeTeam,
						homeTeamRanking,
					};
					appliedPlayoffTeamCount += 1;
				}
			}

			return nextMatch;
		}),
	}));

	const didWriteFile = await writeScheduleFile(mergedSchedule);

	console.log(
		JSON.stringify(
			{
				playoffTeamsApplied: appliedPlayoffTeamCount,
				playoffTeamsFound: openAIResults.playoffTeams.length,
				resultsApplied: appliedResultCount,
				resultsFound: openAIResults.results.length,
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
