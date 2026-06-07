import styled from "styled-components";

export const StyledEmptyState = styled.div`
  padding: 1rem;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.palette.cardSurfaceGradient};
  box-shadow: ${({ theme }) => theme.palette.cardSurfaceShadow};
  text-align: center;
  color: ${({ theme }) => theme.palette.textDisabled};
  line-height: 1.5;
`;
