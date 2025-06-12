'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, CreditCard, User, Building, Briefcase, MessageSquare } from 'lucide-react'; // Added more icons
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  service: z.string({
    required_error: "Please select a service you're interested in.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({  
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This would be replaced with actual form submission logic
    console.log(values);
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  }

  return (
    <section id="contact" className="py-16 bg-silver-100 dark:bg-silver-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <motion.h2 
            className="text-base text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contact
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get in Touch
          </motion.p>
          <motion.p 
            className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to take your product to the Japanese market? Let&apos;s discuss your project.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border border-border"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground"><User className="mr-2 h-4 w-4 text-purple-500" />Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="bg-input border-border focus:border-purple-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground"><Mail className="mr-2 h-4 w-4 text-purple-500" />Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} className="bg-input border-border focus:border-purple-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground"><Building className="mr-2 h-4 w-4 text-purple-500" />Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company" {...field} className="bg-input border-border focus:border-purple-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground"><Briefcase className="mr-2 h-4 w-4 text-purple-500" />Service Interested In</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-input border-border focus:ring-purple-500">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="quick-scan" className="hover:bg-purple-100 dark:hover:bg-purple-800">Quick Scan & Edit</SelectItem>
                          <SelectItem value="full-page" className="hover:bg-purple-100 dark:hover:bg-purple-800">Full Page Translation</SelectItem>
                          <SelectItem value="full-service" className="hover:bg-purple-100 dark:hover:bg-purple-800">Full Service</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-foreground"><MessageSquare className="mr-2 h-4 w-4 text-purple-500" />Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project and requirements" 
                          className="min-h-[120px] bg-input border-border focus:border-purple-500" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  variant="gradient"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-card border-border shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-500 mb-4">Contact Information</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <a href="mailto:mf.nozawa.day@gmail.com" className="text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    mf.nozawa.day@gmail.com
                  </a>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">hello@japaneselocalization.com</p>
                      <p className="text-sm text-muted-foreground mt-1">I&apos;ll respond within 24 hours during business days.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CreditCard className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">Accepted Payment Methods</p>
                      <p className="text-sm text-muted-foreground">Wise (preferred for international transfers)</p>
                      <p className="text-sm text-muted-foreground">PayPal</p>
                      <p className="text-sm text-muted-foreground">Bank Transfer (for clients in Japan)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;