import { useThemeContext } from "@/hooks/useThemeContext"
import { cx } from "@/lib/cx"

interface ThemeToggleProps {
  /** True once the header has turned into a light bar; otherwise it sits over something dark. */
  lightBar: boolean
}

export default function ThemeToggle({ lightBar }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeContext()
  const isDark = theme === "dark"

  return (
    <button
      className={cx(
        "relative grid size-11 place-items-center overflow-hidden rounded-full border transition-colors duration-300",
        lightBar ? "border-ink/15 text-ink" : "border-white/30 text-white",
      )}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      {/* Sun and moon rotate through each other on switch. */}
      <svg
        className={cx(
          "absolute size-5 transition-all duration-500",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      <svg
        className={cx(
          "absolute size-5 transition-all duration-500",
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5a8.5 8.5 0 1 0 10.6 10.6Z" />
      </svg>
    </button>
  )
}
