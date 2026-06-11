import { Broadcaster } from '@/types/tournament';
import { StyledChip, StyledImage, StyledLogo } from './styles';

const broadcasterLogos: Record<Broadcaster, { alt: string; src: string; url?: string }> = {
	'SVT och SVT Play': {
		alt: 'SVT',
		src: 'svtp-logo.svg',
		url: 'https://www.svtplay.se/kategori/fotbolls-vm',
	},
	'TV4 och TV4 Play': {
		alt: 'TV4',
		src: '/tv4-logo.png',
		url: 'https://www.tv4play.se/kategorier/fifa-fotbolls-vm-2026',
	},
};

export const BroadcasterChip = ({ broadcaster }: { broadcaster?: Broadcaster }) => {
	if (!broadcaster) {
		return null;
	}

	const logo = broadcasterLogos[broadcaster];

	if (!logo) {
		return <StyledChip>{broadcaster}</StyledChip>;
	}

	return (
		<StyledChip href={logo.url} target="_blank" rel="noreferrer">
			<StyledLogo>
				<StyledImage alt={logo.alt} src={logo.src} fill sizes="32px" />
			</StyledLogo>
		</StyledChip>
	);
};
