import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const StyledHeroCard = styled.section`
  position: relative;
  overflow: hidden;
  @media (min-width: ${breakpoints.desktop}) {
    padding: 1rem 1rem 2.5rem;
  }
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.palette.cardSurfaceGradient};
  box-shadow: ${({ theme }) => theme.palette.cardSurfaceShadow};
`;

export const StyledHeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: fit-content;
  padding: 0.65rem 0.72rem;
  border-radius: 999rem;
  color: ${({ theme }) => theme.palette.textSecondary};
  background: ${({ theme }) => theme.palette.fieldSurfaceGradient};
  box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const StyledHeroTitle = styled.h1`
  margin: 0.95rem 0 0.4rem;
  font-size: 1.7rem;
  line-height: 1;
  letter-spacing: -0.03em;
`;

export const StyledHeroText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.textDisabled};
  font-size: 0.94rem;
  line-height: 1.55;
`;

export const StyledHeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
`;
