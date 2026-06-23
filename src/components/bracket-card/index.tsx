import { BracketMatchData } from '@/types';
import { getFifaTeamCode } from '@/lib/fifa-team-code';
import Flag from 'react-world-flags';
import {
	StyledCard,
	StyledCompactDate,
	StyledCompactDayMonth,
	StyledCompactTeamFlag,
	StyledCompactMeta,
	StyledCompactSeparator,
	StyledCompactTeamLabel,
	StyledCompactTeamLine,
	StyledCompactTeams,
	StyledCompactTime,
	StyledCompactWeekday,
	StyledDivider,
	StyledMatchHeader,
	StyledMatchNumber,
	StyledMeta,
	StyledScore,
	StyledTeamFlag,
	StyledTeamName,
	StyledTeamRow,
	StyledTeams,
	StyledVenue,
} from './styles';

const formatCompactTeamLabel = (label: string) => {
	if (!label.includes('/')) {
		return [label];
	}

	const segments = label.split('/').filter(Boolean);

	return segments.map((segment, index) =>
		index === segments.length - 1 ? segment : `${segment}/`,
	);
};

const renderCompactTeamDisplay = ({
	flagCode,
	label,
}: {
	flagCode?: string;
	label: string;
}) => {
	if (flagCode) {
		return (
			<StyledCompactTeamFlag>
				<Flag code={flagCode} alt="" />
			</StyledCompactTeamFlag>
		);
	}

	return formatCompactTeamLabel(label).map((line) => (
		<StyledCompactTeamLine key={`${label}-${line}`}>{line}</StyledCompactTeamLine>
	));
};

const renderTeamDisplay = ({
	flagCode,
	label,
}: {
	flagCode?: string;
	label: string;
}) => {
	if (flagCode) {
		return (
			<StyledTeamFlag>
				<Flag code={flagCode} alt="" />
			</StyledTeamFlag>
		);
	}

	return <StyledTeamName>{label}</StyledTeamName>;
};

export const BracketCard = ({
	match,
	featured = false,
}: {
	featured?: boolean;
	match: BracketMatchData;
}) => {
	const hasResult = Boolean(match.result);
	const isCompact = match.layoutVariant === 'compact';
	const homeDisplayLabel = getFifaTeamCode(match.homeLabel) ?? match.homeLabel;
	const awayDisplayLabel = getFifaTeamCode(match.awayLabel) ?? match.awayLabel;
	const ariaLabel = hasResult
		? `${match.homeLabel} ${match.result?.homeScore}-${match.result?.awayScore} ${match.awayLabel}`
		: `${match.homeLabel} mot ${match.awayLabel}`;

	if (isCompact) {
		return (
			<StyledCard $compact aria-label={ariaLabel}>
				<StyledCompactMeta>
					{match.compactWeekday ? (
						<StyledCompactWeekday>{match.compactWeekday}</StyledCompactWeekday>
					) : null}
					{match.compactDayMonth ? (
						<StyledCompactDayMonth>{match.compactDayMonth}</StyledCompactDayMonth>
					) : match.compactDate ? (
						<StyledCompactDate>{match.compactDate}</StyledCompactDate>
					) : null}
					{match.compactTime ? <StyledCompactTime>{match.compactTime}</StyledCompactTime> : null}
				</StyledCompactMeta>
				<StyledCompactTeams>
					<StyledCompactTeamLabel>
						{renderCompactTeamDisplay({
							flagCode: match.homeFlagCode,
							label: homeDisplayLabel,
						})}
					</StyledCompactTeamLabel>
					<StyledCompactSeparator>-</StyledCompactSeparator>
					<StyledCompactTeamLabel>
						{renderCompactTeamDisplay({
							flagCode: match.awayFlagCode,
							label: awayDisplayLabel,
						})}
					</StyledCompactTeamLabel>
				</StyledCompactTeams>
				{typeof match.matchNumber === 'number' ? (
					<StyledMatchNumber $compact>{`Match ${match.matchNumber}`}</StyledMatchNumber>
				) : null}
			</StyledCard>
		);
	}

	return (
		<StyledCard $featured={featured} aria-label={ariaLabel}>
			<StyledMatchHeader>
				{match.meta ? <StyledMeta>{match.meta}</StyledMeta> : null}
				{match.venue ? <StyledVenue>{match.venue}</StyledVenue> : null}
			</StyledMatchHeader>
			<StyledTeams>
				<StyledTeamRow>
					{renderTeamDisplay({
						flagCode: match.homeFlagCode,
						label: homeDisplayLabel,
					})}
					{hasResult ? <StyledScore>{match.result?.homeScore}</StyledScore> : null}
				</StyledTeamRow>
				<StyledDivider />
				<StyledTeamRow>
					{renderTeamDisplay({
						flagCode: match.awayFlagCode,
						label: awayDisplayLabel,
					})}
					{hasResult ? <StyledScore>{match.result?.awayScore}</StyledScore> : null}
				</StyledTeamRow>
			</StyledTeams>
			{typeof match.matchNumber === 'number' ? (
				<StyledMatchNumber>{`Match ${match.matchNumber}`}</StyledMatchNumber>
			) : null}
		</StyledCard>
	);
};
