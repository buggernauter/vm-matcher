import type { Palette, PrintPalette } from "./type";

const lightColors = {
  backgroundDefault: "#f7fafc",
  backgroundPaper: "#ffffff",
  borderDefault: "#d3c9ba",
  divider: "#d8e2eb",
  fail: "#ff7b72",
  outline: "#bcccdc",
  outlineVariant: "#e5edf3",
  primaryLight: "#cbd5e1",
  primaryMain: "#0f766e",
  shadowDark: "rgba(21, 32, 43, 0.08)",
  shadowLight: "rgba(21, 32, 43, 0.06)",
  shadowMedium: "rgba(21, 32, 43, 0.07)",
  shadowPrimary: "rgba(15, 118, 110, 0.2)",
  surfacePrimary: "#fcfdff",
  surfaceSecondary: "#f5f9fc",
  textDisabled: "#52606d",
  textPrimary: "#15202b",
  textSecondary: "#243b53",
  transparent: "transparent",
} as const;

const darkColors = {
  backgroundDefault: "#1f1f1f",
  backgroundPaper: "#121212",
  borderDefault: "#d3c9ba",
  divider: "rgba(255, 255, 255, 0.08)",
  fail: "#d93025",
  outline: "rgba(255, 255, 255, 0.12)",
  outlineVariant: "rgba(255, 255, 255, 0.35)",
  primaryLight: "rgba(29, 185, 84, 0.28)",
  primaryMain: "#1DB954",
  shadowDark: "rgba(0, 0, 0, 0.56)",
  shadowLight: "rgba(0, 0, 0, 0.28)",
  shadowMedium: "rgba(0, 0, 0, 0.42)",
  shadowPrimary: "rgba(29, 185, 84, 0.22)",
  surfacePrimary: "#181818",
  surfaceSecondary: "#242424",
  textDisabled: "#a7a7a7",
  textPrimary: "#f5f5f5",
  textSecondary: "#d0d0d0",
  transparent: "transparent",
} as const;

const printColors = {
  actionText: "#393838",
  border: "#d8cfc2",
  borderSoft: "#ece4d9",
  borderStrong: "#000000",
  borderSubtle: "#ddd5c9",
  card: "#f4ede2",
  line: "#8d8d8d",
  muted: "#f8f3eb",
  pageGradientEnd: "#ddd6c8",
  pageGradientMid: "#f5f2ea",
  pageGradientStart: "#ebe7de",
  panelTint: "rgba(250, 247, 241, 0.9)",
  paper: "#ffffff",
  paperOverlay: "rgba(255, 255, 255, 0.96)",
  shadow: "rgba(43, 33, 24, 0.14)",
  surface: "#fcfaf6",
  tableHeader: "#fbf7f0",
  text: "#1f1a17",
  textMuted: "#655b51",
} as const;

export const gradients = {
  light: {
    cardSurface: `linear-gradient(180deg, ${lightColors.backgroundPaper} 0%, ${lightColors.surfacePrimary} 100%)`,
    descriptionSurface:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 249, 252, 0.78) 100%)",
    fieldSurface:
      "linear-gradient(180deg, rgba(245, 249, 252, 0.95) 0%, rgba(236, 243, 248, 0.92) 100%)",
    iconButton: lightColors.backgroundPaper,
    navigationButton: lightColors.backgroundPaper,
    pageBackground: `radial-gradient(circle at top, ${lightColors.backgroundDefault} 0%, transparent 45%), ${lightColors.backgroundPaper}`,
    pageOverlay: "none",
    stepperButton:
      "linear-gradient(180deg, rgba(245, 249, 252, 0.98) 0%, rgba(236, 243, 248, 0.95) 100%)",
    stepperControl:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(245, 249, 252, 0.92) 100%)",
    summaryCard: lightColors.primaryMain,
  },
  dark: {
    cardSurface:
      "linear-gradient(180deg, rgba(36, 36, 36, 0.96) 0%, rgba(18, 18, 18, 0.98) 100%)",
    descriptionSurface:
      "linear-gradient(180deg, rgba(35, 35, 35, 0.88) 0%, rgba(20, 20, 20, 0.72) 100%)",
    fieldSurface:
      "linear-gradient(180deg, rgba(44, 44, 44, 0.92) 0%, rgba(26, 26, 26, 0.94) 100%)",
    iconButton: `linear-gradient(180deg, ${darkColors.surfacePrimary} 0%, ${darkColors.backgroundDefault} 100%)`,
    navigationButton: `linear-gradient(180deg, ${darkColors.surfacePrimary} 0%, ${darkColors.backgroundDefault} 100%)`,
    pageBackground: `radial-gradient(circle at top, rgba(255, 255, 255, 0.045) 0%, transparent 38%), radial-gradient(circle at 20% 12%, ${darkColors.primaryMain}14 0%, transparent 22%), linear-gradient(180deg, #191919 0%, ${darkColors.backgroundPaper} 56%, #101010 100%)`,
    pageOverlay:
      "radial-gradient(circle at 50% -10%, rgba(255, 255, 255, 0.035) 0%, transparent 34%), radial-gradient(circle at 85% 18%, rgba(255, 255, 255, 0.025) 0%, transparent 24%)",
    stepperButton:
      "linear-gradient(180deg, rgba(52, 52, 52, 0.96) 0%, rgba(31, 31, 31, 0.96) 100%)",
    stepperControl:
      "linear-gradient(180deg, rgba(38, 38, 38, 0.94) 0%, rgba(24, 24, 24, 0.96) 100%)",
    summaryCard: `linear-gradient(180deg, ${darkColors.surfacePrimary} 0%, ${darkColors.backgroundDefault} 100%)`,
  },
  print: {
    page: `linear-gradient(135deg, ${printColors.pageGradientStart} 0%, ${printColors.pageGradientMid} 45%, ${printColors.pageGradientEnd} 100%)`,
    sheet: `linear-gradient(180deg, ${printColors.paperOverlay} 0%, ${printColors.surface} 100%)`,
  },
} as const;

