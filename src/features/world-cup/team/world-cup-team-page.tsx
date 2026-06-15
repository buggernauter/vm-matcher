'use client';

import { ChevronDown } from 'lucide-react';
import Flag from 'react-world-flags';
import { EmptyStateCard } from '@/components/empty-state-card';
import { MatchCard } from '@/components/match-card';
import { WorldCupRoster } from '@/components/world-cup-roster/world-cup-roster';
import { getGroupLabel } from '@/lib/tournument';
import type { GroupTablesByLabel, TournamentGame, WorldCupSquad } from '@/types';

import {
	StyledMatchList,
	StyledRosterChevron,
	StyledRosterDetails,
	StyledRosterSummary,
	StyledSection,
	StyledSectionTitle,
	StyledSummaryCountry,
	StyledSummaryFlag,
	StyledSummaryMeta,
	StyledSummaryTopRow,
} from './styles';

type TeamMatch = TournamentGame & {
	date: string;
	dayLabel: string;
};

type Props = {
	groupTablesByLabel: GroupTablesByLabel;
	playedMatches: TeamMatch[];
	squad: WorldCupSquad;
	upcomingMatches: TeamMatch[];
};

export const WorldCupTeamPage = ({
	groupTablesByLabel,
	playedMatches,
	squad,
	upcomingMatches,
}: Props) => {
	const renderMatches = (matches: TeamMatch[], emptyMessage: string) => {
		if (matches.length === 0) {
			return <EmptyStateCard message={emptyMessage} />;
		}

		return (
			<StyledMatchList>
				{matches.map((match) => (
					<MatchCard
						key={match.id}
						awayTeam={match.awayTeam}
						broadcaster={match.broadcaster}
						currentTeamName={squad.countryName}
						date={match.date}
						dayLabel={match.dayLabel}
						groupOrRound={match.groupOrRound}
						groupTable={groupTablesByLabel[getGroupLabel(match.groupOrRound) ?? '']}
						homeTeam={match.homeTeam}
						isTopRankedMatch={match.isTopRankedMatch}
						result={match.result}
						startTime={match.time}
						venue={match.venue}
					/>
				))}
			</StyledMatchList>
		);
	};

	return (
		<>
			<StyledSection>
				<StyledSummaryTopRow>
					<StyledSummaryFlag aria-hidden="true">
						<Flag code={squad.flagCode} alt="" />
					</StyledSummaryFlag>

					<StyledSummaryCountry>{squad.countryName}</StyledSummaryCountry>
					<StyledSummaryMeta>FIFA-ranking #{squad.ranking}</StyledSummaryMeta>
				</StyledSummaryTopRow>
				<StyledRosterDetails open>
					<StyledRosterSummary>
						<StyledSectionTitle as="span">Trupp</StyledSectionTitle>
						<StyledRosterChevron aria-hidden="true">
							<ChevronDown size={18} />
						</StyledRosterChevron>
					</StyledRosterSummary>
					<WorldCupRoster squad={squad} />
				</StyledRosterDetails>
			</StyledSection>
			<StyledSection>
				<StyledSectionTitle>Kommande matcher</StyledSectionTitle>
				{renderMatches(upcomingMatches, 'Inga kommande matcher just nu.')}
			</StyledSection>
			<StyledSection>
				<StyledSectionTitle>Spelade matcher</StyledSectionTitle>
				{renderMatches(playedMatches, 'Inga spelade matcher ännu.')}
			</StyledSection>
		</>
	);
};
