import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { useTheme } from "@/hooks/useTheme"
import { LenisContext } from "@/lib/lenisContext"
import { ThemeContext } from "@/lib/themeContext"
import CtaBanner from "@/sections/cta/CtaBanner"
import Faq from "@/sections/faq/Faq"
import Features from "@/sections/features/Features"
import Hero from "@/sections/hero/Hero"
import HowItWorks from "@/sections/how-it-works/HowItWorks"
import Pricing from "@/sections/pricing/Pricing"
import Reviews from "@/sections/reviews/Reviews"
import RoiCalculator from "@/sections/roi-calculator/RoiCalculator"

export default function App() {
  const lenis = useSmoothScroll()
  const themeValue = useTheme()

  return (
    <ThemeContext value={themeValue}>
      <LenisContext value={lenis}>
        <div className="min-h-screen bg-brand-light">
          <Header />
          <main>
            <Hero />
            <HowItWorks />
            <Reviews />
            <Features />
            <RoiCalculator />
            <Pricing />
            <Faq />
            <CtaBanner />
          </main>
          <Footer />
        </div>
      </LenisContext>
    </ThemeContext>
  )
}
