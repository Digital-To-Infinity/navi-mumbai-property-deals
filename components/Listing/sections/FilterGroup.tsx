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
    defaultOpen = true,
    activeCount = 0
}: FilterGroupProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="pb-5 mb-5 border-b border-brand-muted/10 last:border-0 last:pb-0 last:mb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between mb-3 group/btn"
            >
                <div className="flex items-center gap-2.5">
                    {icon && <div className="text-brand-primary">{icon}</div>}
                    <p className="text-[13px] font-black text-zinc-800 uppercase tracking-wide group-hover/btn:text-brand-primary transition-colors">
                        {title}
                        {activeCount > 0 && (
                            <span className="ml-2 px-1.5 py-0.5 bg-brand-primary text-white text-[10px] rounded-full">
                                {activeCount}
                            </span>
                        )}
                    </p>
                </div>
                <ChevronDown
                    className={`w-4 h-4 text-brand-paragraph transition-transform duration-300  cursor-pointer ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
