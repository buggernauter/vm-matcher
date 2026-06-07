"use client";

import { StyledGlobalStyle } from "@/global-style";
import { darkTheme } from "@/styles/palette";
import { useServerInsertedHTML } from "next/navigation";
import { useState, type PropsWithChildren } from "react";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";

export const StyledComponentsRegistry = ({
  children,
}: PropsWithChildren) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    styledComponentsStyleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return (
      <ThemeProvider theme={darkTheme}>
        <StyledGlobalStyle />
        {children}
      </ThemeProvider>
    );
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={darkTheme}>
        <StyledGlobalStyle />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  );
};
