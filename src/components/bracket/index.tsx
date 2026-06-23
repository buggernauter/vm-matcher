'use client';

import { BracketMatchData, BracketRoundData } from '@/types';

import {
	StyledBracket,
	StyledBranchDrop,
	StyledCardWrapper,
	StyledColumnWrapper,
	StyledCompactMatchColumn,
	StyledCompactCardRow,
	StyledCompactQuadMerges,
	StyledSectionCardsContainer,
	StyledHeader,
	StyledOutcomeConnector,
	StyledPairMerge,
	StyledResultWrapper,
	StyledResultsContainer,
	StyledRoundContainer,
	StyledRoundCards,
	StyledRoundWithSideMatch,
	StyledSection,
	StyledSideMatchWrapper,
	StyledTitle,
	StyledViewport,
} from './styles';
import { BracketCard } from '../bracket-card';

type Props = {
	finalMatch: BracketMatchData;
	rounds: BracketRoundData[];
	thirdPlaceMatch?: BracketMatchData;
	title: string;
};

type PlayoffRound = {
	columnCount: number;
	isColumnLayout: boolean;
	isCompactStackedPairs: boolean;
	isSemiFinalRound: boolean;
};

const groupMatches = (matches: BracketMatchData[], size = 2) => {
	const groups: BracketMatchData[][] = [];

	for (let index = 0; index < matches.length; index += size) {
		groups.push(matches.slice(index, index + size));
	}

	return groups;
};

const getPlayoffRound = (round: BracketRoundData): PlayoffRound => ({
	columnCount:
		round.layout === 'compactColumns'
			? 8
			: round.layout === 'compactStackedPairs'
				? 16
				: round.layout === 'quarterColumns'
					? 4
					: 2,
	isColumnLayout:
		round.layout === 'compactColumns' ||
		round.layout === 'compactStackedPairs' ||
		round.layout === 'quarterColumns' ||
		round.layout === 'semiColumns',
	isCompactStackedPairs: round.layout === 'compactStackedPairs',
	isSemiFinalRound: round.layout === 'semiColumns' && round.matches.length === 2,
});

export const BracketTree = ({ finalMatch, rounds, thirdPlaceMatch, title }: Props) => {
	return (
		<StyledSection>
			<StyledHeader>
				<StyledTitle>{title}</StyledTitle>
			</StyledHeader>
			<StyledViewport>
				<StyledBracket>
					{rounds.map((round) => {
						const playoffRound = getPlayoffRound(round);
						const matchGroups = groupMatches(
							round.matches,
							playoffRound.isColumnLayout ? playoffRound.columnCount : 2,
						);

						return (
							<StyledRoundWithSideMatch key={round.id}>
								<StyledRoundContainer $variant={round.layout}>
									<StyledRoundCards>
										{matchGroups.map((matchGroup) =>
											playoffRound.isColumnLayout ? (
												<StyledSectionCardsContainer
													key={matchGroup.map((match) => match.id).join('-')}
													$variant={round.layout}
													$columns={playoffRound.isCompactStackedPairs ? 8 : matchGroup.length}
												>
													<StyledCompactCardRow
														$columns={matchGroup.length}
														$variant={round.layout}
													>
														{matchGroup.map((match, matchIndex) => (
															<StyledCompactMatchColumn
																key={match.id}
																$align={matchIndex % 2 === 0 ? 'start' : 'end'}
																$variant={round.layout}
															>
																<StyledCardWrapper>
																	<BracketCard match={match} />
																</StyledCardWrapper>
																<StyledBranchDrop aria-hidden="true" />
															</StyledCompactMatchColumn>
														))}
													</StyledCompactCardRow>
													<StyledCompactQuadMerges $pairs={Math.ceil(matchGroup.length / 2)}>
														{groupMatches(matchGroup).map((matchPair) => (
															<StyledPairMerge
																key={matchPair.map((match) => match.id).join('-')}
																aria-hidden="true"
															></StyledPairMerge>
														))}
													</StyledCompactQuadMerges>
												</StyledSectionCardsContainer>
											) : (
												<StyledSectionCardsContainer
													key={matchGroup.map((match) => match.id).join('-')}
													$variant={round.layout}
												>
													{matchGroup.map((match, matchIndex) => (
														<StyledColumnWrapper
															key={match.id}
															$align={matchIndex % 2 === 0 ? 'start' : 'end'}
															$variant={round.layout}
														>
															<StyledCardWrapper>
																<BracketCard match={match} />
															</StyledCardWrapper>
															<StyledBranchDrop aria-hidden="true" />
														</StyledColumnWrapper>
													))}
												</StyledSectionCardsContainer>
											),
										)}
									</StyledRoundCards>
								</StyledRoundContainer>
								{playoffRound.isSemiFinalRound && thirdPlaceMatch ? (
									<StyledSideMatchWrapper>
										<StyledCardWrapper>
											<BracketCard match={thirdPlaceMatch} />
										</StyledCardWrapper>
									</StyledSideMatchWrapper>
								) : null}
							</StyledRoundWithSideMatch>
						);
					})}
					<StyledResultsContainer>
						<StyledResultWrapper>
							<StyledOutcomeConnector aria-hidden="true" />
							<StyledCardWrapper>
								<BracketCard match={finalMatch} featured />
							</StyledCardWrapper>
						</StyledResultWrapper>
					</StyledResultsContainer>
				</StyledBracket>
			</StyledViewport>
		</StyledSection>
	);
};
