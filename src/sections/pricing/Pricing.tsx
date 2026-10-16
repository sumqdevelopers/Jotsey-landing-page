import { useState } from "react"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import { pricingTiers } from "@/data/pricing"
import BillingToggle from "@/sections/pricing/BillingToggle"
import PricingCard from "@/sections/pricing/PricingCard"
import type { BillingCycle } from "@/types/pricing"

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>("annual")

  return (
    <section className="bg-surface-card py-28" id="pricing" aria-labelledby="pricing-title">
      <Container>
        <SectionHeading
          className="mb-12 flex flex-col items-center"
          eyebrow="Plans for every stage"
          title="Choose how Jotsey works for you."
          titleId="pricing-title"
        >
          <BillingToggle onChange={setBilling} value={billing} />
        </SectionHeading>
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard billing={billing} key={tier.name} tier={tier} />
          ))}
        </div>
        <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-border-subtle p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold text-ink">Running a larger organization?</p>
            <p className="mt-1 text-sm text-brand-slate/75">
              Custom agreements, advanced security, and implementation support.
            </p>
          </div>
          <a
            className="rounded-md border border-ink px-6 py-3 text-center text-sm font-semibold text-ink"
            href="#contact"
          >
            Talk to us
          </a>
        </div>
      </Container>
    </section>
  )
}
