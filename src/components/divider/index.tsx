import styled from 'styled-components';

export const Divider = () => {
	return <StyledDivider />;
};
export const StyledDivider = styled.div`
	width: 100%;
	height: 0.75rem;
	background: ${({ theme }) => theme.palette.transparent};
`;
