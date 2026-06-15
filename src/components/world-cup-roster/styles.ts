'use client';

import styled from 'styled-components';

export const StyledWorldCupRoster = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 0.5rem 0.5rem;
`;

export const StyledWorldCupRosterTitle = styled.h3`
	margin: 0;
	padding: 0.9rem 0.5rem 0.35rem;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.8rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	display: flex;
	justify-content: center;

	&:not(:first-child) {
		padding-top: 1rem;
	}
`;

export const StyledWorldCupRosterRow = styled.div`
	display: flex;
	padding: 0.7rem 0.5rem;
	border-top: 1px solid rgba(255, 255, 255, 0.07);
	font-size: 0.88rem;
`;
