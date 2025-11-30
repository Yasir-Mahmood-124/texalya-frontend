"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOverOrange, setIsOverOrange] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Get the Why Texalya section by checking for the gradient background
            const whyTexalyaSection = document.querySelector('section > div.bg-gradient-to-br.from-\\[\\#FFA548\\]');
            
            if (whyTexalyaSection) {
                const section = whyTexalyaSection.closest('section');
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const navbarHeight = 80;
                    
                    // Check if navbar overlaps with this section
                    if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
                        setIsOverOrange(true);
                    } else {
                        setIsOverOrange(false);
                    }
                }
            } else {
                // Fallback: Use scroll position
                // Adjust these values based on your Hero section height
                if (scrollPosition > windowHeight * 0.85 && scrollPosition < windowHeight * 2) {
                    setIsOverOrange(true);
                } else {
                    setIsOverOrange(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        // Recheck after a delay to ensure DOM is ready
        const timer = setTimeout(handleScroll, 200);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-[95%] border border-[#FEFEFE] bg-transparent mt-4 rounded-full overflow-hidden z-50 backdrop-blur-sm">
            <div className="w-full pl-4 pr-3 lg:pl-6 lg:pr-4">
                <div className="flex items-center justify-between h-14">
                    {/* Logo - Stuck to Left */}
                    <div className="flex-shrink-0 -ml-4 lg:-ml-12">
                        <Link href="/">
                            <Image 
                                src={Logo}
                                alt="Texalya Logo"
                                width={150}
                                height={100}
                                className="h-auto w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation - Center */}
                    <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        <Link
                            href="#pricing"
                            className="relative text-[#918C94] hover:text-white transition-colors duration-200 text-sm font-medium group"
                        >
                            Pricing
                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="#contact"
                            className="relative text-[#918C94] hover:text-white transition-colors duration-200 text-sm font-medium group"
                        >
                            Contact
                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Desktop Get Started Button - Stuck to Right */}
                    <div className="hidden md:block flex-shrink-0">
                        <Link href="#get-started">
                            <button 
                                className={`px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-lg text-sm font-medium text-white transition-all duration-500 ${
                                    isOverOrange 
                                        ? 'bg-black' 
                                        : 'animate-button-gradient'
                                }`}
                            >
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-[#918C94] hover:text-white focus:outline-none focus:text-white"
                            aria-label="Toggle menu"
                        >
                            {!isMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-[#FEFEFE]">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="#pricing"
                            className="text-[#918C94] hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#contact"
                            className="text-[#918C94] hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="#get-started"
                            className="block px-3 py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <button 
                                className={`w-full px-6 py-2 rounded-full hover:scale-105 text-sm font-medium text-white transition-all duration-500 ${
                                    isOverOrange 
                                        ? 'bg-black' 
                                        : 'animate-button-gradient'
                                }`}
                            >
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;