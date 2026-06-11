import styled from 'styled-components';

export const StyledGroupPanel = styled.div`
	padding-top: 0.5rem;
`;

export const StyledGroupTable = styled.div`
	width: auto;
	min-width: 18rem;
	max-width: 24rem;
	background: ${({ theme }) => theme.palette.surfacePrimary};
	border: 0.0625rem solid ${({ theme }) => theme.palette.outline};
	border-radius: 0.75rem;
	overflow: hidden;
`;
export const StyledGroupTableHeader = styled.div`
	display: grid;
	grid-template-columns: 2.5rem minmax(0, 1fr) 4rem 2.5rem;
	align-items: center;
	background: ${({ theme }) => theme.palette.backgroundPaper};
	border-bottom: 0.0625rem solid ${({ theme }) => theme.palette.outline};
`;
export const StyledGroupPosition = styled.span`
	flex: 0 0 2.5rem;
	padding: 0.55rem 0.8rem;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.82rem;
	font-weight: 650;
	font-variant-numeric: tabular-nums;
`;

export const StyledGroupTeam = styled.span`
	flex: 1 1 auto;
	min-width: 0;
	padding: 0.55rem 0.4rem 0.55rem 0.15rem;
	color: ${({ theme }) => theme.palette.textSecondary};
	font-size: 0.82rem;
	font-weight: 650;
	overflow-wrap: anywhere;
`;

export const StyledGroupStat = styled.span`
	padding: 0.55rem 0.4rem;
	color: ${({ theme }) => theme.palette.textDisabled};
	font-size: 0.82rem;
	font-weight: 650;
	text-align: center;
	font-variant-numeric: tabular-nums;
`;

export const StyledGroupList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledGroupRow = styled.div`
	display: grid;
	grid-template-columns: 2.5rem minmax(0, 1fr) 4rem 2.5rem;
	align-items: center;

	&:not(:last-child) {
		border-bottom: 0.0625rem solid ${({ theme }) => theme.palette.outline};
	}
`;
