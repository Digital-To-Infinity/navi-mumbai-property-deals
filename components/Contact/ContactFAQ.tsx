"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, HelpCircle, ChevronRight, MessageCircle, Home, Shield, Search, Sparkles } from "lucide-react";

const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "buying", label: "Property Search", icon: Home },
    { id: "legal", label: "Financial & Legal", icon: Shield },
    { id: "services", label: "Our Services", icon: Sparkles },
];

const faqs = [
    {
        category: "buying",
        question: "How long does it take to find a property through your agency?",
        answer: "Typically, our clients find their ideal home within 7-14 days. We leverage our deep local network and 'off-market' listings in <strong>Kharghar</strong> and <strong>Panvel</strong> which aren't available on public portals. Our streamlined process ensures you only see the highest-potential matches."
    },
    {
        category: "services",
        question: "Do you charge any brokerage fees for new projects?",
        answer: "For most <strong>RERA-registered</strong> new construction projects, where we represent the developer, there is ZERO brokerage fee collected from the buyer. We get compensated by the developers. For resale properties, standard professional fees apply based on the transaction type."
    },
    {
        category: "legal",
        question: "Can you help with home loan processing?",
        answer: "Absolutely. We have strategic partnerships with top banks like <strong>HDFC</strong>, <strong>ICICI</strong>, and <strong>SBI</strong>. We assist with documentation and secure the fastest possible approvals for our clients, often at preferential interest rates."
    },
    {
        category: "legal",
        question: "What legal checks do you perform on properties?",
        answer: "Our team performs a rigorous 22-point verification process including Title Deed check, <strong>CIDCO Transfer</strong> history, Occupation Certificate (OC) status, and <strong>RERA compliance</strong>. We ensure every transaction is legally sound before you commit."
    },
    {
        category: "buying",
        question: "Can I visit properties on weekends and public holidays?",
        answer: "Yes, we understand our clients have busy schedules. Our dedicated relationship managers are available for site visits 7 days a week, including early morning or late evening slots to suit your convenience."
    },
    {
        category: "services",
        question: "What areas of Navi Mumbai do you specialize in?",
        answer: "We have hyper-local expertise in <strong>Kharghar</strong>, <strong>Panvel</strong>, <strong>Ulwe</strong>, <strong>Taloja</strong>, and <strong>Seawoods</strong>. These are the fastest-growing hubs with the highest potential for both living and investment appreciation, especially with the connectivity of <strong>Atal Setu</strong>."
    },
    {
        category: "legal",
        question: "What hidden costs should I be aware of when buying?",
        answer: "Beyond the property price, you should budget for Stamp Duty (usually 6-7% in Navi Mumbai), Registration fees, GST (for under-construction units), and <strong>CIDCO Transfer</strong> charges if applicable. We provide a transparent cost sheet upfront."
    },
    {
        category: "buying",
        question: "Do you have exclusive 'off-market' investment opportunities?",
        answer: "Yes, our privileged relationships with top developers grant us access to 'Pre-Launch' prices and 'Silent Listings' that are never advertised to the general public. These often offer the best ROI for our investor clients."
    }
];

export default function ContactFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [activeCategory, setActiveCategory] = useState("all");
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const filteredFaqs = activeCategory === "all"
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory);

    return (
        <section className="py-16 px-4 relative overflow-hidden bg-brand-white" ref={containerRef}>
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px]" />

            <div className="container mx-auto relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest mb-6">
                        <HelpCircle size={14} className="animate-pulse" aria-hidden="true" /> Knowledge Hub
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-brand-heading mb-6 tracking-tight leading-[1.1]">
                        Explore Our <span className="text-brand-primary italic">Knowledge Hub</span>
                    </h2>
                    <p className="text-brand-paragraph text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                        Empowering your property decisions with expert clarity. We've compiled the most frequent inquiries from our clients in Navi Mumbai.
                    </p>
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-20"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveCategory(cat.id);
                                setOpenIndex(null);
                            }}
                            aria-label={`Filter questions by ${cat.label}`}
                            className={`flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-300 group shadow-sm cursor-pointer ${activeCategory === cat.id
                                ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-105"
                                : "bg-white border-neutral-border text-brand-heading hover:border-brand-primary/30 hover:shadow-md"
                                }`}
                        >
                            <cat.icon size={18} className={activeCategory === cat.id ? "text-white" : "text-brand-primary"} aria-hidden="true" />
                            <span className="font-bold whitespace-nowrap">{cat.label}</span>
                        </button>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* FAQ List */}
                    <div className="lg:col-span-8">
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {filteredFaqs.map((faq, idx) => (
                                    <motion.div
                                        key={faq.question}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        className={`group rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${openIndex === idx
                                            ? 'bg-white border-brand-primary shadow-2xl shadow-brand-primary/10'
                                            : 'bg-white border-neutral-border hover:border-brand-primary/20 hover:bg-white'
                                            }`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-4 md:p-6 text-left outline-none cursor-pointer"
                                        >
                                            <div className="flex gap-6 items-center">
                                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${openIndex === idx ? 'bg-brand-primary scale-150' : 'bg-gray-300'}`} />
                                                <span className={`text-base md:text-lg font-bold pr-8 transition-colors duration-300 ${openIndex === idx ? 'text-brand-primary' : 'text-brand-heading group-hover:text-brand-primary-hover'}`}>
                                                    {faq.question}
                                                </span>
                                            </div>
                                            <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${openIndex === idx ? 'bg-brand-primary text-white rotate-180 shadow-lg shadow-brand-primary/30' : 'bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary/10'}`}>
                                                {openIndex === idx ? <Minus size={22} aria-hidden="true" /> : <Plus size={22} aria-hidden="true" />}
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {openIndex === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-10 md:px-14 pb-10 text-brand-paragraph text-base leading-relaxed border-t border-brand-primary/5">
                                                        <div className="pt-6 relative">
                                                            <div className="absolute left-[-26px] top-6 bottom-0 w-[2px] bg-brand-primary/20" />
                                                            {faq.answer}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {filteredFaqs.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-24 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200"
                                >
                                    <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
                                        <Search size={40} aria-hidden="true" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand-heading mb-2">No matching questions</h3>
                                    <p className="text-brand-paragraph">Try selecting another category to find what you're looking for.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* CTA Sidebar Card */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="p-10 rounded-[3.5rem] bg-brand-dark text-white relative group cursor-pointer overflow-hidden shadow-2xl shadow-brand-dark/20 border border-white/5"
                        >
                            <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700">
                                <MessageCircle size={200} aria-hidden="true" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 backdrop-blur-md border border-brand-primary/30 flex items-center justify-center text-brand-primary mb-8 shadow-inner">
                                    <MessageCircle size={28} aria-hidden="true" />
                                </div>
                                <h4 className="font-black text-3xl !text-brand-white mb-4 leading-tight">Private <br />Consultation</h4>
                                <p className="text-brand-muted text-base mb-8 leading-relaxed">
                                    Our strategies are tailored to your family goals. Get direct expert advice for your property journey.
                                </p>
                                <a
                                    href="https://wa.me/919876543210?text=Hi, I have some questions about properties in Navi Mumbai. Can you help me?"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Contact us on WhatsApp for a private consultation"
                                    className="inline-flex items-center gap-3 px-6 py-4 bg-brand-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl group-hover:gap-5 hover:bg-brand-primary-hover transition-all"
                                >
                                    Talk to an Expert <ChevronRight size={18} aria-hidden="true" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
