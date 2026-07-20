import type { MetadataRoute } from 'next';

import {
	getChampionsCanonicalUrl,
	getPlayoffCanonicalUrl,
	getScheduleCanonicalUrl,
	getTeamsCanonicalUrl,
} from '@/server/seo';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			changeFrequency: 'daily',
			priority: 1,
			url: getScheduleCanonicalUrl(),
		},
		{
			changeFrequency: 'weekly',
			priority: 0.8,
			url: getTeamsCanonicalUrl(),
		},
		{
			changeFrequency: 'daily',
			priority: 0.9,
			url: getPlayoffCanonicalUrl(),
		},
		{
			changeFrequency: 'weekly',
			priority: 0.7,
			url: getChampionsCanonicalUrl(),
		},
	];
}
