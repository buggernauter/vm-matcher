type MatchStatus = 'not-started' | 'in-progress' | 'ready-for-result-check';

type Props = {
	date: string;
	time: string;
	now: number;
};
export const getMatchStatus = ({ date, time, now }: Props): MatchStatus => {
	const kickoff = new Date(`${date}T${time.replace('.', ':')}:00`);
	const resultCheckTime = new Date(kickoff.getTime() + 120 * 60 * 1000);
	if (now < kickoff.getTime()) {
		return 'not-started';
	}
	if (now < resultCheckTime.getTime()) {
		return 'in-progress';
	}
	return 'ready-for-result-check';
};
