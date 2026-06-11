import { WORLD_CUP_SCHEDULE_PATH } from './constants';
import { getAbsoluteUrl } from './site';

export const SITE_NAME = 'VMMatcher';
export const SITE_DESCRIPTION =
	'Fotbolls-VM 2026 med spelschema, svenska tider, resultat, gruppspel och slutspel.';
export const SCHEDULE_PAGE_TITLE = 'Fotbolls-VM 2026 spelschema – matcher, tider och resultat';
export const SCHEDULE_PAGE_DESCRIPTION =
	'Se hela spelschemat för Fotbolls-VM 2026 med svenska tider, dagens matcher, resultat, gruppspel och slutspel.';
export const SCHEDULE_HERO_TITLE = 'Fotbolls-VM 2026 spelschema – matcher och tider';
export const SCHEDULE_HERO_DESCRIPTION =
	'Se hela spelschemat för Fotbolls-VM 2026 med svenska tider';

export const getScheduleCanonicalUrl = () => getAbsoluteUrl(WORLD_CUP_SCHEDULE_PATH);

export const buildSchedulePageJsonLd = () => ({
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	description: SCHEDULE_PAGE_DESCRIPTION,
	inLanguage: 'sv-SE',
	isPartOf: {
		'@type': 'WebSite',
		name: SITE_NAME,
		url: getAbsoluteUrl('/'),
	},
	name: SCHEDULE_PAGE_TITLE,
	url: getScheduleCanonicalUrl(),
});
