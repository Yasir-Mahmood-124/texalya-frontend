"use client";

import { Lightbulb, Settings, Rocket, Calendar, Users, TrendingUp } from "lucide-react";

const WhyTexalya = () => {
    const features = [
        {
            icon: <Lightbulb className="w-5 h-5" />,
            title: "AI Pattern Generator",
            description: "Turn text prompts into seamless fabric patterns instantly with AI-powered design tools"
        },
        {
            icon: <Calendar className="w-5 h-5" />,
            title: "Smart Scheduler & Calendar",
            description: "Manage production timelines, allocate resources, and avoid delays with intelligent planning"
        },
        {
            icon: <Users className="w-5 h-5" />,
            title: "CRM & Workflow Dashboard",
            description: "Track clients, manage orders, create invoices, and streamline your entire workflow"
        },
        {
            icon: <TrendingUp className="w-5 h-5" />,
            title: "Analytics & Insights",
            description: "Forecast demand, analyze supplier performance, and make data-driven decisions"
        },
        {
            icon: <Settings className="w-5 h-5" />,
            title: "Fabric Estimator",
            description: "Calculate precise fabric requirements to reduce wastage and optimize material costs"
        },
        {
            icon: <Rocket className="w-5 h-5" />,
            title: "All-in-One Platform",
            description: "Unified SaaS solution replacing multiple tools from AI-driven creation to CRM and scheduling"
        }
    ];

    return (
        <section className="relative w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            {/* Base Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFA548] via-[#FF8C29] to-[#FFB366]"></div>
            
            {/* Animated Background Elements - Fixed positioning to prevent section shift */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Large Floating Circles */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full animate-float-slow"></div>
                <div className="absolute top-20 right-10 w-80 h-80 bg-white/10 rounded-full animate-float-medium"></div>
                <div className="absolute -bottom-10 left-1/4 w-72 h-72 bg-white/10 rounded-full animate-float-fast"></div>
                <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-white/15 rounded-full animate-float-slow"></div>
                
                {/* Medium Floating Shapes */}
                <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-[#FF8C29]/20 rounded-full animate-bounce-slow"></div>
                <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-[#FFB366]/20 rounded-full animate-bounce-medium"></div>
                <div className="absolute top-1/2 left-10 w-36 h-36 bg-white/15 rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-1/3 left-1/3 w-44 h-44 bg-[#FFA548]/15 rounded-full animate-float-medium"></div>
                
                {/* Small Floating Dots */}
                <div className="absolute top-20 right-1/3 w-20 h-20 bg-white/30 rounded-full animate-float-fast"></div>
                <div className="absolute bottom-24 left-1/4 w-16 h-16 bg-[#FF8C29]/30 rounded-full animate-bounce-fast"></div>
                <div className="absolute top-1/3 right-16 w-24 h-24 bg-[#FFB366]/25 rounded-full animate-float-medium"></div>
                <div className="absolute bottom-1/2 left-1/2 w-18 h-18 bg-white/20 rounded-full animate-pulse-slow"></div>
                <div className="absolute top-2/3 right-1/4 w-20 h-20 bg-[#FFA548]/25 rounded-full animate-bounce-slow"></div>
                
                {/* Rotating Squares */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rotate-45 animate-rotate-slow"></div>
                <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-[#FF8C29]/15 to-transparent rotate-12 animate-rotate-medium"></div>
                <div className="absolute top-1/2 right-1/2 w-24 h-24 bg-gradient-to-br from-white/8 to-transparent rotate-90 animate-rotate-slow"></div>
                
                {/* Extra Decorative Elements */}
                <div className="absolute top-40 left-1/3 w-28 h-28 bg-[#FFB366]/10 rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-40 right-1/3 w-32 h-32 bg-white/10 rounded-full animate-float-fast"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl w-full">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black mb-8 lg:mb-10">
                    Why Texalya
                </h2>

                {/* Features Grid - 2 rows x 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-8 lg:mb-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group perspective-1000 min-h-[200px]"
                        >
                            <div className="relative w-full h-full min-h-[200px] transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
                                {/* Front Side - Icon and Title Only */}
                                <div className="absolute inset-0 backface-hidden bg-white/95 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-lg flex flex-col items-center justify-center text-center">
                                    {/* Icon */}
                                    <div className="bg-gradient-to-br from-[#FFA548] to-[#FF8C29] rounded-xl w-16 h-16 flex items-center justify-center mb-4 flex-shrink-0 shadow-md text-white">
                                        {feature.icon}
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="text-lg lg:text-xl font-bold text-black">
                                        {feature.title}
                                    </h3>
                                </div>

                                {/* Back Side - Full Content with Pure Black Background */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black rounded-2xl p-5 lg:p-6 shadow-2xl flex flex-col">
                                    {/* Icon */}
                                    <div className="bg-gradient-to-br from-[#FFA548] to-[#FF8C29] rounded-xl w-12 h-12 flex items-center justify-center mb-3 flex-shrink-0 shadow-md text-white">
                                        {feature.icon}
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="text-base lg:text-lg font-bold text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Get Started Button */}
                <div className="flex justify-center">
                    <button className="bg-black text-white px-10 py-3.5 rounded-full text-sm lg:text-base font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300">
                        Get Started
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhyTexalya;