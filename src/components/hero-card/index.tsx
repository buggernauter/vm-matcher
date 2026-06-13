'use client';

import { useId, type ReactNode } from 'react';

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
	const titleId = useId();
	const descriptionId = useId();

	return (
		<StyledHeroCard
			tabIndex={0}
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
			aria-label={title}
		>
			<StyledHeroBadge tabIndex={0}>{badge}</StyledHeroBadge>
			<StyledHeroTitle as={titleTag} id={titleId} tabIndex={0}>
				{title}
			</StyledHeroTitle>
			<StyledHeroText id={descriptionId} tabIndex={0}>
				{description}
			</StyledHeroText>
			{action ? <StyledHeroActions>{action}</StyledHeroActions> : null}
		</StyledHeroCard>
	);
};
