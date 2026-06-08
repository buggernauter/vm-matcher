import type { ComponentProps } from "react";

import { StyledInput } from "./styles";

type InputProps = ComponentProps<"input">;

export const Input = (props: InputProps) => (
  <StyledInput data-slot="input" {...props} />
);
