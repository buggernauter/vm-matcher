export type StoredMatchResult = {
	awayScore: number;
	homeScore: number;
	sourceUrl?: string;
};

export type PendingMatch = {
	awayTeam: string;
	date: string;
	homeTeam: string;
	id: string;
	startTime: string;
};

export type RunnableMatch = PendingMatch & {
	hasBaseResult: boolean;
	hasStoredResult: boolean;
};

export type OpenAIResultItem = {
	awayScore: number;
	homeScore: number;
	matchId: string;
	sourceUrl: string;
};

export type OpenAIResponsePayload = {
	results: OpenAIResultItem[];
};
