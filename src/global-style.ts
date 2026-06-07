import { createGlobalStyle } from "styled-components";

export const StyledGlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => theme.mode};
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.palette.pageBackgroundGradient};
    color: ${({ theme }) => theme.palette.textPrimary};
    transition:
      background 220ms ease,
      color 180ms ease;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: ${({ theme }) => theme.palette.pageOverlayGradient};
    opacity: ${({ theme }) => (theme.mode === "dark" ? 1 : 0)};
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }
`;
