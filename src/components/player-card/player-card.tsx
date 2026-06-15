'use client';

import { Player } from '@/types';
import { StyledSquadPlayer } from './styles';

type Props = {
	player: Player;
	role?: 'cell';
};

export const PlayerCard = ({ player, role }: Props) => {
	return (
		<StyledSquadPlayer role={role}>
			<span data-primary>
				<span>#{player.number}</span>
				<span>{player.player}</span>
				<span>{player.age} år</span>
			</span>
			<span data-club>{player.club}</span>
		</StyledSquadPlayer>
	);
};
