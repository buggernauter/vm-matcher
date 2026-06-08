import type { ComponentProps } from "react";

import { StyledInputGroupInput } from "./styles";

type InputGroupInputProps = ComponentProps<"input">;

export const InputGroupInput = ({
  autoComplete = "off",
  ...props
}: InputGroupInputProps) => (
  <StyledInputGroupInput
    data-slot="input-group-control"
    autoComplete={autoComplete}
    {...props}
  />
);
