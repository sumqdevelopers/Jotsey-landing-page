import { ANNUAL_DISCOUNT } from "@/lib/pricing"
import { cx } from "@/lib/cx"
import type { BillingCycle } from "@/types/pricing"

interface BillingToggleProps {
  value: BillingCycle
  onChange: (billing: BillingCycle) => void
}

const options: Array<{ value: BillingCycle; label: string }> = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
]

export default function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div
      className="mt-7 inline-flex rounded-full bg-surface-subtle p-1"
      role="group"
      aria-label="Billing period"
    >
      {options.map((option) => {
        const selected = value === option.value
        return (
          <button
            className={cx(
              "rounded-full px-5 py-2 text-sm font-semibold",
              selected ? "bg-surface-card text-brand-navy shadow-sm" : "text-brand-slate/75",
            )}
            type="button"
            aria-pressed={selected}
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
            {option.value === "annual" && (
              <span className="text-accent-lavender">
                {" "}
                save {ANNUAL_DISCOUNT * 100}%
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
