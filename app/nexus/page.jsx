import AmbientBackground from './components/ui/AmbientBackground'
import PageLoader from './components/ui/PageLoader'
import NavBar from './components/nav/NavBar'
import HeroSection from './components/hero/HeroSection'
import TickerSection from './components/ticker/TickerSection'
import EcosystemSection from './components/ecosystem/EcosystemSection'
import SignalFeedSection from './components/signals/SignalFeedSection'
import ResearchSection from './components/research/ResearchSection'
import FeaturesBentoSection from './components/features/FeaturesBentoSection'
import TimelineSection from './components/timeline/TimelineSection'
import TestimonialsSection from './components/testimonials/TestimonialsSection'
import CtaSection from './components/cta/CtaSection'
import FooterSection from './components/footer/FooterSection'

import { CHAINS_DATA } from './lib/data/chains'
import { SIGNALS_DATA } from './lib/data/signals'
import { TIMELINE_DATA } from './lib/data/timeline'
import { TESTIMONIALS_DATA } from './lib/data/testimonials'
import { TICKER_DATA } from './lib/data/ticker'
import { FEATURES_DATA } from './lib/data/features'

export default function NexusPage() {
  return (
    <>
      <PageLoader />
      <AmbientBackground />
      <NavBar />
      <HeroSection />
      <TickerSection data={TICKER_DATA} />
      <EcosystemSection chains={CHAINS_DATA} />
      <SignalFeedSection signals={SIGNALS_DATA} />
      <ResearchSection />
      <FeaturesBentoSection features={FEATURES_DATA} />
      <TimelineSection eras={TIMELINE_DATA} />
      <TestimonialsSection testimonials={TESTIMONIALS_DATA} />
      <CtaSection />
      <FooterSection />
    </>
  )
}
