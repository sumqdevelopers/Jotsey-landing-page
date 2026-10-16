import type { FaqEntry } from "@/types/content"

interface FaqItemProps {
  faq: FaqEntry
}

export default function FaqItem({ faq }: FaqItemProps) {
  return (
    <details className="group py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium text-ink">
        {faq.question}
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-focus text-lg group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <p className="max-w-2xl pt-4 text-sm leading-6 text-brand-slate/65">{faq.answer}</p>
    </details>
  )
}
