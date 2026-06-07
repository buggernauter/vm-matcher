"use client";

import { useCallback, useState } from "react";

import { DayNavigation } from "../../components/day-navigation";
import { EmptyStateCard } from "../../components/empty-state-card";
import { HorizontalDatePicker } from "../../components/horizontal-date-picker";

import { MatchCard } from "../../components/match-card";
import {
  useWorldCupSchedule,
  worldCupFallbackSchedule,
} from "../../hooks/useWorldCupSchedule";
import {
  clampValue,
  getInitialDayIndex,
  isSwedenPlaying,
} from "../../lib/helper";
import { getGroupLabel } from "../../lib/wc-match";

import {
  StyledActionButton,
  StyledDivider,
  StyledMatches,
  StyledMain,
  StyledScheduleCard,
} from "./styles";
import type { WorldCupSchedulePayload } from "../../types/wc-match";

type Props = {
  heroTitleTag?: "h1" | "h2" | "h3";
  initialSchedule?: WorldCupSchedulePayload;
};

export const WorldCupSchedule = ({ initialSchedule }: Props) => {
  const { data } = useWorldCupSchedule(initialSchedule);
  const schedule = data ?? initialSchedule ?? worldCupFallbackSchedule;
  const { groupTeamsByLabel, matchDays } = schedule;

  const [selectedMatchDay, setSelectedMatchDay] = useState(() =>
    getInitialDayIndex(matchDays),
  );

  const safeSelectedMatchDay = clampValue(
    selectedMatchDay,
    matchDays.length - 1,
  );
  const selectedDay = matchDays[safeSelectedMatchDay];
  const isFirstDay = safeSelectedMatchDay === 0;
  const isLastDay = safeSelectedMatchDay === matchDays.length - 1;
  const matchesCount = selectedDay.matches.length;
  const totalMatchesText =
    matchesCount === 1 ? "1 match" : `${matchesCount} matcher`;

  const goToPreviousDay = useCallback(() => {
    setSelectedMatchDay((currentIndex) =>
      clampValue(currentIndex - 1, matchDays.length - 1),
    );
  }, [matchDays.length]);

  const goToNextDay = useCallback(() => {
    setSelectedMatchDay((currentIndex) =>
      clampValue(currentIndex + 1, matchDays.length - 1),
    );
  }, [matchDays.length]);

  const goToToday = useCallback(() => {
    setSelectedMatchDay(getInitialDayIndex(matchDays));
  }, [matchDays]);

  return (
    <StyledMain>
      <StyledScheduleCard>
        <StyledActionButton type="button" onClick={goToToday}>
          Idag
        </StyledActionButton>
        <StyledDivider />
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
          items={matchDays.map((day) => {
            const hasSwedenMatch = day.matches.some(
              (match) =>
                isSwedenPlaying(match.homeSide) ||
                isSwedenPlaying(match.awaySide),
            );

            return {
              id: day.date,
              date: day.date,
              flagCode: hasSwedenMatch ? "SE" : undefined,
              flagLabel: hasSwedenMatch ? "Sverige spelar" : undefined,
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
                awaySide={match.awaySide}
                broadcaster={match.broadcaster}
                groupOrRound={match.groupOrRound}
                groupTeams={
                  groupTeamsByLabel[getGroupLabel(match.groupOrRound) ?? ""]
                }
                homeSide={match.homeSide}
                result={match.result}
                time={match.time}
              />
            ))}
          </StyledMatches>
        ) : (
          <EmptyStateCard message="Inga matcher den här dagen." />
        )}
      </StyledScheduleCard>
    </StyledMain>
  );
};
