"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
      title: "One Click",
      description:
        "Texalya is your Intelligent SaaS Solution Which is having SMART Scheduler",
    },
    {
      id: 2,
      title: "One Click",
      description:
        "Texalya is your Intelligent SaaS Solution Which is having SMART Scheduler",
    },
    {
      id: 3,
      title: "One Click",
      description:
        "Texalya is your Intelligent SaaS Solution Which is having SMART Scheduler",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background - Continuous Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFA548] via-[#FF8C29] to-[#FFA548] animate-gradient-shift"></div>
      
      {/* Animated Circles - Continuous Animation */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF8C29] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB366] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#FF9A3D] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

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
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`bg-[#D9D9D9] border-2 border-[#D9D9D9]/50 rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-700 hover:scale-105 hover:shadow-xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              {/* Card Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                {feature.title}
              </h3>

              {/* Card Description */}
              <p className="text-sm sm:text-base text-black leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
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