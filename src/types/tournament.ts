export type TeamParticipant = {
	kind: 'team';
	teamName: string;
};

export type GroupPositionParticipant = {
	group: string;
	kind: 'group-position';
	label: string;
	position: 1 | 2;
};

export type ThirdPlaceParticipant = {
	groups: string[];
	kind: 'third-place';
	label: string;
	position: 3;
};

export type WinnerParticipant = {
	kind: 'winner';
	label: string;
	matchNumber: number;
};

export type LoserParticipant = {
	kind: 'loser';
	label: string;
	matchNumber: number;
};

export type GameParticipant =
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
	homeScore: number;
	awayScore: number;
	sourceUrl?: string;
};

export type Broadcaster = 'SVT och SVT Play' | 'TV4 och TV4 Play';

export type ScrapedMatchResult = {
	homeScore: number;
	awayScore: number;
	sourceUrl?: string;
};

export type TournamentGame = {
	awayTeam: GameParticipant;
	broadcaster?: Broadcaster;
	groupOrRound: string;
	homeTeam: GameParticipant;
	id: string;
	matchNumber?: number;
	result?: MatchResult;
	time: string;
};

export type TournamentGamesData = {
	date: string;
	label: string;
	matches: TournamentGame[];
};

export type GroupTableRow = {
	goalDifference: number;
	goalsAgainst: number;
	goalsFor: number;
	points: number;
	position: number;
	teamName: string;
};

export type GroupTablesByLabel = Record<string, GroupTableRow[]>;

export type TournamentScheduleSource = 'hybrid' | 'static';

export type TournamentSchedulePayload = {
	groupTablesByLabel: GroupTablesByLabel;
	matchDays: TournamentGamesData[];
	source: TournamentScheduleSource;
	syncedAt: string;
};

export type TournamentEntry = {
	day: TournamentGamesData;
	dayIndex: number;
	match: TournamentGame;
	matchIndex: number;
};
export type WorldCupGame = {
	awayTeam: string;
	broadcaster?: Broadcaster;
	groupOrRound: string;
	homeTeam: string;
	result?: MatchResult;
	time: string;
	venue?: string;
};

export type WorldCup = {
	date: string;
	label: string;
	matches: WorldCupGame[];
};

export type MatchToCheck = {
	id: string;
	date: string;
	time: string;
	homeTeam: string;
	awayTeam: string;
};
