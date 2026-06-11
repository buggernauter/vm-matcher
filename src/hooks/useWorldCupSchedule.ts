import { groupTables, tournamentGamesData } from '@/server/data';

export const useWorldCupSchedule = () => ({
	data: {
		groupTablesByLabel: groupTables,
		matchDays: tournamentGamesData,
		source: 'static',
		syncedAt: '',
	},
});
