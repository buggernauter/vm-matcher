'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { getGroupLabel, resolveMatchSideDisplayName } from '../../lib/tournument';
import type {
	Broadcaster,
	GameParticipant,
	GroupTableRow,
	MatchResult,
	MatchParticipantResolutionContext,
} from '../../types/tournament';
import {
	StyledChip,
	StyledCard,
	StyledFooter,
	StyledInfo,
	StyledCardHeader,
	StyledMatchRow,
	StyledMetaButton,
	StyledMetaText,
	StyledTeams,
	StyledTimeBadge,
	StyledResult,
} from './styles';
import { GroupStandings } from '../group-standings';
import { BroadcasterChip } from '../broadcaster-chip';

type Props = {
	broadcaster?: Broadcaster;
	resolutionContext?: MatchParticipantResolutionContext;
	groupOrRound: string;
	groupTable?: GroupTableRow[];
	homeTeam: GameParticipant;
	awayTeam: GameParticipant;
	result?: MatchResult;
	time: string;
	dayLabel?: string;
};

export const MatchCard = ({
	broadcaster,
	groupOrRound,
	groupTable,
	homeTeam,
	awayTeam,
	resolutionContext,
	result,
	time,

	dayLabel,
}: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const homeTeamLabel = resolveMatchSideDisplayName(homeTeam, resolutionContext);
	const awayTeamLabel = resolveMatchSideDisplayName(awayTeam, resolutionContext);

	const shouldRenderFooter = Boolean(broadcaster);
	const groupLabel = getGroupLabel(groupOrRound);
	const canExpandGroup = Boolean(groupLabel && groupTable && groupTable.length > 0);

	return (
		<StyledCard>
			<StyledCardHeader>
				<StyledTimeBadge>{time}</StyledTimeBadge>
				<StyledInfo>
					<StyledMatchRow>
						<StyledTeams>
							{homeTeamLabel} - {awayTeamLabel}
						</StyledTeams>
						{result ? <StyledResult>{result.homeScore - result.awayScore}</StyledResult> : null}
					</StyledMatchRow>
					{canExpandGroup ? (
						<StyledMetaButton
							type="button"
							aria-expanded={isExpanded}
							onClick={() => {
								setIsExpanded((currentValue) => !currentValue);
							}}
						>
							{groupLabel}
							<ChevronDown aria-hidden="true" size={14} />
						</StyledMetaButton>
					) : (
						<StyledMetaText>{groupOrRound}</StyledMetaText>
					)}
				</StyledInfo>
			</StyledCardHeader>

			{canExpandGroup && isExpanded ? <GroupStandings groupTable={groupTable} /> : null}

			{shouldRenderFooter ? (
				<StyledFooter>
					{dayLabel ? <StyledChip>{`${dayLabel}`}</StyledChip> : null}
					<BroadcasterChip broadcaster={broadcaster} />
				</StyledFooter>
			) : null}
		</StyledCard>
	);
};
