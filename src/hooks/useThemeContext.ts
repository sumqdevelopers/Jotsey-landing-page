import { useContext } from "react"
import { ThemeContext } from "@/lib/themeContext"

export function useThemeContext() {
  return useContext(ThemeContext)
}
