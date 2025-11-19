"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Lightbulb, Settings, Rocket } from "lucide-react";

const WhyTexalya = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll animation that repeats every time section enters/exits viewport
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

  const features = [
    {
      id: 1,
      icon: Lightbulb,
      title: "Describe Your Vision",
      description:
        "Input your idea, product concept or campaign goal — Texalya's AI instantly generates visuals, content or workflows tailored to your needs",
    },
    {
      id: 2,
      icon: Settings,
      title: "Automate & Organize",
      description:
        "Plan tasks, manage clients and automate workflows with Texalya's smart scheduler and CRM tools — all in one dashboard",
    },
    {
      id: 3,
      icon: Rocket,
      title: "Launch & Analyze",
      description:
        "Preview, publish and track results in real time with integrated analytics and insights to optimize every step of your process",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFA548] via-[#FF8C29] to-[#FFB366]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Floating Circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-white/10 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-white/10 rounded-full animate-float-fast"></div>
        
        {/* Medium Floating Shapes */}
        <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-[#FF8C29]/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-1/3 right-10 w-56 h-56 bg-[#FFB366]/20 rounded-full animate-bounce-medium"></div>
        <div className="absolute top-2/3 left-10 w-40 h-40 bg-white/15 rounded-full animate-pulse-slow"></div>
        
        {/* Small Floating Dots */}
        <div className="absolute top-20 right-1/4 w-20 h-20 bg-white/30 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-[#FF8C29]/30 rounded-full animate-bounce-fast"></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-[#FFB366]/25 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-white/20 rounded-full animate-pulse-medium"></div>
        
        {/* Rotating Squares */}
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rotate-45 animate-rotate-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-[#FF8C29]/15 to-transparent rotate-12 animate-rotate-medium"></div>
        
        {/* Animated Lines/Bars */}
        <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-slide-down"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-slide-down animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Title with Scroll Animation */}
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Why Texalya
        </h2>

        {/* Feature Cards Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={`bg-white rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-700 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
                }}
              >
                {/* Icon - Centered */}
                <div className="mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFA548] rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Card Title - Centered */}
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4">
                  {feature.title}
                </h3>

                {/* Card Description - Centered */}
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Get Started Button with Animation */}
        <div
          className={`flex justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: isVisible ? "450ms" : '0ms' }}
        >
          <Link href="#get-started">
            <button className="bg-black text-white px-10 py-3 sm:px-12 sm:py-4 rounded-lg hover:bg-gray-900 hover:scale-105 transition-all duration-200 text-base sm:text-lg font-medium hover:shadow-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyTexalya;