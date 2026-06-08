import type { ComponentProps } from "react";

import { StyledInputGroup } from "./styles";

type InputGroupProps = ComponentProps<"div">;

export const InputGroup = (props: InputGroupProps) => (
  <StyledInputGroup data-slot="input-group" role="group" {...props} />
);
