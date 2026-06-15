import { notFound } from 'next/navigation';

import { getTeamName, normalizeTeamName, createTeamSlug } from '@/lib/helper';
import { WorldCupTeamPage } from '@/features/world-cup/team/world-cup-team-page';
import { fallbackScheduleData } from '@/server/data/schedule-base';
import { worldCupSquads } from '@/server/data/squads';

type Params = {
	team: string;
};

const getSquadBySlug = (slug: string) =>
	worldCupSquads.find((squad) => createTeamSlug(squad.countryName) === slug);

const getTeamMatches = (teamName: string) => {
	const normalizedSelectedTeam = normalizeTeamName(teamName);

	return fallbackScheduleData.matchDays.flatMap((day) =>
		day.matches
			.filter((match) => {
				const homeTeamName = getTeamName(match.homeTeam);
				const awayTeamName = getTeamName(match.awayTeam);
				const homeMatchesSelectedTeam = homeTeamName
					? normalizeTeamName(homeTeamName) === normalizedSelectedTeam
					: false;
				const awayMatchesSelectedTeam = awayTeamName
					? normalizeTeamName(awayTeamName) === normalizedSelectedTeam
					: false;

				return homeMatchesSelectedTeam || awayMatchesSelectedTeam;
			})
			.map((match) => ({
				...match,
				date: day.date,
				dayLabel: day.label,
			})),
	);
};

export const dynamicParams = false;

export function generateStaticParams() {
	return worldCupSquads.map((squad) => ({
		team: createTeamSlug(squad.countryName),
	}));
}

export default async function WorldCupTeamRoute({ params }: { params: Promise<Params> }) {
	const { team } = await params;
	const squad = getSquadBySlug(team);

	if (!squad) {
		notFound();
	}

	const teamMatches = getTeamMatches(squad.countryName);
	const playedMatches = teamMatches.filter((match) => Boolean(match.result));
	const upcomingMatches = teamMatches.filter((match) => !match.result);

	return (
		<>
			<WorldCupTeamPage
				groupTablesByLabel={fallbackScheduleData.groupTablesByLabel}
				playedMatches={playedMatches}
				squad={squad}
				upcomingMatches={upcomingMatches}
			/>
		</>
	);
}
