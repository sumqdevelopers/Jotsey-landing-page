import { loginPanel, onboardingPanel } from "@/data/auth"
import { cx } from "@/lib/cx"
import HighlightIcon from "@/sections/hero/HighlightIcon"

/** Which story the brand panel tells: returning user, or how far through onboarding. */
export type AuthPanelVariant = "login" | "signup" | "verify" | "verified"

const ACTIVE_STEP: Record<Exclude<AuthPanelVariant, "login">, number> = {
  signup: 0,
  verify: 1,
  verified: 2,
}

const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.18em] text-accent-cyan"
const titleClass = "font-display mt-3 text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance xl:text-5xl"
const descriptionClass = "mt-4 max-w-md text-[15px] leading-7 text-white/75"

export default function AuthPanel({ variant }: { variant: AuthPanelVariant }) {
  if (variant === "login") {
    return (
      <div>
        <p className={eyebrowClass}>{loginPanel.eyebrow}</p>
        <p className={titleClass}>{loginPanel.title}</p>
        <p className={descriptionClass}>{loginPanel.description}</p>
        <ul className="mt-8 flex max-w-md flex-col gap-2.5">
          {loginPanel.cards.map((card) => (
            <li
              className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-xl"
              key={card.title}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-cyan/15 text-accent-cyan ring-1 ring-accent-cyan/30">
                <HighlightIcon name={card.icon} />
              </span>
              <span>
                <span className="block text-sm font-semibold">{card.title}</span>
                <span className="block text-xs text-white/65">{card.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const active = ACTIVE_STEP[variant]

  return (
    <div>
      <p className={eyebrowClass}>{onboardingPanel.eyebrow}</p>
      <p className={titleClass}>{onboardingPanel.title}</p>
      <p className={descriptionClass}>{onboardingPanel.description}</p>
      <ol className="relative mt-8 flex max-w-md flex-col gap-2.5">
        {/* the thread linking the step badges */}
        <span className="absolute bottom-7 left-[30px] top-7 w-px bg-linear-to-b from-accent-cyan/60 to-white/10" />
        {onboardingPanel.steps.map((step, index) => {
          const done = index < active
          const current = index === active
          return (
            <li
              className={cx(
                "relative flex items-center gap-3 rounded-xl border px-3 py-3 backdrop-blur-xl transition-colors duration-500",
                current
                  ? "border-accent-cyan/45 bg-white/15 shadow-[0_0_30px_-12px_var(--color-accent-cyan)]"
                  : "border-white/10 bg-white/[0.06]",
              )}
              key={step.title}
            >
              <span
                className={cx(
                  "grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold tabular-nums ring-1 transition-colors duration-500",
                  done && "bg-accent-teal text-brand-navy ring-accent-teal",
                  current && "bg-brand-navy text-accent-cyan ring-accent-cyan shadow-[0_0_16px_var(--color-accent-cyan)]",
                  !done && !current && "bg-brand-navy/60 text-white/50 ring-white/20",
                )}
              >
                {done ? (
                  <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                ) : (
                  `0${index + 1}`
                )}
              </span>
              <span className={cx(!done && !current && "opacity-60")}>
                <span className="block text-sm font-semibold">{step.title}</span>
                <span className="block text-xs text-white/65">{step.detail}</span>
              </span>
              {current && (
                <span className="ml-auto shrink-0 rounded-full bg-accent-cyan/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-cyan">
                  Now
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
