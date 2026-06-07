import { useEffect, useState } from "react";

import { appTheme, darkTheme, type AppTheme } from "../styles/palette";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme-mode";

const getInitialThemeMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedMode = window.localStorage.getItem(STORAGE_KEY);

  if (storedMode === "light" || storedMode === "dark") {
    return storedMode;
  }

  return "dark";
};

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, themeMode);
    document.documentElement.style.colorScheme = themeMode;
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((previousMode) =>
      previousMode === "dark" ? "light" : "dark",
    );
  };

  const theme: AppTheme = themeMode === "dark" ? darkTheme : appTheme;

  return {
    theme,
    themeMode,
    isDarkTheme: themeMode === "dark",
    setThemeMode,
    toggleTheme,
  };
};
