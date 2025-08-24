'use client'

import { motion } from 'framer-motion'
import { Button } from '@fulfillx/ui'
import { ArrowRight, Check, CreditCard } from 'lucide-react'
import Link from 'next/link'

export function ProofBand() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start free, scale as you grow
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              No setup fees, no monthly minimums. Pay only for what you use 
              and earn credits on every shipment.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-3 text-accent" />
                <span>Free forever plan with 50 orders/month</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-3 text-accent" />
                <span>Earn 5% shipping credits on every label</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-3 text-accent" />
                <span>No contracts or hidden fees</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-3 text-accent" />
                <span>24/7 support and onboarding</span>
              </div>
            </div>

            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <CreditCard className="h-8 w-8 text-accent mr-3" />
              <h3 className="text-2xl font-bold">Credits System</h3>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                <span>Ship 100 packages</span>
                <span className="text-accent font-semibold">+$25.00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                <span>Ship 500 packages</span>
                <span className="text-accent font-semibold">+$125.00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                <span>Ship 1,000 packages</span>
                <span className="text-accent font-semibold">+$250.00</span>
              </div>
              <div className="pt-4">
                <p className="text-sm text-primary-foreground/80">
                  Credits automatically applied to future shipments. 
                  The more you ship, the more you save.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}