"use client";

import { Lightbulb, Settings, Rocket, Calendar, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

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
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-primary)] via-[var(--gold-secondary)] to-[var(--gold-light)]"></div>

            <div className="x-bg-container-fixed">
                <div className="absolute top-20 left-1/4 x-lg x-gold-primary x-shape animate-float-slow"></div>
                <div className="absolute bottom-32 right-1/4 x-lg-xl x-white-medium x-shape animate-float-medium"></div>
                <div className="absolute top-1/2 right-1/3 x-lg x-gold-secondary x-shape animate-float-fast"></div>
                <div className="absolute bottom-1/4 left-1/3 x-lg x-gold-light x-shape animate-float-slow"></div>

                <div className="absolute top-1/4 right-20 x-md x-white-medium x-shape animate-bounce-slow"></div>
                <div className="absolute bottom-1/4 left-24 x-md-lg x-gold-dark x-shape animate-pulse-slow"></div>
                <div className="absolute top-2/3 left-1/3 x-md x-gold-accent x-shape animate-bounce-medium"></div>
                <div className="absolute top-1/3 right-1/4 x-md x-white-strong x-shape animate-float-medium"></div>

                <div className="absolute top-40 right-1/2 x-sm-md x-gold-primary x-shape animate-float-fast"></div>
                <div className="absolute bottom-40 left-1/2 x-sm x-white-strong x-shape animate-bounce-fast"></div>
                <div className="absolute top-1/3 left-20 x-sm-md x-gold-secondary x-shape animate-float-medium"></div>
                <div className="absolute bottom-1/2 right-1/3 x-sm x-gold-light x-shape animate-pulse-slow"></div>
            </div>

            <div className="relative z-10 max-w-7xl w-full">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black mb-8 lg:mb-10">
                    Why Texalya
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-8 lg:mb-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group perspective-1000 min-h-[200px]"
                        >
                            <div className="relative w-full h-full min-h-[200px] transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
                                <div className="absolute inset-0 backface-hidden bg-white/95 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-lg flex flex-col items-center justify-center text-center">
                                    <div className="bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-secondary)] rounded-xl w-16 h-16 flex items-center justify-center mb-4 flex-shrink-0 shadow-md text-white">
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-lg lg:text-xl font-bold text-black">
                                        {feature.title}
                                    </h3>
                                </div>

                                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black rounded-2xl p-5 lg:p-6 shadow-2xl flex flex-col">
                                    <div className="bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-secondary)] rounded-xl w-12 h-12 flex items-center justify-center mb-3 flex-shrink-0 shadow-md text-white">
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-base lg:text-lg font-bold text-white mb-3">
                                        {feature.title}
                                    </h3>

                                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link  href="/signup">
                        <button className="bg-black text-white px-10 py-3.5 rounded-full text-sm lg:text-base font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300">
                            Get Started
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default WhyTexalya;