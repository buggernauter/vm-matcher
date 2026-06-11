import { normalizeText } from '@/lib/helper';

type ParsedMatchResult = {
	homeScore: number;
	awayScore: number;
};

type Props = {
	text: string;
	homeTeam: string;
	awayTeam: string;
};

export const parseSvtGameResult = ({
	text,
	homeTeam,
	awayTeam,
}: Props): ParsedMatchResult | null => {
	const normalizedText = normalizeText(text);
	const home = normalizeText(homeTeam);
	const away = normalizeText(awayTeam);
	const patterns = [
		new RegExp(`${home}[\\s\\S]{0,50}?(\\d+)\\s*[-–:]\\s*(\\d+)[\\s\\S]{0,50}?${away}`, 'i'),
		new RegExp(`${away}[\\s\\S]{0,50}?(\\d+)\\s*[-–:]\\s*(\\d+)[\\s\\S]{0,50}?${home}`, 'i'),
	];
	for (const pattern of patterns) {
		const match = normalizedText.match(pattern);

		if (!match) {
			continue;
		}
		const firstScore = Number(match[1]);
		const secondScore = Number(match[2]);
		return {
			homeScore: pattern === patterns[0] ? firstScore : secondScore,
			awayScore: pattern === patterns[0] ? secondScore : firstScore,
		};
	}

	return null;
};
export const extractMatchLine = (text: string, searchTerm: string) => {
	const normalizedSearchTerm = normalizeText(searchTerm);
	const lines = text.split(/(?=\d{2}\.\d{2})/).map((line) => line.trim());
	return lines.find((line) => normalizeText(line).includes(normalizedSearchTerm)) ?? null;
};
