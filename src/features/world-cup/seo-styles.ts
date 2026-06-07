import Link from "next/link";
import styled from "styled-components";

export const StyledSeoSection = styled.section`
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.palette.cardSurfaceGradient};
  box-shadow: ${({ theme }) => theme.palette.cardSurfaceShadow};
  padding: 1rem 0.9rem;
`;

export const StyledSeoSectionTitle = styled.h2`
  margin: 0 0 0.55rem;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
`;

export const StyledSeoText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.textDisabled};
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const StyledSeoInlineNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

export const StyledSeoLinkButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.65rem 1rem;
  border-radius: 999rem;
  background: ${({ theme }) => theme.palette.fieldSurfaceGradient};
  box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
  color: ${({ theme }) => theme.palette.textPrimary};
  font-size: 0.9rem;
  font-weight: 650;
`;

export const StyledSeoMatchList = styled.ul`
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledSeoMatchListItem = styled.li`
  display: grid;
  gap: 0.35rem;
`;

export const StyledSeoTextLink = styled(Link)`
  color: ${({ theme }) => theme.palette.primaryMain};
  font-size: 0.88rem;
  font-weight: 650;
`;
