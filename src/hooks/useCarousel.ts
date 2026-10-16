import { useCallback, useEffect, useRef, useState } from "react"

interface CarouselOptions {
  /** Delay between automatic advances. */
  intervalMs?: number
}

/**
 * State for a scroll-snap carousel: which slide is first in view, how many fit,
 * prev/next/dot navigation, and auto-advance that pauses on hover, focus, touch,
 * a hidden tab, the visitor's pause button, or a reduced-motion preference.
 */
export function useCarousel(count: number, { intervalMs = 5000 }: CarouselOptions = {}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [perView, setPerView] = useState(1)
  const [playing, setPlaying] = useState(true)
  const [interacting, setInteracting] = useState(false)
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const pages = Math.max(1, count - perView + 1)

  /** Distance between the starts of two neighbouring slides. */
  const step = useCallback(() => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return 0
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    return first.offsetWidth + gap
  }, [])

  // Keep "slides per view" and the current slide in sync with layout and scrolling.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const sync = () => {
      const size = step()
      if (!size) return
      const fit = Math.max(1, Math.round((track.clientWidth + size - track.firstElementChild!.clientWidth) / size))
      setPerView(fit)
      setIndex(Math.min(Math.round(track.scrollLeft / size), Math.max(0, count - fit)))
    }
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(track)
    track.addEventListener("scroll", sync, { passive: true })
    return () => {
      observer.disconnect()
      track.removeEventListener("scroll", sync)
    }
  }, [count, step])

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = ((target % pages) + pages) % pages
      track.scrollTo({ left: clamped * step(), behavior: reduceMotion ? "auto" : "smooth" })
    },
    [pages, step, reduceMotion],
  )

  // Auto-advance; restarting on every slide change resets the timer after manual moves.
  const autoplay = playing && !interacting && !reduceMotion && pages > 1
  useEffect(() => {
    if (!autoplay) return
    const timer = window.setTimeout(() => {
      if (!document.hidden) goTo(index + 1)
    }, intervalMs)
    return () => window.clearTimeout(timer)
  }, [autoplay, index, goTo, intervalMs])

  const interactionHandlers = {
    onMouseEnter: () => setInteracting(true),
    onMouseLeave: () => setInteracting(false),
    onFocus: () => setInteracting(true),
    onBlur: () => setInteracting(false),
    onTouchStart: () => setInteracting(true),
    onTouchEnd: () => setInteracting(false),
  }

  return {
    trackRef,
    index,
    pages,
    perView,
    goTo,
    playing,
    togglePlaying: () => setPlaying((value) => !value),
    canAutoplay: !reduceMotion && pages > 1,
    autoplaying: autoplay,
    interactionHandlers,
  }
}
