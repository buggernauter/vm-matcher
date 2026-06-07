"use client";

import type { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

import { StyledGlobalStyle } from "@/global-style";
import { queryClient } from "@/lib/query-client";
import { useThemeMode } from "@/hooks/useThemeMode";

export const AppProviders = ({ children }: PropsWithChildren) => {
  const { theme } = useThemeMode();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledGlobalStyle />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
