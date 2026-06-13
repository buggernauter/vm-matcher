'use client';
import { css, styled } from 'styled-components';

const focusRing = css`
	&:focus-visible {
		outline: 0.125rem solid ${({ theme }) => theme.palette.primaryMain};
		outline-offset: 0.2rem;
		border-radius: 0.5rem;
	}
`;

export const StyledHeaderCard = styled.section`
	position: relative;
	overflow: hidden;
	padding: 0.2rem 1rem 0.85rem;
	background: ${({ theme }) => theme.palette.transparent};

	${focusRing}
`;

export const StyledHeaderTitle = styled.h1`
	margin: 0.95rem 0 0.4rem;
	font-size: 1.7rem;
	line-height: 1;
	letter-spacing: -0.03em;

	${focusRing}
`;

export const StyledHeaderText = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.94rem;
	line-height: 1.55;

	${focusRing}
`;
