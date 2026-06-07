export type TeamParticipant = {
  kind: "team";
  teamName: string;
};

export type GroupPositionParticipant = {
  group: string;
  kind: "group-position";
  label: string;
  position: 1 | 2;
};

export type ThirdPlaceParticipant = {
  groups: string[];
  kind: "third-place";
  label: string;
  position: 3;
};

export type WinnerParticipant = {
  kind: "winner";
  label: string;
  matchNumber: number;
};

export type LoserParticipant = {
  kind: "loser";
  label: string;
  matchNumber: number;
};

export type MatchParticipant =
  | TeamParticipant
  | GroupPositionParticipant
  | ThirdPlaceParticipant
  | WinnerParticipant
  | LoserParticipant;

export type MatchParticipantResolutionContext = {
  resolveGroupPosition?: (side: GroupPositionParticipant) => string | undefined;
  resolveLoser?: (side: LoserParticipant) => string | undefined;
  resolveTeam?: (side: TeamParticipant) => string | undefined;
  resolveThirdPlace?: (side: ThirdPlaceParticipant) => string | undefined;
  resolveWinner?: (side: WinnerParticipant) => string | undefined;
};

export type MatchResult = {
  away: number;
  home: number;
};

export type WCMatch = {
  awaySide: MatchParticipant;
  broadcaster?: string;
  groupOrRound: string;
  homeSide: MatchParticipant;
  id: string;
  matchNumber?: number;
  result?: MatchResult;
  time: string;
};

export type WCMatchDay = {
  date: string;
  label: string;
  matches: WCMatch[];
};

export type GroupTeamsByLabel = Record<string, string[]>;

export type WorldCupScheduleSource = "hybrid" | "static";

export type WorldCupSchedulePayload = {
  groupTeamsByLabel: GroupTeamsByLabel;
  matchDays: WCMatchDay[];
  source: WorldCupScheduleSource;
  syncedAt: string;
};

export type WorldCupResultSyncPayload = WorldCupSchedulePayload & {
  updatedMatchesCount: number;
};
