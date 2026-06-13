import { useId } from 'react';

import { StyledHeaderCard, StyledHeaderText, StyledHeaderTitle } from './styles';

type Props = {
	description: string;
	title: string;
	titleTag?: 'h1' | 'h2' | 'h3';
};

export const Header = ({ description, title, titleTag = 'h1' }: Props) => {
	const titleId = useId();
	const descriptionId = useId();

	return (
		<StyledHeaderCard
			tabIndex={0}
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
			aria-label={title}
		>
			<StyledHeaderTitle as={titleTag} id={titleId} tabIndex={0}>
				{title}
			</StyledHeaderTitle>
			<StyledHeaderText id={descriptionId} tabIndex={0}>
				{description}
			</StyledHeaderText>
		</StyledHeaderCard>
	);
};
