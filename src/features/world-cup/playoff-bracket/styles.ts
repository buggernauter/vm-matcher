'use client';

import styled from 'styled-components';

export const StyledSection = styled.section`
	padding: 0.2rem 1rem 10rem;
	background: ${({ theme }) => theme.palette.transparent};
	color: ${({ theme }) => theme.palette.textPrimary};
`;
