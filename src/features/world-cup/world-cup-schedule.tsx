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
import { SearchBar } from "@/components/search-bar";
import { getTeamName } from "@/server/world-cup-merge";

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
  const [searchTerm, setSearchTerm] = useState("");

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

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredMatches = normalizedSearchTerm
    ? matchDays.flatMap((day) =>
        day.matches
          .filter((match) => {
            const homeTeamName =
              getTeamName(match.homeTeam)?.toLowerCase() ?? "";
            const awayTeamName =
              getTeamName(match.awayTeam)?.toLowerCase() ?? "";
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
    <StyledMain>
      <StyledScheduleCard>
        <StyledActionButton
          type="button"
          onClick={() => {
            goToToday();
            setSearchTerm("");
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
            setSearchTerm("");
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
                groupTeams={
                  groupTeamsByLabel[getGroupLabel(match.groupOrRound) ?? ""]
                }
                homeTeam={match.homeTeam}
                result={match.result}
                dayLabel={match.dayLabel}
                time={match.time}
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
              items={matchDays.map((day) => {
                const hasSwedenMatch = day.matches.some(
                  (match) =>
                    isSwedenPlaying(match.homeTeam) ||
                    isSwedenPlaying(match.awayTeam),
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
                    awayTeam={match.awayTeam}
                    broadcaster={match.broadcaster}
                    groupOrRound={match.groupOrRound}
                    groupTeams={
                      groupTeamsByLabel[getGroupLabel(match.groupOrRound) ?? ""]
                    }
                    homeTeam={match.homeTeam}
                    result={match.result}
                    time={match.time}
                  />
                ))}
              </StyledMatches>
            ) : (
              <EmptyStateCard message="Inga matcher den här dagen." />
            )}
          </>
        )}
      </StyledScheduleCard>
    </StyledMain>
  );
};
