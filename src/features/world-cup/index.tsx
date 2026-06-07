"use client";

import { Trophy } from "lucide-react";
import { useCallback, useState } from "react";

import { DayNavigation } from "../../components/day-navigation";
import { EmptyStateCard } from "../../components/empty-state-card";
import { HorizontalDatePicker } from "../../components/horizontal-date-picker";
import { HeroCard } from "../../components/hero-card";
import { MatchCard } from "../../components/match-card";
import {
  useWorldCupSchedule,
  worldCupFallbackSchedule,
} from "../../hooks/useWorldCupSchedule";
import { clampValue, getSwedishDateKey } from "../../lib/helper";
import { getGroupLabel } from "../../lib/wc-match";
import type { MatchParticipant } from "../../types/wc-match";
import {
  StyledActionButton,
  StyledMatches,
  StyledPage,
  StyledScheduleCard,
  StyledStack,
} from "./styles";

const getInitialDayIndex = (dayList: Array<{ date: string }>) => {
  const today = getSwedishDateKey();
  const todayIndex = dayList.findIndex((day) => day.date === today);

  if (todayIndex !== -1) {
    return todayIndex;
  }

  const nextMatchDayIndex = dayList.findIndex((day) => day.date > today);

  return nextMatchDayIndex === -1 ? dayList.length - 1 : nextMatchDayIndex;
};

const normalizeTeamName = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

const SWEDEN_TEAM_ALIASES = new Set(["sverige", "sweden"]);

const isSwedenSide = (side: MatchParticipant) =>
  side.kind === "team" &&
  SWEDEN_TEAM_ALIASES.has(normalizeTeamName(side.teamName));

export const WCGamesPage = () => {
  const { data } = useWorldCupSchedule();
  const schedule = data ?? worldCupFallbackSchedule;
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
    <StyledPage>
      <StyledStack>
        <HeroCard
          badge={
            <>
              <Trophy aria-hidden="true" color="gold" />
              Fotbolls-VM 2026
            </>
          }
          title="Dagens matcher"
          description="VM matcher med svenska tider."
        />

        <StyledScheduleCard>
          <StyledActionButton type="button" onClick={goToToday}>
            Idag
          </StyledActionButton>
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
                  isSwedenSide(match.homeSide) || isSwedenSide(match.awaySide),
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
      </StyledStack>
    </StyledPage>
  );
};
