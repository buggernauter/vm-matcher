import { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import Flag from 'react-world-flags';

import {
	StyledSquadCard,
	StyledSquadCell,
	StyledSquadChevron,
	StyledSquadCountry,
	StyledSquadCountryLine,
	StyledSquadFlag,
	StyledSquadHeading,
	StyledSquadRoster,
	StyledSquadRosterRow,
	StyledSquadSummary,
	StyledSquadsGrid,
	StyledSquadsSection,
} from './styles';
import { worldCupSquads } from '@/server/data/world-cup-squads';

export const WorldCupSquads = memo(function WorldCupSquads() {
	return (
		<StyledSquadsSection aria-label="Trupper för Fotbolls-VM 2026">
			<StyledSquadsGrid>
				{worldCupSquads.map((squad) => {
					return (
						<StyledSquadCard key={squad.countryName}>
							<StyledSquadSummary>
								<StyledSquadHeading>
									<StyledSquadCountryLine>
										<StyledSquadFlag aria-hidden="true">
											<Flag code={squad.flagCode} alt="" />
										</StyledSquadFlag>
										<StyledSquadCountry>{squad.countryName}</StyledSquadCountry>
									</StyledSquadCountryLine>
								</StyledSquadHeading>
								<StyledSquadChevron aria-hidden="true">
									<ChevronDown size={18} />
								</StyledSquadChevron>
							</StyledSquadSummary>

							<StyledSquadRoster role="table" aria-label={`Trupp för ${squad.countryName}`}>
								{squad.players.map((player) => (
									<StyledSquadRosterRow
										key={`${squad.countryName}-${player.player}`}
										role="row"
									>
										<StyledSquadCell role="cell" $inlineGap>
											<span data-primary>
												<span>{player.pos}</span>
												<span>{player.player}</span>
												<span>{player.age}</span>
											</span>
											<span data-club>{player.club}</span>
										</StyledSquadCell>
									</StyledSquadRosterRow>
								))}
							</StyledSquadRoster>
						</StyledSquadCard>
					);
				})}
			</StyledSquadsGrid>
		</StyledSquadsSection>
	);
});
