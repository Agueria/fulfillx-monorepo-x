'use client'

import { motion } from 'framer-motion'

const integrations = [
  { name: 'Amazon', category: 'Marketplace' },
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'UPS', category: 'Shipping' },
  { name: 'eBay', category: 'Marketplace' },
  { name: 'FedEx', category: 'Shipping' },
  { name: 'Walmart', category: 'Marketplace' },
  { name: 'USPS', category: 'Shipping' },
  { name: 'Etsy', category: 'Marketplace' },
  { name: 'DHL', category: 'Shipping' },
  { name: 'WooCommerce', category: 'E-commerce' },
  { name: 'BigCommerce', category: 'E-commerce' },
  { name: 'Magento', category: 'E-commerce' },
]

export function IntegrationsMarquee() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect with your favorite tools
          </h2>
          <p className="text-xl text-muted-foreground">
            Seamless integrations with 100+ marketplaces, carriers, and platforms
          </p>
        </motion.div>

        {/* Scrolling marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex space-x-8"
          >
            {[...integrations, ...integrations].map((integration, index) => (
              <div
                key={`${integration.name}-${index}`}
                className="flex-shrink-0 bg-background rounded-lg border p-6 min-w-[200px] text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {integration.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{integration.name}</h3>
                <p className="text-sm text-muted-foreground">{integration.category}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}