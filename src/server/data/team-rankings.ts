import { worldCupSquads } from './squads.ts';

const normalizeTeamName = (value: string) =>
	value
		.normalize('NFKD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim();

const teamRankingsByName = new Map(
	worldCupSquads.map((squad) => [normalizeTeamName(squad.countryName), squad.ranking]),
);

export const getTeamRanking = (teamName: string) =>
	teamRankingsByName.get(normalizeTeamName(teamName));
