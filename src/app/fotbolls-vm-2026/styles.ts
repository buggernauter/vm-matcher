'use client';

import styled from 'styled-components';

export const StyledWorldCupPageShell = styled.main`
	position: relative;
	/* isolation: isolate; */
	width: 100%;
	max-width: 96rem;
	min-height: 70vh;
	/* margin-inline: auto; */

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

	margin: 0 auto 2rem;
`;
