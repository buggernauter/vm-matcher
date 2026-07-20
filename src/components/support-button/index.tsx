'use client';

import { StyledHeroActionBadge } from '@/components/hero-card/styles';
import { Heart } from 'lucide-react';

const KO_FI_URL = 'https://ko-fi.com/atlas1337';

export const SupportButton = () => {
	return (
		<StyledHeroActionBadge
			href={KO_FI_URL}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Support vmmatcher"
		>
			<Heart aria-hidden="true" color="gold" />
			Support VM-matcher
		</StyledHeroActionBadge>
	);
};
