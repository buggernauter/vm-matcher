'use client';

import styled from 'styled-components';

export const StyledSection = styled.section`
	position: relative;
	overflow: hidden;
	min-height: calc(100vh - 7rem);
	min-height: calc(100dvh - 7rem);
	margin: 0 1rem 1rem;
	border-radius: 1.5rem;
	background:
		radial-gradient(circle at 16% 18%, rgba(241, 191, 0, 0.22), transparent 0 28%),
		radial-gradient(circle at 82% 20%, rgba(170, 21, 27, 0.2), transparent 0 30%),
		radial-gradient(circle at 72% 78%, rgba(241, 191, 0, 0.16), transparent 0 32%),
		radial-gradient(circle at 28% 82%, rgba(170, 21, 27, 0.18), transparent 0 34%),
		linear-gradient(
			145deg,
			rgba(170, 21, 27, 0.96) 0%,
			rgba(170, 21, 27, 0.9) 24%,
			rgba(241, 191, 0, 0.88) 52%,
			rgba(170, 21, 27, 0.9) 78%,
			rgba(170, 21, 27, 0.96) 100%
		);
	box-shadow:
		0 1.5rem 3rem rgba(170, 21, 27, 0.18),
		inset 0 0 0 1px rgba(241, 191, 0, 0.16);

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 22% 24%, rgba(241, 191, 0, 0.1), transparent 0 22%),
			radial-gradient(circle at 78% 72%, rgba(170, 21, 27, 0.1), transparent 0 24%);
		pointer-events: none;
	}

	@media (max-width: 640px) {
		margin-inline: 0.75rem;
		min-height: calc(100dvh - 6.5rem);
	}
`;

export const StyledInner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: flex-start;
	min-height: inherit;
	padding: 5rem 2.5rem 2.5rem;
	@media (max-width: 640px) {
		padding: 3rem 1.25rem 1.25rem;
	}
`;

export const StyledList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 100%;
`;

export const StyledText = styled.p`
	margin: 0;
	max-width: min(100%, 54rem);
	font-size: clamp(1.4rem, 2.8vw, 2.05rem);
	font-weight: 500;
	line-height: 1.5;
	text-align: start;
	&[data-align='end'] {
		text-align: end;
	}
`;
