import styled from "styled-components";

export const StyledDayNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const StyledDaySummary = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.12rem;
  text-align: center;
`;

export const StyledDayLabel = styled.h2`
  margin: 0;
  font-size: 1rem;
  letter-spacing: -0.02em;
`;

export const StyledDayMeta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.textDisabled};
  font-size: 0.8rem;
`;

export const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 0;
  border-radius: 999rem;
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? theme.palette.iconButtonGradient
      : theme.palette.backgroundPaper};
  color: ${({ theme }) => theme.palette.primaryMain};
  box-shadow: ${({ theme }) => theme.palette.iconButtonShadow};
  transition:
    transform 160ms ease,
    box-shadow 180ms ease,
    opacity 180ms ease;

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.45;
    box-shadow: none;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
