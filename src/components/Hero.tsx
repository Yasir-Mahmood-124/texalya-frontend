"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Start as visible for hero
  const sectionRef = useRef<HTMLElement>(null);
  const fullText = "Design, Automate and Grow with ";
  const typingSpeed = 50; // milliseconds per character

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  // Scroll animation that repeats every time
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.2,
        rootMargin: "-50px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8" 
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Main Heading with Typing Effect */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight min-h-[2.5em]">
          {displayedText}
          {!isTypingComplete && <span className="animate-pulse">|</span>}

          <span className={`text-[#FFA548] ${isTypingComplete ? 'animate-fadeIn' : 'opacity-0'}`}>AI</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#918C94] mb-6 sm:mb-8">
          Texalya - Your Intelligent SaaS Solution
        </p>

        {/* Get Started Button with Animated Gradient */}
        <Link href="#get-started">
          <button className="animate-button-gradient text-white px-8 py-3 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-medium mb-12 sm:mb-16">
            Get Started
          </button>
        </Link>

        {/* Description Text */}
        <div className="max-w-4xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg text-[#918C94] leading-relaxed">
            Texalya is an AI-powered SaaS platform that unifies design,
            automation, analytics and collaboration into one seamless ecosystem.
            It replaces multiple tools from AI-driven creation to CRM and
            scheduling with an integrated, scalable solution that helps
            businesses of all sizes operate smarter, faster and more efficiently
            through connected, intelligent innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;