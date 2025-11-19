"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Pricing = () => {
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

  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "$29",
      period: "/MONTH",
      features: [
        "500 AI Credits - up to:",
        "3 Workspace",
        "60 Scheduling per month",
        "Lead Generation and CRM",
        "Document Generation",
      ],
    },
    {
      id: 2,
      name: "Enterprise",
      price: "$89",
      period: "/MONTH",
      features: [
        "5000 AI Credits - up to:",
        "3 Workspace",
        "60 Scheduling per month",
        "Lead Generation and CRM",
        "Document Generation",
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title with Scroll Animation */}
        <h2
          className={`text-3xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          AI Plans
        </h2>

        {/* Pricing Cards Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`bg-[#D9D9D9] rounded-2xl p-6 sm:p-7 flex flex-col transition-all duration-700 hover:scale-105 hover:shadow-xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
              }}
            >
              {/* Plan Name */}
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-black">
                  {plan.price}
                </span>
                <span className="text-base sm:text-lg text-black">
                  {plan.period}
                </span>
              </div>

              {/* Subscribe Button */}
              <Link href="#subscribe" className="mb-5">
                <button className="w-full bg-black text-white px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm sm:text-base font-semibold hover:scale-105 hover:shadow-lg">
                  SUBSCRIBE
                </button>
              </Link>

              {/* Features List */}
              <div className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <p
                    key={featureIndex}
                    className="text-xs sm:text-sm text-black leading-relaxed"
                  >
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;