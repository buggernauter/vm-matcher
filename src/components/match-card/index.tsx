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
  homeSide: MatchParticipant;
  awaySide: MatchParticipant;
  result?: MatchResult;
  time: string;
};

export const MatchCard = ({
  broadcaster,
  groupOrRound,
  groupTeams,
  homeSide,
  awaySide,
  resolutionContext,
  result,
  time,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const homeSideLabel = resolveMatchSideDisplayName(
    homeSide,
    resolutionContext,
  );
  const awaySideLabel = resolveMatchSideDisplayName(
    awaySide,
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
              {homeSideLabel} - {awaySideLabel}
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
          {broadcaster ? <StyledChip>{broadcaster}</StyledChip> : null}
        </StyledFooter>
      ) : null}
    </StyledCard>
  );
};
