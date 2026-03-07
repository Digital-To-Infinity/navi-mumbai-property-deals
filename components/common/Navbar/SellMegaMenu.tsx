"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { User, Building2, Plus, ChevronRight } from 'lucide-react';
import { sellPropertyCategories } from './navData';

const sellCategories = ["For Owner", "For Builder"] as const;
type SellCategory = typeof sellCategories[number];

const categoryIcons: Record<SellCategory, React.ReactNode> = {
    "For Owner": <User size={18} strokeWidth={2} />,
    "For Builder": <Building2 size={18} strokeWidth={2} />
};

const sellBasePathMapping: Record<SellCategory, string> = {
    "For Owner": "/sell/owner",
    "For Builder": "/sell/builder"
};

// Animation Variants
const menuVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: { type: "spring", stiffness: 400, damping: 25, staggerChildren: 0.05 }
    },
    exit: { opacity: 0, y: 10, scale: 0.98, filter: 'blur(5px)', transition: { duration: 0.2 } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.05 }
    },
    exit: { opacity: 0, transition: { duration: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
        opacity: 1, x: 0,
        transition: { type: "spring", stiffness: 350, damping: 25 }
    }
};

const SellMegaMenu = () => {
    const [activeCategory, setActiveCategory] = useState<SellCategory>("For Owner");

    return (
        <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[1000px] bg-white/95 backdrop-blur-2xl border border-zinc-200/60 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col z-[110]"
        >
            {/* Top pointing triangle/arrow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-white/95 border-l border-t border-zinc-200/60 rotate-45 transform origin-center z-20"></div>

            <div className="flex w-full relative">
                {/* Left Sidebar */}
                <div className="w-[280px] shrink-0 bg-zinc-50/70 border-r border-zinc-200/60 flex flex-col p-5 relative z-10">
                    <div className="mb-4 px-2">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Selling Options</span>
                    </div>

                    <div className="flex flex-col gap-1 relative">
                        {sellCategories.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <div
                                    key={category}
                                    onMouseEnter={() => setActiveCategory(category)}
                                    className={`relative flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-colors duration-200 group z-10 ${isActive ? "text-brand-primary" : "text-brand-heading hover:text-brand-primary"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-sell-category-bg"
                                            className="absolute inset-0 bg-white shadow-sm border border-zinc-200/60 rounded-2xl -z-10"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}

                                    <div className="flex items-center gap-3">
                                        <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "text-zinc-400 group-hover:text-brand-primary group-hover:scale-110"}`}>
                                            {categoryIcons[category]}
                                        </div>
                                        <span className={`font-bold text-sm transition-all duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                                            {category}
                                        </span>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className={`transition-all duration-300 ${isActive
                                            ? "opacity-100 text-brand-primary translate-x-0"
                                            : "opacity-0 -translate-x-2 text-zinc-300 group-hover:opacity-100 group-hover:translate-x-0"
                                            }`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 p-8 bg-gradient-to-br from-white/60 to-white/30 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col h-full"
                        >
                            <motion.h3
                                variants={itemVariants}
                                className="text-2xl font-extrabold text-brand-heading mb-6 flex items-center gap-3"
                            >
                                <span className="bg-brand-primary/10 text-brand-primary p-2 rounded-xl">
                                    {categoryIcons[activeCategory]}
                                </span>
                                {activeCategory}
                            </motion.h3>

                            <div className="grid grid-cols-3 gap-x-6 gap-y-6 mt-2">
                                {Object.entries(sellPropertyCategories).map(([categoryName, links]) => (
                                    <motion.div variants={itemVariants} key={categoryName} className="flex flex-col gap-3">
                                        <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            {categoryName}
                                            <div className="h-px flex-1 bg-zinc-200/60"></div>
                                        </h4>
                                        <div className="flex flex-col gap-1.5">
                                            {links.map(link => (
                                                <Link
                                                    key={link.title}
                                                    href={`${sellBasePathMapping[activeCategory]}${link.href.replace('/sell', '')}`}
                                                    className="group flex flex-col gap-1 text-sm font-semibold text-brand-heading hover:text-brand-primary transition-colors py-1 pl-1"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-brand-primary group-hover:scale-150 transition-all duration-300"></div>
                                                        <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1 origin-left">
                                                            {link.title}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-brand-primary/5 rounded-full blur-3xl -z-10 translate-y-1/2"></div>
            </div>

            {/* Bottom Bar Footer */}
            <div className="w-full bg-zinc-50/80 border-t border-zinc-200/60 py-4 px-6 flex items-center justify-between z-20 backdrop-blur-md">
                <div className="flex flex-col gap-0.5">
                    <span className="text-brand-heading font-extrabold text-lg">Post Property</span>
                    <span className="text-zinc-500 text-sm font-medium">Start Selling Today</span>
                </div>
                <Link href="/add-property">
                    <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm cursor-pointer border border-transparent hover:border-brand-primary/20">
                        <Plus size={18} strokeWidth={2.5} />
                        Add Property
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default SellMegaMenu;
