interface FormAlertProps {
  message: string | null
}

/** Form-level error (e.g. wrong credentials), announced to screen readers. */
export default function FormAlert({ message }: FormAlertProps) {
  if (!message) return null
  return (
    <div
      className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
      role="alert"
    >
      {message}
    </div>
  )
}
