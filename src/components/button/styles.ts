import styled, { css } from "styled-components";

type ButtonVariant = "default" | "ghost";
type ButtonSize = "sm" | "md" | "icon-sm";

type StyledButtonProps = {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $variant = "default", theme }) =>
    $variant === "default"
      ? css`
          background: ${theme.palette.primaryLight};
          color: ${theme.palette.textPrimary};
        `
      : css`
          background: transparent;
          color: ${theme.palette.textPrimary};

          &:hover {
            background: ${theme.palette.fail};
          }
        `}

  ${({ $size = "md" }) =>
    $size === "sm" &&
    css`
      height: 2rem;
      padding: 0 0.75rem;
      font-size: 0.875rem;
    `}

  ${({ $size = "md" }) =>
    $size === "md" &&
    css`
      height: 2.25rem;
      padding: 0 1rem;
      font-size: 0.875rem;
    `}

  ${({ $size = "md" }) =>
    $size === "icon-sm" &&
    css`
      width: 2rem;
      height: 2rem;
      padding: 0;
    `}
`;
