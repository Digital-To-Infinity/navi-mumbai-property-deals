"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, ChevronRight, CheckCircle2, Building2 } from "lucide-react";
import api from "@/lib/api";

const options = [
    { value: "buy", label: "Buying Property" },
    { value: "rent", label: "Renting Property" },
    { value: "sell", label: "Selling Property" },
    { value: "investment", label: "Real Estate Investment" },
    { value: "other", label: "Other Inquiry" }
];

export default function ContactForm() {
    const [focused, setFocused] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await api.post("/enquiries", {
                ...formData,
                enquiryType: selectedOption,
                source: "website-contact"
            });
            
            setIsSuccess(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
            setSelectedOption(null);
            
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        } catch (err: any) {
            console.error("Enquiry submission error:", err);
            setError(err.message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = (name: string) => `
        w-full bg-white border-b-2 pr-10 py-4 text-brand-heading outline-none transition-all duration-300 placeholder:text-brand-paragraph/40 font-medium
        ${focused === name ? 'border-brand-primary' : 'border-neutral-border hover:border-brand-primary/30'}
        ${name === 'message' ? 'resize-none' : ''}
    `;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            id="contact-form"
            className="group relative p-8 md:p-12 max-[426px]:px-4 rounded-[3rem] bg-white border border-neutral-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden"
        >
            {/* Premium Header Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary via-brand-primary/50 to-brand-primary" />

            <div className="relative z-10 min-h-[500px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="form-content"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                        <Building2 size={20} aria-hidden="true" />
                                    </div>
                                    <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Send Inquiry</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl max-[321px]:text-2xl font-bold text-brand-heading mb-4 max-[321px]:mb-2">How can we help?</h2>
                                <p className="text-brand-paragraph text-lg max-[321px]:text-base">Leave your details and our property experts will get back to you within 24 hours.</p>
                            </div>

                            <form className="space-y-10" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                                        {error}
                                    </div>
                                )}
                                <div className="relative group/input">
                                    <label className={`absolute left-0 -top-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${focused === 'name' ? 'text-brand-primary' : 'text-brand-paragraph'}`}>Full Name *</label>
                                    <User className={`absolute right-0 bottom-4 w-5 h-5 transition-colors duration-300 ${focused === 'name' ? 'text-brand-primary' : 'text-brand-paragraph/30'}`} aria-hidden="true" />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        id="full-name"
                                        className={inputClasses('name')}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Enter your name"
                                        aria-describedby="name-label"
                                    />
                                    <span id="name-label" className="sr-only">Please enter your full name</span>
                                </div>

                                <div className="relative group/input">
                                    <label className={`absolute left-0 -top-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${focused === 'email' ? 'text-brand-primary' : 'text-brand-paragraph'}`}>Email Address</label>
                                    <Mail className={`absolute right-0 bottom-4 w-5 h-5 transition-colors duration-300 ${focused === 'email' ? 'text-brand-primary' : 'text-brand-paragraph/30'}`} aria-hidden="true" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        id="email-address"
                                        className={inputClasses('email')}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="name@example.com"
                                        aria-describedby="email-label"
                                    />
                                    <span id="email-label" className="sr-only">Please enter your email address for communication</span>
                                </div>

                                <div className="relative group/input">
                                    <label className={`absolute left-0 -top-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${focused === 'phone' ? 'text-brand-primary' : 'text-brand-paragraph'}`}>Mobile Number *</label>
                                    <Phone className={`absolute right-0 bottom-4 w-5 h-5 transition-colors duration-300 ${focused === 'phone' ? 'text-brand-primary' : 'text-brand-paragraph/30'}`} aria-hidden="true" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        autoComplete="tel"
                                        id="phone-number"
                                        className={inputClasses('phone')}
                                        onFocus={() => setFocused('phone')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="+91 00000 00000"
                                        aria-describedby="phone-label"
                                    />
                                    <span id="phone-label" className="sr-only">Please enter your mobile number</span>
                                </div>

                                <div className="relative">
                                    <label className={`absolute left-0 -top-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${focused === 'subject' || isDropdownOpen ? 'text-brand-primary' : 'text-brand-paragraph'}`}>Enquiry Type *</label>
                                    <div
                                        className={`relative cursor-pointer transition-all duration-300 border-b-2 py-4 flex items-center justify-between ${isDropdownOpen || selectedOption ? 'border-brand-primary' : 'border-neutral-border hover:border-brand-primary/30'}`}
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span className={`font-medium ${selectedOption ? 'text-brand-heading' : 'text-brand-paragraph/40'}`}>
                                            {selectedOption ? options.find(opt => opt.value === selectedOption)?.label : "Select an option"}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            < ChevronRight className={`w-5 h-5 rotate-90 transition-colors duration-300 ${isDropdownOpen ? 'text-brand-primary' : 'text-brand-paragraph/30'}`} aria-hidden="true" />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute z-50 left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl rounded-[2rem] border border-neutral-border shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden py-3"
                                                >
                                                    {options.map((option) => (
                                                        <motion.div
                                                            key={option.value}
                                                            whileHover={{ backgroundColor: "rgba(186,163,96,0.08)", x: 5 }}
                                                            className={`px-8 py-4 cursor-pointer transition-all flex items-center justify-between group/opt ${selectedOption === option.value ? 'text-brand-primary font-black' : 'text-brand-heading hover:text-brand-primary'}`}
                                                            onClick={() => {
                                                                setSelectedOption(option.value);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${selectedOption === option.value ? 'bg-brand-primary scale-125' : 'bg-transparent group-hover/opt:bg-brand-primary/40'}`} />
                                                                <span className="text-base">{option.label}</span>
                                                            </div>
                                                            {selectedOption === option.value && (
                                                                <CheckCircle2 className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="relative group/input">
                                    <label className={`absolute left-0 -top-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${focused === 'message' ? 'text-brand-primary' : 'text-brand-paragraph'}`}>Message / Requirements</label>
                                    <MessageSquare className={`absolute right-0 top-6 w-5 h-5 transition-colors duration-300 ${focused === 'message' ? 'text-brand-primary' : 'text-brand-paragraph/30'}`} aria-hidden="true" />
                                    <textarea
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={inputClasses('message')}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Tell us about the property you're looking for..."
                                    />
                                </div>

                                <div className="relative group">
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 rounded-2xl bg-brand-primary text-white font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-brand-primary-hover relative overflow-hidden group/btn cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" aria-hidden="true" />
                                            </>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success-message"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-8 shadow-2xl shadow-emerald-500/20"
                            >
                                <CheckCircle2 size={48} aria-hidden="true" />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl font-black text-brand-heading mb-4"
                            >
                                Message Sent!
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-brand-paragraph text-xl max-w-sm mx-auto leading-relaxed mb-10"
                            >
                                We've received your inquiry. One of our property experts will reach out to you within <span className="text-brand-primary font-bold">24 hours</span>.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="mt-12"
                            >
                                <div className="inline-block px-4 py-2 rounded-full bg-zinc-50 border border-neutral-border text-xs text-brand-paragraph/50">
                                    Form will reset in a moment...
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Aesthetic Elements */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-brand-primary/10 transition-all duration-700" />
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-brand-primary/10 transition-all duration-700" />
        </motion.div>
    );
}

