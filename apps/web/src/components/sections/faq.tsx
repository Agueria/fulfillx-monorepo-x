'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@fulfillx/ui'

const faqs = [
  {
    question: 'How does the free plan work?',
    answer: 'Our free plan includes up to 50 orders per month with full access to all core features including inventory management, shipping rate comparison, and basic analytics. No credit card required to get started.'
  },
  {
    question: 'What carriers do you integrate with?',
    answer: 'We integrate with all major carriers including UPS, FedEx, USPS, DHL, and many regional carriers. Our rate shopping engine compares prices across all carriers to find you the best rates.'
  },
  {
    question: 'How does the credits system work?',
    answer: 'You earn 5% back in shipping credits on every label purchased through our platform. These credits are automatically applied to future shipments, helping you save more as you ship more.'
  },
  {
    question: 'Can I connect multiple sales channels?',
    answer: 'Yes! We support 100+ integrations including Amazon, Shopify, eBay, Walmart, Etsy, WooCommerce, BigCommerce, and many more. Inventory syncs in real-time across all channels.'
  },
  {
    question: 'Is there a setup fee or contract?',
    answer: 'No setup fees, no contracts, no hidden costs. You only pay for what you use beyond the free tier. You can upgrade, downgrade, or cancel anytime.'
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We provide 24/7 support via chat, email, and phone. Our team includes fulfillment experts who can help optimize your operations and onboard your team.'
  },
  {
    question: 'How secure is my data?',
    answer: 'We take security seriously with SOC 2 compliance, bank-level encryption, role-based access controls, and regular security audits. Your data is protected with industry-leading standards.'
  },
  {
    question: 'Can I manage multiple warehouses?',
    answer: 'Yes, our platform supports unlimited warehouses with intelligent routing rules. You can set up automation to route orders to the optimal warehouse based on location, inventory, or custom rules.'
  }
]

export function FAQ() {
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
            Frequently asked questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about FulfillX
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background rounded-lg border px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}