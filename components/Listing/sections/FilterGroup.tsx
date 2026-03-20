import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FilterGroupProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    activeCount?: number;
}

export default function FilterGroup({
    title,
    icon,
    children,
    defaultOpen = false,
    activeCount = 0
}: FilterGroupProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div 
            className="pb-6 mb-2 border-b border-zinc-50 last:border-0 last:pb-0 last:mb-0 group/fgroup"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between group/btn cursor-pointer py-2"
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? "bg-brand-primary/10 text-brand-primary scale-110 shadow-sm" : "bg-zinc-50 text-brand-paragraph group-hover/btn:text-brand-primary"}`}>
                            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-[18px] h-[18px]" })}
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className={`text-[12px] font-bold uppercase tracking-widest transition-colors duration-300 ${isOpen || activeCount > 0 ? "text-brand-heading" : "text-brand-paragraph group-hover/btn:text-brand-primary"}`}>
                            {title}
                        </span>
                        {activeCount > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-5 h-5 flex items-center justify-center bg-brand-primary text-white text-[10px] font-black rounded-full shadow-lg shadow-brand-primary/20"
                            >
                                {activeCount}
                            </motion.span>
                        )}
                    </div>
                </div>
                <div className={`p-1.5 rounded-full transition-all duration-500 ${isOpen ? "rotate-180 bg-brand-primary/5 text-brand-primary" : "bg-zinc-50 text-brand-paragraph group-hover/btn:bg-zinc-100 group-hover/btn:text-brand-primary"}`}>
                    <ChevronDown className="w-4 h-4" />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 pb-2 px-1">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
