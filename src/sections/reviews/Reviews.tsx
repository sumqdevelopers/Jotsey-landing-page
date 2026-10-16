import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import { reviews } from "@/data/reviews"
import { useCarousel } from "@/hooks/useCarousel"
import CarouselControls from "@/sections/reviews/CarouselControls"
import ReviewCard from "@/sections/reviews/ReviewCard"

export default function Reviews() {
  const carousel = useCarousel(reviews.length)

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
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Clinician reviews"
          {...carousel.interactionHandlers}
        >
          {/* 1 card per view on phones, 2 on tablets, 3 on desktop; swipe or scroll natively. */}
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={carousel.trackRef}
            aria-live={carousel.autoplaying ? "off" : "polite"}
          >
            {reviews.map((review, index) => (
              <div
                className="shrink-0 basis-full snap-start md:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
                key={review.name}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${reviews.length}`}
              >
                <ReviewCard
                  highlighted={carousel.perView === 1 && index === carousel.index}
                  review={review}
                />
              </div>
            ))}
          </div>
          {carousel.pages > 1 && (
            <CarouselControls
              canAutoplay={carousel.canAutoplay}
              index={carousel.index}
              label="review"
              onSelect={carousel.goTo}
              onTogglePlaying={carousel.togglePlaying}
              pages={carousel.pages}
              playing={carousel.playing}
            />
          )}
        </div>
      </Container>
    </section>
  )
}
