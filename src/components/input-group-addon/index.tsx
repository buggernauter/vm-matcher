"use client";

import type { ComponentProps } from "react";

import { StyledInputGroupAddon } from "./styles";

type InputGroupAddonProps = ComponentProps<"div"> & {
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
};

export const InputGroupAddon = ({
  align = "inline-start",
  ...props
}: InputGroupAddonProps) => (
  <StyledInputGroupAddon
    role="group"
    data-slot="input-group-addon"
    data-align={align}
    $align={align}
    onClick={(event) => {
      if ((event.target as HTMLElement).closest("button")) {
        return;
      }

      event.currentTarget.parentElement?.querySelector("input")?.focus();
    }}
    {...props}
  />
);
