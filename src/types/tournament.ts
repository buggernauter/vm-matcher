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


export type WorldCupGame = {
	awayTeam: string;
	awayTeamRanking?: number;
	broadcaster?: Broadcaster;
	groupOrRound: string;
	homeTeam: string;
	homeTeamRanking?: number;
	result?: GameResult;
	startTime: string;
	venue?: string;
};

export type WorldCup = {
	date: string;
	label: string;
	matches: WorldCupGame[];
};
