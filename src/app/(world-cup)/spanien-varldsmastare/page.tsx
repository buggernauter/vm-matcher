import type { Metadata } from 'next';

import { JsonLd } from '@/components/json-ld';
import {
	buildChampionsPageJsonLd,
	CHAMPIONS_HERO_TITLE_AR,
	CHAMPIONS_HERO_TITLE_CH,
	CHAMPIONS_HERO_TITLE_EN,
	CHAMPIONS_HERO_TITLE_HD,
	CHAMPIONS_HERO_TITLE_SP,
	CHAMPIONS_HERO_TITLE_SV,
	CHAMPIONS_PAGE_DESCRIPTION,
	CHAMPIONS_PAGE_TITLE,
	getChampionsCanonicalUrl,
} from '@/server/seo';

import { StyledInner, StyledList, StyledSection, StyledText } from './styles';

export const metadata: Metadata = {
	alternates: {
		canonical: '/spanien-varldsmastare',
	},
	description: CHAMPIONS_PAGE_DESCRIPTION,
	keywords: [
		'vm',
		'fotbolls-vm',
		'fotbolls-vm 2026',
		'vm-final',
		'vmfinal',
		'winner',
		'vm vinnare',
		'spain',
		'spanien',
		'argentina',
		'världsmästare',
	],
	openGraph: {
		description: CHAMPIONS_PAGE_DESCRIPTION,
		title: CHAMPIONS_PAGE_TITLE,
		url: getChampionsCanonicalUrl(),
	},
	title: CHAMPIONS_PAGE_TITLE,
	twitter: {
		description: CHAMPIONS_PAGE_DESCRIPTION,
		title: CHAMPIONS_PAGE_TITLE,
	},
};

export default function WorldCupChampionsPage() {
	return (
		<>
			<JsonLd data={buildChampionsPageJsonLd()} />
			<StyledSection aria-labelledby="spain-champions-title">
				<StyledInner>
					<StyledList aria-label="Congratulations in multiple languages">
						<StyledText lang="en">{CHAMPIONS_HERO_TITLE_EN}</StyledText>
						<StyledText lang="sv">{CHAMPIONS_HERO_TITLE_SV}</StyledText>
						<StyledText lang="es">{CHAMPIONS_HERO_TITLE_SP}</StyledText>
						<StyledText lang="zh">{CHAMPIONS_HERO_TITLE_CH}</StyledText>
						<StyledText lang="hi">{CHAMPIONS_HERO_TITLE_HD}</StyledText>
						<StyledText dir="rtl" lang="ar" data-align="end">
							{CHAMPIONS_HERO_TITLE_AR}
						</StyledText>
					</StyledList>
				</StyledInner>
			</StyledSection>
		</>
	);
}
