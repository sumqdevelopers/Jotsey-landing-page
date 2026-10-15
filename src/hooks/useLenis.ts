import { useContext } from "react"
import { LenisContext } from "@/lib/lenisContext"

export function useLenis() {
  return useContext(LenisContext)
}