export const shadows = {
  light: {
    cardSurface: `0 1.125rem 2.5rem ${lightColors.shadowLight}, inset 0 0.0625rem 0 rgba(255, 255, 255, 0.85)`,
    descriptionSurface: `0 1rem 2rem ${lightColors.shadowLight}, inset 0 0.0625rem 0 rgba(255, 255, 255, 0.7)`,
    desktopNoticeCard: `0 1.25rem 3rem ${lightColors.shadowMedium}`,
    fieldSurface: `0 0.5rem 1rem rgba(21, 32, 43, 0.04), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.75)`,
    iconButton: `0 0.625rem 1.375rem ${lightColors.shadowDark}`,
    navigationButton: `0 0.625rem 1.375rem ${lightColors.shadowDark}`,
    paginationDot: `0 0.5rem 1rem ${lightColors.shadowPrimary}`,
    primaryButton: `0 1rem 2rem ${lightColors.shadowPrimary}`,
    summaryCard: `0 0.75rem 1.25rem ${lightColors.shadowPrimary}`,
    stepperButton: `0 0.625rem 1.25rem rgba(21, 32, 43, 0.05), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.8)`,
    stepperButtonPressed: `0 0.875rem 1.5rem ${lightColors.shadowPrimary}`,
    stepperControl: `0 0.875rem 1.75rem ${lightColors.shadowLight}, inset 0 0.0625rem 0 rgba(255, 255, 255, 0.85)`,
    toggleButtonDanger: `0 0.75rem 1.5rem ${lightColors.shadowDark}`,
    toggleButtonSuccess: `0 0.75rem 1.5rem ${lightColors.shadowPrimary}`,
  },
  dark: {
    cardSurface: `0 1.5rem 3rem ${darkColors.shadowMedium}, inset 0 0.0625rem 0 rgba(255, 255, 255, 0.05)`,
    descriptionSurface: `0 1rem 2rem rgba(0, 0, 0, 0.18), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.03)`,
    desktopNoticeCard: `0 1.25rem 3rem ${darkColors.shadowMedium}`,
    fieldSurface: `0 0.625rem 1.25rem rgba(0, 0, 0, 0.14), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.04)`,
    iconButton: `0 1rem 2rem ${darkColors.shadowDark}, 0 0 0 0.0625rem ${darkColors.outlineVariant}`,
    navigationButton: `0 1rem 2rem ${darkColors.shadowDark}, 0 0 0 0.0625rem ${darkColors.outlineVariant}`,
    paginationDot: `0 0.5rem 1rem ${darkColors.shadowPrimary}`,
    primaryButton: `0 1rem 2rem ${darkColors.shadowPrimary}`,
    summaryCard: `0 1rem 2rem ${darkColors.shadowMedium}, 0 0 0 0.0625rem ${darkColors.outlineVariant}`,
    stepperButton: `0 0.625rem 1.25rem rgba(0, 0, 0, 0.16), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.05)`,
    stepperButtonPressed: `0 0.875rem 1.5rem ${darkColors.shadowPrimary}`,
    stepperControl: `0 0.875rem 1.75rem rgba(0, 0, 0, 0.18), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.04)`,
    toggleButtonDanger: `0 0.75rem 1.5rem ${darkColors.shadowDark}`,
    toggleButtonSuccess: `0 0.75rem 1.5rem ${darkColors.shadowPrimary}`,
  },
  print: {
    sheet: `0 1.5rem 3.75rem ${printColors.shadow}`,
  },
} as const;

