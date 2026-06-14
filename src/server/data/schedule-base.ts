import { WorldCupResults, WorldCupScheduleData, WorldCupScheduleResponse } from '@/types';

import { buildGroupTablesByLabel, createMatchSide } from './helper';
import { worldCupData } from './match-data';
import updatedResults from './updated-results.json';

const isTopThirtyRanking = (ranking?: number) =>
	typeof ranking === 'number' && ranking >= 1 && ranking <= 30;

export const buildScheduleData = (updatedResults: WorldCupResults): WorldCupScheduleData => {
	const matchDays = worldCupData.map((day) => ({
		...day,
		matches: day.matches.map((match) => {
			const homeTeam = createMatchSide(match.homeTeam);
			const awayTeam = createMatchSide(match.awayTeam);
			const isTopRankedMatch =
				isTopThirtyRanking(match.homeTeamRanking) && isTopThirtyRanking(match.awayTeamRanking);

			return {
				awayTeam,
				awayTeamRanking: match.awayTeamRanking,
				broadcaster: match.broadcaster,
				groupOrRound: match.groupOrRound,
				homeTeam,
				homeTeamRanking: match.homeTeamRanking,
				id: match.id,
				isTopRankedMatch,
				result: updatedResults[match.id] ?? match.result,
				time: match.startTime,
				venue: match.venue,
			};
		}),
	}));

	return {
		groupTablesByLabel: buildGroupTablesByLabel(matchDays),
		matchDays,
	};
};

export const fallbackScheduleData: WorldCupScheduleResponse = {
	...buildScheduleData(updatedResults),
	source: 'static',
	syncedAt: '',
};
