'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@fulfillx/ui'

const faqs = [
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes up to 50 orders per month, basic shipping rate comparison, inventory management for up to 100 SKUs, and email support. Perfect for getting started or testing our platform."
  },
  {
    question: "How does the pay-per-order pricing work?",
    answer: "You only pay for orders you process through our platform. There are no monthly fees, setup costs, or hidden charges. The more you use, the lower your per-order cost becomes with our volume discounts."
  },
  {
    question: "Do you charge for shipping labels?",
    answer: "No, we don't mark up shipping labels. You pay the exact carrier rates, and we actually give you credits back on every shipment to help offset our platform fees."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, absolutely. There are no contracts or cancellation fees. You can downgrade to our free plan or cancel your account at any time from your dashboard."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Payments are processed securely through Stripe."
  },
  {
    question: "Do you offer discounts for high-volume users?",
    answer: "Yes! Our pricing automatically scales down as your volume increases. We also offer custom enterprise pricing for businesses processing over 10,000 orders per month."
  },
  {
    question: "Is there a setup fee?",
    answer: "No setup fees, ever. You can start using FulfillX immediately after signing up, and we'll help you get connected to your sales channels for free."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "If you exceed your free plan limit of 50 orders, you'll automatically be charged our standard per-order rate for additional orders. We'll notify you before this happens so there are no surprises."
  }
]

export function PricingFAQ() {
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, 
            feel free to reach out to our support team.
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
                className="bg-background border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
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