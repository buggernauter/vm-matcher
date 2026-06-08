import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 2rem;

  padding: 0.25rem 0.625rem;

  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.palette.borderDefault};

  background: transparent;

  font-size: 0.875rem;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.palette.textSecondary};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.palette.borderDefault};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.borderDefault}80;
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${({ theme }) => theme.palette.surfaceSecondary};
  }

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.palette.fail};

    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.fail}33;
    }
  }

  &::file-selector-button {
    height: 1.5rem;

    border: 0;

    background: transparent;

    font-size: 0.875rem;
    font-weight: 500;

    cursor: pointer;
  }
`;
