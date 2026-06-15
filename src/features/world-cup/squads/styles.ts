'use client';
import Link from 'next/link';
import { css, styled } from 'styled-components';

const focusRing = css`
	&:focus-visible {
		outline: 0.125rem solid ${({ theme }) => theme.palette.primaryMain};
		outline-offset: -0.125rem;
	}
`;

export const StyledSquadsSection = styled.section`
	display: flex;
	flex-direction: column;
	padding: 0.8rem 1rem 1rem;
	background: ${({ theme }) => theme.palette.transparent};
	color: ${({ theme }) => theme.palette.textPrimary};
`;

export const StyledSquadsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 0.9rem;
`;

export const StyledSquadCard = styled(Link)`
	display: block;
	flex: 1 1 19rem;
	min-width: min(19rem, 100%);
	border-radius: 1rem;
	background: ${({ theme }) => theme.palette.fieldSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
	color: inherit;
	text-decoration: none;

	${focusRing}
`;

export const StyledSquadSummary = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 0.95rem 1rem;
`;

export const StyledSquadHeading = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.15rem;
	min-width: 0;
`;

export const StyledSquadCountryLine = styled.div`
	display: flex;
	align-items: center;
	gap: 0.65rem;
	min-width: 0;
`;

export const StyledSquadFlag = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 1.35rem;
	height: 1rem;
	overflow: hidden;
	border-radius: 0.18rem;
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const StyledSquadCountry = styled.h2`
	margin: 0;
	font-size: 1rem;
	font-weight: 700;
	line-height: 1.15;
`;

export const StyledSquadRanking = styled.span`
	color: ${({ theme }) => theme.palette.textPrimary};
	font-size: 0.86rem;
	font-variant-numeric: tabular-nums;
	line-height: 1;
`;

export const StyledSquadMeta = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.82rem;
`;

export const StyledSquadChevron = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	color: ${({ theme }) => theme.palette.textDisabled};
`;
