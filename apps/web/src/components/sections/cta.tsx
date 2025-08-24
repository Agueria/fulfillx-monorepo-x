'use client'

import { motion } from 'framer-motion'
import { Button } from '@fulfillx/ui'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to transform your fulfillment?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have streamlined their operations 
            with FulfillX. Start free and scale as you grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/signup" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/demo" className="group">
                <Play className="mr-2 h-4 w-4" />
                Schedule Demo
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-2">Free Forever</div>
              <div className="text-sm text-muted-foreground">
                Up to 50 orders/month
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">No Setup Fees</div>
              <div className="text-sm text-muted-foreground">
                Get started in minutes
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">24/7 Support</div>
              <div className="text-sm text-muted-foreground">
                We're here to help you succeed
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}