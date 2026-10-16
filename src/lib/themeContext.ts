import { createContext } from "react"
import type { Theme } from "@/hooks/useTheme"

export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
})
