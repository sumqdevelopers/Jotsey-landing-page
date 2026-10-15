export interface NavLink {
  label: string
  href: string
}

export interface FooterLinkGroup {
  title: string
  links: string[]
}

export interface Review {
  quote: string
  name: string
  role: string
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface WorkflowStep {
  title: string
  description: string
  image: string
  imageAlt: string
}

export type HeroHighlightIcon = "telehealth" | "processing" | "notes"

export interface HeroHighlight {
  icon: HeroHighlightIcon
  title: string
  detail: string
}
