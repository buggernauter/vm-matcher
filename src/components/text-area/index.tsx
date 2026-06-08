import type { ComponentProps } from "react";

import { StyledTextarea } from "./styles";

type TextareaProps = ComponentProps<"textarea">;

export const Textarea = (props: TextareaProps) => <StyledTextarea {...props} />;
