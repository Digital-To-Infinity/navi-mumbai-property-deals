"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Home, Share2, Sparkles, X } from "lucide-react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyTitle: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, propertyTitle }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[48px] overflow-hidden shadow-2xl p-8 sm:p-12 text-center"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute right-6 top-6 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-all duration-300 text-zinc-400 cursor-pointer group"
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* Animated Icon Container */}
                        <div className="relative mb-10 mx-auto w-32 h-32 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
                                className="w-full h-full bg-emerald-500 rounded-full flex items-center justify-center text-white relative z-10"
                            >
                                <CheckCircle2 className="w-16 h-16" />
                            </motion.div>
                            
                            {/* Decorative Blobs */}
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-2 -right-2 w-10 h-10 bg-brand-primary/20 rounded-full blur-sm"
                            />
                            <motion.div 
                                animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-4 -left-4 w-12 h-12 bg-emerald-500/10 rounded-full blur-sm"
                            />
                        </div>

                        <h2 className="text-3xl font-black text-zinc-900 mb-4 tracking-tight leading-tight">Property Listed Successfully!</h2>
                        <p className="text-zinc-500 font-medium mb-10 leading-relaxed px-4">
                           Great news! <span className="text-zinc-900 font-bold">"{propertyTitle || "Your Property"}"</span> is now live on Navi Mumbai Property Deals.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="flex items-center justify-center gap-3 py-4 bg-brand-primary text-white rounded-[24px] text-[15px] font-black hover:bg-brand-primary-hover transition-all cursor-pointer"
                            >
                                <Home className="w-5 h-5" /> Back Home
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-3 py-4 bg-brand-primary/10 text-brand-primary rounded-[24px] text-[15px] font-black border border-brand-primary/20 hover:border-brand-primary transition-all cursor-pointer"
                            >
                                <Share2 className="w-5 h-5" /> Share Link
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
