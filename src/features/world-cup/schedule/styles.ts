import styled from 'styled-components';

export const StyledContainer = styled.section`
	display: flex;
	flex-direction: column;
	padding: 0.8rem 1rem 0.85rem;
	background: ${({ theme }) => theme.palette.transparent};
	color: ${({ theme }) => theme.palette.textPrimary};
	font-family:
		var(--font-geist-sans),
		ui-sans-serif,
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		sans-serif;
`;

export const StyledActionButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	align-self: flex-start;
	width: fit-content;
	min-height: 2.25rem;
	padding: 0 0.875rem;
	border: 0;
	border-radius: 999rem;
	background: ${({ theme }) => theme.palette.stepperButtonGradient};
	color: ${({ theme }) => theme.palette.textPrimary};
	font: inherit;
	font-size: 0.85rem;
	font-weight: 650;
	transition:
		transform 160ms ease,
		box-shadow 180ms ease,
		opacity 180ms ease;

	&:active:not(:disabled) {
		transform: scale(1.1);
		background: ${({ theme }) => theme.palette.cardSurfaceGradient};
	}

	&:disabled {
		opacity: 0.4;
		box-shadow: none;
	}
`;

export const StyledMatches = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.625rem;
`;
