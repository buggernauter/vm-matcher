import { normalizeMatchTime, normalizeTeamName } from '@/lib/helper';
import { BracketMatchData, BracketRoundData, TournamentGame, TournamentGamesData } from '@/types';
import { resolveMatchSideDisplayName } from '@/lib/tournument';
import { SWEDISH_LONG_DATE_FORMATTER } from '@/server/constants';
import { worldCupSquads } from '@/server/data/squads';

const MATCH_NUMBER_PATTERN = /Match (\d+)/;

type KnockoutMatch = TournamentGame & {
	date: string;
};

type BracketData = {
	finalMatch: BracketMatchData;
	rounds: BracketRoundData[];
	thirdPlaceMatch?: BracketMatchData;
};

type KnockoutRound = {
	id: string;
	label: string;
	layout: BracketRoundData['layout'];
	matchLayout: BracketMatchData['layoutVariant'];
	matches: KnockoutMatch[];
};

const SHORT_WEEKDAY_FORMATTER = new Intl.DateTimeFormat('sv-SE', {
	timeZone: 'Europe/Stockholm',
	weekday: 'short',
});
const DAY_NUMBER_FORMATTER = new Intl.DateTimeFormat('sv-SE', {
	day: 'numeric',
	timeZone: 'Europe/Stockholm',
});
const SHORT_MONTH_FORMATTER = new Intl.DateTimeFormat('sv-SE', {
	month: 'short',
	timeZone: 'Europe/Stockholm',
});

const teamFlagCodeByName = new Map(
	worldCupSquads.map((squad) => [normalizeTeamName(squad.countryName), squad.flagCode]),
);

const buildMeta = ({ date, time }: Pick<KnockoutMatch, 'date' | 'time'>) => {
	return `${SWEDISH_LONG_DATE_FORMATTER.format(new Date(`${date}T00:00:00+02:00`))} • ${normalizeMatchTime(time)}`;
};

const buildCompactDate = (date: string) => {
	const matchDate = new Date(`${date}T12:00:00+02:00`);
	const weekday = SHORT_WEEKDAY_FORMATTER.format(matchDate).replace(/\.$/, '').toLowerCase();
	const day = DAY_NUMBER_FORMATTER.format(matchDate);
	const month = SHORT_MONTH_FORMATTER.format(matchDate).replace(/\.$/, '').toLowerCase();

	return `${weekday} ${day} ${month}`;
};

const buildCompactWeekday = (date: string) =>
	SHORT_WEEKDAY_FORMATTER.format(new Date(`${date}T12:00:00+02:00`))
		.replace(/\.$/, '')
		.toUpperCase();

const buildCompactDayMonth = (date: string) => {
	const matchDate = new Date(`${date}T12:00:00+02:00`);
	const day = DAY_NUMBER_FORMATTER.format(matchDate);
	const month = SHORT_MONTH_FORMATTER.format(matchDate).replace(/\.$/, '').toLowerCase();

	return `${day} ${month}`;
};

const resolveFlagCode = (teamName: string) => teamFlagCodeByName.get(normalizeTeamName(teamName));

const parseMatchNumber = (groupOrRound: string) => {
	const matchNumber = Number(groupOrRound.match(MATCH_NUMBER_PATTERN)?.[1]);

	return Number.isNaN(matchNumber) ? undefined : matchNumber;
};

const compareKnockoutMatchDate = (left: KnockoutMatch, right: KnockoutMatch) =>
	`${left.date}T${left.time}`.localeCompare(`${right.date}T${right.time}`);

const formatRoundTitle = (label: string) =>
	label.length > 0 ? `${label.slice(0, 1).toUpperCase()}${label.slice(1)}` : label;

const getRoundLabel = (groupOrRound: string) => {
	const [, roundLabel = ''] = groupOrRound.split(',');

	return roundLabel.trim().toLowerCase();
};

