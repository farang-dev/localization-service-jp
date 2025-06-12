'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: 'What types of content do you translate?',
    answer: 'I specialize in SaaS products, websites, technical documentation, marketing materials, and user interfaces. My expertise is particularly valuable for tech companies looking to enter the Japanese market with accurate and culturally appropriate translations.',
  },
  {
    question: 'How long does a translation project typically take?',
    answer: 'Project timelines vary based on content volume, complexity, and technical requirements. A small website might take 1-2 weeks, while larger projects with extensive documentation could take 3-4 weeks. I provide specific timeline estimates after reviewing your content.',
  },
  {
    question: 'Do you offer ongoing translation services for regular content updates?',
    answer: 'Yes, I offer retainer packages for clients who need regular translation services. This ensures consistency in terminology and style across all your Japanese content and provides priority service for your translation needs.',
  },
  {
    question: 'How do you handle technical terminology and industry-specific jargon?',
    answer: 'I work with you to develop a glossary of key terms for your industry and product. This ensures consistency and accuracy in technical translations. My background in technology helps me understand complex concepts and translate them appropriately for Japanese audiences.',
  },
  {
    question: 'Can you help with Japanese SEO for our website?',
    answer: 'Yes, I can incorporate Japanese SEO best practices into website translations, including keyword research specific to the Japanese market, meta tag optimization, and culturally relevant content adjustments to improve your search visibility in Japan.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <motion.h2 
            className="text-base text-primary-600 font-semibold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            FAQ
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.p>
          <motion.p 
            className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to know about our Ship To Japan services
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
              >
                <AccordionItem value={`item-${index}`} className="border-b border-border py-2">
                  <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary-600 transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;