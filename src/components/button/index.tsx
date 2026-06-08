import type { ButtonHTMLAttributes } from "react";

import { StyledButton } from "./styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
  size?: "sm" | "md" | "icon-sm";
};

export const Button = ({ variant, size, ...props }: Props) => (
  <StyledButton $variant={variant} $size={size} {...props} />
);
