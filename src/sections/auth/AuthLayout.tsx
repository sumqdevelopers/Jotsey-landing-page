import type { ReactNode } from "react"
import ThemeToggle from "@/components/layout/ThemeToggle"
import { heroImage } from "@/data/hero"
import { useThemeContext } from "@/hooks/useThemeContext"
import { asset } from "@/lib/asset"
import AuthPanel, { type AuthPanelVariant } from "@/sections/auth/AuthPanel"

interface AuthLayoutProps {
  title: string
  subtitle: ReactNode
  children: ReactNode
  /** Story told by the brand panel on large screens. */
  panel: AuthPanelVariant
}

/**
 * Split screen: brand panel (hero photo, navy scrim, onboarding story) on large screens,
 * the form card on the right. Phones get the form only.
 */
export default function AuthLayout({ title, subtitle, children, panel }: AuthLayoutProps) {
  const { theme } = useThemeContext()

  return (
    <div className="grid min-h-svh bg-brand-light lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <aside className="relative isolate hidden overflow-hidden bg-brand-navy p-10 text-white lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-between" aria-hidden="true">
        <img className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%]" src={heroImage} alt="" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-brand-navy via-brand-navy/70 to-brand-navy/30" />
        <a href="#" tabIndex={-1}>
          <img className="h-11 w-auto" src={asset("/brand/jotsey-logo-dark.svg")} alt="" />
        </a>
        <AuthPanel variant={panel} />
      </aside>

      <main className="flex flex-col px-6 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <a className="lg:invisible" href="#" aria-label="Jotsey home">
            <img
              className="h-10 w-auto"
              src={asset(theme === "dark" ? "/brand/jotsey-logo-dark.svg" : "/brand/jotsey-logo-light.svg")}
              alt=""
            />
          </a>
          <div className="flex items-center gap-3">
            <a className="text-sm font-medium text-brand-slate/75 hover:text-ink" href="#">
              ← Back to site
            </a>
            <ThemeToggle lightBar={theme === "light"} />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[440px] rounded-3xl border border-border-subtle bg-surface-raised p-7 shadow-2xl shadow-brand-navy/10 sm:p-9">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink">{title}</h1>
            <div className="mt-2 text-[15px] leading-6 text-brand-slate/70">{subtitle}</div>
            <div className="mt-7">{children}</div>
          </div>
        </div>

        <p className="text-center text-xs text-brand-slate/55">
          Protected by encryption, audit logging and HIPAA-aligned handling of your data.
        </p>
      </main>
    </div>
  )
}
