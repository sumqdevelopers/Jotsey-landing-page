import { useState } from "react"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import { reviews } from "@/data/reviews"
import ReviewCard from "@/sections/reviews/ReviewCard"

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-surface-card py-24" aria-labelledby="reviews-title">
      <Container>
        <SectionHeading
          className="mb-10 flex flex-col items-center"
          eyebrow="Independent reviews"
          size="md"
          title="Trusted by clinicians. Proven in practice."
          titleId="reviews-title"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review, index) => (
            <ReviewCard
              active={activeIndex === index}
              key={review.name}
              onSelect={() => setActiveIndex(index)}
              review={review}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
