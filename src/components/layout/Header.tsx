import Container from "@/components/ui/Container"
import { navLinks } from "@/data/navigation"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { asset } from "@/lib/asset"
import { cx } from "@/lib/cx"

/** 78px bar + 1px bottom border; keep in sync with `scroll-padding-top` in index.css. */
const HEADER_HEIGHT = 79
/** Past this point the bar is light enough that dark text reads better than white. */
const DARK_TEXT_THRESHOLD = 0.6

export default function Header() {
  const progress = useScrollProgress("hero", HEADER_HEIGHT)
  const onLight = progress >= DARK_TEXT_THRESHOLD

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
      style={{
        backgroundColor: `color-mix(in srgb, var(--color-brand-light) ${progress * 90}%, transparent)`,
        borderBottomColor: `color-mix(in srgb, var(--color-brand-navy) ${progress * 10}%, transparent)`,
        backdropFilter: `blur(${progress * 16}px) saturate(${1 + progress * 0.5})`,
        WebkitBackdropFilter: `blur(${progress * 16}px) saturate(${1 + progress * 0.5})`,
      }}
    >
      <Container className="flex h-[78px] items-center gap-8" wide>
        <a className="relative block h-11 w-[104px] shrink-0" href="#" aria-label="Jotsey home">
          {/* Both marks stay mounted so the swap crossfades with the bar's background. */}
          <img
            className={cx(
              "absolute inset-0 size-full transition-opacity duration-300",
              onLight ? "opacity-0" : "opacity-100",
            )}
            src={asset("/brand/jotsey-logo-dark.svg")}
            alt=""
          />
          <img
            className={cx(
              "absolute inset-0 size-full transition-opacity duration-300",
              onLight ? "opacity-100" : "opacity-0",
            )}
            src={asset("/brand/jotsey-logo-light.svg")}
            alt=""
          />
        </a>
        <nav
          className={cx(
            "hidden flex-1 items-center gap-8 pl-6 text-[14px] font-medium transition-colors duration-300 lg:flex",
            onLight ? "text-brand-navy/75" : "text-white/80",
          )}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <a
            className={cx(
              "hidden rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300 sm:block",
              onLight ? "border-brand-navy/15 text-brand-navy" : "border-white/30 text-white",
            )}
            href="#contact"
          >
            Book a demo
          </a>
          <a
            className={cx(
              "rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300",
              onLight ? "bg-brand-navy text-brand-light" : "bg-white text-brand-navy",
            )}
            href="#pricing"
          >
            Get started
          </a>
        </div>
      </Container>
    </header>
  )
}
