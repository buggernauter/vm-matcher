export type PendingMatch = {
	awayTeam: string;
	date: string;
	groupOrRound: string;
	homeTeam: string;
	id: string;
	startTime: string;
};

export type RunnableMatch = PendingMatch & {
	hasBaseResult: boolean;
};

export type OpenAIResultItem = {
	awayScore: number;
	homeScore: number;
	matchId: string;
	sourceUrl: string;
};

export type OpenAITeamUpdateItem = {
	awayTeam: string;
	homeTeam: string;
	matchId: string;
	sourceUrl: string;
};

export type OpenAIResponsePayload = {
	results: OpenAIResultItem[];
	teamUpdates: OpenAITeamUpdateItem[];
};
