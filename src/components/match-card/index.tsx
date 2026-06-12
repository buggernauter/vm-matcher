'use client';

import { ChevronDown, Star } from 'lucide-react';
import { useState } from 'react';

import { getGroupLabel, resolveMatchSideDisplayName } from '../../lib/tournument';
import type {
	Broadcaster,
	GameParticipant,
	GroupTableRow,
	GameResult,
} from '../../types/tournament';
import {
	StyledChip,
	StyledCard,
	StyledFooter,
	StyledInlineSeparator,
	StyledInlineValue,
	StyledScore,
	StyledStar,
	StyledInfo,
	StyledCardHeader,
	StyledMetaButton,
	StyledMetaText,
	StyledTeams,
	StyledTimeBadge,
	StyledTimeBadgeWrapper,
} from './styles';
import { GroupStandings } from '../group-standings';
import { BroadcasterChip } from '../broadcaster-chip';

type Props = {
	broadcaster?: Broadcaster;
	groupOrRound: string;
	groupTable?: GroupTableRow[];
	homeTeam: GameParticipant;
	awayTeam: GameParticipant;
	isTopRankedMatch?: boolean;
	result?: GameResult;
	startTime: string;
	onDayLabelClick?: () => void;
	dayLabel?: string;
};

export const MatchCard = ({
	broadcaster,
	groupOrRound,
	groupTable,
	homeTeam,
	awayTeam,
	isTopRankedMatch,
	result,
	startTime,
	onDayLabelClick,
	dayLabel,
}: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const homeTeamLabel = resolveMatchSideDisplayName(homeTeam);
	const awayTeamLabel = resolveMatchSideDisplayName(awayTeam);

	const shouldRenderFooter = Boolean(broadcaster || dayLabel);
	const groupLabel = getGroupLabel(groupOrRound);
	const canExpandGroup = Boolean(groupLabel && groupTable && groupTable.length > 0);
	return (
		<StyledCard>
			<StyledCardHeader>
				<StyledTimeBadgeWrapper>
					<StyledTimeBadge>{startTime}</StyledTimeBadge>
				</StyledTimeBadgeWrapper>
				<StyledInfo>
					<StyledTeams as="h3">
						<StyledInlineValue>{homeTeamLabel}</StyledInlineValue>
						{result ? (
							<>
								<StyledScore>{`${result.homeScore} - ${result.awayScore}`}</StyledScore>
								<StyledInlineValue>{awayTeamLabel}</StyledInlineValue>
							</>
						) : (
							<>
								<StyledInlineSeparator>-</StyledInlineSeparator>
								<StyledInlineValue>{awayTeamLabel}</StyledInlineValue>
							</>
						)}
					</StyledTeams>
					{canExpandGroup ? (
						<StyledMetaButton
							type="button"
							aria-expanded={isExpanded}
							onClick={() => {
								setIsExpanded((currentValue) => !currentValue);
							}}
						>
							{isTopRankedMatch ? (
								<StyledStar>
									<Star color="gold" size="12" aria-hidden="true" />
								</StyledStar>
							) : null}
							{groupLabel}
							<ChevronDown aria-hidden="true" size={14} />
						</StyledMetaButton>
					) : (
						<StyledMetaText>
							{isTopRankedMatch ? (
								<StyledStar>
									<Star color="gold" size="12" aria-hidden="true" />
								</StyledStar>
							) : null}
							{groupOrRound}
						</StyledMetaText>
					)}
				</StyledInfo>
			</StyledCardHeader>

			{canExpandGroup && isExpanded ? <GroupStandings groupTable={groupTable} /> : null}

			{shouldRenderFooter ? (
				<StyledFooter $hasDayLabel={Boolean(dayLabel)}>
					{dayLabel ? (
						<StyledChip
							as={onDayLabelClick ? 'button' : 'span'}
							type={onDayLabelClick ? 'button' : undefined}
							onClick={onDayLabelClick}
						>
							{dayLabel}
						</StyledChip>
					) : null}
					<BroadcasterChip broadcaster={broadcaster} />
				</StyledFooter>
			) : null}
		</StyledCard>
	);
};
