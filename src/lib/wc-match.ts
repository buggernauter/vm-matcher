import type {
  GroupTeamsByLabel,
  MatchParticipant,
  MatchParticipantResolutionContext,
  MatchResult,
  TeamParticipant,
  WCMatchDay as MatchDay,
} from "../types/wc-match";

const GROUP_ROUND_PATTERN = /^Grupp ([A-Z])$/;
const GROUP_POSITION_PATTERN = /^([12])([A-Z])$/;
const LOSER_MATCH_PATTERN = /^L(\d+)$/;
const LOSER_MATCH_TEXT_PATTERN = /^Förlorare match (\d+)$/;
const THIRD_PLACE_PATTERN = /^3([A-Z](?:\/[A-Z])+)$/;
const WINNER_MATCH_PATTERN = /^W(\d+)$/;

export const createMatchSide = (rawSide: string): MatchParticipant => {
  const groupPositionMatch = rawSide.match(GROUP_POSITION_PATTERN);

  if (groupPositionMatch) {
    return {
      group: groupPositionMatch[2],
      kind: "group-position",
      label: rawSide,
      position: Number(groupPositionMatch[1]) as 1 | 2,
    };
  }

  const thirdPlaceMatch = rawSide.match(THIRD_PLACE_PATTERN);

  if (thirdPlaceMatch) {
    return {
      groups: thirdPlaceMatch[1].split("/"),
      kind: "third-place",
      label: rawSide,
      position: 3,
    };
  }

  const winnerMatch = rawSide.match(WINNER_MATCH_PATTERN);

  if (winnerMatch) {
    return {
      kind: "winner",
      label: rawSide,
      matchNumber: Number(winnerMatch[1]),
    };
  }

  const loserMatch = rawSide.match(LOSER_MATCH_PATTERN);

  if (loserMatch) {
    return {
      kind: "loser",
      label: rawSide,
      matchNumber: Number(loserMatch[1]),
    };
  }

  const loserMatchText = rawSide.match(LOSER_MATCH_TEXT_PATTERN);

  if (loserMatchText) {
    return {
      kind: "loser",
      label: rawSide,
      matchNumber: Number(loserMatchText[1]),
    };
  }

  return {
    kind: "team",
    teamName: rawSide,
  };
};

export const extractMatchNumber = (groupOrRound: string) => {
  const match = groupOrRound.match(/Match (\d+)/);

  if (!match) {
    return;
  }

  return Number(match[1]);
};

export const getGroupLabel = (groupOrRound: string) => {
  const match = groupOrRound.match(GROUP_ROUND_PATTERN);

  if (!match) {
    return;
  }

  return `Grupp ${match[1]}`;
};

export const resolveMatchSideDisplayName = (
  side: MatchParticipant,
  context: MatchParticipantResolutionContext = {},
) => {
  switch (side.kind) {
    case "team":
      return resolveTeamSide(side, context);
    case "group-position":
      return context.resolveGroupPosition?.(side) ?? side.label;
    case "third-place":
      return context.resolveThirdPlace?.(side) ?? side.label;
    case "winner":
      return context.resolveWinner?.(side) ?? side.label;
    case "loser":
      return context.resolveLoser?.(side) ?? side.label;
  }
};

const resolveTeamSide = (
  side: TeamParticipant,
  context: MatchParticipantResolutionContext,
) => context.resolveTeam?.(side) ?? side.teamName;

export const getMatchSideStableLabel = (side: MatchParticipant) => {
  switch (side.kind) {
    case "team":
      return side.teamName;
    case "group-position":
    case "third-place":
    case "winner":
    case "loser":
      return side.label;
  }
};

export const formatMatchScore = (score: MatchResult) =>
  `${score.home}-${score.away}`;

export const resolveMatchResultDisplay = (result?: MatchResult) =>
  result ? formatMatchScore(result) : undefined;

export const buildGroupTeamsByLabel = (
  matchDays: MatchDay[],
): GroupTeamsByLabel => {
  const groupTeamsByLabel: GroupTeamsByLabel = {};

  for (const day of matchDays) {
    for (const match of day.matches) {
      const groupLabel = getGroupLabel(match.groupOrRound);

      if (!groupLabel) {
        continue;
      }

      const groupTeams = groupTeamsByLabel[groupLabel] ?? [];

      if (
        match.homeTeam.kind === "team" &&
        !groupTeams.includes(match.homeTeam.teamName)
      ) {
        groupTeams.push(match.homeTeam.teamName);
      }

      if (
        match.awayTeam.kind === "team" &&
        !groupTeams.includes(match.awayTeam.teamName)
      ) {
        groupTeams.push(match.awayTeam.teamName);
      }

      groupTeamsByLabel[groupLabel] = groupTeams;
    }
  }

  return groupTeamsByLabel;
};
