import {
	WORLD_CUP_CHAMPIONS_PATH,
	WORLD_CUP_PLAYOFF_PATH,
	WORLD_CUP_SCHEDULE_PATH,
	WORLD_CUP_TEAMS_PATH,
} from './constants';
import { getAbsoluteUrl } from './site';

export const SITE_NAME = 'VMMatcher';

export const SITE_DESCRIPTION =
	'Fotbolls-VM 2026 med spelschema, svenska tider, resultat, gruppspel och slutspel.';

export const SCHEDULE_PAGE_TITLE = 'VM matcher idag och spelschema för Fotbolls-VM 2026';

export const SCHEDULE_PAGE_DESCRIPTION =
	'Se dagens VM-matcher, svenska matchtider, resultat och hela spelschemat för Fotbolls-VM 2026 med gruppspel och slutspel.';

export const SCHEDULE_HERO_TITLE = 'VM matcher idag och hela spelschemat';

export const SCHEDULE_HERO_DESCRIPTION =
	'Alla matcher i Fotbolls-VM 2026 med svenska tider, resultat och kommande spelomgångar.';
export const TEAMS_PAGE_TITLE = 'Lag i Fotbolls-VM 2026';

export const TEAMS_PAGE_DESCRIPTION =
	'Se lag, grupper och kommande innehall for landslagen i Fotbolls-VM 2026.';

export const TEAMS_HERO_TITLE = 'Lag i Fotbolls-VM 2026';

export const TEAMS_HERO_DESCRIPTION =
	'Fullständig spelar- och lagförteckning för Fotbolls-VM 2026.';

export const PLAYOFF_PAGE_TITLE =
	'Slutspel VM 2026 – slutspelsträd, matcher och vilka lag som möts';

export const PLAYOFF_PAGE_DESCRIPTION =
	'Se hela slutspelet i Fotbolls-VM 2026. Följ slutspelsträdet, se vilka lag som möts, kommande matcher, svenska tider, åttondelsfinaler, kvartsfinaler, semifinaler, bronsmatch och final.';

export const PLAYOFF_HERO_TITLE = 'Slutspelsträd för Fotbolls-VM 2026';

export const PLAYOFF_HERO_DESCRIPTION =
	'Se vilka lag som möts i slutspelet, kommande VM-matcher och vägen till VM-guld 2026.';

export const CHAMPIONS_PAGE_TITLE =
	'Spanien vann VM-finalen 2026 mot Argentina | VM-vinnare och världsmästare';

export const CHAMPIONS_PAGE_DESCRIPTION =
	'Spanien är vinnare av Fotbolls-VM 2026 efter seger mot Argentina i VM-finalen. Läs om VM-finalen, resultatet och Spaniens VM-guld 2026.';

export const CHAMPIONS_HERO_TITLE = 'Spanien vann VM-finalen 2026 mot Argentina';

export const CHAMPIONS_HERO_DESCRIPTION =
	'Spanien är VM-vinnare och världsmästare i Fotbolls-VM 2026 efter finalsegern mot Argentina den 19 juli 2026.';

export const CHAMPIONS_HERO_TITLE_SV = 'Grattis Spanien till VM-guldet 2026.';
export const CHAMPIONS_HERO_TITLE_EN = 'Congratulations to Spain on winning the 2026 World Cup.';
export const CHAMPIONS_HERO_TITLE_CH = '恭喜西班牙赢得2026年世界杯冠军.';
export const CHAMPIONS_HERO_TITLE_HD = 'स्पेन को 2026 विश्व कप जीतने पर बधाई।';
export const CHAMPIONS_HERO_TITLE_SP = 'Felicidades a España por ganar la Copa del Mundo 2026.';
export const CHAMPIONS_HERO_TITLE_AR = 'تهانينا لإسبانيا على الفوز بكأس العالم 2026.';

export const getChampionsCanonicalUrl = () => getAbsoluteUrl(WORLD_CUP_CHAMPIONS_PATH);

export const getScheduleCanonicalUrl = () => getAbsoluteUrl(WORLD_CUP_SCHEDULE_PATH);

export const getPlayoffCanonicalUrl = () => getAbsoluteUrl(WORLD_CUP_PLAYOFF_PATH);

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

export const buildPlayoffPageJsonLd = () => ({
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	description: PLAYOFF_PAGE_DESCRIPTION,
	inLanguage: 'sv-SE',
	isPartOf: {
		'@type': 'WebSite',
		name: SITE_NAME,
		url: getAbsoluteUrl('/'),
	},
	name: PLAYOFF_PAGE_TITLE,
	url: getPlayoffCanonicalUrl(),
});

export const buildChampionsPageJsonLd = () => ({
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	about: [
		'Fotbolls-VM 2026',
		'VM-final 2026',
		'Spanien',
		'Argentina',
		'VM-vinnare',
		'Världsmästare i fotboll',
	],
	description: CHAMPIONS_PAGE_DESCRIPTION,
	inLanguage: 'sv-SE',
	isPartOf: {
		'@type': 'WebSite',
		name: SITE_NAME,
		url: getAbsoluteUrl('/'),
	},
	keywords:
		'vm, fotbolls-vm, fotbolls-vm 2026, vm-final, vmfinal, spanien, argentina, vm vinnare, winner, världsmästare',
	name: CHAMPIONS_PAGE_TITLE,
	url: getChampionsCanonicalUrl(),
});
