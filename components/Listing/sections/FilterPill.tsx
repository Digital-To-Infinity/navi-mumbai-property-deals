"use client";
import { motion } from "framer-motion";

interface FilterPillProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-4 py-2 rounded-xl text-[12px] font-black cursor-pointer border transition-all duration-300 whitespace-nowrap
                       ${active
                    ? "bg-brand-primary text-white border-brand-primary shadow-[0_4px_12px_rgba(186,163,96,0.3)]"
                    : "bg-white text-zinc-600 border-zinc-100 hover:border-brand-primary/40 hover:text-brand-primary hover:shadow-sm"
                }`}
        >
            {label}
        </motion.button>
    );
}
