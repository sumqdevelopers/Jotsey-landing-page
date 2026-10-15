import type { ReactNode } from "react"

interface EyebrowProps {
  children: ReactNode
}

export default function Eyebrow({ children }: EyebrowProps) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-lavender">
      {children}
    </p>
  )
}
