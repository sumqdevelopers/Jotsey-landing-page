export default function CtaBanner() {
  return (
    <section className="bg-surface-card py-20" id="contact" aria-labelledby="cta-title">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-3xl border border-surface-card bg-linear-135 from-accent-lavender/10 via-surface-card via-52% to-accent-cyan/10 px-8 py-16 text-center shadow-xl shadow-accent-lavender/10">
        <h2
          className="font-display max-w-3xl text-4xl font-semibold text-brand-navy"
          id="cta-title"
        >
          Join the clinicians who have reclaimed their evenings.
        </h2>
        <p className="text-brand-slate/75">
          Try Jotsey for a few encounters and watch every note arrive ready to
          review.
        </p>
        <a
          className="rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold text-brand-navy"
          href="mailto:hello@jotsey.com"
        >
          Start a free trial
        </a>
        <p className="text-sm text-brand-navy">
          <strong>14 days free. No credit card required.</strong> Cancel anytime.
        </p>
        <p className="text-xs text-brand-slate/75">
          Works with every EHR · HIPAA compliant · Audit ready
        </p>
      </div>
    </section>
  )
}
