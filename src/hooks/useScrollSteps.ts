import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import { useLenis } from "@/hooks/useLenis"

/** Keep in sync with the `pin` custom variant in index.css. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 760px)"
/** Inertia from a trackpad flick keeps firing wheel events; wait for quiet before the next step. */
const GESTURE_IDLE_MS = 120
export const STEP_DURATION_S = 0.3
/** easeOutCubic — the same curve as `STEP_EASING_CSS`, so scroll and tab highlight move together. */
const stepEasing = (t: number) => 1 - (1 - t) ** 3
export const STEP_EASING_CSS = "cubic-bezier(0.33, 1, 0.68, 1)"

interface ScrollStepsOptions {
  stepCount: number
  /** Tall element the sticky block is pinned inside; its extra height is the scroll distance. */
  trackRef: RefObject<HTMLElement | null>
  /** The `position: sticky` element pinned inside the track. */
  stickyRef: RefObject<HTMLElement | null>
}

/**
 * Pins a block while the page scrolls through `trackRef`, mapping scroll
 * position to the active step. With Lenis on, each wheel gesture inside the
 * track moves exactly one step; past the last (or before the first) step,
 * scrolling is released back to normal.
 * On smaller viewports (see PIN_QUERY) nothing is pinned and steps are click-only.
 */
export function useScrollSteps({ stepCount, trackRef, stickyRef }: ScrollStepsOptions) {
  const lenis = useLenis()
  const [pinned, setPinned] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const lastStep = stepCount - 1

  useEffect(() => {
    const query = window.matchMedia(PIN_QUERY)
    const update = () => setPinned(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  /** Scroll offset where the block pins (step 0) and the distance until it unpins (last step). */
  const measure = useCallback(() => {
    const track = trackRef.current
    const sticky = stickyRef.current
    if (!track || !sticky) return null
    const stickyTop = Number.parseFloat(getComputedStyle(sticky).top) || 0
    const start = window.scrollY + track.getBoundingClientRect().top - stickyTop
    const range = Math.max(1, track.offsetHeight - sticky.offsetHeight)
    return { start, range }
  }, [trackRef, stickyRef])

  const stepOffset = useCallback(
    (index: number) => {
      const metrics = measure()
      if (!metrics) return null
      return metrics.start + (metrics.range * index) / lastStep
    },
    [measure, lastStep],
  )

  // Scroll position → active step.
  useEffect(() => {
    if (!pinned) return
    let frame = 0
    const update = () => {
      frame = 0
      const metrics = measure()
      if (!metrics) return
      const progress = Math.min(1, Math.max(0, (window.scrollY - metrics.start) / metrics.range))
      setActiveIndex(Math.round(progress * lastStep))
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
  }, [pinned, measure, lastStep])

  // One wheel gesture → one step.
  const busy = useRef(false)
  useEffect(() => {
    if (!pinned || !lenis) return
    let idleTimer = 0
    let lastWheelAt = 0
    let animating = false

    const releaseIfSettled = () => {
      if (!animating && performance.now() - lastWheelAt >= GESTURE_IDLE_MS) {
        busy.current = false
      }
    }

    const off = lenis.on("virtual-scroll", ({ deltaY, event }) => {
      if (event.type.startsWith("touch") || deltaY === 0) return
      lastWheelAt = performance.now()
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(releaseIfSettled, GESTURE_IDLE_MS)

      if (busy.current) {
        // Swallow the rest of this gesture (incl. trackpad inertia) so it can't skip a step.
        if (event.cancelable) event.preventDefault()
        ;(event as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true
        return
      }

      const metrics = measure()
      if (!metrics) return
      const position = ((lenis.animatedScroll - metrics.start) / metrics.range) * lastStep
      const heading = ((lenis.targetScroll + deltaY - metrics.start) / metrics.range) * lastStep
      const epsilon = 0.02
      let target: number | null = null

      if (deltaY > 0) {
        if (position < -epsilon) {
          // Entering from above: catch the panel on step 1 instead of flying past.
          if (heading >= 0) target = 0
        } else if (position < lastStep - epsilon) {
          target = Math.floor(position + epsilon) + 1
        }
      } else if (position > lastStep + epsilon) {
        // Entering from below: catch the panel on the last step.
        if (heading <= lastStep) target = lastStep
      } else if (position > epsilon) {
        target = Math.ceil(position - epsilon) - 1
      }

      if (target === null) return
      busy.current = true
      animating = true
      lenis.scrollTo(metrics.start + (metrics.range * target) / lastStep, {
        duration: STEP_DURATION_S,
        easing: stepEasing,
        lock: true,
        force: true,
        onComplete: () => {
          animating = false
          releaseIfSettled()
        },
      })
    })

    return () => {
      off()
      window.clearTimeout(idleTimer)
      busy.current = false
    }
  }, [pinned, lenis, measure, lastStep])

  const goTo = useCallback(
    (index: number) => {
      const offset = pinned ? stepOffset(index) : null
      if (offset === null) {
        setActiveIndex(index)
        return
      }
      if (lenis) lenis.scrollTo(offset, { duration: STEP_DURATION_S, easing: stepEasing })
      else window.scrollTo({ top: offset, behavior: "smooth" })
    },
    [pinned, stepOffset, lenis],
  )

  return { activeIndex, goTo, pinned }
}
