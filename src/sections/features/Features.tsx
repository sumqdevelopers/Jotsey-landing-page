import AudioWave from "@/components/ui/AudioWave"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import { ehrLogos } from "@/data/integrations"
import FeatureCard from "@/sections/features/FeatureCard"

export default function Features() {
  return (
    <section className="bg-surface-card py-28" id="features" aria-labelledby="features-title">
      <Container>
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            align="start"
            eyebrow="Why Jotsey wins"
            title="Clinical intelligence that fits the way you work."
            titleClassName="leading-tight"
            titleId="features-title"
          />
          <p className="max-w-lg text-base leading-7 text-brand-slate/65 lg:justify-self-end">
            Purpose-built for healthcare teams that need accuracy, speed, and
            measurable value without replacing their existing systems.
          </p>
        </div>
        <div className="grid auto-rows-[240px] gap-4 lg:grid-cols-3">
          <FeatureCard className="relative overflow-hidden bg-brand-navy text-white lg:col-span-2">
            <span className="w-fit rounded-full border border-accent-cyan/30 px-3 py-1 text-xs font-medium text-accent-cyan">
              Live ambient stream
            </span>
            <AudioWave />
            <div>
              <h3 className="font-display text-3xl font-medium">
                240ms latency. No broken clinical flow.
              </h3>
              <p className="mt-2 text-sm text-white/55">
                Secure, resilient audio streaming designed for real encounters.
              </p>
            </div>
          </FeatureCard>

          <FeatureCard className="bg-accent-cyan/10 text-brand-navy">
            <p className="font-display text-5xl font-semibold tracking-[-0.05em]">
              99.2%
            </p>
            <div>
              <h3 className="font-display text-2xl font-medium">
                Clinician-validated accuracy
              </h3>
              <p className="mt-2 text-sm text-brand-slate/65">
                Structured notes with transparent source context.
              </p>
            </div>
          </FeatureCard>

          <FeatureCard className="bg-surface-subtle text-brand-navy">
            <ul className="grid grid-cols-3 gap-2" aria-label="Supported EHR systems">
              {ehrLogos.map((logo) => (
                <li
                  className="flex aspect-square items-center justify-center rounded-xl bg-surface-card p-3 shadow-sm"
                  key={logo}
                >
                  <img className="max-h-full max-w-full object-contain" src={logo} alt="" />
                </li>
              ))}
            </ul>
            <div>
              <h3 className="font-display text-2xl font-medium">EHR-native by design</h3>
              <p className="mt-2 text-sm text-brand-slate/65">
                Connect the tools your practice already uses.
              </p>
            </div>
          </FeatureCard>

          <FeatureCard className="bg-accent-lavender text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
              Protected at every layer
            </span>
            <div>
              <h3 className="font-display text-3xl font-medium">HIPAA compliant</h3>
              <p className="mt-2 text-sm text-white/80">
                Encryption, audit logs, role-based access, and BAAs.
              </p>
            </div>
          </FeatureCard>

          <FeatureCard className="bg-accent-teal/10 text-brand-navy">
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Provider capacity
            </span>
            <p className="font-display text-6xl font-semibold tracking-[-0.06em]">
              672<span className="ml-2 text-lg">hrs/year</span>
            </p>
            <p className="text-sm text-brand-navy/65">
              Potential time reclaimed per provider.
            </p>
          </FeatureCard>
        </div>
      </Container>
    </section>
  )
}
