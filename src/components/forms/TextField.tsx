import { useId, type InputHTMLAttributes, type ReactNode } from "react"
import { cx } from "@/lib/cx"

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string
  error?: string | null
  hint?: ReactNode
  /** Rendered inside the input on the right, e.g. a show-password button. */
  trailing?: ReactNode
}

export const inputClasses =
  "w-full rounded-xl border bg-surface-card px-4 py-3 text-[15px] text-ink placeholder:text-brand-slate/40 outline-none transition-[border-color,box-shadow] focus:border-accent-teal focus:ring-4 focus:ring-accent-teal/15"

export default function TextField({ label, error, hint, trailing, className, ...input }: TextFieldProps) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className={cx(
            inputClasses,
            error ? "border-danger/70" : "border-border-subtle",
            Boolean(trailing) && "pr-12",
          )}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...input}
        />
        {trailing && <div className="absolute inset-y-0 right-2 flex items-center">{trailing}</div>}
      </div>
      {error ? (
        <p className="mt-1.5 text-[13px] text-danger" id={`${id}-error`}>
          {error}
        </p>
      ) : (
        hint && (
          <div className="mt-1.5 text-[13px] text-brand-slate/65" id={`${id}-hint`}>
            {hint}
          </div>
        )
      )}
    </div>
  )
}
