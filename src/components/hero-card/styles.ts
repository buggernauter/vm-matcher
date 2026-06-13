import { css, styled } from 'styled-components';

const focusRing = css`
	&:focus-visible {
		outline: 0.125rem solid ${({ theme }) => theme.palette.primaryMain};
		outline-offset: 0.2rem;
		border-radius: 0.5rem;
	}
`;

export const StyledHeroCard = styled.section`
	position: relative;
	overflow: hidden;
	padding: 0.8rem 1rem 0.85rem;
	background: ${({ theme }) => theme.palette.transparent};

	${focusRing}
`;

export const StyledHeroBadge = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	width: fit-content;
	padding: 0.65rem 0.72rem;
	border-radius: 999rem;
	color: ${({ theme }) => theme.palette.textSecondary};
	background: ${({ theme }) => theme.palette.fieldSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
	font-size: 0.74rem;
	font-weight: 700;
	letter-spacing: 0.05em;
	text-transform: uppercase;

	${focusRing}
`;

export const StyledHeroTitle = styled.h1`
	margin: 0.95rem 0 0.4rem;
	font-size: 1.7rem;
	line-height: 1;
	letter-spacing: -0.03em;

	${focusRing}
`;

export const StyledHeroText = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.94rem;
	line-height: 1.55;

	${focusRing}
`;

export const StyledHeroActions = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
	text-align: center;
`;
