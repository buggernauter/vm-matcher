import styled from "styled-components";

export const StyledPage = styled.main`
  box-sizing: border-box;
  min-height: 100vh;
  padding: 1rem 0.75rem 2.5rem;
  color: ${({ theme }) => theme.palette.textPrimary};
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
`;
export const StyledDivider = styled.div`
  width: 100%;
  height: 0.75rem;
  background: ${({ theme }) => theme.palette.transparent};
`;
export const StyledStack = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(100%, 54rem);
  margin: 0 auto;
`;

export const StyledActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  width: fit-content;
  min-height: 2.25rem;
  padding: 0 0.875rem;
  border: 0;
  border-radius: 999rem;
  background: ${({ theme }) => theme.palette.shadowDark};
  font: inherit;

  font-size: 0.85rem;
  font-weight: 650;
  transition:
    transform 160ms ease,
    box-shadow 180ms ease,
    opacity 180ms ease;

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.4;
    box-shadow: none;
  }
`;

export const StyledScheduleCard = styled.section`
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.palette.cardSurfaceGradient};
  box-shadow: ${({ theme }) => theme.palette.cardSurfaceShadow};
  padding: 0.8rem 0.7rem 0.85rem;
  display: flex;
  flex-direction: column;
`;

export const StyledMatches = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;
