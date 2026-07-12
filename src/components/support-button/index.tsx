import { StyledSupportLink } from './styles';

const KO_FI_URL = 'https://ko-fi.com/atlas1337';

export const SupportButton = () => {
	return (
		<StyledSupportLink
			href={KO_FI_URL}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Support vmmatcher.se"
		>
			⚽ Support
		</StyledSupportLink>
	);
};