export const lightPalette: Palette = {
  cardSurfaceGradient: gradients.light.cardSurface,
  cardSurfaceShadow: shadows.light.cardSurface,
  descriptionSurfaceGradient: gradients.light.descriptionSurface,
  descriptionSurfaceShadow: shadows.light.descriptionSurface,
  desktopNoticeCardShadow: shadows.light.desktopNoticeCard,
  fieldSurfaceGradient: gradients.light.fieldSurface,
  fieldSurfaceShadow: shadows.light.fieldSurface,
  iconButtonGradient: gradients.light.iconButton,
  iconButtonShadow: shadows.light.iconButton,
  navigationButtonGradient: gradients.light.navigationButton,
  navigationButtonShadow: shadows.light.navigationButton,
  pageBackgroundGradient: gradients.light.pageBackground,
  pageOverlayGradient: gradients.light.pageOverlay,
  paginationDotShadow: shadows.light.paginationDot,
  primaryButtonShadow: shadows.light.primaryButton,
  summaryCardShadow: shadows.light.summaryCard,
  summaryCardGradient: gradients.light.summaryCard,
  stepperButtonGradient: gradients.light.stepperButton,
  stepperButtonPressedShadow: shadows.light.stepperButtonPressed,
  stepperButtonShadow: shadows.light.stepperButton,
  stepperControlGradient: gradients.light.stepperControl,
  stepperControlShadow: shadows.light.stepperControl,
  toggleButtonDangerShadow: shadows.light.toggleButtonDanger,
  toggleButtonSuccessShadow: shadows.light.toggleButtonSuccess,
  ...lightColors,
};

export const darkPalette: Palette = {
  cardSurfaceGradient: gradients.dark.cardSurface,
  cardSurfaceShadow: shadows.dark.cardSurface,
  descriptionSurfaceGradient: gradients.dark.descriptionSurface,
  descriptionSurfaceShadow: shadows.dark.descriptionSurface,
  desktopNoticeCardShadow: shadows.dark.desktopNoticeCard,
  fieldSurfaceGradient: gradients.dark.fieldSurface,
  fieldSurfaceShadow: shadows.dark.fieldSurface,
  iconButtonGradient: gradients.dark.iconButton,
  iconButtonShadow: shadows.dark.iconButton,
  navigationButtonGradient: gradients.dark.navigationButton,
  navigationButtonShadow: shadows.dark.navigationButton,
  pageBackgroundGradient: gradients.dark.pageBackground,
  pageOverlayGradient: gradients.dark.pageOverlay,
  paginationDotShadow: shadows.dark.paginationDot,
  primaryButtonShadow: shadows.dark.primaryButton,
  summaryCardShadow: shadows.dark.summaryCard,
  summaryCardGradient: gradients.dark.summaryCard,
  stepperButtonGradient: gradients.dark.stepperButton,
  stepperButtonPressedShadow: shadows.dark.stepperButtonPressed,
  stepperButtonShadow: shadows.dark.stepperButton,
  stepperControlGradient: gradients.dark.stepperControl,
  stepperControlShadow: shadows.dark.stepperControl,
  toggleButtonDangerShadow: shadows.dark.toggleButtonDanger,
  toggleButtonSuccessShadow: shadows.dark.toggleButtonSuccess,
  ...darkColors,
};

export type AppTheme = {
  mode: "light" | "dark";
  palette: Palette;
};

export const appTheme: AppTheme = {
  mode: "light",
  palette: lightPalette,
};

export const darkTheme: AppTheme = {
  mode: "dark",
  palette: darkPalette,
};

export const printPalette: PrintPalette = {
  actionText: printColors.actionText,
  border: printColors.border,
  borderSoft: printColors.borderSoft,
  borderStrong: printColors.borderStrong,
  borderSubtle: printColors.borderSubtle,
  card: printColors.card,
  line: printColors.line,
  muted: printColors.muted,
  pageGradient: gradients.print.page,
  panelTint: printColors.panelTint,
  paper: printColors.paper,
  paperOverlay: printColors.paperOverlay,
  sheetGradient: gradients.print.sheet,
  sheetShadow: shadows.print.sheet,
  surface: printColors.surface,
  tableHeader: printColors.tableHeader,
  text: printColors.text,
  textMuted: printColors.textMuted,
};
