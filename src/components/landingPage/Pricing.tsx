"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

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
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "100 AI Credits per month",
        "1 Workspace",
        "10 Patterns per month",
        "Basic Fabric Estimator",
        "Community Support"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "animate-button-gradient bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-white hover:shadow-2xl hover:scale-105"
    },
    {
      id: 2,
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Best for growing businesses",
      features: [
        "500 AI Credits per month",
        "3 Workspaces",
        "60 Scheduling per month",
        "Lead Generation & CRM",
        "Document Generation",
        "Priority Support"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "animate-button-gradient bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-white hover:shadow-2xl hover:scale-105"
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$89",
      period: "/month",
      description: "For large-scale operations",
      features: [
        "5000 AI Credits per month",
        "Unlimited Workspaces",
        "Unlimited Scheduling",
        "Advanced Analytics & Insights",
        "Custom Integrations",
        "Dedicated Account Manager"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "animate-button-gradient bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-white hover:shadow-2xl hover:scale-105"
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 opacity-5 rounded-full blur-3xl" style={{ backgroundColor: 'var(--gold-primary)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 opacity-5 rounded-full blur-3xl" style={{ backgroundColor: 'var(--gold-secondary)' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-6 flex flex-col transition-all duration-700 hover:scale-105 shadow-xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-black mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-black">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2 text-base">
                    {plan.period}
                  </span>
                </div>
              </div>

              <Link href="#subscribe" className="mb-6">
                <button 
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </Link>

              <div className="space-y-3 flex-grow">
                <p className="text-xs font-semibold text-gray-900 mb-3">
                  What's included:
                </p>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: 'var(--gold-primary)', opacity: 0.1 }}>
                      <Check className="w-3 h-3 text-[var(--gold-primary)]" />
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <div className="inline-block mb-4">
              
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-400 mb-8 text-base leading-relaxed">
              Contact our sales team for custom pricing, advanced features, and dedicated support tailored to your organization.
            </p>
            <Link href="#contact">
              <button className="animate-button-gradient bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
                Schedule a meeting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;