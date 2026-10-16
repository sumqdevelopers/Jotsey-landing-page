interface RangeFieldProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

export default function RangeField({ label, value, min, max, onChange }: RangeFieldProps) {
  return (
    <label className="flex flex-col gap-3 text-sm font-semibold text-ink">
      <span className="flex items-center justify-between">
        {label}
        <output className="rounded-full bg-accent-teal/10 px-4 py-1 font-display text-2xl font-semibold">
          {value}
        </output>
      </span>
      <input
        className="accent-accent-teal"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span
        className="flex justify-between text-[11px] font-normal text-ink/55"
        aria-hidden="true"
      >
        <i>{min}</i>
        <i>{max}</i>
      </span>
    </label>
  )
}
