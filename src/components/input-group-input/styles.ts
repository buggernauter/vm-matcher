import styled from "styled-components";

import { StyledInput } from "../input/styles";

export const StyledInputGroupInput = styled(StyledInput)`
  flex: 1;

  border: 0;

  border-radius: 0;

  background: transparent;

  box-shadow: none;

  &:focus-visible {
    box-shadow: none;
  }
`;
