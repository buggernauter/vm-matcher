import { BracketRoundLayout } from '@/types';
import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;

	@media (min-width: ${breakpoints.desktop}) {
		--bracket-card-height: 7.2rem;
		--bracket-card-max-width: 21rem;
		--bracket-pair-width: 24rem;
	}
`;

export const StyledHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledTitle = styled.h2`
	margin: 0;
	font-size: 1.2rem;
	line-height: 1.15;
	letter-spacing: -0.02em;
`;

export const StyledViewport = styled.div`
	overflow: hidden;
	width: 100%;
	padding-bottom: 0.35rem;
`;

export const StyledBracket = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 1.3rem;
	width: 100%;
	padding: 0.2rem 0 0.5rem;
`;

export const StyledRoundContainer = styled.div<{ $variant?: BracketRoundLayout }>`
	--round-card-height: var(--bracket-card-height);
	--round-card-max-width: var(--bracket-card-max-width);
	--round-compact-card-height: 0rem;
	--round-pair-width: var(--bracket-pair-width);
	--round-inline-gap: 0.75rem;
	--round-merge-gap: 0.7rem;

	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	position: relative;
	width: 100%;
	z-index: 1;

	${({ $variant }) =>
		$variant === 'compactColumns'
			? `
				--round-card-height: 5.85rem;
				--round-card-max-width: 2.28rem;
				--round-compact-card-height: 5.85rem;

				--round-merge-gap: 0.22rem;

				@media (min-width: ${breakpoints.desktop}) {
					--round-card-height: 8rem;
					--round-card-max-width: 3.35rem;
					--round-compact-card-height: 8rem;
					--round-inline-gap: 1rem;
				}
			`
			: null}

	${({ $variant }) =>
		$variant === 'compactStackedPairs'
			? `
				--round-card-height: 5.85rem;
				--round-card-max-width: 2.28rem;
				--round-compact-card-height: 5.85rem;
				--round-inline-gap: 0.08rem;
				--round-merge-gap: 0.22rem;

				@media (min-width: ${breakpoints.desktop}) {
					--round-card-height: 8rem;
					--round-card-max-width: 3.35rem;
					--round-compact-card-height: 8rem;
					--round-inline-gap: 0.24rem;
				}
			`
			: null}

	${({ $variant }) =>
		$variant === 'quarterColumns'
			? `
				--round-card-height: 5.1rem;
				--round-card-max-width: 4.7rem;

				@media (min-width: ${breakpoints.desktop}) {
					--round-card-height: 6.2rem;
					--round-card-max-width: 5.8rem;
					--round-inline-gap: 0.9rem;
				}

			`
			: null}

	${({ $variant }) =>
		$variant === 'semiColumns'
			? `
				--round-card-height: 5.25rem;
				--round-card-max-width: 8.2rem;
				--round-inline-gap: 0.55rem;

				@media (min-width: ${breakpoints.desktop}) {
					--round-card-height: 6.6rem;
					--round-card-max-width: 9.6rem;
					--round-inline-gap: 0.85rem;
				}
			`
			: null}
`;

export const StyledSectionTitleWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

export const StyledRoundCards = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	width: 100%;
`;

export const StyledSectionTitle = styled.h3`
	margin: 0;
	color: ${({ theme }) => theme.palette.primaryMain};
	font-size: 0.86rem;
	font-weight: 700;
	line-height: 1.2;
	text-align: center;
`;

export const StyledSectionCardsContainer = styled.div<{
	$columns?: number;
	$variant?: BracketRoundLayout;
}>`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.45rem;
	width: min(100%, var(--round-pair-width));

	${({ $columns = 8, $variant }) =>
		$variant && $variant !== 'default'
			? `
				gap: 0.3rem;
				width: min(100%, calc(${String($columns)} * var(--round-card-max-width) + ${String(
					Math.max($columns - 1, 0),
				)} * var(--round-inline-gap)));
			`
			: null}
`;

export const StyledColumnWrapper = styled.div<{
	$align: 'end' | 'start';
	$variant?: BracketRoundLayout;
}>`
	display: flex;
	flex-direction: column;
	align-items: ${({ $align }) => ($align === 'start' ? 'flex-start' : 'flex-end')};
	gap: 0.38rem;
	width: 100%;

	${({ $variant }) =>
		$variant && $variant !== 'default'
			? `
				align-items: center;
				width: var(--round-card-max-width);
			`
			: null}
`;

export const StyledCardWrapper = styled.div`
	width: min(100%, var(--round-card-max-width, var(--bracket-card-max-width)));
`;

export const StyledBranchDrop = styled.span`
	display: none;
`;

export const StyledPairMerge = styled.div`
	display: none;
`;

export const StyledCompactCardRow = styled.div<{
	$columns: number;
	$variant?: BracketRoundLayout;
}>`
	display: flex;
	align-items: flex-start;
	gap: var(--round-inline-gap);
	justify-content: center;
	width: 100%;

	${({ $variant }) =>
		$variant === 'compactStackedPairs'
			? `
				flex-direction: column;
				flex-wrap: wrap;
				align-content: center;
				height: calc((2 * var(--round-card-height)) + 0.55rem);
				column-gap: 0.55rem;
				row-gap: 0.55rem;

				@media (min-width: ${breakpoints.desktop}) {
					height: calc((2 * var(--round-card-height)) + 0.72rem);
					column-gap: 0.72rem;
					row-gap: 0.72rem;
				}
			`
			: null}
`;

export const StyledCompactMatchColumn = styled.div<{
	$align?: 'end' | 'start';
	$variant?: BracketRoundLayout;
}>`
	display: flex;
	flex-direction: column;
	align-items: ${({ $align = 'start' }) => ($align === 'start' ? 'flex-start' : 'flex-end')};
	gap: 0.28rem;
	width: 100%;

	${({ $variant }) =>
		$variant && $variant !== 'default'
			? `
				align-items: center;
				width: var(--round-card-max-width);
			`
			: null}
`;

export const StyledCompactQuadMerges = styled.div<{ $pairs: number }>`
	display: none;
`;

export const StyledRoundWithSideMatch = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	width: 100%;

	@media (min-width: 42rem) {
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
		gap: 1.5rem;
	}
`;

export const StyledSideMatchWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	max-width: calc(var(--bracket-card-max-width) * 0.75);
`;

export const StyledResultsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	position: relative;
	width: 100%;
	z-index: 1;

	@media (min-width: 42rem) {
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
	}
`;

export const StyledResultWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	max-width: var(--bracket-card-max-width);
`;

export const StyledOutcomeConnector = styled.span`
	display: none;
`;
