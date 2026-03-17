"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { User, Building2, Plus, ChevronRight, BookOpenText, TrendingUp, MoveRight } from 'lucide-react';
import { sellPropertyCategories } from './navData';

import Breadcrumb from '../Breadcrumb';

const sellCategories = ["For Owner", "For Builder", "Blogs and Articles"] as const;
type SellCategory = typeof sellCategories[number];

const categoryIcons: Record<SellCategory, React.ReactNode> = {
    "For Owner": <User size={18} strokeWidth={2} />,
    "For Builder": <Building2 size={18} strokeWidth={2} />,
    "Blogs and Articles": <BookOpenText size={18} strokeWidth={2} />
};

const sellBasePathMapping: Record<SellCategory, string> = {
    "For Owner": "/sell-property-by-owner-navi-mumbai",
    "For Builder": "/sell-property-by-builder-navi-mumbai",
    "Blogs and Articles": ""
};

// Animation Variants
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

const SellMegaMenu = () => {
    const [activeCategory, setActiveCategory] = useState<SellCategory>("For Owner");

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Sell", href: "/sell" },
        { label: activeCategory, href: "#", active: true }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[min(1000px,95vw)] bg-white border border-zinc-200/80 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col z-[110]"
        >
            <div className="flex w-full relative">
                {/* Left Sidebar */}
                <div className="w-[280px] shrink-0 bg-zinc-50 border-r border-zinc-200 flex flex-col p-5 relative z-10">
                    <div className="mb-4 px-2">
                        <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Seller Hub Hierarchy</span>
                        <div className="mt-1">
                            <Breadcrumb items={breadcrumbItems} variant="minimal" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 relative" role="tablist" aria-orientation="vertical">
                        {sellCategories.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <div
                                    key={category}
                                    role="tab"
                                    tabIndex={0}
                                    aria-selected={isActive}
                                    onMouseEnter={() => setActiveCategory(category)}
                                    className={`relative flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-colors duration-200 group z-10 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${isActive ? "text-brand-primary" : "text-zinc-900 hover:text-brand-primary"
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
                                        <span className={`font-bold text-sm ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                                            {category}
                                        </span>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className={`transition-all duration-300 ${isActive ? "opacity-100 text-brand-primary translate-x-0" : "opacity-0 -translate-x-2 text-zinc-300"}`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 p-8 bg-white relative z-10">
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
                                className="text-2xl font-extrabold text-zinc-900 mb-6 flex items-center gap-3"
                            >
                                <span className="bg-brand-primary/10 text-brand-primary p-2 rounded-xl">
                                    {categoryIcons[activeCategory]}
                                </span>
                                {activeCategory}
                            </motion.h3>

                            <div className="grid grid-cols-3 gap-x-6 gap-y-6 mt-2">
                                {activeCategory === "Blogs and Articles" ? (
                                    <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                        <h4 className="flex items-center gap-2 text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">
                                            Sellers Insights
                                            <div className="h-px flex-1 bg-zinc-200/60"></div>
                                        </h4>
                                        <div className="flex flex-col gap-1.5">
                                            {sellPropertyCategories["Blogs and Articles"].map(link => (
                                                <Link
                                                    key={link.title}
                                                    href={link.href}
                                                    title={link.seoTitle}
                                                    className="group flex items-center gap-3 p-2 -ml-2 rounded-xl hover:bg-zinc-50 transition-all duration-300 outline-none"
                                                >
                                                    <div className="flex-shrink-0 rounded-lg flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors duration-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-brand-primary transition-all duration-300"></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-zinc-900 group-hover:text-brand-primary transition-colors duration-300">
                                                            {link.title}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    Object.entries(sellPropertyCategories)
                                        .filter(([categoryName]) => categoryName !== "Blogs and Articles")
                                        .map(([categoryName, links]) => (
                                            <motion.div variants={itemVariants} key={categoryName} className="flex flex-col gap-3">
                                                <h4 className="flex items-center gap-2 text-[12px] font-extrabold text-zinc-400 uppercase tracking-widest">
                                                    {categoryName}
                                                    <div className="h-px flex-1 bg-zinc-200/60"></div>
                                                </h4>
                                                <div className="flex flex-col gap-1.5">
                                                    {links.map(link => {
                                                        const getHref = () => {
                                                            const type = activeCategory === "For Owner" ? "owner" : "builder";
                                                            const cat = categoryName === "Residential" ? "residential" : categoryName === "Commercial" ? "commercial" : "plots";
                                                            return `/sell/${type}/${cat}/${link.href}`;
                                                        };

                                                        return (
                                                            <Link
                                                                key={link.title}
                                                                href={getHref()}
                                                                title={link.seoTitle}
                                                                className="group flex items-center gap-3 p-2 -ml-2 rounded-xl hover:bg-zinc-50 transition-all duration-300 outline-none"
                                                            >
                                                                <div className="flex-shrink-0 rounded-lg flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors duration-300">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-brand-primary transition-all duration-300"></div>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-bold text-zinc-900 group-hover:text-brand-primary transition-colors duration-300">
                                                                        {link.title}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        ))
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Bar Footer */}
            <div className="w-full bg-zinc-900 text-white py-4 px-8 flex items-center justify-between z-20">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-white font-extrabold text-lg">Post Your Property</span>
                        <span className="text-zinc-400 text-xs font-medium">Free Listing for First-time Sellers</span>
                    </div>
                    <div className="h-10 w-px bg-zinc-700 mx-2 hidden md:block"></div>
                    <div className="hidden md:flex items-center gap-3">
                        <TrendingUp size={20} className="text-brand-primary" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase">Seller Market Insight</span>
                            <span className="text-xs font-bold text-zinc-100">Avg Selling Time: 45 Days in Navi Mumbai</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/add-property">
                        <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm cursor-pointer whitespace-nowrap">
                            <Plus size={18} strokeWidth={2.5} />
                            List Property Free
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default SellMegaMenu;
