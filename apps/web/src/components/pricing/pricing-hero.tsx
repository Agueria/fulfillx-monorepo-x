'use client'

import { Button } from '@fulfillx/ui'
import { ArrowRight, Check, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container-custom relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Free Forever Plan Available
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Simple, transparent{' '}
              <span className="text-primary">pricing</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Start free with 50 orders per month. No setup fees, no contracts. 
              Pay only for what you use and earn credits on every shipment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/signup" className="group">
                  Start Free Forever
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo" className="group">
                  See Pricing Calculator
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Key benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-muted-foreground">No setup fees</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-muted-foreground">No monthly minimums</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-muted-foreground">Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}