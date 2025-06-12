'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, FileText, Globe, Layers } from 'lucide-react';

const servicePlans = [
  {
    name: 'Quick Scan & Polish',
    price: '$100',
    duration: 'per deliverable',
    description: 'Polish your AI-generated or internally translated content to make it sound natural, clear, and product-focused for Japanese users.',
    icon: <FileText className="h-6 w-6" />,
    features: [
      'Best for: Translated pages or flows that just need refinement',
      'One deliverable = up to 3 connected screens or 1 standalone page',
      'Turnaround: 2 business days',
    ],
    cta: 'Get Started',
    href: '#contact',
    popular: true,
  },
  {
    name: 'SaaS Page Localization',
    price: '$180',
    duration: 'per unit',
    description: 'Full localization of your SaaS pages or UI flows using a hybrid AI + human approach for accuracy, cultural fit, and smooth UX.',
    icon: <Globe className="h-6 w-6" />,
    features: [
      'Best for: Homepage, pricing, signup, onboarding, feature pages',
      'One unit = one standalone page or one full UI flow',
      'Discounts available for multiple units',
    ],
    cta: 'Choose This Plan',
    href: '#contact',
    popular: false,
  },
  {
    name: 'Full Localization Support',
    price: 'Custom pricing',
    duration: 'Contact us for a tailored quote',
    description: 'Comprehensive localization services covering your entire SaaS product and related content — UI, documentation, AI prompts, and style guides.',
    icon: <Layers className="h-6 w-6" />,
    features: [],
    cta: 'Contact for Quote',
    href: '#contact',
    popular: false,
  },
];

const ServicePlans = () => {
  return (
    <section id="services" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <motion.h2 
            className="text-base text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional English to Ship To Japan
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

        <div className="mt-12 space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:max-w-none lg:mx-auto">
          {servicePlans.map((plan, index) => (
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
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-full text-white shadow-lg border-2 border-white/30 ${plan.popular ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gradient-to-br from-purple-500 to-blue-500'}`}>
                      {plan.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground">{plan.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mt-2 mb-6">
                    <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground"> /{plan.duration}</span>
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
                      ? 'shadow-xl' 
                      : 'border-2 border-blue-500 hover:border-blue-600'}`}
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

export default ServicePlans;