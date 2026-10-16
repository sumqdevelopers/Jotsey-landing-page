import { cx } from "@/lib/cx"
import type { Review } from "@/types/content"

interface ReviewCardProps {
  review: Review
  active: boolean
  onSelect: () => void
}

export default function ReviewCard({ review, active, onSelect }: ReviewCardProps) {
  return (
    <button
      className={cx(
        "flex min-h-[240px] flex-col rounded-lg border p-6 text-left transition",
        active
          ? "border-accent-teal bg-surface-raised"
          : "border-border-subtle bg-surface-subtle dark:bg-surface-raised/70",
      )}
      type="button"
      aria-pressed={active}
      onClick={onSelect}
    >
      <span
        className="text-sm tracking-[0.16em] text-accent-teal"
        role="img"
        aria-label="Rated 5 out of 5"
      >
        ★★★★★
      </span>
      <span className="mt-5 flex-1 text-[14px] leading-6 text-brand-slate">
        “{review.quote}”
      </span>
      <span className="mt-6 border-t border-brand-slate/10 pt-4">
        <span className="block text-sm font-semibold text-brand-slate">
          {review.name}
        </span>
        <span className="mt-1 block text-xs text-brand-slate/65">
          {review.role}
        </span>
      </span>
    </button>
  )
}
