import type { ReactNode } from 'react';

import { HeroCard } from '@/components/hero-card';
import { Trophy, Users } from 'lucide-react';

import { StyledWorldCupPageShell } from './styles';

export default function WorldCupLayout({ children }: { children: ReactNode }) {
	return (
		<StyledWorldCupPageShell>
			<HeroCard
				firstBadge={
					<>
						<Trophy aria-hidden="true" color="gold" />
						Fotbolls-VM 2026
					</>
				}
				secondBadge={
					<>
						<Users aria-hidden="true" color="gold" />
						Trupper
					</>
				}
			/>
			{children}
		</StyledWorldCupPageShell>
	);
}
