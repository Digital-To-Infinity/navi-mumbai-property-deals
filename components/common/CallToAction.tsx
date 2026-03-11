"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="py-16 bg-brand-white relative overflow-hidden" aria-labelledby="cta-heading">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-brand-primary-hover rounded-[3rem] overflow-hidden relative shadow-[0_20px_50px_-20px_rgba(186,163,96,0.5)]"
                >
                    {/* Decorative Pattern Background */}
                    <div className="absolute inset-0 opacity-10" aria-hidden="true">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px]" aria-hidden="true" />

                    <div className="px-6 py-8 md:py-12 md:px-20 max-[376px]:p-4 flex flex-col items-center text-center relative z-10">

                        <h2 id="cta-heading" className="text-4xl md:text-5xl lg:text-6xl max-[321px]:text-2xl font-black !text-neutral-border mb-6 leading-tight">
                            Ready to Find Your <br className="hidden md:block" />
                            <span className="!text-brand-white italic">Dream Property?</span>
                        </h2>

                        <p className="text-white/90 text-lg md:text-xl max-[321px]:text-lg max-w-3xl mx-auto mb-10 font-medium">
                            Join thousands of satisfied homeowners. Our expert team is ready to guide you through a seamless real estate journey in Navi Mumbai.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <Link href="/about" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-brand-white bg-brand-button hover:bg-brand-button-hover rounded-full shadow-lg hover:shadow-brand-primary/30 overflow-hidden transition-all duration-300 cursor-pointer border-none max-[426px]:w-full"
                                    aria-label="Browse exclusive property listings in Navi Mumbai"
                                    title="View all available residential and luxury properties"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out skew-x-12" aria-hidden="true" />
                                    <span className="relative flex items-center gap-3">
                                        Browse Properties
                                        <div className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                                            <ArrowRight className="w-4 h-4 text-brand-white" aria-hidden="true" />
                                        </div>
                                    </span>
                                </motion.button>
                            </Link>

                            <button
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-white font-bold text-lg max-[321px]:text-base rounded-full hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm cursor-pointer active:scale-[0.98]"
                                aria-label="Contact our real estate experts for personalized guidance"
                                title="Get in touch with an expert advisor"
                            >
                                Contact an Expert
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

