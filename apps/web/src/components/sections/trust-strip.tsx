'use client'

import { motion } from 'framer-motion'

const trustedBy = [
  'TechCorp',
  'GlobalTrade',
  'FastShip Co',
  'MegaStore',
  'QuickCommerce',
  'ShipSmart',
]

export function TrustStrip() {
  return (
    <section className="py-12 border-b border-border/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by 10,000+ growing businesses worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedBy.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-lg font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}