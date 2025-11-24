"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-[95%] mx-auto border border-[#FEFEFE] bg-transparent mt-4 rounded-full overflow-hidden">
            <div className="w-full px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Stuck to Left */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="/assets/images/logo.png"
                                alt="Texalya Logo"
                                width={120}
                                height={40}
                                className="h-auto w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation - Center */}
                    <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        <Link
                            href="#pricing"
                            className="text-[#918C94] hover:text-white transition-colors duration-200 text-sm font-medium"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#contact"
                            className="text-[#918C94] hover:text-white transition-colors duration-200 text-sm font-medium"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Desktop Get Started Button - Stuck to Right */}
                    <div className="hidden md:block flex-shrink-0">
                        <Link href="#get-started">
                            <button className="animate-button-gradient text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm font-medium">
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
                            <button className="w-full animate-button-gradient text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 text-sm font-medium">
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