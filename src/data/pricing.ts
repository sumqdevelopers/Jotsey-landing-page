import type { PricingTier } from "@/types/pricing"

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    description: "Explore ambient notes with a simple individual workflow.",
    features: ["10 encounters / month", "SOAP note templates", "Manual EHR export"],
    cta: "Get started",
  },
  {
    name: "Clinical",
    monthlyPrice: 59,
    description: "Unlimited AI documentation for individual providers.",
    features: [
      "Unlimited encounters",
      "240ms live streaming",
      "Direct EHR workflows",
      "Custom templates",
      "Priority support",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Practice",
    monthlyPrice: 99,
    description: "Controls, analytics, and rollout support for growing teams.",
    features: [
      "Everything in Clinical",
      "Team administration",
      "ROI and usage analytics",
      "SSO and audit controls",
      "Dedicated implementation",
    ],
    cta: "Book a demo",
  },
]
