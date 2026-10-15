import type { ReactNode } from "react"
import { cx } from "@/lib/cx"

interface ContainerProps {
  children: ReactNode
  className?: string
  /** 1440px instead of the default 1180px; used by the hero and the header above it. */
  wide?: boolean
}

export default function Container({ children, className, wide = false }: ContainerProps) {
  return (
    <div className={cx("mx-auto px-6", wide ? "max-w-[1440px]" : "max-w-[1180px]", className)}>
      {children}
    </div>
  )
}
