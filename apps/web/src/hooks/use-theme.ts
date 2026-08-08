import * as React from "react"

export type Theme = "dark" | "light" | "system"
export type ResolvedTheme = "dark" | "light"

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const THEME_VALUES: readonly Theme[] = [
  "dark",
  "light",
  "system",
] as const
const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

export function getSystemTheme(): ResolvedTheme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia(COLOR_SCHEME_QUERY).matches
  ) {
    return "dark"
  }
  return "light"
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
)

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
