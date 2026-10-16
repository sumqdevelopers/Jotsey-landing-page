import { heroHighlights, trustScore } from "@/data/hero"
import HighlightIcon from "@/sections/hero/HighlightIcon"

export default function TrustCard() {
  return (
    <aside
      className="relative w-full max-w-[330px] overflow-hidden rounded-3xl border border-white/35 bg-white/20 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl dark:border-white/15 dark:bg-white/[0.07] dark:shadow-black/40 max-lg:justify-self-center lg:justify-self-end"
      aria-label="Why clinicians choose Jotsey"
    >
      {/* light catching the top edge + ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-accent-cyan/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-white">
            {trustScore.percent}
            <span className="text-accent-cyan">%</span>
          </p>
          <p className="mt-1.5 text-[13px] text-white/80 dark:text-white/70">{trustScore.label}</p>
        </div>
        <div className="flex -space-x-2.5 pb-1" aria-hidden="true">
          {trustScore.avatars.map((avatar) => (
            <img
              className="size-8 rounded-full border-2 border-white/40 object-cover dark:border-white/25"
              key={avatar}
              src={avatar}
              alt=""
            />
          ))}
        </div>
      </div>

      <div
        className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/15 dark:bg-white/10"
        role="meter"
        aria-label={trustScore.label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={trustScore.percent}
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-accent-teal to-accent-cyan shadow-[0_0_14px_var(--color-accent-cyan)]"
          style={{ width: `${trustScore.percent}%` }}
        />
      </div>

      <ul className="relative mt-5 flex flex-col gap-2">
        {heroHighlights.map((highlight) => (
          <li
            className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 dark:border-white/10 dark:bg-white/5"
            key={highlight.title}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-cyan/15 text-accent-cyan ring-1 ring-accent-cyan/30">
              <HighlightIcon name={highlight.icon} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-white">{highlight.title}</span>
              <span className="block text-[11px] text-white/70 dark:text-white/60">{highlight.detail}</span>
            </span>
            <span
              className="size-2 shrink-0 rounded-full bg-accent-cyan shadow-[0_0_10px_var(--color-accent-cyan)]"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </aside>
  )
}
