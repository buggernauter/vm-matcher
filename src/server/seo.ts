import { WORLD_CUP_SCHEDULE_PATH, WORLD_CUP_TEAMS_PATH } from './constants';
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
export const TEAMS_PAGE_TITLE = 'Lag i Fotbolls-VM 2026';
export const TEAMS_PAGE_DESCRIPTION =
	'Se lag, grupper och kommande innehall for landslagen i Fotbolls-VM 2026.';
export const TEAMS_HERO_TITLE = 'Lag i Fotbolls-VM 2026';
export const TEAMS_HERO_DESCRIPTION =
	'Fullständig spelar- och lagförteckning för Fotbolls-VM 2026.';
export const getScheduleCanonicalUrl = () => getAbsoluteUrl(WORLD_CUP_SCHEDULE_PATH);
export const getTeamsCanonicalUrl = () => getAbsoluteUrl(WORLD_CUP_TEAMS_PATH);

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

export const buildTeamsPageJsonLd = () => ({
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	description: TEAMS_PAGE_DESCRIPTION,
	inLanguage: 'sv-SE',
	isPartOf: {
		'@type': 'WebSite',
		name: SITE_NAME,
		url: getAbsoluteUrl('/'),
	},
	name: TEAMS_PAGE_TITLE,
	url: getTeamsCanonicalUrl(),
});
