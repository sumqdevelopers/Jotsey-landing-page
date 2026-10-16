import { cx } from "@/lib/cx"

interface CarouselControlsProps {
  pages: number
  index: number
  onSelect: (index: number) => void
  canAutoplay: boolean
  playing: boolean
  onTogglePlaying: () => void
  label: string
}

const iconButton =
  "grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent-teal hover:text-accent-teal"

export default function CarouselControls({
  pages,
  index,
  onSelect,
  canAutoplay,
  playing,
  onTogglePlaying,
  label,
}: CarouselControlsProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button className={iconButton} type="button" onClick={() => onSelect(index - 1)} aria-label={`Previous ${label}`}>
        <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 3 5 8l5 5" />
        </svg>
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: pages }, (_, page) => (
          <button
            className={cx(
              "h-2 rounded-full transition-all duration-300",
              page === index ? "w-6 bg-accent-teal" : "w-2 bg-ink/20 hover:bg-ink/40",
            )}
            key={page}
            type="button"
            onClick={() => onSelect(page)}
            aria-label={`Go to ${label} ${page + 1}`}
            aria-current={page === index ? "true" : undefined}
          />
        ))}
      </div>
      <button className={iconButton} type="button" onClick={() => onSelect(index + 1)} aria-label={`Next ${label}`}>
        <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 3 5 5-5 5" />
        </svg>
      </button>
      {canAutoplay && (
        <button
          className={iconButton}
          type="button"
          onClick={onTogglePlaying}
          aria-label={playing ? "Pause automatic sliding" : "Resume automatic sliding"}
        >
          {playing ? (
            <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
