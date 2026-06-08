"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import {
  getGroupLabel,
  resolveMatchResultDisplay,
  resolveMatchSideDisplayName,
} from "../../lib/wc-match";
import type {
  MatchResult,
  MatchParticipant,
  MatchParticipantResolutionContext,
} from "../../types/wc-match";
import {
  StyledChip,
  StyledCard,
  StyledFooter,
  StyledGroupList,
  StyledGroupPanel,
  StyledGroupPosition,
  StyledGroupRow,
  StyledGroupTeam,
  StyledInfo,
  StyledCardHeader,
  StyledMatchRow,
  StyledMetaButton,
  StyledMetaText,
  StyledTeams,
  StyledTimeBadge,
  StyledResult,
} from "./styles";

type Props = {
  broadcaster?: string;
  resolutionContext?: MatchParticipantResolutionContext;
  groupOrRound: string;
  groupTeams?: string[];
  homeTeam: MatchParticipant;
  awayTeam: MatchParticipant;
  result?: MatchResult;
  time: string;
  dayLabel?: string;
};

export const MatchCard = ({
  broadcaster,
  groupOrRound,
  groupTeams,
  homeTeam,
  awayTeam,
  resolutionContext,
  result,
  time,

  dayLabel,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const homeTeamLabel = resolveMatchSideDisplayName(
    homeTeam,
    resolutionContext,
  );
  const awayTeamLabel = resolveMatchSideDisplayName(
    awayTeam,
    resolutionContext,
  );
  const resultLabel = resolveMatchResultDisplay(result);
  const shouldRenderFooter = Boolean(broadcaster);
  const groupLabel = getGroupLabel(groupOrRound);
  const canExpandGroup = Boolean(
    groupLabel && groupTeams && groupTeams.length > 0,
  );

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledTimeBadge>{time}</StyledTimeBadge>
        <StyledInfo>
          <StyledMatchRow>
            <StyledTeams>
              {homeTeamLabel} - {awayTeamLabel}
            </StyledTeams>
            {resultLabel ? <StyledResult>{resultLabel}</StyledResult> : null}
          </StyledMatchRow>
          {canExpandGroup ? (
            <StyledMetaButton
              type="button"
              aria-expanded={isExpanded}
              onClick={() => {
                setIsExpanded((currentValue) => !currentValue);
              }}
            >
              {groupLabel}
              <ChevronDown aria-hidden="true" size={14} />
            </StyledMetaButton>
          ) : (
            <StyledMetaText>{groupOrRound}</StyledMetaText>
          )}
        </StyledInfo>
      </StyledCardHeader>

      {canExpandGroup && isExpanded ? (
        <StyledGroupPanel>
          <StyledGroupList>
            {groupTeams?.map((teamName, index) => (
              <StyledGroupRow key={teamName}>
                <StyledGroupPosition>{index + 1}</StyledGroupPosition>
                <StyledGroupTeam>{teamName}</StyledGroupTeam>
              </StyledGroupRow>
            ))}
          </StyledGroupList>
        </StyledGroupPanel>
      ) : null}

      {shouldRenderFooter ? (
        <StyledFooter>
          {dayLabel ? <StyledChip>{`${dayLabel}`}</StyledChip> : null}
          {broadcaster ? <StyledChip>{broadcaster}</StyledChip> : null}
        </StyledFooter>
      ) : null}
    </StyledCard>
  );
};
