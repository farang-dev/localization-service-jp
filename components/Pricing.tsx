'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Quick Scan & Edit',
    price: '¥5,000',
    description: 'Fast review and correction of machine-translated content',
    features: [
      'Up to 500 words',
      'Grammar & spelling check',
      'Basic terminology correction',
      'Quick 2-hour turnaround',
      'One revision round',
    ],
    cta: 'Get Started',
    href: '#contact',
    popular: false,
  },
  {
    name: 'Full Page Translation',
    price: '¥15,000',
    description: 'Complete human translation with cultural adaptation',
    features: [
      'Up to 1,000 words',
      'Native Japanese translator',
      'Technical terminology research',
      'Cultural context adaptation',
      'Two revision rounds',
      'Delivery within 2-3 days',
    ],
    cta: 'Choose This Plan',
    href: '#contact',
    popular: true,
  },
  {
    name: 'Full Service',
    price: 'Custom',
    description: 'Comprehensive localization for your entire product',
    features: [
      'Unlimited word count',
      'Complete website/app translation',
      'UI/UX localization',
      'Technical documentation',
      'Ongoing support',
      'Dedicated project manager',
      'Custom glossary creation',
    ],
    cta: 'Contact for Quote',
    href: '#contact',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <motion.h2 
            className="text-base text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pricing
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Simple, Transparent Pricing
          </motion.p>
          <motion.p 
            className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the plan that fits your Ship To Japan needs
          </motion.p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6 lg:max-w-5xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
            >
              <Card className={`h-full flex flex-col border-2 shadow-lg ${plan.popular ? 'border-purple-500 ring-2 ring-purple-500' : 'border-blue-400 hover:border-blue-500'}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-bl-lg rounded-tr-md shadow-xl border border-white/30">
                    Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mt-2 mb-6">
                    <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                    {plan.name !== 'Full Service' && <span className="text-muted-foreground"> /page</span>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 drop-shadow-md" />
                        </div>
                        <p className="ml-3 text-base text-muted-foreground">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    variant={plan.popular ? "gradient" : "secondary"}
                    className={`w-full font-semibold ${plan.popular 
                      ? 'text-white shadow-xl' 
                      : 'border-2 border-blue-500 text-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white'}`}
                  >
                    <Link href={plan.href}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;