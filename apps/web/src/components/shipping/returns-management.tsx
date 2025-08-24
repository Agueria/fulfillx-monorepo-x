'use client'

import { motion } from 'framer-motion'
import { RotateCcw, Package, CreditCard, Users } from 'lucide-react'
import { Button } from '@fulfillx/ui'

const features = [
  {
    icon: RotateCcw,
    title: 'Easy Return Labels',
    description: 'Generate return labels instantly and email them to customers'
  },
  {
    icon: Package,
    title: 'Return Tracking',
    description: 'Track return packages and update inventory automatically'
  },
  {
    icon: CreditCard,
    title: 'Refund Processing',
    description: 'Process refunds quickly once returns are received and inspected'
  },
  {
    icon: Users,
    title: 'Customer Portal',
    description: 'Self-service portal for customers to initiate and track returns'
  }
]

export function ReturnsManagement() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Streamline returns and exchanges
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Make returns hassle-free for both you and your customers. Our automated 
              returns management system handles everything from label generation to 
              inventory updates.
            </p>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button size="lg">
              Learn More About Returns
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold mb-2">Returns Made Simple</h3>
              <p className="text-muted-foreground mb-6">
                Reduce return processing time by 75% with automated workflows
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">2 min</div>
                  <div className="text-muted-foreground">Average processing time</div>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-muted-foreground">Customer satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}