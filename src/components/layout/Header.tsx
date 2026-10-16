import Container from "@/components/ui/Container"
import { navLinks } from "@/data/navigation"
import ThemeToggle from "@/components/layout/ThemeToggle"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { useThemeContext } from "@/hooks/useThemeContext"
import { asset } from "@/lib/asset"
import { cx } from "@/lib/cx"

/** 78px bar + 1px bottom border; keep in sync with `scroll-padding-top` in index.css. */
const HEADER_HEIGHT = 79

export default function Header() {
  const progress = useScrollProgress("hero", HEADER_HEIGHT)
  const { theme } = useThemeContext()
  // The hero follows the theme too, so the bar is light or dark with the theme at every scroll position.
  const darkLogo = theme === "dark"

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
      style={{
        backgroundColor: `color-mix(in srgb, var(--color-brand-light) ${progress * 90}%, transparent)`,
        borderBottomColor: `color-mix(in srgb, var(--color-ink) ${progress * 10}%, transparent)`,
        backdropFilter: `blur(${progress * 16}px) saturate(${1 + progress * 0.5})`,
        WebkitBackdropFilter: `blur(${progress * 16}px) saturate(${1 + progress * 0.5})`,
      }}
    >
      <Container className="flex h-[78px] items-center gap-8" wide>
        <a className="relative block h-11 w-[104px] shrink-0" href="#" aria-label="Jotsey home">
          {/* Both marks stay mounted so the swap crossfades with the theme. */}
          <img
            className={cx(
              "absolute inset-0 size-full transition-opacity duration-300",
              darkLogo ? "opacity-100" : "opacity-0",
            )}
            src={asset("/brand/jotsey-logo-dark.svg")}
            alt=""
          />
          <img
            className={cx(
              "absolute inset-0 size-full transition-opacity duration-300",
              darkLogo ? "opacity-0" : "opacity-100",
            )}
            src={asset("/brand/jotsey-logo-light.svg")}
            alt=""
          />
        </a>
        <nav
          className="hidden flex-1 items-center gap-8 pl-6 text-[14px] font-medium text-ink/75 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <ThemeToggle />
          <a
            className="hidden rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink sm:block"
            href="#contact"
          >
            Book a demo
          </a>
          <a
            className="rounded-full bg-emphasis px-5 py-3 text-sm font-semibold text-white"
            href="#pricing"
          >
            Get started
          </a>
        </div>
      </Container>
    </header>
  )
}
