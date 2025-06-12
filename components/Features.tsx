'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Globe, Lightbulb } from 'lucide-react';

const features = [
  {
    name: 'Native Japanese Expertise',
    description: 'Our team includes native Japanese speakers with deep cultural understanding to ensure your content resonates authentically with Japanese users.',
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    name: 'Comprehensive Localization',
    description: 'We ensure technical accuracy and cultural adaptation, aligning your SaaS content with Japanese business culture, communication styles, and user expectations.',
    icon: <Globe className="h-6 w-6" />,
  },
  {
    name: 'Efficient Hybrid Approach',
    description: 'We combine advanced AI translation technology with human expertise to deliver high-quality translations efficiently and cost-effectively.',
    icon: <Lightbulb className="h-6 w-6" />,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-silver-100 dark:bg-silver-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <motion.h2 
            className="text-base text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Expert Ship To Japan
          </motion.p>
          <motion.p 
            className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our specialized approach ensures your SaaS product connects with Japanese users effectively.
          </motion.p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
              >
                <Card className="h-full border border-border bg-card hover:shadow-lg transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-600">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg text-foreground">{feature.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground">
                      {feature.description}
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

export default Features;