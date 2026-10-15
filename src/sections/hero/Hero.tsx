import ArrowIcon from "@/components/ui/ArrowIcon"
import Container from "@/components/ui/Container"
import { heroImage } from "@/data/hero"
import TrustCard from "@/sections/hero/TrustCard"

export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-brand-navy text-white"
      id="hero"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          className="h-full w-full object-cover object-[center_30%]"
          src={heroImage}
          alt=""
          fetchPriority="high"
        />
        {/* scrims: navbar legibility at the top, text and card legibility at the bottom */}
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-brand-navy/55 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-brand-navy/90 via-brand-navy/45 via-40% to-transparent to-75%" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-navy/55 via-brand-navy/5 via-50% to-transparent" />
        {/* on narrow screens the text sits over the faces, so darken the whole photo */}
        <div className="absolute inset-0 bg-brand-navy/45 lg:hidden" />
      </div>

      <Container
        className="grid w-full items-end gap-10 pb-14 pt-32 lg:grid-cols-[minmax(0,1fr)_auto] lg:pb-16"
        wide
      >
        <div className="flex flex-col items-start lg:pb-1">
          <h1
            className="font-display text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance text-white"
            id="hero-title"
          >
            The smartest way to
            <span className="mt-2 block">document patient care.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-base leading-7 text-white/70 md:text-lg md:leading-8">
            Jotsey transcribes patient conversations with 240ms latency and
            instantly drafts validated SOAP notes directly in your EHR.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="rounded-lg bg-accent-teal px-6 py-3.5 text-[15px] font-semibold text-brand-navy"
              href="#pricing"
            >
              Start free trial <ArrowIcon />
            </a>
            <a
              className="rounded-lg border border-white/30 px-6 py-3.5 text-[15px] font-semibold"
              href="#how"
            >
              See how it works
            </a>
          </div>
          <p className="mt-5 text-[13px] text-white/50">
            No credit card required · HIPAA compliant · Cancel anytime
          </p>
        </div>
        <TrustCard />
      </Container>
    </section>
  )
}
