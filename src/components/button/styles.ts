import styled, { css } from "styled-components";

export type ButtonVariant = "default" | "ghost";
export type ButtonSize = "sm" | "md" | "icon-sm";

export type StyledButtonProps = {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
};

export const buttonBaseStyles = css`
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
`;

export const buttonVariantStyles = css<StyledButtonProps>`
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
`;

export const buttonSizeStyles = css<StyledButtonProps>`
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

export const StyledButton = styled.button<StyledButtonProps>`
  ${buttonBaseStyles}
  ${buttonVariantStyles}
  ${buttonSizeStyles}
`;
