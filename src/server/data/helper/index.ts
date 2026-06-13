import { getGroupLabel } from '@/lib/tournument';
import {
	GROUP_POSITION_PATTERN,
	LOSER_MATCH_PATTERN,
	LOSER_MATCH_TEXT_PATTERN,
	THIRD_PLACE_PATTERN,
	WINNER_MATCH_PATTERN,
} from '@/server/constants';
import type {
	GameParticipant,
	GroupTableRow,
	GroupTablesByLabel,
	TournamentGamesData,
} from '@/types';

const PLACEHOLDER_SIDE_PATTERNS = [
	GROUP_POSITION_PATTERN,
	THIRD_PLACE_PATTERN,
	WINNER_MATCH_PATTERN,
	LOSER_MATCH_PATTERN,
	LOSER_MATCH_TEXT_PATTERN,
];

export const createMatchSide = (rawSide: string): GameParticipant => {
	if (PLACEHOLDER_SIDE_PATTERNS.some((pattern) => pattern.test(rawSide))) {
		return {
			kind: 'placeholder',
			label: rawSide,
		};
	}
	return {
		kind: 'team',
		teamName: rawSide,
	};
};

export const getGameSideLabel = (side: GameParticipant) =>
	side.kind === 'team' ? side.teamName : undefined;

type MutableGroupTableRow = Omit<GroupTableRow, 'position'> & {
	seedIndex: number;
};

const sortGroupTableRows = (left: MutableGroupTableRow, right: MutableGroupTableRow) =>
	right.points - left.points ||
	right.goalDifference - left.goalDifference ||
	right.goalsFor - left.goalsFor ||
	left.seedIndex - right.seedIndex;

const ensureGroupTableRow = (
	groupTableRows: Record<string, MutableGroupTableRow>,
	teamName: string,
	seedIndex: number,
) => {
	if (groupTableRows[teamName]) {
		return;
	}

	groupTableRows[teamName] = {
		goalDifference: 0,
		goalsAgainst: 0,
		goalsFor: 0,
		playedGames: 0,
		points: 0,
		seedIndex,
		teamName,
	};
};

export const buildGroupTablesByLabel = (matchDays: TournamentGamesData[]): GroupTablesByLabel => {
	const groupTablesByLabel: GroupTablesByLabel = {};
	const groupTableRowsByLabel: Record<string, Record<string, MutableGroupTableRow>> = {};
	let seedIndex = 0;

	for (const day of matchDays) {
		for (const match of day.matches) {
			const groupLabel = getGroupLabel(match.groupOrRound);

			if (!groupLabel) {
				continue;
			}

			if (match.homeTeam.kind !== 'team' || match.awayTeam.kind !== 'team') {
				continue;
			}

			const groupTableRows = (groupTableRowsByLabel[groupLabel] ??= {});

			ensureGroupTableRow(groupTableRows, match.homeTeam.teamName, seedIndex++);
			ensureGroupTableRow(groupTableRows, match.awayTeam.teamName, seedIndex++);

			if (!match.result) {
				continue;
			}

			const homeTeamRow = groupTableRows[match.homeTeam.teamName];
			const awayTeamRow = groupTableRows[match.awayTeam.teamName];
			const { homeScore, awayScore } = match.result;

			homeTeamRow.playedGames += 1;
			awayTeamRow.playedGames += 1;

			homeTeamRow.goalsFor += homeScore;
			homeTeamRow.goalsAgainst += awayScore;
			homeTeamRow.goalDifference = homeTeamRow.goalsFor - homeTeamRow.goalsAgainst;

			awayTeamRow.goalsFor += awayScore;
			awayTeamRow.goalsAgainst += homeScore;
			awayTeamRow.goalDifference = awayTeamRow.goalsFor - awayTeamRow.goalsAgainst;

			if (homeScore > awayScore) {
				homeTeamRow.points += 3;
			} else if (homeScore < awayScore) {
				awayTeamRow.points += 3;
			} else {
				homeTeamRow.points += 1;
				awayTeamRow.points += 1;
			}
		}
	}

	for (const [groupLabel, groupTableRows] of Object.entries(groupTableRowsByLabel)) {
		groupTablesByLabel[groupLabel] = Object.values(groupTableRows)
			.sort(sortGroupTableRows)
			.map((groupTableRow, index) => ({
				goalDifference: groupTableRow.goalDifference,
				goalsAgainst: groupTableRow.goalsAgainst,
				goalsFor: groupTableRow.goalsFor,
				playedGames: groupTableRow.playedGames,
				points: groupTableRow.points,
				position: index + 1,
				teamName: groupTableRow.teamName,
			}));
	}

	return groupTablesByLabel;
};
