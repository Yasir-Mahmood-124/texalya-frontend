import Hero from "@/components/Hero";
import WhyTexalya from "@/components/WhyTexalya";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AnimatedXBackground from "@/components/common/AnimatedXBackground";

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      
      <AnimatedXBackground/>

      
      <Navbar/>
      {/* Hero Section - Fits in one screen */}
      <Hero />

      {/* Why Texalya Section */}
      <WhyTexalya />

      {/* Pricing Section */}
      <Pricing />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}