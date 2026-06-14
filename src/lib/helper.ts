import { GameParticipant } from '@/types';

const MIN_ROUND_VALUE = 0;
const SWEDEN_TEAM_ALIASES = new Set(['sverige', 'sweden']);

const venueTimeZones: Record<string, string> = {
	Atlanta: 'America/New_York',
	Boston: 'America/New_York',
	Dallas: 'America/Chicago',
	Guadalajara: 'America/Mexico_City',
	Houston: 'America/Chicago',
	'Kansas City': 'America/Chicago',
	'Los Angeles': 'America/Los_Angeles',
	Miami: 'America/New_York',
	'Mexico City': 'America/Mexico_City',
	Monterrey: 'America/Monterrey',
	'New Jersey': 'America/New_York',
	Philadelphia: 'America/New_York',
	'San Francisco': 'America/Los_Angeles',
	Seattle: 'America/Los_Angeles',
	Toronto: 'America/Toronto',
	Vancouver: 'America/Vancouver',
};

export const clampValue = (value: number, max: number) =>
	Math.max(MIN_ROUND_VALUE, Math.min(max, value));

export const normalizeTeamName = (value: string) =>
	value
		.normalize('NFKD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim();

const getSwedishDateKey = () =>
	new Intl.DateTimeFormat('sv-SE', {
		timeZone: 'Europe/Stockholm',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(new Date());

export const getInitialDayIndex = (dayList: Array<{ date: string }>) => {
	const today = getSwedishDateKey();
	const todayIndex = dayList.findIndex((day) => day.date === today);

	if (todayIndex !== -1) {
		return todayIndex;
	}

	const nextMatchDayIndex = dayList.findIndex((day) => day.date > today);

	return nextMatchDayIndex === -1 ? dayList.length - 1 : nextMatchDayIndex;
};

export const isSwedenPlaying = (side: GameParticipant) =>
	side.kind === 'team' && SWEDEN_TEAM_ALIASES.has(normalizeTeamName(side.teamName));

export const normalizeMatchTime = (time: string) => time.replace('.', ':').trim();
export const getTeamName = (side: GameParticipant) =>
	side.kind === 'team' ? side.teamName : undefined;

export const getVenueLocalTime = (date: string, startTime: string, venue?: string) => {
	if (!venue) {
		return undefined;
	}

	const timeZone = venueTimeZones[venue];

	if (!timeZone) {
		return undefined;
	}

	const stockholmKickoff = new Date(`${date}T${normalizeMatchTime(startTime)}:00+02:00`);

	return new Intl.DateTimeFormat('sv-SE', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone,
	}).format(stockholmKickoff);
};

export const normalizeText = (value: string) =>
	value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();

export const sortByName = <T>(items: T[], getName: (item: T) => string) =>
	[...items].sort((left, right) => getName(left).localeCompare(getName(right)));

export const subscribeToPageActivation = (onActivate: () => void) => {
	const handlePageActivation = () => {
		if (document.visibilityState === 'visible') {
			onActivate();
		}
	};

	window.addEventListener('focus', handlePageActivation);
	document.addEventListener('visibilitychange', handlePageActivation);

	return () => {
		window.removeEventListener('focus', handlePageActivation);
		document.removeEventListener('visibilitychange', handlePageActivation);
	};
};
