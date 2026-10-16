import { cx } from "@/lib/cx"
import type { Review } from "@/types/content"

interface ReviewCardProps {
  review: Review
  /** Accent the card currently in focus (used when one card is shown at a time). */
  highlighted: boolean
}

export default function ReviewCard({ review, highlighted }: ReviewCardProps) {
  return (
    <figure
      className={cx(
        "flex h-full min-h-[240px] flex-col rounded-lg border bg-surface-raised p-6 transition-colors duration-300",
        highlighted ? "border-accent-teal" : "border-border-subtle",
      )}
    >
      <span
        className="text-sm tracking-[0.16em] text-accent-teal"
        role="img"
        aria-label="Rated 5 out of 5"
      >
        ★★★★★
      </span>
      <blockquote className="mt-5 flex-1 text-[14px] leading-6 text-brand-slate">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-brand-slate/10 pt-4">
        <span className="block text-sm font-semibold text-brand-slate">{review.name}</span>
        <span className="mt-1 block text-xs text-brand-slate/65">{review.role}</span>
      </figcaption>
    </figure>
  )
}
