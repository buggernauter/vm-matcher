export type TeamParticipant = {
	kind: 'team';
	teamName: string;
};

export type PlaceholderParticipant = {
	kind: 'placeholder';
	label: string;
};

export type GameParticipant = TeamParticipant | PlaceholderParticipant;

export type GameResult = {
	homeScore: number;
	awayScore: number;
	sourceUrl?: string;
};

export type Broadcaster = 'SVT och SVT Play' | 'TV4 och TV4 Play';

export type TournamentGame = {
	awayTeam: GameParticipant;
	awayTeamRanking?: number;
	broadcaster?: Broadcaster;
	groupOrRound: string;
	homeTeam: GameParticipant;
	homeTeamRanking?: number;
	id: string;
	isTopRankedMatch?: boolean;
	result?: GameResult;
	time: string;
	venue?: string;
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
	playedGames: number;
	points: number;
	position: number;
	teamName: string;
};

export type GroupTablesByLabel = Record<string, GroupTableRow[]>;

export type WorldCupScheduleData = {
	groupTablesByLabel: GroupTablesByLabel;
	matchDays: TournamentGamesData[];
};

export type WorldCupScheduleResponse = WorldCupScheduleData & {
	source: 'dynamic' | 'static';
	syncedAt: string;
};

export type WorldCupGame = {
	awayTeam: string;
	awayTeamRanking?: number;
	broadcaster?: Broadcaster;
	groupOrRound: string;
	homeTeam: string;
	homeTeamRanking?: number;
	id: string;
	result?: GameResult;
	startTime: string;
	venue?: string;
};

export type WorldCup = {
	date: string;
	label: string;
	matches: WorldCupGame[];
};
export type Player = {
	number: number;
	player: string;
	age: number;
	club: string;
};

export type WorldCupSquadPosition = 'GK' | 'DF' | 'MF' | 'FW';

export type WorldCupSquad = {
	countryName: string;
	flagCode: string;
	ranking: number;
	players: Record<WorldCupSquadPosition, Player[]>;
};
export type WorldCupResults = Record<string, GameResult>;

export type BracketRoundLayout =
	| 'compactColumns'
	| 'compactStackedPairs'
	| 'default'
	| 'quarterColumns'
	| 'semiColumns';

export type BracketRoundData = {
	id: string;
	layout?: BracketRoundLayout;
	title: string;
	matches: BracketMatchData[];
};

export type BracketMatchData = {
	awayLabel: string;
	awayFlagCode?: string;
	compactDate?: string;
	compactDayMonth?: string;
	compactTime?: string;
	compactWeekday?: string;
	homeLabel: string;
	homeFlagCode?: string;
	id: string;
	layoutVariant?: 'compact' | 'default';
	matchNumber?: number;
	meta?: string;
	result?: GameResult;
	roundLabel?: string;
	venue?: string;
};
