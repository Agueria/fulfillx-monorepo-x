'use client'

import { motion } from 'framer-motion'
import { Button } from '@fulfillx/ui'
import { ArrowRight, Truck, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'

export function ShippingHero() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Buy shipping labels in{' '}
              <span className="text-primary">seconds</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Compare rates across all major carriers, automate your shipping workflow, 
              and save up to 89% on shipping costs with our intelligent rate engine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" asChild>
                <Link href="/signup" className="group">
                  Start Shipping Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo">
                  See Rate Comparison
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">89%</div>
                <div className="text-sm text-muted-foreground">Average Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">&lt;3s</div>
                <div className="text-sm text-muted-foreground">Label Creation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-sm text-muted-foreground">Delivery Success</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">U</span>
                    </div>
                    <div>
                      <div className="font-medium">UPS Ground</div>
                      <div className="text-sm text-muted-foreground">3-5 business days</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$8.45</div>
                    <div className="text-xs text-green-600">Save $3.20</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-primary">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold text-sm">F</span>
                    </div>
                    <div>
                      <div className="font-medium">FedEx Ground</div>
                      <div className="text-sm text-muted-foreground">2-4 business days</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">$7.89</div>
                    <div className="text-xs text-green-600">Best Rate</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold text-sm">U</span>
                    </div>
                    <div>
                      <div className="font-medium">USPS Priority</div>
                      <div className="text-sm text-muted-foreground">1-3 business days</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$9.12</div>
                    <div className="text-xs text-orange-600">Fastest</div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6">
                Buy Selected Label - $7.89
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}