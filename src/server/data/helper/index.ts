import { getGroupLabel } from '@/lib/tournument';
import {
	GROUP_POSITION_PATTERN,
	THIRD_PLACE_PATTERN,
	WINNER_MATCH_PATTERN,
	LOSER_MATCH_PATTERN,
	LOSER_MATCH_TEXT_PATTERN,
} from '@/server/constants';
import type {
	GameParticipant,
	GroupTableRow,
	GroupTablesByLabel,
	TournamentGamesData,
} from '@/types/tournament';

export const createMatchSide = (rawSide: string): GameParticipant => {
	const groupPositionMatch = rawSide.match(GROUP_POSITION_PATTERN);

	if (groupPositionMatch) {
		return {
			group: groupPositionMatch[2],
			kind: 'group-position',
			label: rawSide,
			position: Number(groupPositionMatch[1]) as 1 | 2,
		};
	}

	const thirdPlaceMatch = rawSide.match(THIRD_PLACE_PATTERN);

	if (thirdPlaceMatch) {
		return {
			groups: thirdPlaceMatch[1].split('/'),
			kind: 'third-place',
			label: rawSide,
			position: 3,
		};
	}

	const winnerMatch = rawSide.match(WINNER_MATCH_PATTERN);

	if (winnerMatch) {
		return {
			kind: 'winner',
			label: rawSide,
			matchNumber: Number(winnerMatch[1]),
		};
	}

	const loserMatch = rawSide.match(LOSER_MATCH_PATTERN);

	if (loserMatch) {
		return {
			kind: 'loser',
			label: rawSide,
			matchNumber: Number(loserMatch[1]),
		};
	}

	const loserMatchText = rawSide.match(LOSER_MATCH_TEXT_PATTERN);

	if (loserMatchText) {
		return {
			kind: 'loser',
			label: rawSide,
			matchNumber: Number(loserMatchText[1]),
		};
	}

	return {
		kind: 'team',
		teamName: rawSide,
	};
};
export const extractMatchNumber = (groupOrRound: string) => {
	const match = groupOrRound.match(/Match (\d+)/);

	if (!match) {
		return;
	}

	return Number(match[1]);
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
				points: groupTableRow.points,
				position: index + 1,
				teamName: groupTableRow.teamName,
			}));
	}

	return groupTablesByLabel;
};
