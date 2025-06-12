'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Twitter, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-silver-100 dark:bg-silver-900 border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-purple-700 dark:text-purple-500">
               Ship To Japan
              </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Professional Ship To Japan services for SaaS products, websites, and technical documentation.
            </p>
            <div className="mt-4 flex space-x-4">
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400">
                <a href="mailto:hello@japaneselocalization.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#services" className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Quick Scan & Edit
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Full Page Translation
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Full Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-border" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ship To Japan. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Operated by <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">Ship To Japan</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;