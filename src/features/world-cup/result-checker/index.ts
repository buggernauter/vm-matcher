import type { MatchToCheck, ScrapedMatchResult } from '@/types/tournament';
import { extractMatchLine, parseSvtGameResult } from './parser';
const sources = [{ svt: 'https://www.svt.se/sport/fotboll/all-fakta-om-fotbolls-vm-2026' }];

type MatchLookupResult = {
	sourceUrl: string;
	rawText: string;
};

const searchTrustedSources = async (match: MatchToCheck): Promise<MatchLookupResult> => {
	const sourceUrl = sources[0].svt;
	const response = await fetch(sourceUrl);
	if (!response.ok) {
		throw new Error(`SVT fetch failed: ${response.status}`);
	}
	const html = await response.text();
	const text = html
		.replace(/<script[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	const searchTerm = `${match.homeTeam}-${match.awayTeam}`;
	const matchLine = extractMatchLine(text, searchTerm);
	if (!matchLine) {
		return {
			sourceUrl,
			rawText: '',
		};
	}
	return {
		sourceUrl,
		rawText: matchLine,
	};
};

export const fetchResultForMatch = async (
	match: MatchToCheck,
): Promise<ScrapedMatchResult | null> => {
	const lookupResult = await searchTrustedSources(match);
	if (!lookupResult.rawText) {
		return null;
	}
	const parsedResult = parseSvtGameResult({
		text: lookupResult.rawText,
		homeTeam: match.homeTeam,
		awayTeam: match.awayTeam,
	});
	if (!parsedResult) {
		return null;
	}
	return {
		homeScore: parsedResult.homeScore,
		awayScore: parsedResult.awayScore,
		sourceUrl: lookupResult.sourceUrl,
	};
};
