export const FINISHED_STATUS_CODES = new Set(['AET', 'FT', 'PEN']);

export const worldCupScheduleQueryKey = ['world-cup', 'schedule'] as const;

export const GROUP_ROUND_PATTERN = /^Grupp ([A-Z])$/;
export const GROUP_POSITION_PATTERN = /^([12])([A-Z])$/;
export const LOSER_MATCH_PATTERN = /^(?:L|RU)(\d+)$/;
export const LOSER_MATCH_TEXT_PATTERN = /^Förlorare match (\d+)$/;
export const THIRD_PLACE_PATTERN = /^3(?:[A-Z](?:\/[A-Z])+|[A-Z]{2,})$/;
export const WINNER_MATCH_PATTERN = /^W(\d+)$/;
export const WORLD_CUP_PLAYOFF_PATH = '/slutspel-vm-2026';
export const WORLD_CUP_SCHEDULE_PATH = '/fotbolls-vm-2026';
export const WORLD_CUP_TEAMS_PATH = '/lag-vm-2026';

export const SWEDISH_LONG_DATE_FORMATTER = new Intl.DateTimeFormat('sv-SE', {
	day: 'numeric',
	month: 'long',
	timeZone: 'Europe/Stockholm',
	year: 'numeric',
});
export const WORLD_CUP_START = new Date('2026-06-11T21:00:00+02:00').getTime();
