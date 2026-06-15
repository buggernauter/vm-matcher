'use client';

import { PlayerCard } from '@/components/player-card/player-card';
import type { WorldCupSquad, WorldCupSquadPosition } from '@/types';

import {
	StyledWorldCupRoster,
	StyledWorldCupRosterRow,
	StyledWorldCupRosterTitle,
} from './styles';

const squadPositions: WorldCupSquadPosition[] = ['GK', 'DF', 'MF', 'FW'];

type Props = {
	squad: WorldCupSquad;
};

export const WorldCupRoster = ({ squad }: Props) => {
	return (
		<StyledWorldCupRoster role="table" aria-label={`Trupp för ${squad.countryName}`}>
			{squadPositions.map((position) => {
				const players = squad.players[position];

				if (players.length === 0) {
					return null;
				}

				return (
					<div key={`${squad.countryName}-${position}`}>
						<StyledWorldCupRosterTitle>{position}</StyledWorldCupRosterTitle>
						{players.map((player) => (
							<StyledWorldCupRosterRow key={`${squad.countryName}-${player.player}`} role="row">
								<PlayerCard player={player} role="cell" />
							</StyledWorldCupRosterRow>
						))}
					</div>
				);
			})}
		</StyledWorldCupRoster>
	);
};
