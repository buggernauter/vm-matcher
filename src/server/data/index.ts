import { GroupTablesByLabel, TournamentGamesData, WorldCupResults } from '@/types';
import { buildWorldCupMatchId } from './match-id';
import { buildGroupTablesByLabel, createMatchSide } from './helper';
import { worldCupData } from './match-data';

import updatedResults from './updated-results.json';

const isTopThirtyRanking = (ranking?: number) =>
	typeof ranking === 'number' && ranking >= 1 && ranking <= 30;

export const tournamentGamesData: TournamentGamesData[] = worldCupData.map((day) => ({
	...day,
	matches: day.matches.map((match, index) => {
		const homeTeam = createMatchSide(match.homeTeam);
		const awayTeam = createMatchSide(match.awayTeam);
		const isTopRankedMatch =
			isTopThirtyRanking(match.homeTeamRanking) && isTopThirtyRanking(match.awayTeamRanking);
		const id = buildWorldCupMatchId({
			awayTeam: match.awayTeam,
			date: day.date,
			homeTeam: match.homeTeam,
			matchIndex: index,
			startTime: match.startTime,
		});
		const results: WorldCupResults = updatedResults;
		return {
			awayTeam,
			awayTeamRanking: match.awayTeamRanking,
			broadcaster: match.broadcaster,
			groupOrRound: match.groupOrRound,
			homeTeam,
			homeTeamRanking: match.homeTeamRanking,
			id,
			isTopRankedMatch,
			result: results[id] ?? match.result,
			time: match.startTime,
			venue: match.venue,
		};
	}),
}));

export const groupTables: GroupTablesByLabel = buildGroupTablesByLabel(tournamentGamesData);
