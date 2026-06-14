import { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import Flag from 'react-world-flags';

import { sortByName } from '@/lib/helper';
import {
	StyledSquadCard,
	StyledSquadCell,
	StyledSquadChevron,
	StyledSquadCountry,
	StyledSquadCountryLine,
	StyledSquadFlag,
	StyledSquadHeading,
	StyledSquadRanking,
	StyledSquadRoster,
	StyledSquadRosterTitle,
	StyledSquadRosterRow,
	StyledSquadSummary,
	StyledSquadsContainer,
	StyledSquadsSection,
} from './styles';
import { worldCupSquads } from '@/server/data/squads';
import { WorldCupSquadPosition } from '@/types';

const squadPositions: WorldCupSquadPosition[] = ['GK', 'DF', 'MF', 'FW'];
const sortedWorldCupSquads = sortByName(worldCupSquads, (squad) => squad.countryName);

const renderSquad = (squad: (typeof sortedWorldCupSquads)[number]) => {
	return (
		<StyledSquadRoster role="table" aria-label={`Trupp för ${squad.countryName}`}>
			{squadPositions.map((position) => {
				const players = squad.players[position];

				if (players.length === 0) {
					return null;
				}

				return (
					<div key={`${squad.countryName}-${position}`}>
						<StyledSquadRosterTitle>{position}</StyledSquadRosterTitle>
						{players.map((player) => (
							<StyledSquadRosterRow key={`${squad.countryName}-${player.player}`} role="row">
								<StyledSquadCell role="cell">
									<span data-primary>
										<span>{player.player}</span>
										<span>{player.age} år</span>
									</span>
									<span data-club>{player.club}</span>
								</StyledSquadCell>
							</StyledSquadRosterRow>
						))}
					</div>
				);
			})}
		</StyledSquadRoster>
	);
};
export const WorldCupSquads = memo(function WorldCupSquads() {
	return (
		<StyledSquadsSection aria-label="Trupper för Fotbolls-VM 2026">
			<StyledSquadsContainer>
				{sortedWorldCupSquads.map((squad) => {
					return (
						<StyledSquadCard key={squad.countryName}>
							<StyledSquadSummary>
								<StyledSquadHeading>
									<StyledSquadCountryLine>
										<StyledSquadFlag aria-hidden="true">
											<Flag code={squad.flagCode} alt="" />
										</StyledSquadFlag>
										<StyledSquadRanking>#{squad.ranking}</StyledSquadRanking>
										<StyledSquadCountry>{squad.countryName}</StyledSquadCountry>
									</StyledSquadCountryLine>
								</StyledSquadHeading>
								<StyledSquadChevron aria-hidden="true">
									<ChevronDown size={18} />
								</StyledSquadChevron>
							</StyledSquadSummary>

							{renderSquad(squad)}
						</StyledSquadCard>
					);
				})}
			</StyledSquadsContainer>
		</StyledSquadsSection>
	);
});
