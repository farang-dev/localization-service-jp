'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);
  
  const handleLinkClick = () => {
    setOpen(false);
  };
  return (
    <header className="fixed w-full bg-background/90 backdrop-blur-md z-50 shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start items-center lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Ship To Japan
              </span>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground hover:bg-accent hover:text-accent-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full h-full bg-background border-l border-border pt-2">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-3 border-b border-border px-4">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                      Ship To Japan
                    </span>
                  </div>
                  <nav className="flex flex-col space-y-2 mt-6">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={handleLinkClick}
                      >
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/#services"
                        className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={handleLinkClick}
                      >
                        Services
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/#pricing"
                        className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={handleLinkClick}
                      >
                        Pricing
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/#contact"
                        className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={handleLinkClick}
                      >
                        Contact
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/blog"
                        className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={handleLinkClick}
                      >
                        Blog
                      </Link>
                    </SheetClose>
                  </nav>
                  <div className="mt-auto pb-8 px-4">
                    <SheetClose asChild>
                      <Button asChild variant="gradient" className="w-full text-white text-sm">
                        <Link href="/#contact" className="px-3 py-2" onClick={handleLinkClick}>
                          Get Started
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            <Link href="/" className="text-base font-medium text-foreground hover:text-purple-500 transition-colors">
              Home
            </Link>
            <Link href="/#services" className="text-base font-medium text-foreground hover:text-purple-500 transition-colors">
              Services
            </Link>
            <Link href="/#pricing" className="text-base font-medium text-foreground hover:text-purple-500 transition-colors">
              Pricing
            </Link>
            <Link href="/#contact" className="text-base font-medium text-foreground hover:text-purple-500 transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-base font-medium text-foreground hover:text-purple-500 transition-colors">
              Blog
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">

            <Button asChild variant="gradient" className="text-white">
              <Link href="/#contact">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
