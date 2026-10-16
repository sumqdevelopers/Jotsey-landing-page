import { useRef, type ClipboardEvent, type KeyboardEvent } from "react"
import { cx } from "@/lib/cx"

interface CodeInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  invalid?: boolean
  describedBy?: string
}

/** One box per digit: typing advances, Backspace goes back, pasting fills every box. */
export default function CodeInput({ length = 6, value, onChange, invalid, describedBy }: CodeInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length }, (_, index) => value[index] ?? "")

  const focus = (index: number) => inputs.current[Math.max(0, Math.min(length - 1, index))]?.focus()

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice()
    next[index] = digit
    onChange(next.join("").slice(0, length))
  }

  const onInput = (index: number, raw: string) => {
    const typed = raw.replace(/\D/g, "")
    if (!typed) return
    if (typed.length > 1) {
      // autofill or a fast typist: spread the digits forward
      const merged = (value.slice(0, index) + typed).slice(0, length)
      onChange(merged)
      focus(merged.length)
      return
    }
    setDigit(index, typed)
    focus(index + 1)
  }

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index]) {
      event.preventDefault()
      setDigit(index - 1, "")
      focus(index - 1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      focus(index - 1)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      focus(index + 1)
    }
  }

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    if (!pasted) return
    event.preventDefault()
    onChange(pasted)
    focus(pasted.length)
  }

  return (
    <div className="flex justify-between gap-2" role="group" aria-label="Verification code" aria-describedby={describedBy}>
      {digits.map((digit, index) => (
        <input
          className={cx(
            "aspect-square w-full max-w-14 rounded-xl border bg-surface-card text-center font-display text-2xl font-semibold text-ink outline-none transition-[border-color,box-shadow] focus:border-accent-teal focus:ring-4 focus:ring-accent-teal/15",
            invalid ? "border-danger/70" : digit ? "border-accent-teal/60" : "border-border-subtle",
          )}
          key={index}
          ref={(element) => {
            inputs.current[index] = element
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={length}
          value={digit}
          onChange={(event) => onInput(index, event.target.value)}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={onPaste}
          onFocus={(event) => event.target.select()}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={invalid || undefined}
        />
      ))}
    </div>
  )
}
