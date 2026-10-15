import { cx } from "@/lib/cx"
import type { WorkflowStep } from "@/types/content"

interface StepButtonProps {
  step: WorkflowStep
  index: number
  active: boolean
  onSelect: () => void
}

export default function StepButton({ step, index, active, onSelect }: StepButtonProps) {
  return (
    <button
      className={cx(
        "relative flex min-h-[150px] flex-1 flex-col items-start justify-between border-b border-border-subtle p-7 text-left transition-colors duration-300 last:border-0 pin:min-h-0 pin:justify-center pin:gap-3 pin:p-6",
        active ? "text-white" : "text-brand-slate",
      )}
      type="button"
      aria-pressed={active}
      onClick={onSelect}
    >
      <span
        className={cx(
          "text-4xl font-bold leading-none tracking-[-0.03em] tabular-nums transition-colors duration-300",
          active ? "text-accent-cyan" : "text-accent-teal",
        )}
      >
        0{index + 1}
      </span>
      <span>
        <strong className="font-display block text-2xl font-medium">
          {step.title}
        </strong>
        <span
          className={cx(
            "mt-1 block text-xs transition-colors duration-300",
            active ? "text-white/55" : "text-brand-slate/65",
          )}
        >
          {step.description}
        </span>
      </span>
    </button>
  )
}
