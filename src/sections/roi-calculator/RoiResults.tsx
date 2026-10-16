import type { RoiMetrics } from "@/types/roi"

interface RoiResultsProps {
  metrics: RoiMetrics
}

export default function RoiResults({ metrics }: RoiResultsProps) {
  const stats = [
    {
      value: metrics.extraAppointments.toString(),
      unit: "extra appts / wk",
      copy: "If you’d rather see more patients",
    },
    {
      value: `$${metrics.monthlyRevenue.toLocaleString()}`,
      unit: "/ month",
      copy: "Revenue uplift if those slots fill",
    },
    {
      value: metrics.hoursPerProvider.toFixed(1),
      unit: "hrs / provider",
      copy: "Free time. Focus. Evenings back.",
    },
  ]

  return (
    <div
      className="flex flex-col rounded-3xl border border-accent-teal/35 bg-surface-subtle p-7 dark:bg-white/[0.03]">
      <span className="w-fit rounded-full bg-accent-teal/10 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink">
        What you get back
      </span>
      <div className="mt-5 flex items-end gap-3 text-ink" aria-live="polite">
        <strong className="font-display text-7xl font-semibold leading-none">
          {metrics.weeklyHours.toFixed(1)}
        </strong>
        <span className="pb-2">hrs / week</span>
      </div>
      <p className="mt-4 text-sm text-ink/65">
        reclaimed across your practice · about{" "}
        <b>{Math.round(metrics.annualHours).toLocaleString()} hrs / year</b>
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            className="rounded-xl border border-ink/10 bg-brand-light p-4 dark:bg-white/[0.04]"
            key={stat.unit}
          >
            <strong className="font-display text-2xl font-semibold text-ink">
              {stat.value}
            </strong>
            <span className="mt-1 block text-xs text-ink">{stat.unit}</span>
            <p className="mt-5 text-[11px] leading-4 text-ink/55">{stat.copy}</p>
          </div>
        ))}
      </div>
      <a
        className="mt-6 rounded-full bg-emphasis px-6 py-4 text-center text-sm font-semibold text-white"
        href="#contact"
      >
        Book a demo on these numbers
      </a>
      <p className="mt-4 text-[10px] text-ink/50">
        Estimates only. Actual results depend on provider workflow and encounter
        mix.
      </p>
    </div>
  )
}
