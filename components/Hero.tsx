'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-background overflow-hidden pt-12 md:pt-16 lg:pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/20"></div>
        </div>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          {/* The SVG element with the polygon has been removed */}

          <main className="mx-auto max-w-7xl px-4 sm:pt-10 sm:px-6 md:pt-14 lg:pt-16 lg:px-8 xl:pt-24">
            <div className="sm:text-center lg:text-left">
              <motion.h1 
                className="text-3xl tracking-tight font-extrabold text-foreground sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block xl:inline">LLM ✖️ Human Insight</span>{' '}
                <span className="block bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent xl:inline">Launch in Japan</span>
              </motion.h1>
              <motion.p 
                className="mt-4 text-base text-muted-foreground sm:mt-6 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-6 md:text-xl lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Helping SaaS or AI services expand into the Japanese market with our professional SaaS to Japan services. 
                Our team of experts ensures your content resonates with Japanese users while maintaining your brand&apos;s voice.
              </motion.p>
              <motion.div 
                className="mt-6 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button asChild variant="gradient" className="text-white shadow-lg">
                  <Link href="/#pricing" className="px-8 py-3 md:py-4 md:text-lg md:px-10">
                    View Pricing
                  </Link>
                </Button>
                <Button asChild variant="outline" className="mt-3 sm:mt-0 sm:ml-3 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                  <Link href="/#contact" className="px-8 py-3 md:py-4 md:text-lg md:px-10">
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center p-4 lg:p-0">
        <video 
          className="w-full h-full object-cover rounded-lg shadow-2xl max-h-[400px] lg:max-h-none"
          src="/jp_market.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          aria-label="Promotional video showcasing Japanese market scenes"
        />
      </div>
    </div>
  );
};

export default Hero;
