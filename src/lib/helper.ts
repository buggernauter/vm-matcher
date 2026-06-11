import { GameParticipant } from '@/types/tournament';

const MIN_ROUND_VALUE = 0;
const SWEDEN_TEAM_ALIASES = new Set(['sverige', 'sweden']);

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

export const normalizeText = (value: string) =>
	value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
