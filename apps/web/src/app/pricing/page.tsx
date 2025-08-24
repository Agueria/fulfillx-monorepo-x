import { Metadata } from 'next'
import { PricingHero } from '@/components/pricing/pricing-hero'
import { PricingPlans } from '@/components/pricing/pricing-plans'
import { PricingFAQ } from '@/components/pricing/pricing-faq'
import { CTA } from '@/components/sections/cta'

export const metadata: Metadata = {
  title: 'Pricing - Free Forever Plan Available | FulfillX',
  description: 'Start free with 50 orders per month. No setup fees, no contracts. Pay only for what you use and earn credits on every shipment.',
}

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PricingFAQ />
      <CTA />
    </>
  )
}