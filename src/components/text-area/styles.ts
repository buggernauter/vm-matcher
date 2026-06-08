import styled from "styled-components";

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 4rem;

  padding: 0.5rem 0.75rem;

  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.palette.outlineVariant};

  background: transparent;

  font-size: 0.875rem;
  line-height: 1.5;

  resize: vertical;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.palette.textSecondary};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.palette.outlineVariant};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.outlineVariant}33;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.palette.fail};

    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.fail}33;
    }
  }
`;
