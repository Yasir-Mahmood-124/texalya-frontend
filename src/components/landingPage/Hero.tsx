"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const rotatingLines = [
    "Design, Automate and Grow with AI",
    "Create, Optimize and Scale with AI",
    "Innovate, Streamline and Succeed with AI"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentIndex = loopNum % rotatingLines.length;
      const fullText = rotatingLines[currentIndex];

      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(50);

        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(30);

        if (displayedText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, typingSpeed]);

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

  const renderText = () => {
    if (displayedText.endsWith("AI")) {
      const textWithoutAI = displayedText.slice(0, -2);
      return (
        <>
          <span className="text-white">{textWithoutAI}</span>
          <span className="text-[var(--gold-primary)]">AI</span>
        </>
      );
    }
    return <span className="text-white">{displayedText}</span>;
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden x-bg-hero"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div
        className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight min-h-[1.5em]">
          {renderText()}
          <span className="animate-pulse text-[var(--gold-primary)]">|</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-[#918C94] mb-6 sm:mb-8">
          Xlya - Your Intelligent SaaS Solution
        </p>

        <Link href="/auth/signup">
          <button className="animate-button-gradient text-white px-8 py-3 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-medium mb-12 sm:mb-16">
            Get Started
          </button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg text-[#918C94] leading-relaxed">
            Xlya is an AI-powered SaaS platform that unifies design,
            automation, analytics and collaboration into one seamless
            ecosystem. It replaces multiple tools from AI-driven creation to
            CRM and scheduling with an integrated, scalable solution that
            helps businesses of all sizes operate smarter, faster and more
            efficiently through connected, intelligent innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;