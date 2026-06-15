'use client';

import { css, styled } from 'styled-components';

const focusRing = css`
	&:focus-visible {
		outline: 0.125rem solid ${({ theme }) => theme.palette.primaryMain};
		outline-offset: -0.125rem;
	}
`;

export const StyledSection = styled.section`
	padding: 0.2rem 1rem 1rem;
	background: ${({ theme }) => theme.palette.transparent};
	color: ${({ theme }) => theme.palette.textPrimary};
`;

export const StyledSectionTitle = styled.h2`
	justify-self: center;
	padding: 0.75rem 0;
	font-size: 0.9rem;
`;

export const StyledRosterDetails = styled.details`
	overflow: hidden;
	border-radius: 1rem;
	background: ${({ theme }) => theme.palette.fieldSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};

	&[open] {
		background: ${({ theme }) => theme.palette.cardSurfaceGradient};
	}
`;

export const StyledRosterSummary = styled.summary`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 0 1rem;
	cursor: pointer;
	list-style: none;

	&::-webkit-details-marker {
		display: none;
	}

	${focusRing}
`;

export const StyledRosterChevron = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	color: ${({ theme }) => theme.palette.textDisabled};
	transition: transform 180ms ease;

	${StyledRosterDetails}[open] & {
		transform: rotate(180deg);
	}
`;

export const StyledSummaryCard = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 0.8rem 1rem 1rem;
	padding: 1rem;
	border-radius: 1.5rem;
	background: ${({ theme }) => theme.palette.cardSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.cardSurfaceShadow};
`;

export const StyledSummaryTopRow = styled.div`
	display: flex;
	align-items: center;
	gap: 0.85rem;
	padding-bottom: 1rem;
	padding-top: 1rem;
`;

export const StyledSummaryFlag = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	overflow: hidden;
	border-radius: 999rem;
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const StyledSummaryCountry = styled.h2`
	margin: 0;
	font-size: 1.35rem;
	line-height: 1.1;
`;

export const StyledSummaryMeta = styled.p`
	margin: 0.25rem 0 0;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.9rem;
`;

export const StyledSummaryStats = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 0.75rem;

	@media (max-width: 32rem) {
		grid-template-columns: 1fr;
	}
`;

export const StyledSummaryStat = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	padding: 0.85rem 0.95rem;
	border-radius: 1rem;
	background: ${({ theme }) => theme.palette.fieldSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
	color: ${({ theme }) => theme.palette.textSecondary};
	font-size: 0.82rem;
`;

export const StyledSummaryStatValue = styled.span`
	color: ${({ theme }) => theme.palette.textPrimary};
	font-size: 1.2rem;
	font-weight: 700;
`;

export const StyledMatchList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.625rem;
`;
