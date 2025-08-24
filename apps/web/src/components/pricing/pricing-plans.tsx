'use client'

import { motion } from 'framer-motion'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@fulfillx/ui'
import { Check, Star } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 50 orders/month',
      'All core features included',
      'Rate comparison across carriers',
      'Basic inventory management',
      'Email support',
      'Standard integrations'
    ],
    limitations: [
      'Limited to 2 sales channels',
      'Basic reporting only'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Priority',
    price: '$0.25',
    period: 'per order',
    description: 'For growing businesses',
    features: [
      'Unlimited orders',
      'All features included',
      'Advanced automation rules',
      'Multi-warehouse management',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
      'API access',
      'Bulk operations',
      'Advanced reporting'
    ],
    limitations: [],
    cta: 'Start Priority',
    popular: true
  }
]

export function PricingPlans() {
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
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, no contracts, 
            no surprises. Just honest pricing that grows with your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Limitations:</p>
                      <div className="space-y-2">
                        {plan.limitations.map((limitation) => (
                          <div key={limitation} className="flex items-start">
                            <span className="text-muted-foreground text-sm">• {limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/signup">
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Credits explanation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-accent/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Earn 5% back on every shipment</h3>
            <p className="text-muted-foreground mb-6">
              Our unique credits system rewards you for shipping more. Earn 5% back in shipping 
              credits on every label purchased, automatically applied to future shipments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-background rounded-lg p-4">
                <div className="font-semibold">Ship $1,000</div>
                <div className="text-accent">Earn $50 credits</div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="font-semibold">Ship $5,000</div>
                <div className="text-accent">Earn $250 credits</div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="font-semibold">Ship $10,000</div>
                <div className="text-accent">Earn $500 credits</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}