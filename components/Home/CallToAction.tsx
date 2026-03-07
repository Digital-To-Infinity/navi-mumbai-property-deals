"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-24 bg-brand-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-brand-primary rounded-[3rem] overflow-hidden relative shadow-[0_20px_50px_-20px_rgba(186,163,96,0.5)]"
                >
                    {/* Decorative Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px]" />

                    <div className="px-6 py-16 md:py-24 md:px-20 flex flex-col items-center text-center relative z-10">

                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-xl">
                            <Home className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Ready to Find Your <br className="hidden md:block" />
                            Dream Property?
                        </h2>

                        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                            Join thousands of satisfied homeowners. Our expert team is ready to guide you through a seamless real estate journey in Navi Mumbai.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 bg-white text-brand-primary font-bold text-lg rounded-full hover:bg-brand-neutral-bg hover:shadow-xl hover:shadow-white/20 transition-all flex items-center justify-center group">
                                Browse Properties
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/50 text-white font-bold text-lg rounded-full hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm">
                                Contact an Expert
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center justify-center gap-8 mt-12 pt-12 border-t border-white/20 w-full max-w-lg">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <img
                                        key={i}
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt="User"
                                        className="w-10 h-10 rounded-full border-2 border-brand-primary shadow-sm"
                                    />
                                ))}
                            </div>
                            <div className="text-left">
                                <div className="flex text-amber-300 text-sm">
                                    ★ ★ ★ ★ ★
                                </div>
                                <span className="text-white text-sm font-medium">Trusted by 10k+ users</span>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
