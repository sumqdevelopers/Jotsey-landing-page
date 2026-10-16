import { useState, type ComponentProps } from "react"
import TextField from "@/components/forms/TextField"

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, "type" | "trailing">

export default function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          className="grid size-9 place-items-center rounded-lg text-brand-slate/60 hover:text-ink"
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
            <circle cx="12" cy="12" r="3" />
            {visible && <path d="M4 4l16 16" />}
          </svg>
        </button>
      }
    />
  )
}
