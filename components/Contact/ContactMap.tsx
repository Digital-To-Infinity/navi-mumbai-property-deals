"use client";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export default function ContactMap() {
    return (
        <section className="py-24 px-4 overflow-hidden bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 space-y-10"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                                <MapPin size={16} className="text-brand-primary" />
                                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">Our Presence</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-brand-heading leading-tight tracking-tight">
                                Find Us in the Heart of <br />
                                <span className="text-brand-primary italic">Navi Mumbai</span>
                            </h2>

                            <p className="text-brand-paragraph text-lg leading-relaxed max-w-xl">
                                Our main office is strategically located in Kharghar, the residential hub of Navi Mumbai. We're easily accessible via the Sion-Panvel Highway and just minutes away from the upcoming international airport.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-1 gap-6">
                            <div className="group flex items-start gap-6 p-8 rounded-[2rem] bg-brand-cream/20 border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300">
                                <div className="p-4 rounded-2xl bg-white text-brand-primary shadow-lg border border-brand-primary/5 group-hover:scale-110 transition-transform">
                                    <Navigation size={28} />
                                </div>
                                <div>
                                    <h4 className="text-brand-heading font-black text-xl mb-2">Corporate Office</h4>
                                    <p className="text-brand-paragraph/80 leading-relaxed font-medium">
                                        Shop 12, Platinum Heights,<br />
                                        Sector 20, Kharghar,<br />
                                        Navi Mumbai, 410210
                                    </p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-10 py-5 bg-brand-heading text-white font-bold rounded-2xl flex items-center gap-3 shadow-xl shadow-brand-heading/10 hover:shadow-brand-heading/20 transition-all"
                        >
                            Get Directions
                            <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-neutral-border shadow-2xl group"
                    >
                        {/* Styled Map Container */}
                        <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center transition-all duration-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7456729505!2d73.0645!3d19.0333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24052e100f3%3A0xb6e323bc6a2191!2sKharghar%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            />
                        </div>

                        {/* Premium Marker Overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        scale: [1, 2, 1],
                                        opacity: [0.5, 0, 0.5]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-brand-primary rounded-full blur-xl"
                                />
                                <div className="relative w-10 h-10 bg-white rounded-full border-[6px] border-brand-primary shadow-2xl flex items-center justify-center">
                                    <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Interaction UI */}
                        <div className="absolute bottom-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-lg space-y-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Official Office</p>
                            <p className="text-xs font-bold text-brand-heading">Open 10:00 AM - 8:00 PM</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
