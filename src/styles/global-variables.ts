import { css } from "styled-components";

export const globalThemeVariables = css`
  --bracket-card-height: 5.8rem;
  --bracket-card-max-width: 18.5rem;
  --bracket-compact-card-max-width: 17.75rem;
  --bracket-pair-width: 21rem;
  --bracket-card-overlay-gradient: ${({ theme }) => theme.palette.pageOverlayGradient};
  --bracket-card-border-gradient: linear-gradient(
    180deg,
    ${({ theme }) => theme.palette.outline} 0%,
    ${({ theme }) => theme.palette.transparent} 24%
  );
  --bracket-card-sheen-gradient: linear-gradient(
    180deg,
    ${({ theme }) => theme.palette.outlineVariant},
    ${({ theme }) => theme.palette.transparent}
  );
  --bracket-card-outline-color: ${({ theme }) => theme.palette.outline};
  --bracket-card-highlight-shadow: ${({ theme }) => theme.palette.shadowLight};
  --bracket-card-depth-shadow: ${({ theme }) => theme.palette.shadowDark};
  --bracket-final-border-color: ${({ theme }) => theme.palette.bracketFinalBorderColor};
  --bracket-final-shadow: ${({ theme }) => theme.palette.bracketFinalShadow};
  --bracket-flag-outline-color: ${({ theme }) => theme.palette.outlineVariant};
  --bracket-line-color: ${({ theme }) => theme.palette.divider};
`;
