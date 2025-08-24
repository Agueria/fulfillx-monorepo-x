import { Hero } from '@/components/sections/hero'
import { TrustStrip } from '@/components/sections/trust-strip'
import { Features } from '@/components/sections/features'
import { IntegrationsMarquee } from '@/components/sections/integrations-marquee'
import { ProofBand } from '@/components/sections/proof-band'
import { Testimonials } from '@/components/sections/testimonials'
import { CTA } from '@/components/sections/cta'
import { FAQ } from '@/components/sections/faq'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Features />
      <IntegrationsMarquee />
      <ProofBand />
      <Testimonials />
      <CTA />
      <FAQ />
    </>
  )
}