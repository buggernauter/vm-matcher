import { GroupTablesByLabel, TournamentGamesData } from '@/types/tournament';
import {
	buildGroupTablesByLabel,
	createMatchSide,
	extractMatchNumber,
	getGameSideLabel,
} from './helper';
import { worldCupData } from './data';

export const tournamentGamesData: TournamentGamesData[] = worldCupData.map((day) => ({
	...day,
	matches: day.matches.map((match, index) => {
		const homeTeam = createMatchSide(match.homeTeam);
		const awayTeam = createMatchSide(match.awayTeam);

		return {
			awayTeam,
			broadcaster: match.broadcaster,
			groupOrRound: match.groupOrRound,
			homeTeam,
			id: `${day.date}-${match.time}-${getGameSideLabel(homeTeam)}-${getGameSideLabel(awayTeam)}-${index}`,
			matchNumber: extractMatchNumber(match.groupOrRound),
			result: match.result,
			time: match.time,
			venue: match.venue,
		};
	}),
}));

export const groupTables: GroupTablesByLabel = buildGroupTablesByLabel(tournamentGamesData);
