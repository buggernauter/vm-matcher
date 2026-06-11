import { Loader2Icon } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

export const StyledSpinner = styled(Loader2Icon)`
	width: 1rem;
	height: 1rem;
	animation: ${spin} 0.8s linear infinite;
`;
