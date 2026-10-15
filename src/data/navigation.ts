import type { FooterLinkGroup, NavLink } from "@/types/content"

export const navLinks: NavLink[] = [
  { label: "How it works", href: "#how" },
  { label: "For practices", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
]

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: ["Ambient scribe", "SOAP notes", "EHR integrations", "Practice analytics"],
  },
  {
    title: "Resources",
    links: ["Trust center", "Clinical accuracy", "ROI calculator", "Help center"],
  },
  { title: "Company", links: ["About", "Careers", "Contact", "Status"] },
]

export const complianceBadges = ["HIPAA", "SOC 2", "AES-256"]
