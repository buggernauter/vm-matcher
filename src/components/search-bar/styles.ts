import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";
import { InputGroup } from "../input-group";
import { InputGroupInput } from "../input-group-input";
import { Button } from "../button";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
  flex: 1;

  @media (min-width: ${() => breakpoints.desktop}) {
    max-width: 32rem;
  }
`;
export const StyledInputGroup = styled(InputGroup)`
  width: 100%;
  min-width: 18rem;
  height: 3rem;
  @media (min-width: ${() => breakpoints.desktop}) {
    height: 3.25rem;
  }
`;
export const StyledInput = styled(InputGroupInput)`
  flex: 1;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 1rem;
`;

export const StyledSubmitButton = styled(Button)`
  height: 3rem;
  flex: 1;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  &:active {
    transform: scale(1.1);
  }
  @media (min-width: ${() => breakpoints.desktop}) {
    height: 3.25rem;
  }
`;
