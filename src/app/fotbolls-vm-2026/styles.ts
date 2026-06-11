'use client';

import styled from 'styled-components';

import { breakpoints } from '@/styles/breakpoints';

export const StyledWorldCupPageShell = styled.main`
	position: relative;
	isolation: isolate;

	overflow: hidden;
	background: ${({ theme }) => theme.palette.cardSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.cardSurfaceShadow};

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background:
			radial-gradient(circle at top, rgba(255, 255, 255, 0.045) 0%, transparent 40%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0%, transparent 22%);
	}

	> * {
		position: relative;
		z-index: 1;
	}

	@media (min-width: ${breakpoints.desktop}) {
		margin: 1.25rem auto 2rem;
	}
`;
