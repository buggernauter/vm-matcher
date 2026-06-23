import type { Metadata } from 'next';

import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { WorldCupPlayoff } from '@/features/world-cup/playoff-bracket/world-cup-playoff';
import {
	buildPlayoffPageJsonLd,
	getPlayoffCanonicalUrl,
	PLAYOFF_HERO_DESCRIPTION,
	PLAYOFF_HERO_TITLE,
	PLAYOFF_PAGE_DESCRIPTION,
	PLAYOFF_PAGE_TITLE,
} from '@/server/seo';

export const metadata: Metadata = {
	alternates: {
		canonical: '/slutspel-vm-2026',
	},
	description: PLAYOFF_PAGE_DESCRIPTION,
	openGraph: {
		description: PLAYOFF_PAGE_DESCRIPTION,
		title: PLAYOFF_PAGE_TITLE,
		url: getPlayoffCanonicalUrl(),
	},
	title: PLAYOFF_PAGE_TITLE,
	twitter: {
		description: PLAYOFF_PAGE_DESCRIPTION,
		title: PLAYOFF_PAGE_TITLE,
	},
};

export default function WorldCupPlayoffPage() {
	return (
		<>
			<JsonLd data={buildPlayoffPageJsonLd()} />
			<Header title={PLAYOFF_HERO_TITLE} description={PLAYOFF_HERO_DESCRIPTION} />
			<WorldCupPlayoff />
		</>
	);
}
