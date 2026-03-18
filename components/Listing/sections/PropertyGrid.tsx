"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Target } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { ListingProperty, ListingMode } from "../listingData";
import { modeLabel } from "./types";

interface PropertyGridProps {
    filtered: ListingProperty[];
    mode: ListingMode;
    resetFilters: () => void;
}

export default function PropertyGrid({
    filtered,
    mode,
    resetFilters,
}: PropertyGridProps) {
    return (
        <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-24 gap-4"
                    >
                        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
                            <Target className="w-8 h-8 text-zinc-400" />
                        </div>
                        <p className="text-[17px] font-bold text-zinc-600">
                            No properties match your filters.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="px-5 py-2.5 bg-[#baa360] text-white text-[14px] font-bold rounded-full hover:bg-[#8f7b44] transition-colors">
                            Reset Filters
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                        role="list"
                        aria-label={`${modeLabel[mode]} property listings`}
                    >
                        {filtered.map((prop, i) => (
                            <div key={prop.id} role="listitem">
                                <PropertyCard
                                    property={prop}
                                    index={i}
                                    mode={mode}
                                />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
