'use client'

import { motion } from 'framer-motion'
import { Truck, Clock, DollarSign, Shield } from 'lucide-react'

const carriers = [
  { name: 'UPS', logo: '📦', savings: '15%' },
  { name: 'FedEx', logo: '🚚', savings: '12%' },
  { name: 'USPS', logo: '📮', savings: '20%' },
  { name: 'DHL', logo: '✈️', savings: '18%' }
]

const features = [
  {
    icon: Truck,
    title: 'Multi-Carrier Rates',
    description: 'Compare rates from UPS, FedEx, USPS, DHL and more in real-time'
  },
  {
    icon: Clock,
    title: 'Instant Quotes',
    description: 'Get shipping quotes in seconds, not minutes'
  },
  {
    icon: DollarSign,
    title: 'Best Price Guarantee',
    description: 'We automatically find the cheapest option for each shipment'
  },
  {
    icon: Shield,
    title: 'Discounted Rates',
    description: 'Access commercial pricing with up to 89% off retail rates'
  }
]

export function RateComparison() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compare rates from all major carriers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the best shipping rates automatically. Our platform compares prices 
            across all carriers to save you time and money on every shipment.
          </p>
        </motion.div>

        {/* Carrier logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {carriers.map((carrier, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{carrier.logo}</div>
              <h3 className="font-semibold mb-1">{carrier.name}</h3>
              <p className="text-sm text-green-600">Save up to {carrier.savings}</p>
            </div>
          ))}
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}