import { GROUP_ROUND_PATTERN } from '@/server/constants';
import type {
	GameParticipant,
	MatchParticipantResolutionContext,
	TeamParticipant,
} from '../types/tournament';

export const getGroupLabel = (groupOrRound: string) => {
	const match = groupOrRound.match(GROUP_ROUND_PATTERN);

	if (!match) {
		return;
	}

	return `Grupp ${match[1]}`;
};
const resolveTeamSide = (side: TeamParticipant, context: MatchParticipantResolutionContext) =>
	context.resolveTeam?.(side) ?? side.teamName;

export const resolveMatchSideDisplayName = (
	side: GameParticipant,
	context: MatchParticipantResolutionContext = {},
) => {
	switch (side.kind) {
		case 'team':
			return resolveTeamSide(side, context);
		case 'group-position':
			return context.resolveGroupPosition?.(side) ?? side.label;
		case 'third-place':
			return context.resolveThirdPlace?.(side) ?? side.label;
		case 'winner':
			return context.resolveWinner?.(side) ?? side.label;
		case 'loser':
			return context.resolveLoser?.(side) ?? side.label;
	}
};
