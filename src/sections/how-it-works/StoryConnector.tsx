import { cx } from "@/lib/cx"

interface StoryConnectorProps {
  /** Which way the curve bows, alternated per step so the path winds down the page. */
  bend: "left" | "right"
  visible: boolean
}

/** Glowing dashed S-curve that links one step of the story to the next. */
export default function StoryConnector({ bend, visible }: StoryConnectorProps) {
  const x = bend === "left" ? 18 : 82
  const d = `M50 0 C50 30 ${x} 22 ${x} 50 C${x} 78 50 70 50 100`

  return (
    <svg
      className={cx(
        "mx-auto block h-28 w-full max-w-xs overflow-visible transition-opacity duration-700",
        visible ? "opacity-100" : "opacity-0",
      )}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {/* soft glow underneath */}
      <path
        className="stroke-accent-teal/40 blur-[3px] dark:stroke-accent-cyan/50"
        d={d}
        strokeWidth="6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* the dashed line itself, flowing downward */}
      <path
        className="dash-flow stroke-accent-teal dark:stroke-accent-cyan"
        d={d}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 10"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
