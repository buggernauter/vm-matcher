import { memo } from 'react';
import { ChevronRight } from 'lucide-react';
import Flag from 'react-world-flags';

import { createTeamSlug, sortByName } from '@/lib/helper';
import { WORLD_CUP_TEAMS_PATH } from '@/server/constants';
import {
	StyledSquadCard,
	StyledSquadChevron,
	StyledSquadCountry,
	StyledSquadCountryLine,
	StyledSquadFlag,
	StyledSquadHeading,
	StyledSquadRanking,
	StyledSquadSummary,
	StyledSquadsContainer,
	StyledSquadsSection,
} from './styles';
import { worldCupSquads } from '@/server/data/squads';

const sortedWorldCupSquads = sortByName(worldCupSquads, (squad) => squad.countryName);

export const WorldCupSquads = memo(function WorldCupSquads() {
	return (
		<StyledSquadsSection aria-label="Trupper för Fotbolls-VM 2026">
			<StyledSquadsContainer>
				{sortedWorldCupSquads.map((squad) => {
					return (
						<StyledSquadCard
							key={squad.countryName}
							href={`${WORLD_CUP_TEAMS_PATH}/${createTeamSlug(squad.countryName)}`}
						>
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
									<ChevronRight size={18} />
								</StyledSquadChevron>
							</StyledSquadSummary>
						</StyledSquadCard>
					);
				})}
			</StyledSquadsContainer>
		</StyledSquadsSection>
	);
});
