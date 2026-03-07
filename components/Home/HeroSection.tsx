"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Home, Building } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState("buy");

    const tabs = [
        { id: "buy", label: "Buy", icon: Home },
        { id: "rent", label: "Rent", icon: MapPin },
        { id: "commercial", label: "Commercial", icon: Building },
    ];

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-cream/30">
            {/* Background with an abstract modern pattern or gradient */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-cream/80 via-white to-brand-neutral-bg/50 z-0"></div>

            {/* Decorative Orbs */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] z-0"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-10 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] z-0"
            />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center pt-20 pb-16">

                {/* Main Heading Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-12"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm mb-6 border border-brand-primary/20"
                    >
                        Premium Real Estate in Navi Mumbai
                    </motion.span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-heading leading-tight mb-6">
                        Find Your <span className="text-brand-primary relative">
                            Perfect Home
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                        <br />
                        With Confidence
                    </h1>
                    <p className="text-lg md:text-xl text-brand-paragraph max-w-2xl mx-auto">
                        Discover the finest properties across Navi Mumbai. Whether you're looking to buy, sell, or rent, we're here to guide you every step of the way.
                    </p>
                </motion.div>

                {/* Interactive Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-4xl bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/50"
                >
                    {/* Tabs */}
                    <div className="flex space-x-2 mb-6 border-b border-brand-neutral-border pb-4">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                            ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                                            : "bg-transparent text-brand-paragraph hover:bg-brand-primary/10 hover:text-brand-primary"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Search Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 relative">
                            <label className="block text-xs font-semibold text-brand-heading mb-1.5 ml-1">Location</label>
                            <div className="relative flex items-center">
                                <MapPin className="absolute left-3 w-5 h-5 text-brand-primary" />
                                <input
                                    type="text"
                                    placeholder="E.g. Vashi, Kharghar, Seawoods..."
                                    className="w-full pl-10 pr-4 py-3 bg-brand-neutral-bg/50 border border-brand-neutral-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-semibold text-brand-heading mb-1.5 ml-1">Property Type</label>
                            <select className="w-full px-4 py-3 bg-brand-neutral-bg/50 border border-brand-neutral-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none transition-all appearance-none cursor-pointer">
                                <option value="">Any Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="villa">Villa</option>
                                <option value="plot">Plot / Land</option>
                                <option value="builder-floor">Builder Floor</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button className="w-full h-[50px] bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50 group">
                                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Search</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
                >
                    {[
                        { value: "500+", label: "Premium Properties" },
                        { value: "10k+", label: "Happy Customers" },
                        { value: "15+", label: "Years Experience" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <h4 className="text-3xl md:text-4xl font-bold text-brand-heading mb-1">{stat.value}</h4>
                            <p className="text-sm font-medium text-brand-paragraph">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
