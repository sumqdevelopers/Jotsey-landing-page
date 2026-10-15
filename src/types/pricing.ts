export type BillingCycle = "monthly" | "annual"

export interface PricingTier {
  name: string
  monthlyPrice: number
  description: string
  features: string[]
  cta: string
  popular?: boolean
}
