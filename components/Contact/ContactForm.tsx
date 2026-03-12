"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, ChevronRight } from "lucide-react";

export default function ContactForm() {
    const [focused, setFocused] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
    };

    const inputClasses = (name: string) => `
        w-full bg-zinc-900/50 border rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300
        ${focused === name ? 'border-brand-primary ring-4 ring-brand-primary/10 bg-zinc-900' : 'border-white/10 hover:border-white/20'}
    `;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            id="contact-form"
            className="relative p-10 rounded-[40px] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl"
        >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 group-hover:bg-brand-primary/20" />

            <div className="relative z-10">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
                    <p className="text-zinc-500">Expect a response within 2 business hours.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="relative group/input">
                            <span className="absolute right-6 top-4 text-zinc-600 transition-colors group-focus-within/input:text-brand-primary">
                                <User className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                required
                                className={inputClasses('name')}
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused(null)}
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="relative group/input">
                            <span className="absolute right-6 top-4 text-zinc-600 transition-colors group-focus-within/input:text-brand-primary">
                                <Mail className="w-5 h-5" />
                            </span>
                            <input
                                type="email"
                                required
                                className={inputClasses('email')}
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                                placeholder="Email Address"
                            />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="relative group/input">
                            <span className="absolute right-6 top-4 text-zinc-600 transition-colors group-focus-within/input:text-brand-primary">
                                <Phone className="w-5 h-5" />
                            </span>
                            <input
                                type="tel"
                                required
                                className={inputClasses('phone')}
                                onFocus={() => setFocused('phone')}
                                onBlur={() => setFocused(null)}
                                placeholder="Phone Number"
                            />
                        </div>
                        <div className="relative group/input">
                            <span className="absolute right-6 top-4 text-zinc-600">
                                <ChevronRight className="w-5 h-5 rotate-90" />
                            </span>
                            <select
                                required
                                className={`${inputClasses('subject')} appearance-none`}
                                onFocus={() => setFocused('subject')}
                                onBlur={() => setFocused(null)}
                            >
                                <option value="" disabled selected>Inquiry Type</option>
                                <option value="buy">Buying Property</option>
                                <option value="rent">Renting Property</option>
                                <option value="sell">Selling Property</option>
                                <option value="other">Other Inquiry</option>
                            </select>
                        </div>
                    </div>

                    <div className="relative group/input">
                        <span className="absolute right-6 top-4 text-zinc-600 transition-colors group-focus-within/input:text-brand-primary">
                            <MessageSquare className="w-5 h-5" />
                        </span>
                        <textarea
                            rows={5}
                            required
                            className={inputClasses('message')}
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused(null)}
                            placeholder="Tell us about your requirements..."
                        />
                    </div>

                    <motion.button
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 group transition-all duration-300 font-bold ${isSuccess
                                ? 'bg-emerald-500 text-white'
                                : 'bg-brand-primary text-black hover:shadow-[0_0_30px_rgba(186,163,96,0.3)]'
                            }`}
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                        ) : isSuccess ? (
                            <>Message Sent Successfully!</>
                        ) : (
                            <>
                                Send Inquiry
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </motion.button>

                    <p className="text-center text-xs text-zinc-600">
                        By submitting, you agree to our <a href="#" className="underline hover:text-brand-primary transition-colors">Privacy Policy</a>.
                    </p>
                </form>
            </div>
        </motion.div>
    );
}
