import type { Metadata } from 'next';

import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';

import {
	buildTeamsPageJsonLd,
	getTeamsCanonicalUrl,
	TEAMS_HERO_DESCRIPTION,
	TEAMS_HERO_TITLE,
	TEAMS_PAGE_DESCRIPTION,
	TEAMS_PAGE_TITLE,
} from '@/server/seo';
import { WorldCupSquads } from '@/features/world-cup/squads/world-cup-squads';

export const metadata: Metadata = {
	alternates: {
		canonical: '/lag-vm-2026',
	},
	description: TEAMS_PAGE_DESCRIPTION,
	openGraph: {
		description: TEAMS_PAGE_DESCRIPTION,
		title: TEAMS_PAGE_TITLE,
		url: getTeamsCanonicalUrl(),
	},
	title: TEAMS_PAGE_TITLE,
	twitter: {
		description: TEAMS_PAGE_DESCRIPTION,
		title: TEAMS_PAGE_TITLE,
	},
};

export default function WorldCupTeamsPage() {
	return (
		<>
			<JsonLd data={buildTeamsPageJsonLd()} />
			<Header title={TEAMS_HERO_TITLE} description={TEAMS_HERO_DESCRIPTION} />
			<WorldCupSquads />
		</>
	);
}
