"use client";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function ContactMap() {
    return (
        <section className="py-24 bg-zinc-950 px-4 overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 backdrop-blur-md">
                            <MapPin size={16} className="text-brand-primary" />
                            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">Our Presence</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Find Us in the Heart of <span className="text-brand-primary">Navi Mumbai</span>
                        </h2>

                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Our main office is strategically located in Kharghar, the residential hub of Navi Mumbai. We're easily accessible via the Sion-Panvel Highway.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                                <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
                                    <Navigation size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Corporate Office</h4>
                                    <p className="text-zinc-500 text-sm">Shop 12, Platinum Heights, Sector 20, Kharghar</p>
                                </div>
                            </div>
                        </div>

                        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3">
                            Open in Google Maps
                            <Navigation size={18} />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full aspect-square md:aspect-video rounded-[40px] overflow-hidden border border-white/10 group"
                    >
                        {/* Styled Map Placeholder */}
                        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7456729505!2d73.0645!3d19.0333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24052e100f3%3A0xb6e323bc6a2191!2sKharghar%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="invert-[0.9] hue-rotate-[180deg] contrast-[1.2]"
                            />
                        </div>

                        {/* Custom Marker Overlay (Visual only) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-brand-primary rounded-full blur-md opacity-50"
                                />
                                <div className="relative w-6 h-6 bg-brand-primary rounded-full border-4 border-black" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
