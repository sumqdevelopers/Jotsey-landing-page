import type { ReactNode } from "react"

interface SubmitButtonProps {
  loading: boolean
  children: ReactNode
  loadingLabel: string
}

export default function SubmitButton({ loading, children, loadingLabel }: SubmitButtonProps) {
  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-teal px-5 py-3.5 text-[15px] font-semibold text-brand-navy shadow-lg shadow-accent-teal/25 disabled:cursor-wait disabled:opacity-70"
      type="submit"
      disabled={loading}
      aria-busy={loading}
    >
      {loading && (
        <span className="size-4 animate-spin rounded-full border-2 border-brand-navy/30 border-t-brand-navy" aria-hidden="true" />
      )}
      {loading ? loadingLabel : children}
    </button>
  )
}
