import type { ReactNode } from "react"
import Eyebrow from "@/components/ui/Eyebrow"
import { cx } from "@/lib/cx"

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  /** Used by the parent section's `aria-labelledby`. */
  titleId: string
  description?: string
  align?: "center" | "start"
  size?: "md" | "lg"
  className?: string
  titleClassName?: string
  children?: ReactNode
}

export default function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  align = "center",
  size = "lg",
  className,
  titleClassName,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cx(align === "center" && "text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={cx(
          "font-display font-semibold text-brand-navy",
          size === "lg" ? "mt-4 text-5xl tracking-[-0.03em]" : "mt-3 text-4xl",
          titleClassName,
        )}
        id={titleId}
      >
        {title}
      </h2>
      {description && <p className="mt-5 text-brand-slate/65">{description}</p>}
      {children}
    </div>
  )
}
