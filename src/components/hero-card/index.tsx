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
	fourthBadge?: ReactNode;
};

export const HeroCard = ({ firstBadge, secondBadge, thirdBadge, fourthBadge }: Props) => {
	const pathname = usePathname();

	return (
		<StyledHeroCard aria-label="Navigering för Fotbolls-VM 2026">
			<StyledBadgeWrapper>
				<StyledHeroBadge
					href={WORLD_CUP_SCHEDULE_PATH}
					aria-current={pathname === WORLD_CUP_SCHEDULE_PATH ? 'page' : undefined}
				>
					{firstBadge}
				</StyledHeroBadge>
				<StyledHeroBadge
					href={WORLD_CUP_TEAMS_PATH}
					aria-current={pathname.startsWith(WORLD_CUP_TEAMS_PATH) ? 'page' : undefined}
				>
					{secondBadge}
				</StyledHeroBadge>
				<StyledHeroBadge
					href={WORLD_CUP_PLAYOFF_PATH}
					aria-current={pathname === WORLD_CUP_PLAYOFF_PATH ? 'page' : undefined}
				>
					{thirdBadge}
				</StyledHeroBadge>
				{fourthBadge}
			</StyledBadgeWrapper>
		</StyledHeroCard>
	);
};
