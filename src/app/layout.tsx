import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { StyledComponentsRegistry } from '@/lib/styled-components-registry';
import { SITE_DESCRIPTION, SITE_NAME } from '@/server/seo';
import { getMetadataBase } from '@/server/site';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	applicationName: SITE_NAME,
	authors: [{ name: 'BuggerNauter' }],
	creator: 'BuggerNauter',
	description: SITE_DESCRIPTION,
	icons: {
		apple: '/apple-touch-icon.png',
		icon: [
			{ type: 'image/x-icon', url: '/favicon.ico' },
			{ type: 'image/svg+xml', url: '/icon.svg' },
		],
		shortcut: '/favicon.ico',
	},
	manifest: '/site.webmanifest',
	metadataBase: getMetadataBase(),
	openGraph: {
		description: SITE_DESCRIPTION,
		images: [
			{
				alt: 'VM Matcher soccer ball social share image',
				height: 630,
				url: '/og-image.png',
				width: 1200,
			},
		],
		locale: 'sv_SE',
		siteName: SITE_NAME,
		title: SITE_NAME,
		type: 'website',
	},
	robots: {
		follow: true,
		googleBot: {
			follow: true,
			index: true,
		},
		index: true,
	},
	title: {
		default: SITE_NAME,
		template: '%s | VM Matcher',
	},
	twitter: {
		card: 'summary_large_image',
		description: SITE_DESCRIPTION,
		images: ['/twitter-image.png'],
		title: SITE_NAME,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="sv" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body>
				<SpeedInsights />
				<Analytics />
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</body>
		</html>
	);
}
