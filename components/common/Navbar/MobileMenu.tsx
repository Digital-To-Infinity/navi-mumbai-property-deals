"use client";
import { useState } from 'react';
import Link from 'next/link';
import { User, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { buyMegaMenuData, Category, rentMegaMenuData, RentCategory, sellPropertyCategories } from './navData';

interface PredefinedLink {
    name: string;
    href: string;
}

interface MobileMenuProps {
    navLinks: PredefinedLink[];
    setIsMobileMenuOpen: (val: boolean) => void;
}

const sellTypes = ["For Owner", "For Builder"] as const;

const MobileMenu = ({ navLinks, setIsMobileMenuOpen }: MobileMenuProps) => {
    const [isBuyExpanded, setIsBuyExpanded] = useState(false);
    const [isRentExpanded, setIsRentExpanded] = useState(false);
    const [isSellExpanded, setIsSellExpanded] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<Category | null>(null);
    const [expandedRentCategory, setExpandedRentCategory] = useState<RentCategory | null>(null);
    const [expandedSellType, setExpandedSellType] = useState<string | null>(null);
    const [expandedSellCategory, setExpandedSellCategory] = useState<string | null>(null);

    const categories = Object.keys(buyMegaMenuData) as Category[];
    const rentCategories = Object.keys(rentMegaMenuData) as RentCategory[];
    const sellCategories = Object.keys(sellPropertyCategories);

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden max-[769px]:block bg-white/95 backdrop-blur-md border-t border-zinc-100 overflow-y-auto max-h-[85vh] absolute top-full left-0 right-0 shadow-xl"
        >
            <div className="px-6 pt-8 pb-8 max-[426px]:pb-28 flex flex-col gap-4">
                {navLinks.map((link, idx) => {
                    const normalizedName = link.name.toLowerCase().trim();
                    const isBuyLink = normalizedName === 'buy' || normalizedName.includes('buy');
                    const isRentLink = normalizedName === 'rent' || normalizedName.includes('rent');
                    const isSellLink = normalizedName === 'sell' || normalizedName.includes('sell');

                    if (isSellLink) {
                        const toggleExpanded = () => setIsSellExpanded(!isSellExpanded);
                        const toggleSellType = (type: string) => {
                            setExpandedSellType(expandedSellType === type ? null : type);
                        };
                        const toggleSellCategory = (cat: string) => {
                            setExpandedSellCategory(expandedSellCategory === cat ? null : cat);
                        };

                        return (
                            <motion.div
                                key={link.name}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex flex-col gap-2"
                            >
                                <button
                                    onClick={toggleExpanded}
                                    className="text-lg font-semibold text-brand-heading hover:text-brand-button w-full flex items-center justify-between group cursor-pointer"
                                >
                                    <span>{link.name}</span>
                                    <ChevronDown
                                        size={20}
                                        strokeWidth={2}
                                        className={`transition-transform duration-300 font-bold ${isSellExpanded ? 'rotate-180 text-brand-primary-hover' : 'text-brand-heading group-hover:text-brand-primary-hover'}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isSellExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden flex flex-col ml-4 border-l-2 border-zinc-200 pl-4 gap-3 mt-2"
                                        >
                                            {sellTypes.map((sellType) => (
                                                <div key={sellType} className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => toggleSellType(sellType)}
                                                        className="text-base font-medium text-brand-heading flex items-center justify-between group w-full text-left cursor-pointer"
                                                    >
                                                        <span>{sellType}</span>
                                                        <ChevronDown
                                                            size={16}
                                                            strokeWidth={2}
                                                            className={`transition-transform duration-300 ${expandedSellType === sellType ? 'rotate-180 text-brand-primary-hover' : 'text-brand-heading'}`}
                                                        />
                                                    </button>

                                                    <AnimatePresence>
                                                        {expandedSellType === sellType && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="overflow-hidden flex flex-col gap-2 ml-2 pl-2 border-l-2 border-zinc-200 mt-1"
                                                            >
                                                                {sellCategories.map((category) => (
                                                                    <div key={category} className="flex flex-col gap-2 mt-1">
                                                                        <button
                                                                            onClick={() => toggleSellCategory(category)}
                                                                            className="text-base font-medium text-brand-heading flex items-center justify-between group w-full text-left cursor-pointer"
                                                                        >
                                                                            <span>{category}</span>
                                                                            <ChevronDown
                                                                                size={16}
                                                                                strokeWidth={2}
                                                                                className={`transition-transform duration-300 ${expandedSellCategory === category ? 'rotate-180 text-brand-primary-hover' : 'text-brand-heading'}`}
                                                                            />
                                                                        </button>

                                                                        <AnimatePresence>
                                                                            {expandedSellCategory === category && (
                                                                                <motion.div
                                                                                    initial={{ opacity: 0, height: 0 }}
                                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                                    exit={{ opacity: 0, height: 0 }}
                                                                                    className="overflow-hidden flex flex-col gap-2 ml-2 pl-2 border-l-2 border-zinc-200"
                                                                                >
                                                                                    {/* @ts-ignore */}
                                                                                    {sellPropertyCategories[category].map((item: any) => {
                                                                                        const getHref = () => {
                                                                                            if (category === "Blogs and Articles") return item.href;
                                                                                            const type = sellType === "For Owner" ? "owner" : "builder";
                                                                                            const cat = category === "Residential" ? "residential" : category === "Commercial" ? "commercial" : "plots";
                                                                                            return `/sell/${type}/${cat}/${item.href}`;
                                                                                        };

                                                                                        return (
                                                                                            <Link
                                                                                                key={item.title}
                                                                                                href={getHref()}
                                                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                                                className="text-sm font-normal text-brand-heading hover:text-brand-primary py-1"
                                                                                            >
                                                                                                {item.title}
                                                                                            </Link>
                                                                                        );
                                                                                    })}
                                                                                </motion.div>
                                                                            )}
                                                                        </AnimatePresence>
                                                                    </div>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    }

                    if (isBuyLink || isRentLink) {
                        const isExpanded = isRentLink ? isRentExpanded : isBuyExpanded;
                        const toggleExpanded = () => {
                            if (isRentLink) setIsRentExpanded(!isRentExpanded);
                            else setIsBuyExpanded(!isBuyExpanded);
                        };

                        const currentCategories = isRentLink ? rentCategories : categories;
                        const currentData = isRentLink ? rentMegaMenuData : buyMegaMenuData;

                        const currentExpandedCategory = isRentLink ? expandedRentCategory : expandedCategory;
                        const toggleCategory = (cat: string) => {
                            if (isRentLink) {
                                setExpandedRentCategory(expandedRentCategory === cat ? null : cat as RentCategory);
                            } else {
                                setExpandedCategory(expandedCategory === cat ? null : cat as Category);
                            }
                        };

                        return (
                            <motion.div
                                key={link.name}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex flex-col gap-2"
                            >
                                <button
                                    onClick={toggleExpanded}
                                    className="text-lg font-semibold text-brand-heading hover:text-brand-button w-full flex items-center justify-between group cursor-pointer"
                                >
                                    <span>{link.name}</span>
                                    <ChevronDown
                                        size={20}
                                        strokeWidth={2}
                                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-brand-primary-hover' : 'text-brand-heading group-hover:text-brand-primary-hover'}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden flex flex-col ml-4 border-l-2 border-zinc-200 pl-4 gap-3 mt-2"
                                        >
                                            {currentCategories.map((category) => (
                                                <div key={category} className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => toggleCategory(category)}
                                                        className="text-base font-medium text-brand-heading flex items-center justify-between group w-full text-left cursor-pointer"
                                                    >
                                                        <span>{category}</span>
                                                        <ChevronDown
                                                            size={16}
                                                            strokeWidth={2}
                                                            className={`transition-transform duration-300 ${currentExpandedCategory === category ? 'rotate-180 text-brand-primary-hover' : 'text-brand-heading'}`}
                                                        />
                                                    </button>

                                                    <AnimatePresence>
                                                        {currentExpandedCategory === category && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="overflow-hidden flex flex-col gap-2 ml-2 pl-2 border-l-2 border-zinc-200"
                                                            >
                                                                {/* @ts-ignore - Dynamic key access based on conditional logic */}
                                                                {currentData[category].map((item: any) => (
                                                                    <Link
                                                                        key={item.title}
                                                                        href={item.href}
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                        className="text-sm font-normal text-brand-heading hover:text-brand-primary py-1"
                                                                    >
                                                                        {item.title}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    }

                    return (
                        <motion.div
                            key={link.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-semibold text-brand-heading hover:text-brand-button flex items-center justify-between group"
                            >
                                {link.name}
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    →
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
                <div className="pt-6 border-t border-zinc-100 flex flex-col space-y-3">
                    <Link
                        href="/add-property"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-white text-brand-heading border-2 border-brand-primary/20 hover:border-brand-primary py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-[0.98]"
                    >
                        <Plus size={20} className="text-brand-primary" strokeWidth={2.5} />
                        <span>Add Property</span>
                    </Link>
                    <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-brand-button text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-brand-button/20 active:scale-[0.98] transition-transform"
                    >
                        <User size={20} />
                        <span>Sign In</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default MobileMenu;
