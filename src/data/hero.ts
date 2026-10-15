import type { HeroHighlight } from "@/types/content"

/** Swap for the final photo; any path under /public works. */
export const heroImage = "/assets/images/hero_bg-2560.jpg"

export const trustScore = {
  percent: 93,
  label: "Trusted by customers",
  avatars: ["/assets/41bbc.png", "/assets/718da.png", "/assets/e65cb.png"],
}

export const heroHighlights: HeroHighlight[] = [
  { icon: "telehealth", title: "Telehealth", detail: "Virtual and in-room visits" },
  { icon: "processing", title: "Smart processing", detail: "240ms live transcription" },
  { icon: "notes", title: "AI-assisted notes", detail: "Validated SOAP drafts" },
]
