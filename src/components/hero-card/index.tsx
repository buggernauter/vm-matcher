'use client';

import { usePathname } from 'next/navigation';
import {
	WORLD_CUP_PLAYOFF_PATH,
	WORLD_CUP_SCHEDULE_PATH,
	WORLD_CUP_TEAMS_PATH,
} from '@/server/constants';

import { StyledBadgeWrapper, StyledHeroBadge, StyledHeroCard } from './styles';
import { ReactNode } from 'react';

type Props = {
	firstBadge: ReactNode;
	secondBadge: ReactNode;
	thirdBadge: ReactNode;
};

export const HeroCard = ({ firstBadge, secondBadge, thirdBadge }: Props) => {
	const pathname = usePathname();

	return (
		<StyledHeroCard aria-label="Navigering för Fotbolls-VM 2026">
			<StyledBadgeWrapper>
				<StyledHeroBadge
					href={WORLD_CUP_SCHEDULE_PATH}
					$active={pathname === WORLD_CUP_SCHEDULE_PATH}
				>
					{firstBadge}
				</StyledHeroBadge>
				<StyledHeroBadge
					href={WORLD_CUP_TEAMS_PATH}
					$active={pathname.startsWith(WORLD_CUP_TEAMS_PATH)}
				>
					{secondBadge}
				</StyledHeroBadge>
				<StyledHeroBadge
					href={WORLD_CUP_PLAYOFF_PATH}
					$active={pathname === WORLD_CUP_PLAYOFF_PATH}
				>
					{thirdBadge}
				</StyledHeroBadge>
			</StyledBadgeWrapper>
		</StyledHeroCard>
	);
};
