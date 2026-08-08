import * as React from "react"
import { type Theme, ThemeContext, getSystemTheme } from "../hooks/use-theme"

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false
  }
  return ["dark", "light", "system"].includes(value)
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.append(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.append(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  if (target.isContentEditable) {
    return true
  }
  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  return Boolean(editableParent)
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  disableTransitionOnChange = true,
  ...props
}: React.PropsWithChildren<ThemeProviderProps>) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey)
    if (isTheme(stored)) {
      return stored
    }
    return defaultTheme
  })

  const setTheme = React.useCallback(
    (next: Theme) => {
      localStorage.setItem(storageKey, next)
      setThemeState(next)
    },
    [storageKey]
  )

  const applyTheme = React.useCallback(
    (next: Theme) => {
      const root = document.documentElement
      const resolved = next === "system" ? getSystemTheme() : next
      const restore = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null
      root.classList.remove("light", "dark")
      root.classList.add(resolved)
      if (restore) {
        restore()
      }
    },
    [disableTransitionOnChange]
  )

  React.useEffect(() => {
    applyTheme(theme)
    if (theme !== "system") {
      return undefined
    }

    const mq = window.matchMedia(COLOR_SCHEME_QUERY)
    const handle = () => {
      applyTheme("system")
    }
    mq.addEventListener("change", handle)
    return () => {
      mq.removeEventListener("change", handle)
    }
  }, [theme, applyTheme])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }
      if (isEditableTarget(event.target)) {
        return
      }
      if (event.key.toLowerCase() !== "d") {
        return
      }

      setThemeState((currentTheme) => {
        const activeTheme =
          currentTheme === "system" ? getSystemTheme() : currentTheme
        const next: Theme = activeTheme === "dark" ? "light" : "dark"

        localStorage.setItem(storageKey, next)
        return next
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [storageKey])

  React.useEffect(() => {
    const handle = (event: StorageEvent) => {
      if (event.storageArea !== localStorage || event.key !== storageKey) {
        return
      }
      if (isTheme(event.newValue)) {
        setThemeState(event.newValue)
      } else {
        setThemeState(defaultTheme)
      }
    }

    window.addEventListener("storage", handle)
    return () => {
      window.removeEventListener("storage", handle)
    }
  }, [defaultTheme, storageKey])

  const value = React.useMemo(() => ({ setTheme, theme }), [theme, setTheme])

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
