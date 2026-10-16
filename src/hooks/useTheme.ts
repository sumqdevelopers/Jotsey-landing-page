import { useCallback, useEffect, useState } from "react"

export type Theme = "light" | "dark"

const STORAGE_KEY = "theme"
const TRANSITION_MS = 400

function readTheme(): Theme {
  // index.html sets this before first paint from localStorage / the OS setting.
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light"
}

/** Light/dark theme stored on <html data-theme>, remembered per browser. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Follow the OS setting until the visitor picks a theme themselves.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (event: MediaQueryListEvent) => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem(STORAGE_KEY)
      } catch {
        // storage unavailable (private mode etc.) — treat as "not chosen"
      }
      if (!saved) setTheme(event.matches ? "dark" : "light")
    }
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduceMotion) {
      root.classList.add("theme-transition")
      window.setTimeout(() => root.classList.remove("theme-transition"), TRANSITION_MS + 50)
    }
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark"
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // not persisted; the toggle still works for this visit
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
