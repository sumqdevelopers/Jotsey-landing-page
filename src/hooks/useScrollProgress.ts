import { useEffect, useState } from "react"

/**
 * Returns 0 → 1 as the page scrolls past the element with `targetId`.
 * Reaches 1 once the element's bottom edge passes `offset` px from the top
 * of the viewport (e.g. the height of a fixed header).
 */
export function useScrollProgress(targetId: string, offset = 0) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const target = document.getElementById(targetId)
      const distance = Math.max(1, (target?.offsetHeight ?? window.innerHeight) - offset)
      const next = Math.min(1, Math.max(0, window.scrollY / distance))
      // Rounded so React skips re-renders for sub-pixel scroll changes.
      setProgress(Math.round(next * 100) / 100)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [targetId, offset])

  return progress
}
