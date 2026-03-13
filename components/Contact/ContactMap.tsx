"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, ExternalLink, TrainFront, Car, Building2, Clock, ShieldCheck } from "lucide-react";
import { useRef } from "react";

const locationHighlights = [
    {
        icon: TrainFront,
        title: "Metro Connectivity",
        desc: "5 mins from Kharghar Metro Station",
        color: "blue"
    },
    {
        icon: Car,
        title: "Highway Access",
        desc: "Direct access to Sion-Panvel Highway",
        color: "amber"
    },
    {
        icon: Building2,
        title: "Business Hub",
        desc: "Located in Central Business District",
        color: "emerald"
    }
];

export default function ContactMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={containerRef} className="py-16 max-[769px]:px-4 overflow-hidden bg-brand-white relative">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"
                />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #baa360 1px, transparent 0)`, backgroundSize: '40px 40px' }}
                />
            </div>

            <div className="container mx-auto relative z-10">
                {/* Top Centered Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto mb-16 max-[426px]:mb-8 space-y-6"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 backdrop-blur-sm shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">Office HQ</span>
                    </div>

                    <h2 className="text-7xl max-[769px]:text-6xl max-[426px]:text-5xl max-[376px]:text-4xl font-black text-brand-heading leading-[1.1] tracking-tight">
                        Where Strategy Meets <br />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-brand-primary italic">Convenience</span>
                            <svg className="absolute -bottom-2 left-0 w-full h-4 text-brand-primary/20 -rotate-1" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>

                    <p className="text-brand-paragraph text-xl max-[426px]:text-lg leading-relaxed font-medium max-w-4xl mx-auto">
                        Visit us at our Kharghar headquarters to discuss your real estate goals in an environment designed for clarity and success.
                    </p>
                </motion.div>

                {/* Location Advantage Grid */}
                <div className="grid grid-cols-1 min-[770px]:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
                    {locationHighlights.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-brand-primary/5 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all duration-500"
                        >
                            <div className={`p-4 rounded-2xl bg-brand-primary/10 text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500`}>
                                <item.icon size={26} aria-hidden="true" />
                            </div>
                            <div className="flex flex-col min-[427px]:max-[769px]:flex-col min-[427px]:max-[769px]:items-start">
                                <h4 className="text-brand-heading font-black text-lg max-[321px]:text-base mb-1 min-[427px]:max-[769px]:mb-0 whitespace-nowrap">{item.title}</h4>
                                <p className="text-brand-paragraph text-sm max-[376px]:text-xs font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col gap-12 max-w-6xl mx-auto">
                    {/* Top: Map Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] max-[321px]:h-[300px] w-full"
                    >
                        <div className="h-full w-full rounded-[3.5rem] overflow-hidden border-8 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-zinc-100 group relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15086.5367351631!2d73.056!3d19.027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24052e100f3%3A0xb6e323bc6a2191!2sKharghar%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Navi Mumbai Property Deals Kharghar Office Location"
                                className="transition-all duration-700 group-hover:scale-105 group-hover:filter-none grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0"
                            />

                            {/* Subtle Overlay Gradient */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-brand-heading/10 via-transparent to-transparent opacity-60" />

                            {/* Premium Marker Overlay */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <div className="relative">
                                    <motion.div
                                        animate={{
                                            scale: [1, 2.5, 1],
                                            opacity: [0.6, 0, 0.6]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-x-[-40px] inset-y-[-40px] bg-brand-primary rounded-full blur-2xl"
                                    />
                                    <div className="relative w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500 border-2 border-brand-primary/20">
                                        <MapPin size={28} className="text-brand-primary fill-brand-primary/10" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Interaction Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                className="absolute bottom-10 max-[321px]:bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-xl flex items-center gap-3 min-w-[max-content]"
                            >
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-black text-brand-heading uppercase tracking-tighter">Live Business Hours Status</span>
                            </motion.div>
                        </div>

                        {/* Decorative Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -left-6 p-5 bg-white rounded-3xl shadow-xl border border-brand-primary/5 z-20 hidden xl:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                    <Building2 size={20} aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-brand-primary tracking-widest leading-none">Main Office</p>
                                    <p className="text-sm font-bold text-brand-heading">Premium Hub</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom: Address Card / CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative group p-10 md:p-14 max-[376px]:p-6 rounded-[3.5rem] bg-brand-heading text-white overflow-hidden shadow-2xl w-full"
                    >
                        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />

                        <div className="relative z-10 flex flex-col min-[770px]:flex-row items-center max-[769px]:items-start justify-between gap-12">
                            <div className="space-y-8 flex-1 w-full">
                                <div className="flex flex-col min-[770px]:space-y-8 max-[769px]:flex-row max-[769px]:items-center max-[769px]:gap-x-6 max-[769px]:gap-y-6 max-[769px]:flex-wrap">
                                    <div className="flex items-center gap-5 max-[769px]:contents">
                                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                                            <Navigation size={32} className="text-brand-primary" aria-hidden="true" />
                                        </div>
                                        <div className="max-[769px]:contents">
                                            <h4 className="font-black text-4xl max-[376px]:text-3xl max-[321px]:text-2xl tracking-tight !text-white leading-none">Platinum Heights</h4>
                                            <p className="text-brand-primary text-sm max-[376px]:text-xs font-black uppercase tracking-[0.3em] max-[321px]:tracking-[0.1em] mt-3 max-[769px]:mt-0">Corporate Headquarters</p>
                                        </div>
                                    </div>
                                    <address className="text-brand-muted font-medium text-2xl max-[426px]:text-xl max-[321px]:text-lg leading-relaxed max-w-2xl not-italic">
                                        Shop 12, Sector 20, Kharghar,<br />
                                        Navi Mumbai, Maharashtra 410210
                                    </address>
                                </div>

                                <div className="flex flex-wrap gap-6 mt-10">
                                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 text-base max-[321px]:text-sm font-bold border border-white/5">
                                        <Clock size={20} className="text-brand-primary" aria-hidden="true" />
                                        Mon - Sat: 10AM - 8PM
                                    </div>
                                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 text-base max-[321px]:text-sm font-bold border border-white/5">
                                        <ShieldCheck size={20} className="text-brand-primary" aria-hidden="true" />
                                        Verified HQ
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.open('https://maps.app.goo.gl/KhargharLocation', '_blank')}
                                    aria-label="Navigate to our Kharghar office using Google Maps"
                                    title="Open Google Maps"
                                    className="w-full md:w-auto px-12 max-[321px]:px-6 py-6 max-[769px]:py-5 bg-brand-primary text-brand-white font-black rounded-[1.5rem] flex items-center justify-center gap-4 hover:bg-brand-primary-hover transition-all cursor-pointer text-xl group"
                                >
                                    Navigate Now
                                    <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
