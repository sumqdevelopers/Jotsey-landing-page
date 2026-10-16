import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import { appointmentLengths, roiRangeFields } from "@/data/roi"
import { useRoiCalculator } from "@/hooks/useRoiCalculator"
import DurationPicker from "@/sections/roi-calculator/DurationPicker"
import RangeField from "@/sections/roi-calculator/RangeField"
import RoiResults from "@/sections/roi-calculator/RoiResults"

export default function RoiCalculator() {
  const { inputs, setInput, metrics } = useRoiCalculator()

  return (
    <section className="bg-surface-subtle py-28" id="savings" aria-labelledby="savings-title">
      <Container>
        <SectionHeading
          className="mx-auto mb-12 max-w-3xl"
          eyebrow="Your savings"
          title="See what post-clinic time is costing you."
          titleId="savings-title"
        />
        <div className="grid gap-6 rounded-[28px] border border-ink/10 bg-brand-light p-7 shadow-2xl shadow-brand-navy/10 lg:grid-cols-2 lg:p-10">
          <form className="flex flex-col gap-9" onSubmit={(event) => event.preventDefault()}>
            <div>
              <span className="rounded-full bg-accent-teal/10 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink">
                Your practice
              </span>
              <h3 className="font-display mt-4 text-3xl font-semibold text-ink">
                Tell us about your week
              </h3>
            </div>
            {roiRangeFields.map((field) => (
              <RangeField
                key={field.key}
                label={field.label}
                max={field.max}
                min={field.min}
                onChange={(value) => setInput(field.key, value)}
                value={inputs[field.key]}
              />
            ))}
            <DurationPicker
              onChange={(minutes) => setInput("appointmentMinutes", minutes)}
              options={appointmentLengths}
              value={inputs.appointmentMinutes}
            />
          </form>
          <RoiResults metrics={metrics} />
        </div>
      </Container>
    </section>
  )
}
