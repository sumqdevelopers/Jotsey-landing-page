import type { HeroHighlightIcon } from "@/types/content"

export const onboardingPanel = {
  eyebrow: "Let's get started",
  title: "Let's get you set up in minutes.",
  description:
    "Three quick steps and your next visit documents itself. No new hardware, no changes to your EHR.",
  steps: [
    { title: "Create your account", detail: "Your name, work email and a secure password." },
    { title: "Verify your email", detail: "Enter the 6-digit code we send to your inbox." },
    { title: "Record your first visit", detail: "Start a session and watch the SOAP note draft itself." },
  ],
}

export const loginPanel: {
  eyebrow: string
  title: string
  description: string
  cards: Array<{ icon: HeroHighlightIcon; title: string; detail: string }>
} = {
  eyebrow: "Welcome back",
  title: "Pick up right where you left off.",
  description: "Your drafts, templates and EHR connection are ready the moment you sign in.",
  cards: [
    { icon: "notes", title: "Drafts ready for review", detail: "Approve and sign in a single pass." },
    { icon: "processing", title: "Start recording instantly", detail: "Live transcription from the first word." },
    { icon: "telehealth", title: "In-room or virtual", detail: "The same workflow for every visit." },
  ],
}
