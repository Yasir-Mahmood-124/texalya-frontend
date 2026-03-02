"use client";

import { Lightbulb, Settings, Rocket, Calendar, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const WhyTexalya = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1, rootMargin: "-50px" }
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

    const features = [
        {
            icon: <Lightbulb className="w-5 h-5" />,
            number: "01",
            title: "AI Pattern Generator",
            description: "Turn text prompts into seamless fabric patterns instantly with AI-powered design tools"
        },
        {
            icon: <Calendar className="w-5 h-5" />,
            number: "02",
            title: "Smart Scheduler & Calendar",
            description: "Manage production timelines, allocate resources, and avoid delays with intelligent planning"
        },
        {
            icon: <Users className="w-5 h-5" />,
            number: "03",
            title: "CRM & Workflow Dashboard",
            description: "Track clients, manage orders, create invoices, and streamline your entire workflow"
        },
        {
            icon: <TrendingUp className="w-5 h-5" />,
            number: "04",
            title: "Analytics & Insights",
            description: "Forecast demand, analyze supplier performance, and make data-driven decisions"
        },
        {
            icon: <Settings className="w-5 h-5" />,
            number: "05",
            title: "Fabric Estimator",
            description: "Calculate precise fabric requirements to reduce wastage and optimize material costs"
        },
        {
            icon: <Rocket className="w-5 h-5" />,
            number: "06",
            title: "All-in-One Platform",
            description: "Unified SaaS solution replacing multiple tools from AI-driven creation to CRM and scheduling"
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-20 left-1/4 w-80 h-80 rounded-full blur-3xl"
                    style={{ backgroundColor: "var(--gold-primary)", opacity: 0.04 }}
                />
                <div
                    className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: "var(--gold-secondary)", opacity: 0.04 }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
                    style={{ backgroundColor: "var(--gold-primary)", opacity: 0.02 }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <div
                    className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {/* Label badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
                        style={{
                            borderColor: "color-mix(in srgb, var(--gold-primary) 30%, transparent)",
                            backgroundColor: "color-mix(in srgb, var(--gold-primary) 8%, transparent)"
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: "var(--gold-primary)" }}
                        />
                        <span
                            className="text-xs font-semibold tracking-widest uppercase"
                            style={{ color: "var(--gold-primary)" }}
                        >
                            Why Xlya
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        Everything your textile business{" "}
                        <span style={{ color: "var(--gold-primary)" }}>needs</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        One unified platform built for the modern textile industry — from AI-driven design to full business operations.
                    </p>
                </div>

                {/* Feature cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12 sm:mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-2xl p-6 lg:p-7 overflow-hidden transition-all duration-700 hover:-translate-y-1.5 ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                            style={{
                                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                                backgroundColor: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)"
                            }}
                        >
                            {/* Top edge gold line — appears on hover */}
                            <div
                                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
                                style={{
                                    background: "linear-gradient(90deg, transparent, var(--gold-primary), transparent)"
                                }}
                            />

                            {/* Hover border glow */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--gold-primary) 25%, transparent)"
                                }}
                            />

                            {/* Card content */}
                            <div className="relative z-10">
                                {/* Icon + faded number row */}
                                <div className="flex items-start justify-between mb-5">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                                        style={{
                                            background: "linear-gradient(135deg, var(--gold-primary), color-mix(in srgb, var(--gold-primary) 60%, #000))"
                                        }}
                                    >
                                        {feature.icon}
                                    </div>
                                    <span
                                        className="text-4xl font-bold tabular-nums select-none leading-none"
                                        style={{ color: "color-mix(in srgb, var(--gold-primary) 15%, transparent)" }}
                                    >
                                        {feature.number}
                                    </span>
                                </div>

                                <h3 className="text-lg lg:text-xl font-bold text-white mb-2.5 group-hover:text-[var(--gold-primary)] transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className={`flex justify-center transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: isVisible ? "700ms" : "0ms" }}
                >
                    <Link href="/auth/signup">
                        <button className="animate-button-gradient text-white px-10 py-3.5 rounded-full text-sm lg:text-base font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300">
                            Get Started Free
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WhyTexalya;
