'use client';

import { BracketTree } from '@/components/bracket';
import { EmptyStateCard } from '@/components/empty-state-card';
import { useWorldCupSchedule } from '@/hooks/useWorldCupSchedule';
import { buildPlayoffBracket } from '@/features/world-cup/playoff-bracket/playoff-bracket';

import { StyledSection } from './styles';

export const WorldCupPlayoff = () => {
	const { schedule } = useWorldCupSchedule();
	const playoffBracket = buildPlayoffBracket(schedule.matchDays);

	return (
		<StyledSection>
			{playoffBracket ? (
				<BracketTree
					finalMatch={playoffBracket.finalMatch}
					rounds={playoffBracket.rounds}
					thirdPlaceMatch={playoffBracket.thirdPlaceMatch}
					title="Vägen till finalen"
				/>
			) : (
				<EmptyStateCard message="Slutspelsträdet är inte tillgängligt just nu." />
			)}
		</StyledSection>
	);
};
