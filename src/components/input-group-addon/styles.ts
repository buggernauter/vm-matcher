import styled, { css } from "styled-components";

type Alignment = "inline-start" | "inline-end" | "block-start" | "block-end";

type StyledInputGroupAddonProps = {
  $align: Alignment;
};

export const StyledInputGroupAddon = styled.div<StyledInputGroupAddonProps>`
  display: flex;
  align-items: center;

  ${({ $align }) =>
    ($align === "block-start" || $align === "block-end") &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;
