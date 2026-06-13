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
	StyledVenueText,
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
	venue?: string;
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
	venue,
}: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const homeTeamLabel = resolveMatchSideDisplayName(homeTeam);
	const awayTeamLabel = resolveMatchSideDisplayName(awayTeam);
	const matchLabel = result
		? `${homeTeamLabel} ${result.homeScore}-${result.awayScore} ${awayTeamLabel}`
		: `${homeTeamLabel} mot ${awayTeamLabel}`;
	const timeLabel = `Avspark ${startTime}`;

	const shouldRenderFooter = Boolean(broadcaster || dayLabel);
	const groupLabel = getGroupLabel(groupOrRound);
	const canExpandGroup = Boolean(groupLabel && groupTable && groupTable.length > 0);

	return (
		<StyledCard aria-label={matchLabel}>
			<StyledCardHeader>
				<StyledTimeBadgeWrapper>
					<StyledTimeBadge as="time" aria-label={timeLabel}>
						{startTime}
					</StyledTimeBadge>
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
					{venue ? (
						<StyledVenueText aria-label={`Spelplats ${venue}`}>{venue}</StyledVenueText>
					) : null}
					{canExpandGroup ? (
						<StyledMetaButton
							type="button"
							aria-expanded={isExpanded}
							aria-label={`${isExpanded ? 'Dölj' : 'Visa'} tabell för ${groupLabel}`}
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
							aria-label={onDayLabelClick ? `Visa matcher för ${dayLabel}` : undefined}
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
