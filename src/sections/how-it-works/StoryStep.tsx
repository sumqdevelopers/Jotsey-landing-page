import { useInView } from "@/hooks/useInView"
import { cx } from "@/lib/cx"
import StoryConnector from "@/sections/how-it-works/StoryConnector"
import type { WorkflowStep } from "@/types/content"

interface StoryStepProps {
  step: WorkflowStep
  index: number
  isLast: boolean
}

export default function StoryStep({ step, index, isLast }: StoryStepProps) {
  const { ref, inView } = useInView<HTMLLIElement>()

  return (
    <li className="flex flex-col items-center text-center" ref={ref}>
      <div
        className={cx(
          "flex flex-col items-center transition-all duration-700 ease-out",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        {/* glowing step badge */}
        <span className="relative grid size-16 place-items-center rounded-full bg-emphasis text-2xl font-bold tabular-nums text-accent-cyan shadow-[0_0_28px_-4px_var(--color-accent-cyan)] ring-4 ring-accent-cyan/20">
          <span
            className="absolute inset-0 animate-ping rounded-full ring-2 ring-accent-cyan/30 motion-reduce:hidden"
            aria-hidden="true"
          />
          0{index + 1}
        </span>
        <h3 className="font-display mt-5 text-3xl font-semibold text-ink">{step.title}</h3>
        <p className="mt-2 max-w-md text-base leading-7 text-brand-slate/70">{step.description}</p>
        <figure className="mt-7 w-full max-w-2xl overflow-hidden rounded-2xl bg-media-dark shadow-xl shadow-brand-navy/15 ring-1 ring-accent-cyan/15">
          <img className="block h-auto w-full" src={step.image} alt={step.imageAlt} loading="lazy" />
        </figure>
      </div>
      {!isLast && <StoryConnector bend={index % 2 === 0 ? "left" : "right"} visible={inView} />}
    </li>
  )
}
