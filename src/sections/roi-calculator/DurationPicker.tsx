import { cx } from "@/lib/cx"

interface DurationPickerProps {
  options: number[]
  value: number
  onChange: (minutes: number) => void
}

export default function DurationPicker({ options, value, onChange }: DurationPickerProps) {
  const longest = options[options.length - 1]

  return (
    <fieldset>
      <legend className="mb-4 text-sm font-semibold text-ink">
        Typical appointment length
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            className={cx(
              "rounded-full border px-4 py-2 text-sm font-semibold",
              value === option
                ? "border-emphasis bg-emphasis text-white"
                : "border-ink/10 text-ink",
            )}
            type="button"
            aria-pressed={value === option}
            key={option}
            onClick={() => onChange(option)}
          >
            {option} min{option === longest ? "+" : ""}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
