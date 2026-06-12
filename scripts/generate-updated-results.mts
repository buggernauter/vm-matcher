const [
	{ fetchResultsFromOpenAI },
	{ readStoredResults, writeResultsFile },
	{ getRunnableMatches },
] = await Promise.all([
	import(new URL('./world-cup-results/openai-client.mts', import.meta.url).href),
	import(new URL('./world-cup-results/results-file.mts', import.meta.url).href),
	import(new URL('./world-cup-results/runnable-matches.mts', import.meta.url).href),
]);

const isDryRun = process.argv.includes('--dry-run');
const isForcedRun = process.env.FORCE_RESULT_UPDATE === 'true';

// Main flow: find runnable matches, optionally ask OpenAI for results, then persist any new scores.
const main = async () => {
	const existingResults = await readStoredResults();
	const runnableMatches = getRunnableMatches({
		existingResults,
		isForcedRun,
		now: Date.now(),
	});

	if (runnableMatches.length === 0) {
		console.log(
			JSON.stringify(
				{
					message:
						'Skipping OpenAI request because no finished match without a stored result is inside the result-check window.',
					storedResults: Object.keys(existingResults).length,
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
					existingResults: Object.keys(existingResults).length,
					runnableMatches,
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

	const openAIResults = await fetchResultsFromOpenAI(runnableMatches);
	const mergedResults = { ...existingResults };

	for (const result of openAIResults.results) {
		if (!runnableMatches.some((match: (typeof runnableMatches)[number]) => match.id === result.matchId)) {
			continue;
		}

		mergedResults[result.matchId] = {
			awayScore: result.awayScore,
			homeScore: result.homeScore,
			sourceUrl: result.sourceUrl,
		};
	}

	const didWriteFile = await writeResultsFile(mergedResults);

	console.log(
		JSON.stringify(
			{
				resultsFound: openAIResults.results.length,
				resultsStored: Object.keys(mergedResults).length,
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
