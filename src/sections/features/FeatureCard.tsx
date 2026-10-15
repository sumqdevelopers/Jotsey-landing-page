import type { ReactNode } from "react"
import { cx } from "@/lib/cx"

interface FeatureCardProps {
  children: ReactNode
  className?: string
}

export default function FeatureCard({ children, className }: FeatureCardProps) {
  return (
    <article className={cx("flex flex-col justify-between rounded-3xl p-7", className)}>
      {children}
    </article>
  )
}
