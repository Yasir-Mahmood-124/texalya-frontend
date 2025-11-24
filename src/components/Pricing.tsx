"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      name: "Freemium",
      price: "$0",
      period: "/FOREVER",
      features: [
        "100 AI Credits",
        "1 Workspace",
        "10 Patterns per month",
        "Basic Fabric Estimator",
        "Community Support",
      ],
    },
    {
      id: 2,
      name: "Pro",
      price: "$29",
      period: "/MONTH",
      features: [
        "500 AI Credits",
        "3 Workspaces",
        "60 Scheduling per month",
        "Lead Generation & CRM",
        "Document Generation",
        "Priority Support",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$89",
      period: "/MONTH",
      features: [
        "5000 AI Credits",
        "Unlimited Workspaces",
        "Unlimited Scheduling",
        "Advanced Analytics & Insights",
        "Custom Integrations",
        "Dedicated Account Manager",
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="bg-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title with Scroll Animation */}
        <h2
          className={`text-3xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Choose Your Plan
        </h2>

        {/* Pricing Cards Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-[#D9D9D9] rounded-xl p-5 sm:p-6 flex flex-col transition-all duration-700 hover:scale-105 hover:shadow-xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${plan.popular ? "ring-2 ring-white" : ""}`}
              style={{ 
                transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-black">
                  {plan.price}
                </span>
                <span className="text-sm sm:text-base text-black">
                  {plan.period}
                </span>
              </div>

              {/* Subscribe Button */}
              <Link href="#subscribe" className="mb-4">
                <button className="w-full bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-semibold hover:scale-105 hover:shadow-lg">
                  {plan.id === 1 ? "GET STARTED" : "SUBSCRIBE"}
                </button>
              </Link>

              {/* Features List */}
              <div className="space-y-2 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <span className="text-black mr-2 text-sm">✓</span>
                    <p className="text-xs sm:text-sm text-black leading-relaxed">
                      {feature}
                    </p>
                  </div>
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