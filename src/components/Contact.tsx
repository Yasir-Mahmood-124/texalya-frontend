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
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div
        className={`w-full max-w-2xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Contact Form Card with Animated Background */}
        <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8">
          {/* Animated Background - Continuous Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFA548] via-[#FF8C29] to-[#FFA548] animate-gradient-shift"></div>
          
          {/* Animated Circles - Continuous Animation */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF8C29] rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB366] rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[#FF9A3D] rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

          {/* Form Content */}
          <div className="relative z-10">
            {/* Form Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-5">
              Send us a message
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Full Name Input */}
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#FFEFD5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                required
              />

              {/* Email Input */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#FFEFD5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                required
              />

              {/* Message Subject Input */}
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Message Subject"
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#FFEFD5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
                required
              />

              {/* Message Textarea */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={4}
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#FFEFD5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none text-sm sm:text-base"
                required
              />

              {/* Submit Button */}
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
    </section>
  );
};

export default Contact;