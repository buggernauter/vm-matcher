import styled from 'styled-components';

export const StyledDatePicker = styled.div<{ $dragging: boolean }>`
	display: flex;
	gap: 0.3rem;
	overflow-x: auto;
	padding: 1.15rem 0 1rem;
	cursor: ${({ $dragging }) => ($dragging ? 'grabbing' : 'grab')};
	user-select: none;
	touch-action: pan-y;
	scroll-behavior: auto;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const StyledDateChipContainer = styled.div`
	position: relative;
	flex: 0 0 3.7rem;
`;

export const StyledDateChip = styled.button<{ $active: boolean; $highlighted: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.15rem;
	width: 100%;
	min-height: 3rem;
	padding: 0.45rem 0.2rem 0.25rem;
	border: ${({ $active }) => ($active ? '0.09375rem' : '0')} solid
		${({ theme }) => theme.palette.primaryMain};
	border-bottom: ${({ $active }) => ($active ? '0.09375rem' : '0.063rem')} solid
		${({ $active, $highlighted, theme }) =>
			$active ? theme.palette.primaryMain : $highlighted ? '#c99517' : theme.palette.outline};
	border-radius: 1rem;
	background: ${({ $active, theme }) =>
		$active
			? theme.mode === 'dark'
				? theme.palette.surfacePrimary
				: theme.palette.backgroundPaper
			: theme.mode === 'dark'
				? theme.palette.backgroundPaper
				: theme.palette.surfacePrimary};
	color: ${({ $active, theme }) =>
		$active ? theme.palette.textPrimary : theme.palette.textDisabled};
	box-shadow: ${({ $active, $highlighted }) =>
		!$active && $highlighted ? '0 0 0.35rem rgb(201 149 23 / 0.14)' : 'none'};

	transition:
		transform 160ms ease,
		box-shadow 180ms ease,
		color 180ms ease,
		background 180ms ease,
		opacity 180ms ease;

	&:active {
		transform: scale(0.98);
	}
`;

export const StyledDateChipFlag = styled.span`
	position: absolute;
	top: -0.65rem;
	left: 50%;
	transform: translateX(-50%);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 0.85rem;
	height: 0.65rem;
	overflow: hidden;
	border-radius: 0.16rem;
	pointer-events: none;
	box-shadow: 0 0 0 0.0625rem rgb(255 255 255 / 0.5);

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const StyledDateChipWeekday = styled.span`
	font-size: 0.5rem;
	font-weight: 700;
	letter-spacing: 0.05em;
	text-transform: uppercase;
`;

export const StyledDateChipDay = styled.strong`
	font-size: 0.95rem;
	line-height: 1;
	font-variant-numeric: tabular-nums;
`;

export const StyledDateChipMonth = styled.span`
	font-size: 0.52rem;
	font-weight: 650;
`;
