'use client';

import { useCallback, useState } from 'react';

import { StyledActionButton, StyledDivider, StyledMatches, StyledContainer } from './styles';

import { SearchBar } from '@/components/search-bar';
import { DayNavigation } from '@/components/day-navigation';
import { EmptyStateCard } from '@/components/empty-state-card';
import { HorizontalDatePicker } from '@/components/horizontal-date-picker';
import { MatchCard } from '@/components/match-card';

import { getInitialDayIndex, clampValue, getTeamName, isSwedenPlaying } from '@/lib/helper';
import { getGroupLabel } from '@/lib/tournument';
import { buildGroupTablesByLabel } from '@/server/data/helper';

import { useWorldCupSchedule } from '@/hooks/useWorldCupSchedule';

export const WorldCupSchedule = () => {
	const { data: schedule } = useWorldCupSchedule();

	const { matchDays } = schedule;

	const displayMatchDays = matchDays;
	const groupTablesByLabel = buildGroupTablesByLabel(displayMatchDays);

	const [selectedMatchDay, setSelectedMatchDay] = useState(() =>
		getInitialDayIndex(displayMatchDays),
	);
	const [searchTerm, setSearchTerm] = useState('');

	const safeSelectedMatchDay = clampValue(selectedMatchDay, displayMatchDays.length - 1);
	const selectedDay = displayMatchDays[safeSelectedMatchDay];
	const isFirstDay = safeSelectedMatchDay === 0;
	const isLastDay = safeSelectedMatchDay === displayMatchDays.length - 1;
	const matchesCount = selectedDay.matches.length;
	const totalMatchesText = matchesCount === 1 ? '1 match' : `${matchesCount} matcher`;

	const goToPreviousDay = useCallback(() => {
		setSelectedMatchDay((currentIndex) =>
			clampValue(currentIndex - 1, displayMatchDays.length - 1),
		);
	}, [displayMatchDays.length]);

	const goToNextDay = useCallback(() => {
		setSelectedMatchDay((currentIndex) =>
			clampValue(currentIndex + 1, displayMatchDays.length - 1),
		);
	}, [displayMatchDays.length]);

	const goToToday = useCallback(() => {
		setSelectedMatchDay(getInitialDayIndex(displayMatchDays));
	}, [displayMatchDays]);
	const goToMatchDay = useCallback(
		(date: string) => {
			const nextIndex = displayMatchDays.findIndex((day) => day.date === date);

			if (nextIndex === -1) {
				return;
			}

			setSelectedMatchDay(nextIndex);
			setSearchTerm('');
		},
		[displayMatchDays],
	);

	const normalizedSearchTerm = searchTerm.trim().toLowerCase();

	const filteredMatches = normalizedSearchTerm
		? displayMatchDays.flatMap((day) =>
				day.matches
					.filter((match) => {
						const homeTeamName = getTeamName(match.homeTeam)?.toLowerCase() ?? '';
						const awayTeamName = getTeamName(match.awayTeam)?.toLowerCase() ?? '';
						return (
							homeTeamName.includes(normalizedSearchTerm) ||
							awayTeamName.includes(normalizedSearchTerm)
						);
					})
					.map((match) => ({
						...match,
						date: day.date,
						dayLabel: day.label,
					})),
			)
		: [];

	return (
		<StyledContainer>
			<StyledActionButton
				type="button"
				onClick={() => {
					goToToday();
					setSearchTerm('');
				}}
			>
				Idag
			</StyledActionButton>
			<StyledDivider />
			<StyledDivider />
			<SearchBar
				key={searchTerm}
				loading={false}
				handleSubmit={(value) => {
					setSearchTerm(value);
				}}
				onClear={() => {
					setSearchTerm('');
				}}
				value={searchTerm}
			/>
			<StyledDivider />
			<StyledDivider />
			{searchTerm ? (
				<StyledMatches>
					{filteredMatches.map((match) => (
						<MatchCard
							key={match.id}
							awayTeam={match.awayTeam}
							broadcaster={match.broadcaster}
							groupOrRound={match.groupOrRound}
							groupTable={groupTablesByLabel[getGroupLabel(match.groupOrRound) ?? '']}
							homeTeam={match.homeTeam}
							isTopRankedMatch={match.isTopRankedMatch}
							result={match.result}
							dayLabel={match.dayLabel}
							onDayLabelClick={() => {
								goToMatchDay(match.date);
							}}
							startTime={match.time}
						/>
					))}
				</StyledMatches>
			) : (
				<>
					<DayNavigation
						isOnFirst={isFirstDay}
						isOnLast={isLastDay}
						label={selectedDay.label}
						meta={totalMatchesText}
						onNext={goToNextDay}
						onPrevious={goToPreviousDay}
					/>

					<HorizontalDatePicker
						ariaLabel="Matchdagar"
						items={displayMatchDays.map((day) => {
							const hasSwedenMatch = day.matches.some(
								(match) => isSwedenPlaying(match.homeTeam) || isSwedenPlaying(match.awayTeam),
							);

							return {
								id: day.date,
								date: day.date,
								flagCode: hasSwedenMatch ? 'SE' : undefined,
								flagLabel: hasSwedenMatch ? 'Sverige spelar' : undefined,
								hasTopRankedMatch: day.matches.some((match) => match.isTopRankedMatch),
								label: day.label,
								meta: `${day.matches.length} matcher`,
							};
						})}
						selectedIndex={safeSelectedMatchDay}
						onSelect={(_, index) => {
							setSelectedMatchDay(index);
						}}
					/>

					{selectedDay.matches.length > 0 ? (
						<StyledMatches>
							{selectedDay.matches.map((match) => (
								<MatchCard
									key={match.id}
									awayTeam={match.awayTeam}
									broadcaster={match.broadcaster}
									groupOrRound={match.groupOrRound}
									groupTable={groupTablesByLabel[getGroupLabel(match.groupOrRound) ?? '']}
									homeTeam={match.homeTeam}
									isTopRankedMatch={match.isTopRankedMatch}
									result={match.result}
									startTime={match.time}
								/>
							))}
						</StyledMatches>
					) : (
						<EmptyStateCard message="Inga matcher den här dagen." />
					)}
				</>
			)}
		</StyledContainer>
	);
};
