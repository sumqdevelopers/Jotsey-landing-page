import type { ReactNode } from "react"
import type { HeroHighlightIcon } from "@/types/content"

interface HighlightIconProps {
  name: HeroHighlightIcon
}

const paths: Record<HeroHighlightIcon, ReactNode> = {
  telehealth: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2.5" />
      <path d="m15 10.5 4.6-2.6a.9.9 0 0 1 1.4.8v6.6a.9.9 0 0 1-1.4.8L15 13.5" />
      <path d="M9 9.5v5M6.5 12h5" />
    </>
  ),
  processing: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <path d="M12 9.5 13 11l1.5 1-1.5 1-1 1.5-1-1.5-1.5-1 1.5-1Z" />
      <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </>
  ),
  notes: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
}

export default function HighlightIcon({ name }: HighlightIconProps) {
  return (
    <svg
      className="size-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
