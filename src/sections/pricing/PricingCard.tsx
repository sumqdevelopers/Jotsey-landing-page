import { getBillingNote, getDisplayPrice } from "@/lib/pricing"
import { cx } from "@/lib/cx"
import type { BillingCycle, PricingTier } from "@/types/pricing"

interface PricingCardProps {
  tier: PricingTier
  billing: BillingCycle
}

export default function PricingCard({ tier, billing }: PricingCardProps) {
  return (
    <article
      className={cx(
        "relative flex min-h-[540px] flex-col rounded-2xl border p-7 shadow-sm",
        tier.popular
          ? "border-2 border-accent-teal bg-linear-to-b from-accent-teal/10 to-surface-card"
          : "border-border-subtle bg-surface-card",
      )}
    >
      {tier.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent-teal px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-brand-navy">
          Most popular
        </span>
      )}
      <h3 className="text-xl font-semibold text-ink">{tier.name}</h3>
      <p className="mt-3 min-h-12 text-sm leading-6 text-brand-slate/75">
        {tier.description}
      </p>
      <p className="mt-7 flex items-end text-ink">
        <strong className="text-5xl font-bold tracking-[-0.04em]">
          ${getDisplayPrice(tier, billing)}
        </strong>
        <span className="pb-1 text-sm"> / month</span>
      </p>
      <p className="mt-2 text-xs text-brand-slate/65">{getBillingNote(tier, billing)}</p>
      <ul className="mt-8 flex flex-1 flex-col gap-4">
        {tier.features.map((feature) => (
          <li className="flex gap-3 text-sm text-brand-slate" key={feature}>
            <span className="text-accent-teal" aria-hidden="true">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <a
        className={cx(
          "mt-8 rounded-md border px-5 py-3 text-center text-sm font-semibold",
          tier.popular
            ? "border-accent-teal bg-accent-teal text-brand-navy"
            : "border-ink text-ink",
        )}
        href="#contact"
      >
        {tier.cta}
      </a>
    </article>
  )
}
