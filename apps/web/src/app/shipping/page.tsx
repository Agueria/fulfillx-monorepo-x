import { Metadata } from 'next'
import { ShippingHero } from '@/components/shipping/shipping-hero'
import { RateComparison } from '@/components/shipping/rate-comparison'
import { AutomationFeatures } from '@/components/shipping/automation-features'
import { ReturnsManagement } from '@/components/shipping/returns-management'
import { CTA } from '@/components/sections/cta'

export const metadata: Metadata = {
  title: 'Shipping Software - Compare Rates & Buy Labels Instantly | FulfillX',
  description: 'Compare shipping rates across all major carriers and buy labels in seconds. Automated routing, returns management, and customer notifications included.',
}

export default function ShippingPage() {
  return (
    <>
      <ShippingHero />
      <RateComparison />
      <AutomationFeatures />
      <ReturnsManagement />
      <CTA />
    </>
  )
}