const getRoundLayout = (matchCount: number): BracketRoundData['layout'] => {
	if (matchCount >= 16) {
		return 'compactStackedPairs';
	}

	if (matchCount >= 8) {
		return 'compactColumns';
	}

	if (matchCount >= 4) {
		return 'quarterColumns';
	}

	if (matchCount >= 2) {
		return 'semiColumns';
	}

	return 'default';
};

const getRoundMatchLayout = (matchCount: number): BracketMatchData['layoutVariant'] =>
	matchCount >= 8 ? 'compact' : 'default';

const createRoundId = (label: string) =>
	`round-${label
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-zA-Z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase()}`;

const toBracketMatchData = (match: KnockoutMatch): BracketMatchData => ({
	awayLabel: resolveMatchSideDisplayName(match.awayTeam),
	awayFlagCode:
		match.awayTeam.kind === 'team' ? resolveFlagCode(match.awayTeam.teamName) : undefined,
	compactDate: buildCompactDate(match.date),
	compactDayMonth: buildCompactDayMonth(match.date),
	compactTime: normalizeMatchTime(match.time),
	compactWeekday: buildCompactWeekday(match.date),
	homeLabel: resolveMatchSideDisplayName(match.homeTeam),
	homeFlagCode:
		match.homeTeam.kind === 'team' ? resolveFlagCode(match.homeTeam.teamName) : undefined,
	id: match.id,
	layoutVariant: match.groupOrRound.includes('16-delsfinal') ? 'compact' : 'default',
	matchNumber: parseMatchNumber(match.groupOrRound),
	meta: buildMeta(match),
	result: match.result,
	roundLabel: getRoundLabel(match.groupOrRound),
	venue: match.venue,
});

const createRound = (round: KnockoutRound): BracketRoundData => ({
	id: round.id,
	layout: round.layout,
	matches: round.matches.map((match) => ({
		...toBracketMatchData(match),
		layoutVariant: round.matchLayout,
	})),
	title: formatRoundTitle(round.label),
});

export const buildPlayoffBracket = (matchDays: TournamentGamesData[]): BracketData | undefined => {
	const knockoutMatches = matchDays.flatMap((day) =>
		day.matches
			.filter(
				(match) =>
					match.groupOrRound.includes('final') ||
					match.groupOrRound.includes('bronsmatch') ||
					MATCH_NUMBER_PATTERN.test(match.groupOrRound),
			)
			.map((match) => ({
				...match,
				date: day.date,
			})),
	);

	const roundsByLabel = new Map<string, KnockoutMatch[]>();
	let finalMatch: KnockoutMatch | undefined;
	let thirdPlaceMatch: KnockoutMatch | undefined;

	for (const match of knockoutMatches) {
		if (match.groupOrRound.includes('VM-final')) {
			finalMatch = match;
			continue;
		}

		if (match.groupOrRound.includes('bronsmatch')) {
			thirdPlaceMatch = match;
			continue;
		}

		const roundLabel = getRoundLabel(match.groupOrRound);

		if (!roundLabel) {
			continue;
		}

		const roundMatches = roundsByLabel.get(roundLabel) ?? [];
		roundMatches.push(match);
		roundsByLabel.set(roundLabel, roundMatches);
	}

	if (!finalMatch) {
		return;
	}

	const rounds = Array.from(roundsByLabel.entries())
		.map(([label, matches]) => {
			const sortedMatches = [...matches].sort(compareKnockoutMatchDate);
			const matchCount = sortedMatches.length;

			return {
				id: createRoundId(label),
				label,
				layout: getRoundLayout(matchCount),
				matchLayout: getRoundMatchLayout(matchCount),
				matches: sortedMatches,
			} satisfies KnockoutRound;
		})
		.sort((left, right) => compareKnockoutMatchDate(left.matches[0], right.matches[0]))
		.map(createRound);

	return {
		finalMatch: toBracketMatchData(finalMatch),
		rounds,
		thirdPlaceMatch: thirdPlaceMatch ? toBracketMatchData(thirdPlaceMatch) : undefined,
	};
};
