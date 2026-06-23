import { WorldCup, WorldCupScheduleData, WorldCupScheduleResponse } from '@/types';

import { buildGroupTablesByLabel, createMatchSide } from './helper';
import { worldCupData } from './match-data';
import { getTeamRanking } from './team-rankings';

const isTopThirtyRanking = (ranking?: number) =>
	typeof ranking === 'number' && ranking >= 1 && ranking <= 30;

export const buildScheduleData = (schedule: WorldCup[]): WorldCupScheduleData => {
	const matchDays = schedule.map((day) => ({
		...day,
		matches: day.matches.map((match) => {
			const homeTeam = createMatchSide(match.homeTeam);
			const awayTeam = createMatchSide(match.awayTeam);
			const homeTeamRanking =
				homeTeam.kind === 'team' ? getTeamRanking(match.homeTeam) ?? match.homeTeamRanking : undefined;
			const awayTeamRanking =
				awayTeam.kind === 'team' ? getTeamRanking(match.awayTeam) ?? match.awayTeamRanking : undefined;
			const isTopRankedMatch =
				isTopThirtyRanking(homeTeamRanking) && isTopThirtyRanking(awayTeamRanking);

			return {
				awayTeam,
				awayTeamRanking,
				broadcaster: match.broadcaster,
				groupOrRound: match.groupOrRound,
				homeTeam,
				homeTeamRanking,
				id: match.id,
				isTopRankedMatch,
				result: match.result,
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
	...buildScheduleData(worldCupData),
	source: 'static',
	syncedAt: '',
};
