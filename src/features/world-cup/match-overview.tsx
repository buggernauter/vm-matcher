"use client";

import { Trophy } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { HeroCard } from "@/components/hero-card";
import { MatchCard } from "@/components/match-card";
import { getGroupLabel } from "@/lib/wc-match";
import type { WorldCupMatchEntry, WorldCupSchedulePayload } from "@/types/wc-match";

import { StyledPage, StyledScheduleCard, StyledStack } from "./styles";
import {
  StyledSeoInlineNav,
  StyledSeoLinkButton,
  StyledSeoSection,
  StyledSeoSectionTitle,
  StyledSeoText,
} from "./seo-styles";

type Props = {
  breadcrumbJsonLd: object;
  dayHref: string;
  dayLabel: string;
  entry: WorldCupMatchEntry;
  matchJsonLd: object;
  matchTitle: string;
  schedule: WorldCupSchedulePayload;
};

export const WorldCupMatchOverview = ({
  breadcrumbJsonLd,
  dayHref,
  dayLabel,
  entry,
  matchJsonLd,
  matchTitle,
  schedule,
}: Props) => (
  <StyledPage>
    <JsonLd data={breadcrumbJsonLd} />
    <JsonLd data={matchJsonLd} />

    <StyledStack>
      <HeroCard
        badge={
          <>
            <Trophy aria-hidden="true" color="gold" />
            Matchdetaljer
          </>
        }
        title={matchTitle}
        description={`${dayLabel}, ${entry.match.time}. ${entry.match.groupOrRound}`}
      />

      <StyledSeoSection>
        <StyledSeoInlineNav aria-label="Navigering">
          <StyledSeoLinkButton href="/">Hem</StyledSeoLinkButton>
          <StyledSeoLinkButton href="/fotbolls-vm-2026">
            Hela spelschemat
          </StyledSeoLinkButton>
          <StyledSeoLinkButton href={dayHref}>Till {dayLabel}</StyledSeoLinkButton>
        </StyledSeoInlineNav>
      </StyledSeoSection>

      <StyledScheduleCard>
        <MatchCard
          awaySide={entry.match.awaySide}
          broadcaster={entry.match.broadcaster}
          groupOrRound={entry.match.groupOrRound}
          groupTeams={
            schedule.groupTeamsByLabel[getGroupLabel(entry.match.groupOrRound) ?? ""]
          }
          homeSide={entry.match.homeSide}
          result={entry.match.result}
          time={entry.match.time}
        />
      </StyledScheduleCard>

      <StyledSeoSection>
        <StyledSeoSectionTitle>Matchinformation</StyledSeoSectionTitle>
        <StyledSeoText>Matchdag: {dayLabel}</StyledSeoText>
        <StyledSeoText>Avspark: {entry.match.time}</StyledSeoText>
        <StyledSeoText>Runda: {entry.match.groupOrRound}</StyledSeoText>
        {entry.match.broadcaster ? (
          <StyledSeoText>Kanal: {entry.match.broadcaster}</StyledSeoText>
        ) : null}
        <StyledSeoText>
          Match-ID: <code>{entry.match.id}</code>
        </StyledSeoText>
      </StyledSeoSection>
    </StyledStack>
  </StyledPage>
);
