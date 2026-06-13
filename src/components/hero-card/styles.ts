import Link from 'next/link';
import { css, styled } from 'styled-components';

const focusRing = css`
	&:focus-visible {
		outline: 0.125rem solid ${({ theme }) => theme.palette.primaryMain};
		outline-offset: 0.2rem;
		border-radius: 0.5rem;
	}
`;

export const StyledHeroCard = styled.nav`
	position: relative;
	overflow: hidden;
	padding: 0.8rem 1rem 0.2rem;
	background: ${({ theme }) => theme.palette.transparent};
`;
export const StyledBadgeWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1.5rem;
	align-items: center;
	flex-wrap: wrap;
`;
export const StyledHeroBadge = styled(Link)<{ $active: boolean }>`
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	width: fit-content;
	padding: 0.65rem 0.72rem;
	border-radius: 999rem;
	color: ${({ $active, theme }) =>
		$active ? theme.palette.textPrimary : theme.palette.textSecondary};
	background: ${({ $active, theme }) =>
		$active ? theme.palette.stepperButtonGradient : theme.palette.fieldSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
	font-size: 0.74rem;
	font-weight: 700;
	letter-spacing: 0.05em;

	text-decoration: none;

	${focusRing}
`;
