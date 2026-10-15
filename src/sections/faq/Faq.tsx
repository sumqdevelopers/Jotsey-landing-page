import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import { faqs } from "@/data/faqs"
import DiscoveryCallCard from "@/sections/faq/DiscoveryCallCard"
import FaqItem from "@/sections/faq/FaqItem"

export default function Faq() {
  return (
    <section className="bg-surface-subtle py-28" id="faq" aria-labelledby="faq-title">
      <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
        <DiscoveryCallCard />
        <div>
          <SectionHeading
            align="start"
            eyebrow="Frequently asked questions"
            title="Answers for clinical teams."
            titleId="faq-title"
          />
          <div className="mt-9 divide-y divide-border-subtle">
            {faqs.map((faq) => (
              <FaqItem faq={faq} key={faq.question} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
