import type Lenis from "lenis"
import { createContext } from "react"

/** The page's Lenis instance; null when smooth scrolling is off (e.g. reduced motion). */
export const LenisContext = createContext<Lenis | null>(null)
