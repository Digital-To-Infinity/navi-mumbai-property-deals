"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    icon?: React.ReactNode;
    placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    options,
    value,
    onChange,
    icon,
    placeholder = "Select option"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const updateCoords = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom, // Use viewport-relative bottom
                left: rect.left,
                width: rect.width
            });
        }
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        updateCoords();
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('scroll', updateCoords, true);
            window.addEventListener('resize', updateCoords);
        }
        return () => {
            window.removeEventListener('scroll', updateCoords, true);
            window.removeEventListener('resize', updateCoords);
        };
    }, [isOpen]);

    const selectedOption = options.find(opt => opt.value === value);

    const menuContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 35
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        position: 'fixed', // Use fixed to stay relative to the button in viewport
                        top: coords.top,
                        left: coords.left,
                        width: coords.width,
                        zIndex: 9999,
                    }}
                    className="pointer-events-auto"
                >
                    <div className="bg-white border border-zinc-100/80 rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-2 overflow-hidden backdrop-blur-3xl">
                        <div className="max-h-[280px] overflow-y-auto no-scrollbar py-1">
                            {options.map((option, idx) => (
                                <motion.button
                                    key={option.value}
                                    type="button"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[13px] font-bold transition-all relative group/item cursor-pointer ${
                                        value === option.value
                                            ? "bg-brand-primary text-white"
                                            : "text-brand-paragraph hover:bg-brand-muted/10 hover:text-brand-heading"
                                    }`}
                                >
                                    <span className="relative z-10">{option.label}</span>
                                    {value === option.value && (
                                        <motion.div
                                            layoutId="active-check"
                                            className="bg-white/20 p-1 rounded-full"
                                        >
                                            <Check className="w-3.5 h-3.5" />
                                        </motion.div>
                                    )}
                                    {value !== option.value && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary scale-0 group-hover/item:scale-100 transition-transform duration-300 shadow-[0_0_10px_rgba(186,163,96,0.5)]" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="space-y-2 relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <label className={`text-[12px] font-black uppercase tracking-widest px-1 transition-all duration-300 ${
                isOpen ? "text-brand-primary translate-x-1" : "text-brand-paragraph"
            }`}>
                {label}
            </label>
            
            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    className={`w-full bg-zinc-50/50 border rounded-2xl px-5 py-2.5 text-[14px] font-bold flex items-center justify-between transition-all duration-300 relative overflow-hidden cursor-pointer ${
                        isOpen 
                        ? "border-brand-primary bg-white ring-[6px] ring-brand-primary/5" 
                        : "border-brand-muted/50 hover:border-brand-primary/40 hover:bg-white"
                    }`}
                >
                    <div className="flex items-center gap-3 relative z-10">
                        {icon && (
                            <div className={`p-2 rounded-xl transition-colors duration-300 ${
                                isOpen ? "bg-brand-primary/10 text-brand-primary" : "bg-zinc-100 text-brand-paragraph group-hover:bg-brand-primary group-hover:text-brand-primary/60"
                            }`}>
                                {React.cloneElement(icon as React.ReactElement<any>, { className: "w-4 h-4" })}
                            </div>
                        )}
                        <span className={selectedOption ? "text-brand-paragraph" : "text-brand-paragraph"}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                    </div>
                    <div className={`p-1.5 rounded-full transition-all duration-300 ${isOpen ? "bg-brand-primary/10 rotate-180" : "bg-transparent"}`}>
                        <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? "text-brand-primary" : "text-brand-paragraph group-hover:text-brand-primary/60"}`} />
                    </div>
                </button>

                {mounted && createPortal(menuContent, document.body)}
            </div>
        </div>
    );
};

export default CustomDropdown;

