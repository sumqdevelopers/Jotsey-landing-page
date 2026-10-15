import Lenis from "lenis"
import { useEffect, useState } from "react"

/**
 * Momentum ("inertial") page scrolling via Lenis, plus eased in-page anchor
 * navigation. Anchored sections clear the sticky header via `scroll-padding-top`
 * in index.css, which both Lenis and native scrolling respect.
 * Skipped entirely for users who prefer reduced motion — they keep native scrolling.
 * Returns the Lenis instance (null until mounted, or when reduced motion is on).
 */
export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 })
    setLenis(lenis)

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      )
      if (!link) return

      const hash = link.getAttribute("href") ?? "#"
      if (hash === "#") {
        event.preventDefault()
        lenis.scrollTo(0)
        history.pushState(null, "", window.location.pathname + window.location.search)
        return
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target)
      history.pushState(null, "", hash)
    }

    document.addEventListener("click", onClick)

    // Honour a hash in the URL on first load (e.g. a shared link to #pricing).
    if (window.location.hash) {
      const target = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
      )
      if (target) lenis.scrollTo(target, { immediate: true })
    }

    return () => {
      document.removeEventListener("click", onClick)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return lenis
}
