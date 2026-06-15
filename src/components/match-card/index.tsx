'use client';

import { ChevronDown, Star } from 'lucide-react';
import { useState } from 'react';

import { createTeamSlug, getVenueLocalTime, normalizeTeamName } from '@/lib/helper';
import { WORLD_CUP_TEAMS_PATH } from '@/server/constants';
import { getGroupLabel, resolveMatchSideDisplayName } from '../../lib/tournument';

import {
	StyledChip,
	StyledCard,
	StyledFooter,
	StyledInlineLink,
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
	StyledGeoWrapper,
	StyledVenueRow,
} from './styles';
import { GroupStandings } from '../group-standings';
import { BroadcasterChip } from '../broadcaster-chip';
import { Broadcaster, GroupTableRow, GameParticipant, GameResult } from '@/types';

type Props = {
	broadcaster?: Broadcaster;
	groupOrRound: string;
	groupTable?: GroupTableRow[];
	homeTeam: GameParticipant;
	awayTeam: GameParticipant;
	isTopRankedMatch?: boolean;
	result?: GameResult;
	startTime: string;
	date?: string;
	onDayLabelClick?: VoidFunction;
	dayLabel?: string;
	venue?: string;
	currentTeamName?: string;
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
	date,
	onDayLabelClick,
	dayLabel,
	venue,
	currentTeamName,
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
	const venueLocalTime = date ? getVenueLocalTime(date, startTime, venue) : undefined;
	const renderMatchSide = (side: GameParticipant, label: string) => {
		const isTeam = side.kind === 'team';
		const isCurrentTeam =
			isTeam &&
			currentTeamName &&
			normalizeTeamName(side.teamName) === normalizeTeamName(currentTeamName);

		if (!isTeam || isCurrentTeam) {
			return <StyledInlineValue>{label}</StyledInlineValue>;
		}

		return (
			<StyledInlineLink href={`${WORLD_CUP_TEAMS_PATH}/${createTeamSlug(side.teamName)}`}>
				{label}
			</StyledInlineLink>
		);
	};

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
						{result ? (
							<>
								{renderMatchSide(homeTeam, homeTeamLabel)}
								<StyledScore>{`${result.homeScore} - ${result.awayScore}`}</StyledScore>
								{renderMatchSide(awayTeam, awayTeamLabel)}
							</>
						) : (
							<>
								{renderMatchSide(homeTeam, homeTeamLabel)}
								<StyledInlineSeparator>-</StyledInlineSeparator>
								{renderMatchSide(awayTeam, awayTeamLabel)}
							</>
						)}
					</StyledTeams>
					{venue ? (
						<StyledVenueRow>
							{venueLocalTime ? (
								<StyledGeoWrapper aria-label={`Lokal tid ${venueLocalTime}`}>
									{`${venueLocalTime} i ${venue}`}
								</StyledGeoWrapper>
							) : null}
						</StyledVenueRow>
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
