'use client'

import { motion } from 'framer-motion'
import { Zap, MapPin, Bell, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Smart Routing',
    description: 'Automatically select the best carrier and service based on your rules',
    benefits: ['Fastest delivery', 'Lowest cost', 'Best reliability']
  },
  {
    icon: MapPin,
    title: 'Address Validation',
    description: 'Verify and correct addresses before shipping to reduce failed deliveries',
    benefits: ['Reduce returns', 'Improve delivery rates', 'Save on re-shipping costs']
  },
  {
    icon: Bell,
    title: 'Customer Notifications',
    description: 'Keep customers informed with automated tracking updates',
    benefits: ['Branded emails', 'SMS notifications', 'Delivery confirmations']
  },
  {
    icon: BarChart3,
    title: 'Shipping Analytics',
    description: 'Track performance and identify opportunities to optimize costs',
    benefits: ['Cost analysis', 'Delivery performance', 'Carrier comparison']
  }
]

export function AutomationFeatures() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Automate your shipping workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Set up rules once and let our platform handle the rest. From carrier selection 
            to customer notifications, we automate the entire shipping process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}