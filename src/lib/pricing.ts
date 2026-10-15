import type { BillingCycle, PricingTier } from "@/types/pricing"

export const ANNUAL_DISCOUNT = 0.2

export function getDisplayPrice(tier: PricingTier, billing: BillingCycle) {
  return billing === "annual"
    ? Math.round(tier.monthlyPrice * (1 - ANNUAL_DISCOUNT))
    : tier.monthlyPrice
}

export function getBillingNote(tier: PricingTier, billing: BillingCycle) {
  if (tier.monthlyPrice === 0) return "No card required"
  return billing === "annual" ? "Billed annually" : "Billed monthly"
}
