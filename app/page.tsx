import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServicePlans from '@/components/ServicePlans';
import Features from '@/components/Features';
import PaymentMethods from '@/components/PaymentMethods'; // Added import
 
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="pt-16"> {/* Add padding to account for fixed header */}
          <Hero />
          <ServicePlans />
          <PaymentMethods /> {/* Added component */}
          <Features />

          <FAQ />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
