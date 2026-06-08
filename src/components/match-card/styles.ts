import styled from "styled-components";

export const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.palette.backgroundPaper};
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const StyledTimeBadge = styled.div`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.75rem;
  min-height: 3rem;
  padding: 0.4rem 0.7rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.palette.stepperControlGradient};
  color: ${({ theme }) => theme.palette.textPrimary};
  font-size: 1rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const StyledInfo = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const StyledMatchRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const StyledTeams = styled.h3`
  margin: 0;
  flex: 0 1 auto;
  max-width: 100%;
  font-size: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const StyledMetaText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.textDisabled};
  font-size: 0.84rem;
`;

export const StyledMetaButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.palette.textDisabled};
  font-size: 0.84rem;
  cursor: pointer;

  svg {
    transition: transform 180ms ease;
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6rem;
`;

export const StyledChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999rem;
  background: ${({ theme }) => theme.palette.fieldSurfaceGradient};
  box-shadow: ${({ theme }) => theme.palette.fieldSurfaceShadow};
  color: ${({ theme }) => theme.palette.textSecondary};
  font-size: 0.75rem;
  font-weight: 650;
`;

export const StyledResult = styled.span`
  flex: 0 0 auto;
  color: ${({ theme }) => theme.palette.textPrimary};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  text-decoration: underline;
`;

export const StyledGroupPanel = styled.div`
  padding-top: 0.5rem;
`;

export const StyledGroupList = styled.div`
  width: auto;
  min-width: 12rem;
  max-width: 16rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.surfacePrimary};
  border: 0.0625rem solid ${({ theme }) => theme.palette.outline};
  border-radius: 0.75rem;
  overflow: hidden;
`;

export const StyledGroupRow = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 0.0625rem solid ${({ theme }) => theme.palette.outline};
  }
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
