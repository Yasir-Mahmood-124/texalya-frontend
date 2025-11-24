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
        <>
            <style jsx>{`
                @keyframes rotateGradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .rotating-gradient {
                    background: linear-gradient(45deg, #F5A962, #E89030, #FDB77A, #FFCB9A, #F5A962);
                    background-size: 300% 300%;
                    animation: rotateGradient 8s ease infinite;
                }
            `}</style>

            <section className="rotating-gradient relative w-full h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-[#FDB77A] rounded-full opacity-40 blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#FFCB9A] rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#FFD6A8] rounded-full opacity-20 blur-2xl"></div>

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl w-full">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black mb-6">
                        Why Texalya
                    </h2>

                    {/* Features Grid - 2 rows x 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-4 lg:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
                            >
                                {/* Icon */}
                                <div className="bg-[#F5A962] rounded-xl w-10 h-10 flex items-center justify-center mb-3 flex-shrink-0">
                                    {feature.icon}
                                </div>
                                
                                {/* Title */}
                                <h3 className="text-base lg:text-lg font-bold text-black mb-2">
                                    {feature.title}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Get Started Button */}
                    <div className="flex justify-center">
                        <button className="bg-black text-white px-8 py-3 rounded-full text-sm lg:text-base font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhyTexalya;