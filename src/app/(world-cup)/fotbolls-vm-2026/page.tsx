import type { Metadata } from 'next';

import {
	buildSchedulePageJsonLd,
	getScheduleCanonicalUrl,
	SCHEDULE_HERO_DESCRIPTION,
	SCHEDULE_HERO_TITLE,
	SCHEDULE_PAGE_DESCRIPTION,
	SCHEDULE_PAGE_TITLE,
} from '@/server/seo';

import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { WorldCupSchedule } from '@/features/world-cup/schedule/world-cup-schedule';

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
	return (
		<>
			<JsonLd data={buildSchedulePageJsonLd()} />
			<Header title={SCHEDULE_HERO_TITLE} description={SCHEDULE_HERO_DESCRIPTION} />
			<WorldCupSchedule />
		</>
	);
}
