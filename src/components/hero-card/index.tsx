'use client';

import type { ReactNode } from 'react';

import {
	StyledHeroActions,
	StyledHeroBadge,
	StyledHeroCard,
	StyledHeroText,
	StyledHeroTitle,
} from './styles';

type Props = {
	action?: ReactNode;
	badge: ReactNode;
	description: string;
	title: string;
	titleTag?: 'h1' | 'h2' | 'h3';
};

export const HeroCard = ({ action, badge, description, title, titleTag = 'h1' }: Props) => {
	return (
		<StyledHeroCard>
			<StyledHeroBadge>{badge}</StyledHeroBadge>
			<StyledHeroTitle as={titleTag}>{title}</StyledHeroTitle>
			<StyledHeroText>{description}</StyledHeroText>
			{action ? <StyledHeroActions>{action}</StyledHeroActions> : null}
		</StyledHeroCard>
	);
};
