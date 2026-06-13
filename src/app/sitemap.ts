import type { MetadataRoute } from 'next';

import { getScheduleCanonicalUrl, getTeamsCanonicalUrl } from '@/server/seo';

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
	];
}
