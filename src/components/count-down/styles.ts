import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 0.5rem;

  text-align: center;
`;

export const StyledLabel = styled.span`
  font-size: 0.875rem;

  font-weight: 600;

  letter-spacing: 0.08em;

  text-transform: uppercase;

  color: ${({ theme }) => theme.palette.textSecondary};
`;

export const StyledCounter = styled.div`
  font-size: clamp(2rem, 5vw, 3rem);

  font-weight: 800;

  line-height: 1;

  font-variant-numeric: tabular-nums;

  color: ${({ theme }) => theme.palette.textPrimary};
`;
