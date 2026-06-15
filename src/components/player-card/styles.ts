'use client';

import styled from 'styled-components';

export const StyledSquadPlayer = styled.span`
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	width: 100%;
	min-width: 0;
	column-gap: 0.75rem;
	align-items: baseline;
	color: ${({ theme }) => theme.palette.textPrimary};
	word-break: break-word;

	[data-primary] {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.4rem 0.75rem;
		align-items: baseline;
		min-width: 0;
		font-size: 0.99rem;
		letter-spacing: 0.03rem;
		font-weight: 600;
	}

	[data-club] {
		justify-self: end;
		text-align: right;
		min-width: 0;
		overflow-wrap: anywhere;
		font-size: 0.9rem;
	}

	@media (max-width: 24rem) {
		grid-template-columns: minmax(0, 1fr);
		row-gap: 0.35rem;

		[data-primary] {
			display: inline-flex;
		}

		[data-club] {
			justify-self: start;
			text-align: left;
		}
	}
`;
