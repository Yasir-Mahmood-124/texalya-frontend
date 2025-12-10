"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/Logo4.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: "-20px"
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Demo", href: "#demo" },
    ],
    support: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms & Conditions", href: "#terms" },
      { name: "Contact Us", href: "#contact" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
    ],
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-black border-t border-gray-800/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-5 rounded-full blur-3xl" style={{ backgroundColor: 'var(--gold-primary)' }}></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-5 rounded-full blur-3xl" style={{ backgroundColor: 'var(--gold-secondary)' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`py-12 sm:py-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Image 
                  src={Logo}
                  alt="Texalya Logo"
                  width={150}
                  height={50}
                  className="h-auto w-auto"
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                Empowering businesses with innovative AI solutions to streamline operations and drive growth.
              </p>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-[var(--gold-primary)]/20 border border-gray-700/50 hover:border-[var(--gold-primary)]/50 flex items-center justify-center text-gray-400 hover:text-[var(--gold-primary)] transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-[var(--gold-primary)]/20 border border-gray-700/50 hover:border-[var(--gold-primary)]/50 flex items-center justify-center text-gray-400 hover:text-[var(--gold-primary)] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-[var(--gold-primary)]/20 border border-gray-700/50 hover:border-[var(--gold-primary)]/50 flex items-center justify-center text-gray-400 hover:text-[var(--gold-primary)] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[var(--gold-primary)] text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[var(--gold-primary)] text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[var(--gold-primary)] text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div 
          className={`border-t border-gray-800/50 py-6 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} Texalya. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="#privacy" 
                className="text-gray-400 hover:text-[var(--gold-primary)] text-sm transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link 
                href="#terms" 
                className="text-gray-400 hover:text-[var(--gold-primary)] text-sm transition-colors duration-200"
              >
                Terms
              </Link>
              <Link 
                href="#cookies" 
                className="text-gray-400 hover:text-[var(--gold-primary)] text-sm transition-colors duration-200"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;