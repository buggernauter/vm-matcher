import { GROUP_ROUND_PATTERN } from '@/server/constants';
import { GameParticipant } from '@/types';

export const getGroupLabel = (groupOrRound: string) => {
	const match = groupOrRound.match(GROUP_ROUND_PATTERN);

	if (!match) {
		return;
	}

	return `Grupp ${match[1]}`;
};

export const resolveMatchSideDisplayName = (side: GameParticipant) => {
	return side.kind === 'team' ? side.teamName : side.label;
};
