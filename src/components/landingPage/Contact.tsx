"use client";

import { useState, useEffect, useRef } from "react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-black py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Get in touch with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)]">
                Xlya
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              Questions, ideas, or feedback? We'd love to hear from you.
            </p>
            
            <div className="pt-4 space-y-4">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-[var(--gold-primary)] mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400">support@xlya.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-[var(--gold-primary)] mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-white font-semibold">Location</h3>
                  <p className="text-gray-400">Available Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-primary)] via-[var(--gold-secondary)] to-[var(--gold-light)]"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-5">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#FFEFD5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#FFEFD5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                  required
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Message Subject"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#FFEFD5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#FFEFD5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none text-sm sm:text-base"
                  required
                />

                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    className="bg-black text-white px-8 py-2.5 sm:px-10 sm:py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm sm:text-base font-medium hover:scale-105 hover:shadow-xl"
                  >
                    Get Started
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;