'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const paymentMethods = [
  { name: 'PayPal', icon: '🅿️' },
  { name: 'Wise', icon: '🏦' },
];

const PaymentMethods: React.FC = () => {
  return (
    <section id="payment-methods" className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Payment Methods
          </h3>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border shadow-md hover:shadow-purple-500/20 transition-shadow duration-300 w-full max-w-xs">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-card-foreground">
                    <span className="text-3xl mr-3">{method.icon}</span>
                    {method.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground pt-2">Secure and easy payment.</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default PaymentMethods;