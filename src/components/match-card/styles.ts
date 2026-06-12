import styled from 'styled-components';

export const StyledCard = styled.article`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 1rem;
	border-radius: 0.75rem;
	background: ${({ theme }) => theme.palette.backgroundPaper};
`;

export const StyledTimeBadgeWrapper = styled.div`
	flex: 0 0 auto;
`;

export const StyledStar = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 auto;
`;

export const StyledCardHeader = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
`;

export const StyledTimeBadge = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 3.75rem;
	min-height: 3rem;
	padding: 0.4rem 0.7rem;
	border-radius: 1rem;
	background: ${({ theme }) => theme.palette.stepperControlGradient};
	color: ${({ theme }) => theme.palette.textPrimary};
	font-size: 1rem;
	font-weight: 700;
	font-variant-numeric: tabular-nums;
`;

export const StyledInfo = styled.div`
	flex: 1 1 auto;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledTeams = styled.div`
	flex: 0 1 auto;
	max-width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;

	font-size: 1.4rem;
	line-height: 1.2;

	overflow-wrap: anywhere;
	word-break: break-word;
`;

export const StyledInlineValue = styled.span`
	overflow-wrap: anywhere;
	word-break: break-word;
`;

export const StyledInlineSeparator = styled.span`
	flex: 0 0 auto;
	padding-left: 1rem;
	padding-right: 1rem;
`;

export const StyledScore = styled.span`
	flex: 0 0 auto;
	font-variant-numeric: tabular-nums;
	padding-left: 1rem;
	padding-right: 1rem;
`;

export const StyledMetaText = styled.p`
	margin: 0;
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.84rem;
`;

export const StyledMetaButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	width: fit-content;
	padding: 0;
	border: 0;
	background: transparent;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.84rem;
	cursor: pointer;

	svg {
		transition: transform 180ms ease;
	}

	&[aria-expanded='true'] svg {
		transform: rotate(180deg);
	}
`;

export const StyledFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 6rem;
`;

export const StyledChip = styled.span`
	display: inline-flex;
	align-items: center;
	min-height: 2rem;
	padding: 0.35rem 0.7rem;
	border-radius: 999rem;
	background: ${({ theme }) => theme.palette.fieldSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
	color: ${({ theme }) => theme.palette.textSecondary};
	font-size: 0.75rem;
	font-weight: 650;
`;
