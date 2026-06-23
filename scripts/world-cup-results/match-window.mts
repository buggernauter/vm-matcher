const { MIN_MATCH_AGE_BEFORE_CHECK_MS, STOCKHOLM_SUMMER_OFFSET, TWO_HOURS_IN_MS } = await import(
	new URL('./config.mts', import.meta.url).href,
);

// Converts the match date and start time into a comparable kickoff timestamp.
export const parseKickoffTime = (date: string, startTime: string) =>
	new Date(`${date}T${startTime.replace('.', ':')}:00${STOCKHOLM_SUMMER_OFFSET}`);

// Treats a match as finished two hours after kickoff.
export const isFinishedMatch = (date: string, startTime: string, now: number) =>
	now >= parseKickoffTime(date, startTime).getTime() + TWO_HOURS_IN_MS;

// Only allow an OpenAI lookup once the match is old enough to reasonably be finished, and never if a result already exists.
export const shouldRunOpenAIForMatch = ({
	date,
	hasBaseResult,
	now,
	startTime,
}: {
	date: string;
	hasBaseResult: boolean;
	now: number;
	startTime: string;
}) => {
	if (hasBaseResult) {
		return false;
	}

	const earliestCheckTime = parseKickoffTime(date, startTime).getTime() + MIN_MATCH_AGE_BEFORE_CHECK_MS;

	return now >= earliestCheckTime;
};
