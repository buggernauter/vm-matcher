import styled from "styled-components";

export const StyledInputGroup = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  min-width: 0;
  height: 2.25rem;

  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.palette.borderDefault};

  background: ${({ theme }) => theme.palette.backgroundPaper};

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:has(textarea) {
    height: auto;
  }

  &:has([data-align="block-start"]) {
    flex-direction: column;
    height: auto;
  }

  &:has([data-align="block-end"]) {
    flex-direction: column;
    height: auto;
  }

  &:has([data-align="inline-start"]) input {
    padding-left: 0.5rem;
  }

  &:has([data-align="inline-end"]) input {
    padding-right: 0.5rem;
  }

  &:has([data-align="block-start"]) input {
    padding-bottom: 0.75rem;
  }

  &:has([data-align="block-end"]) input {
    padding-top: 0.75rem;
  }

  &:has([data-slot="input-group-control"]:focus-visible) {
    border-color: ${({ theme }) => theme.palette.borderDefault};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.borderDefault}80;
  }

  &:has([aria-invalid="true"]) {
    border-color: ${({ theme }) => theme.palette.fail};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.fail}33;
  }
`;
