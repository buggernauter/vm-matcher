import Image from 'next/image';
import styled from 'styled-components';

export const StyledChip = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
`;

export const StyledLogo = styled.span<{ $isWide?: boolean }>`
	position: relative;
	display: inline-block;
	width: 2rem;
	height: 2rem;
	padding: 0;
	margin: 0;
`;

export const StyledImage = styled(Image)`
	object-fit: contain;
`;
