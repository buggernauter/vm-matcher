import type { Metadata } from 'next';

import {
	buildSchedulePageJsonLd,
	getScheduleCanonicalUrl,
	SCHEDULE_HERO_DESCRIPTION,
	SCHEDULE_HERO_TITLE,
	SCHEDULE_PAGE_DESCRIPTION,
	SCHEDULE_PAGE_TITLE,
} from '@/server/seo';
import { Countdown } from '@/components/count-down';
import { HeroCard } from '@/components/hero-card';
import { JsonLd } from '@/components/json-ld';
import { AppProviders } from '@/components/providers/app-providers';
import { WorldCupSchedule } from '@/features/world-cup/world-cup-schedule';
import { Trophy } from 'lucide-react';

export const metadata: Metadata = {
	alternates: {
		canonical: '/fotbolls-vm-2026',
	},
	description: SCHEDULE_PAGE_DESCRIPTION,
	openGraph: {
		description: SCHEDULE_PAGE_DESCRIPTION,
		title: SCHEDULE_PAGE_TITLE,
		url: getScheduleCanonicalUrl(),
	},
	title: SCHEDULE_PAGE_TITLE,
	twitter: {
		description: SCHEDULE_PAGE_DESCRIPTION,
		title: SCHEDULE_PAGE_TITLE,
	},
};

export default async function WorldCupSchedulePage() {
	const serverNow = Date.now();

	return (
		<>
			<JsonLd data={buildSchedulePageJsonLd()} />
			<HeroCard
				badge={
					<>
						<Trophy aria-hidden="true" color="gold" />
						Fotbolls-VM 2026
					</>
				}
				title={SCHEDULE_HERO_TITLE}
				description={SCHEDULE_HERO_DESCRIPTION}
				action={<Countdown serverNow={serverNow} />}
			/>

			<AppProviders>
				<WorldCupSchedule />
			</AppProviders>
		</>
	);
}
