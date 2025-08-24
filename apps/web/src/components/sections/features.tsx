'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@fulfillx/ui'
import { 
  Truck, 
  Package, 
  BarChart3, 
  Zap, 
  Globe, 
  Shield,
  Clock,
  TrendingUp,
  Users
} from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Smart Shipping',
    description: 'Compare rates across all major carriers and buy labels instantly. Automated routing saves time and money on every shipment.',
    benefits: ['Rate comparison', 'Bulk label printing', 'Automated routing', 'Return management']
  },
  {
    icon: Package,
    title: 'Inventory Sync',
    description: 'Real-time inventory synchronization across all your sales channels. Never oversell again with automated stock management.',
    benefits: ['Multi-channel sync', 'Low stock alerts', 'Bundle management', 'Warehouse transfers']
  },
  {
    icon: BarChart3,
    title: 'Profit Analytics',
    description: 'Track profitability by SKU, channel, and time period. Make data-driven decisions with comprehensive reporting.',
    benefits: ['Profit tracking', 'Cost analysis', 'Demand forecasting', 'Custom reports']
  },
  {
    icon: Zap,
    title: 'Automation Rules',
    description: 'Set up intelligent rules to automate your fulfillment process. From carrier selection to warehouse routing.',
    benefits: ['Smart routing', 'Condition-based actions', 'Bulk operations', 'Exception handling']
  },
  {
    icon: Globe,
    title: 'Global Integrations',
    description: 'Connect with 100+ marketplaces, carriers, and tools. Seamless data flow across your entire tech stack.',
    benefits: ['Marketplace sync', 'Carrier APIs', 'Webhook support', 'Custom integrations']
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with role-based access control. Your data is protected with industry-leading standards.',
    benefits: ['SOC 2 compliance', 'Role-based access', 'Audit logging', 'Data encryption']
  }
]

export function Features() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to scale your fulfillment
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From order management to shipping optimization, we've built the complete 
            platform to handle your growing e-commerce operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-lift">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime SLA</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50M+</div>
            <div className="text-sm text-muted-foreground">Orders Processed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Integrations</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}