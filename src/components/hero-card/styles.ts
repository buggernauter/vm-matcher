import Link from 'next/link';
import { css, styled } from 'styled-components';

import { breakpoints } from '@/styles/breakpoints';

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
	gap: 0.55rem;
	align-items: stretch;
	flex-wrap: nowrap;

	@media (min-width: ${breakpoints.mobile}) {
		gap: 1.5rem;
		align-items: center;
		flex-wrap: wrap;
	}
`;
export const StyledHeroBadge = styled(Link)<{ $active: boolean }>`
	display: flex;
	flex: 1 1 0;
	min-width: 0;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.3rem;
	padding: 0.65rem 0.4rem;
	border-radius: 999rem;
	color: ${({ $active, theme }) =>
		$active ? theme.palette.textPrimary : theme.palette.textSecondary};
	background: ${({ $active, theme }) =>
		$active ? theme.palette.stepperButtonGradient : theme.palette.fieldSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
	font-size: 0.63rem;
	font-weight: 700;
	letter-spacing: 0.02em;
	line-height: 1.15;
	text-align: center;
	text-decoration: none;

	svg {
		flex: 0 0 auto;
		width: 1.3rem;
		height: 1.3rem;
	}

	@media (min-width: ${breakpoints.mobile}) {
		display: inline-flex;
		flex: 0 0 auto;
		min-width: unset;
		flex-direction: row;
		justify-content: flex-start;
		gap: 0.45rem;
		width: fit-content;
		padding: 0.65rem 0.72rem;
		font-size: 0.74rem;
		letter-spacing: 0.05em;
		text-align: left;

		svg {
			width: 1.5rem;
			height: 1.5rem;
		}
	}

	${focusRing}
`;
