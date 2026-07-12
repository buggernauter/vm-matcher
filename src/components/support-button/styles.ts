'use client';

import styled from 'styled-components';

import { StyledHeroActionBadge } from '@/components/hero-card/styles';

export const StyledSupportLink = styled(StyledHeroActionBadge)`
	box-shadow: ${({ theme }) => theme.palette.transparent};
	padding: 1rem;
`;
