'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Globe, Layers } from 'lucide-react';

const services = [
  {
    title: 'Quick Scan & Edit',
    description: 'A 2-hour review of your existing Japanese translations. We provide feedback and improvements to enhance the quality and cultural relevance of your content.',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: 'Full Page Translation',
    description: 'Complete translation of your content using our hybrid approach that combines advanced AI with human expertise for natural, culturally appropriate Japanese.',
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: 'Full Localization Service',
    description: 'Comprehensive localization of your entire product, including UI, documentation, marketing materials, and ongoing support for your Japanese market presence.',
    icon: <Layers className="h-6 w-6" />,
  },
  {
    icon: <LayoutGrid className="w-8 h-8 text-purple-500" />,
    title: 'Full SaaS to Japan Service',
    description: 'Comprehensive service covering all aspects of adapting your SaaS for the Japanese market, including UI/UX, documentation, and marketing materials.',
    link: '#',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-12 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Supporting SaaS businesses with high-quality SaaS to Japan services to succeed in the Japanese market.
          </p>
        </motion.div>
        <div className="mt-10">
          <div className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8 sm:gap-y-8 lg:gap-y-10">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
              >
                <Card className="h-full border border-border hover:shadow-md transition-all duration-300 hover:border-primary-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-md">
                        {service.icon}
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;