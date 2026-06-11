import type { MatchToCheck, ScrapedMatchResult } from '../types/tournament';
import { endpoints } from './endpoints';

type FetchMatchResultResponse = {
	result: ScrapedMatchResult | null;
};

export const fetchGameResult = async (
	matchToCheck: MatchToCheck,
): Promise<ScrapedMatchResult | null> => {
	const response = await fetch(endpoints.macthResult, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(matchToCheck),
	});

	if (!response.ok) {
		throw new Error(`World Cup schedule request failed: ${response.status}`);
	}

	const { result } = (await response.json()) as FetchMatchResultResponse;
	return result;
};
