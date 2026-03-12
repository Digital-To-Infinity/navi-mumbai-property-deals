"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ChevronRight, MessageCircle } from "lucide-react";

const faqs = [
    {
        question: "How long does it take to find a property through your agency?",
        answer: "Typically, our clients find their ideal home within 7-14 days. We leverage our deep local network and 'off-market' listings in Kharghar and Panvel which aren't available on public portals."
    },
    {
        question: "Do you charge any brokerage fees for new projects?",
        answer: "For most RERA-registered new construction projects, where we represent the developer, there is ZERO brokerage fee collected from the buyer. We get compensated by the developers."
    },
    {
        question: "Can you help with home loan processing?",
        answer: "Absolutely. We have strategic partnerships with top banks like HDFC, ICICI, and SBI. We assist with documentation and secure the fastest possible approvals for our clients."
    },
    {
        question: "What legal checks do you perform on properties?",
        answer: "Our team performs a rigorous 22-point verification process including Title Deed check, CIDCO Transfer history, Occupation Certificate (OC) status, and RERA compliance."
    }
];

export default function ContactFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-4 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest mb-6">
                            <HelpCircle size={14} /> Knowledge Center
                        </div>
                        <h2 className="text-4xl font-black text-brand-heading mb-6 tracking-tight">
                            Quick Answers for <br />
                            <span className="text-brand-primary italic">Your Property Search</span>
                        </h2>
                        <p className="text-brand-paragraph mb-8 leading-relaxed text-lg">
                            We've compiled answers to the most common questions our clients ask during their property search journey in Navi Mumbai.
                        </p>

                        <div className="p-8 rounded-[2.5rem] bg-white border border-neutral-border relative group cursor-pointer overflow-hidden shadow-xl shadow-brand-primary/5">
                            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                                    <MessageCircle size={24} />
                                </div>
                                <h4 className="text-brand-heading font-bold text-xl mb-2">Still have questions?</h4>
                                <p className="text-brand-paragraph text-sm mb-6">Our strategy sessions are tailored to your budget and family goals.</p>
                                <motion.span
                                    className="text-brand-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
                                >
                                    Book a Free Consultation <ChevronRight size={16} />
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:w-2/3 space-y-6">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${openIndex === idx
                                        ? 'bg-white border-brand-primary/40 shadow-2xl shadow-brand-primary/10'
                                        : 'bg-white/50 border-neutral-border hover:border-brand-primary/20 hover:bg-white'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-8 text-left outline-none"
                                >
                                    <span className={`text-xl font-bold pr-8 transition-colors duration-300 ${openIndex === idx ? 'text-brand-primary' : 'text-brand-heading'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'bg-brand-primary text-black rotate-180' : 'bg-brand-primary/10 text-brand-primary'}`}>
                                        {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-8 pt-0 text-brand-paragraph text-lg leading-relaxed border-t border-brand-primary/5 mt-[-1px]">
                                                <div className="pt-6">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
