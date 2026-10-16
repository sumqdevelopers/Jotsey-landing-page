import { useRef } from "react"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import { workflowSteps } from "@/data/workflow"
import { STEP_DURATION_S, STEP_EASING_CSS, useScrollSteps } from "@/hooks/useScrollSteps"
import StepButton from "@/sections/how-it-works/StepButton"
import StoryStep from "@/sections/how-it-works/StoryStep"
import WorkspacePreview from "@/sections/how-it-works/WorkspacePreview"

export default function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const { activeIndex, goTo } = useScrollSteps({
    stepCount: workflowSteps.length,
    trackRef,
    stickyRef,
  })

  return (
    <section className="bg-surface-subtle py-28 pin:pb-12" id="how" aria-labelledby="how-title">
      <Container>
        {/* When pinning, the track is one screen (the pinned block) plus 80vh of scroll for the steps. */}
        <div className="pin:h-[calc(100svh-79px+80vh)]" ref={trackRef}>
          <div
            className="pin:sticky pin:top-[79px] pin:flex pin:h-[calc(100svh-79px)] pin:flex-col pin:justify-center pin:py-8"
            ref={stickyRef}
          >
            <SectionHeading
              className="mx-auto mb-14 pin:mb-8"
              description="Keep your EHR. Connect your workflow. Reclaim your attention."
              eyebrow="Built for clinicians"
              title="From conversation to signed note in seconds."
              titleId="how-title"
            />
            {/* Smaller screens: a scroll-through story, one step after another. */}
            <ol className="pin:hidden">
              {workflowSteps.map((step, index) => (
                <StoryStep
                  index={index}
                  isLast={index === workflowSteps.length - 1}
                  key={step.title}
                  step={step}
                />
              ))}
            </ol>
            {/* Large screens: the pinned panel that steps through as you scroll. */}
            <div className="hidden overflow-hidden rounded-xl border border-border-subtle bg-surface-raised shadow-xl pin:grid pin:max-h-[600px] pin:min-h-0 pin:flex-1 pin:grid-cols-[32%_68%] pin:grid-rows-[minmax(0,1fr)]">
              <div className="relative flex flex-col">
                {/* One highlight that glides to the active tab, timed with the step scroll. */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 bg-emphasis transition-transform"
                  style={{
                    height: `${100 / workflowSteps.length}%`,
                    transform: `translateY(${activeIndex * 100}%)`,
                    transitionDuration: `${STEP_DURATION_S}s`,
                    transitionTimingFunction: STEP_EASING_CSS,
                  }}
                  aria-hidden="true"
                />
                {workflowSteps.map((step, index) => (
                  <StepButton
                    active={activeIndex === index}
                    index={index}
                    key={step.title}
                    onSelect={() => goTo(index)}
                    step={step}
                  />
                ))}
              </div>
              <WorkspacePreview activeIndex={activeIndex} steps={workflowSteps} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
