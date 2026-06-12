type BuildWorldCupMatchIdProps = {
	awayTeam: string;
	date: string;
	homeTeam: string;
	matchIndex: number;
	startTime: string;
};

export const buildWorldCupMatchId = ({
	awayTeam,
	date,
	homeTeam,
	matchIndex,
	startTime,
}: BuildWorldCupMatchIdProps) => `${date}-${startTime}-${homeTeam}-${awayTeam}-${matchIndex}`;
