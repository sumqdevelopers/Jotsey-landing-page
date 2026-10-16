import { cx } from "@/lib/cx"
import type { WorkflowStep } from "@/types/content"

interface WorkspacePreviewProps {
  steps: WorkflowStep[]
  activeIndex: number
}

export default function WorkspacePreview({ steps, activeIndex }: WorkspacePreviewProps) {
  return (
    <div className="flex min-h-0 flex-col bg-brand-light p-8 pin:p-7 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center justify-between pin:mb-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-lavender">
            Connected clinical workspace
          </p>
          <h3 className="font-display mt-2 text-3xl font-medium text-brand-slate" aria-live="polite">
            {steps[activeIndex].title} with confidence
          </h3>
        </div>
        <span className="rounded-full bg-surface-raised px-3 py-2 text-[11px] font-medium text-accent-lavender">
          Synced with your EHR
        </span>
      </div>
      {/* All three stay mounted (and preloaded) so switching steps is an instant crossfade. */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-media-dark shadow-lg pin:aspect-auto pin:min-h-0 pin:flex-1">
        {steps.map((step, index) => (
          <img
            className={cx(
              "absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
            key={step.image}
            src={step.image}
            alt={index === activeIndex ? step.imageAlt : ""}
            aria-hidden={index !== activeIndex}
          />
        ))}
      </div>
    </div>
  )
}
