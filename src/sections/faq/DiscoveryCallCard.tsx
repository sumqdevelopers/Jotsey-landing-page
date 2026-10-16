export default function DiscoveryCallCard() {
  return (
    <aside
      className="flex min-h-[390px] flex-col justify-between self-start rounded-[24px] bg-linear-145 from-brand-navy to-accent-lavender p-8 text-white"
      aria-labelledby="discovery-call-title"
    >
      <span className="text-xs font-medium text-white/60">
        Need a clinical workflow review?
      </span>
      <h2
        className="font-display text-4xl font-semibold leading-tight"
        id="discovery-call-title"
      >
        Still not sure? Book a free discovery call.
      </h2>
      <div>
        <a
          className="block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-accent-lavender"
          href="#contact"
        >
          Book a call
        </a>
        <p className="mt-4 text-center text-xs text-white/65">
          <a href="mailto:hello@jotsey.com">hello@jotsey.com</a>
        </p>
      </div>
    </aside>
  )
}
