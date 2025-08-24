'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@fulfillx/ui'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Operations Manager',
    company: 'TechGear Co',
    content: 'FulfillX transformed our shipping process. We went from spending hours on fulfillment to having everything automated. The profit analytics alone saved us thousands.',
    rating: 5,
    avatar: 'SC'
  },
  {
    name: 'Mike Rodriguez',
    role: 'E-commerce Director',
    company: 'Fashion Forward',
    content: 'The multi-channel inventory sync is a game-changer. No more overselling on Amazon or Shopify. Our customers are happier and our operations run smoothly.',
    rating: 5,
    avatar: 'MR'
  },
  {
    name: 'Emily Watson',
    role: 'Founder',
    company: 'Artisan Crafts',
    content: 'As a small business, the free tier got us started, and the credits system means we actually save money as we grow. The support team is incredible.',
    rating: 5,
    avatar: 'EW'
  }
]

export function Testimonials() {
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
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold">4.9/5</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by thousands of businesses
          </h2>
          <p className="text-xl text-muted-foreground">
            Join over 10,000 companies that trust FulfillX with their fulfillment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-lift">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}