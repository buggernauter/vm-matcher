import styled, { css } from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledCard = styled.article<{ $compact?: boolean; $featured?: boolean }>`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	width: 100%;
	min-height: var(--bracket-card-height);
	padding: 0.85rem 0.9rem 0.7rem;
	border: 0;
	border-radius: 1rem;
	background: ${({ theme }) => theme.palette.cardSurfaceGradient};
	box-shadow: ${({ theme }) => theme.palette.cardSurfaceShadow};
	isolation: isolate;
	overflow: hidden;

	@media (min-width: ${breakpoints.desktop}) {
		padding: 1.02rem 1.08rem 0.9rem;
		gap: 0.28rem;
		border-radius: 1.2rem;
	}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: var(--bracket-card-overlay-gradient);
		opacity: 1;
		pointer-events: none;
	}

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background:
			var(--bracket-card-border-gradient) border-box,
			var(--bracket-card-sheen-gradient) border-box;
		box-shadow:
			inset 0 0 0 0.0625rem var(--bracket-card-outline-color),
			inset 0 1.1rem 1.8rem var(--bracket-card-highlight-shadow),
			inset 0 -1rem 1.4rem var(--bracket-card-depth-shadow);
		mix-blend-mode: screen;
		pointer-events: none;
	}

	${({ $featured, theme }) =>
		$featured
			? css`
					box-shadow: ${theme.palette.cardSurfaceShadow}, var(--bracket-final-shadow);

					&::after {
						box-shadow:
							inset 0 0 0 0.0625rem var(--bracket-final-border-color),
							inset 0 1.1rem 1.8rem var(--bracket-card-highlight-shadow),
							inset 0 -1rem 1.4rem var(--bracket-card-depth-shadow);
					}
				`
			: null}

	${({ $compact }) =>
		$compact
			? css`
					min-height: var(--round-compact-card-height, 0);
					padding: 0.22rem 0.04rem 0.12rem;
					gap: 0.16rem;
					border-radius: 0.5rem;

					@media (min-width: ${breakpoints.desktop}) {
						padding: 0.38rem 0.16rem 0.22rem;
						gap: 0.22rem;
						border-radius: 0.75rem;
					}
				`
			: null}
`;
export const StyledMatchHeader = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 0.18rem;

	@media (min-width: ${breakpoints.desktop}) {
		gap: 0.24rem;
	}
`;

export const StyledMeta = styled.span`
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.78rem;
	line-height: 1.35;
	text-align: center;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 0.92rem;
	}
`;
export const StyledVenue = styled.span`
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.74rem;
	line-height: 1.35;
	text-align: center;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 0.84rem;
	}
`;

export const StyledTeams = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-top: auto;
	padding-bottom: 0.15rem;

	@media (min-width: ${breakpoints.desktop}) {
		gap: 0.66rem;
		padding-bottom: 0.22rem;
	}
`;
export const StyledTeamRow = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 0.75rem;

	@media (min-width: ${breakpoints.desktop}) {
		gap: 0.95rem;
	}
`;

export const StyledTeamName = styled.span`
	color: ${({ theme }) => theme.palette.textPrimary};
	font-size: 0.96rem;
	font-weight: 650;
	line-height: 1.3;
	overflow-wrap: anywhere;
	text-align: center;
	width: 100%;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 1.18rem;
	}
`;

export const StyledTeamFlag = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;

	img {
		display: block;
		width: 1.45rem;
		height: auto;
		border-radius: 0.12rem;
		box-shadow: 0 0 0 0.03125rem var(--bracket-flag-outline-color);

		@media (min-width: ${breakpoints.desktop}) {
			width: 1.8rem;
			border-radius: 0.16rem;
		}
	}
`;
export const StyledScore = styled.span`
	flex: 0 0 auto;
	color: ${({ theme }) => theme.palette.textSecondary};
	font-size: 0.84rem;
	font-variant-numeric: tabular-nums;
	font-weight: 700;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 1.02rem;
	}
`;
export const StyledDivider = styled.span`
	display: block;
	width: 100%;
	height: 0.0625rem;
	background: var(--bracket-line-color);
`;

export const StyledCompactMeta = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0;
`;

export const StyledCompactDate = styled.span`
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.7rem;
	font-weight: 600;
	line-height: 1.2;
	text-transform: lowercase;
`;

export const StyledCompactWeekday = styled.span`
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.38rem;
	font-weight: 700;
	letter-spacing: 0.02em;
	line-height: 1;
	text-transform: uppercase;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 0.54rem;
	}
`;

export const StyledCompactDayMonth = styled.span`
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.42rem;
	font-weight: 600;
	line-height: 1;
	text-transform: none;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 0.64rem;
	}
`;

export const StyledCompactTime = styled.span`
	color: ${({ theme }) => theme.palette.textPrimary};
	font-size: 0.54rem;
	font-variant-numeric: tabular-nums;
	font-weight: 700;
	line-height: 1;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 0.86rem;
	}
`;

export const StyledCompactTeams = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.04rem;
	min-height: 2.3rem;

	@media (min-width: ${breakpoints.desktop}) {
		gap: 0.08rem;
		min-height: 3.55rem;
	}
`;

export const StyledCompactTeamLabel = styled.span`
	color: ${({ theme }) => theme.palette.textPrimary};
	font-size: 0.4rem;
	font-weight: 700;
	line-height: 1;
	text-align: center;
	text-transform: uppercase;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.02rem;
	max-width: 100%;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 0.62rem;
		gap: 0.04rem;
	}
`;

export const StyledCompactTeamFlag = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;

	img {
		display: block;
		width: 0.95rem;
		height: auto;
		border-radius: 0.1rem;
		box-shadow: 0 0 0 0.03125rem var(--bracket-flag-outline-color);

		@media (min-width: ${breakpoints.desktop}) {
			width: 1.34rem;
			border-radius: 0.14rem;
		}
	}
`;

export const StyledCompactSeparator = styled.span`
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.44rem;
	font-weight: 700;
	line-height: 1;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: 0.68rem;
	}
`;

export const StyledCompactTeamLine = styled.span`
	display: block;
	max-width: 100%;
	line-height: 1;
`;

export const StyledMatchNumber = styled.span<{ $compact?: boolean }>`
	position: relative;
	z-index: 1;
	display: block;
	align-self: center;
	margin-top: auto;
	padding-top: ${({ $compact }) => ($compact ? '0.04rem' : '0.3rem')};
	color: ${({ theme }) => theme.palette.textPrimary};
	font-size: ${({ $compact }) => ($compact ? '0.40rem' : '0.62rem')};

	font-weight: 700;
	line-height: 1;
	text-align: center;
	white-space: pre-line;
	pointer-events: none;

	@media (min-width: ${breakpoints.desktop}) {
		font-size: ${({ $compact }) => ($compact ? '0.58rem' : '0.78rem')};
		padding-top: ${({ $compact }) => ($compact ? '0.1rem' : '0.38rem')};
	}
`;
