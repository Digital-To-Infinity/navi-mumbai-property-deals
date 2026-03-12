"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
    onFocusChange?: (isFocused: boolean) => void;
}

const SearchBar = ({ onFocusChange }: SearchBarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [isFocused, setIsFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        onFocusChange?.(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
            onFocusChange?.(false);
        }, 200);
    };

    // Sync query when URL changes (e.g., forward/back button)
    useEffect(() => {
        const urlQuery = searchParams.get("q") || "";
        if (urlQuery !== query) {
            setQuery(urlQuery);
        }
    }, [searchParams]);

    // Real-time search effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            const currentQ = searchParams.get("q") || "";

            if (query.trim()) {
                if (query.trim() !== currentQ) {
                    params.set("q", query.trim());
                    router.push(`?${params.toString()}`, { scroll: false });
                }
            } else if (currentQ) {
                params.delete("q");
                router.push(`?${params.toString()}`, { scroll: false });
            }
        }, 150); // Small debounce for smooth typing

        return () => clearTimeout(delayDebounceFn);
    }, [query, router, searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Logical search already handled by useEffect, but we can trigger a visual feedback
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 500);
    };

    const handleClear = () => {
        setQuery("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("q");
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-4xl"
        >
            <form onSubmit={handleSearch} className="relative group">
                {/* Advanced Multi-layer Glow Effect */}
                <div
                    className={`absolute -inset-1 bg-gradient-to-r from-brand-primary via-amber-400 to-brand-primary rounded-[2rem] transition-all duration-700 opacity-0 ${isFocused ? 'opacity-0 scale-105' : 'group-hover:opacity-0'
                        }`}
                    aria-hidden="true"
                />
                <div
                    className={`absolute inset-0 bg-brand-primary/20 rounded-[2rem] blur-2xl transition-all duration-700 opacity-0 ${isFocused ? 'opacity-30' : ''
                        }`}
                    aria-hidden="true"
                />

                {/* Main Search Container */}
                <div className={`relative flex items-center bg-brand-dark border rounded-full transition-all duration-500 overflow-hidden ${isFocused
                    ? 'border-brand-primary'
                    : 'border-white/10 group-hover:border-white/20'
                    }`}>

                    {/* Search Icon with Animation */}
                    <div className="pl-6 flex items-center justify-center">
                        <motion.div
                            animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
                            transition={isSearching ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                            className={`${isFocused ? 'text-brand-primary' : 'text-zinc-500'} transition-colors duration-300`}
                        >
                            {isSearching ? (
                                <Loader2 className="w-6 h-6" />
                            ) : (
                                <Search className="w-6 h-6" />
                            )}
                        </motion.div>
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Search Navi Mumbai Real Estate Blogs..."
                        className="w-full bg-transparent border-none outline-none px-5 py-5 text-white text-lg placeholder:font-light font-medium selection:bg-brand-primary selection:text-zinc-950"
                    />

                    {/* Interactive Elements on Right */}
                    <div className="flex items-center pr-3 gap-3">
                        <AnimatePresence>
                            {query && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    type="button"
                                    onClick={handleClear}
                                    className="p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer"
                                    title="Clear search"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Search Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="bg-brand-primary hover:bg-brand-primary-hover text-brand-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                Search
                            </span>
                        </motion.button>
                    </div>
                </div>


            </form>

            {/* Trending / Quick Tags */}
            <AnimatePresence>
                {!searchParams.get("q") && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 48 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-wrap items-center gap-6 px-4 overflow-hidden"
                    >
                        <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Popular:</span>
                        <div className="flex flex-wrap gap-4">
                            {['Market ROI 2026', 'Atal Setu Impact', 'Ulwe Properties', 'NMIA Timeline'].map((tag, idx) => (
                                <motion.button
                                    key={tag}
                                    whileHover={{ y: -2 }}
                                    type="button"
                                    className="group relative flex items-center text-[12px] text-zinc-400 font-bold transition-all whitespace-nowrap"
                                    onClick={() => setQuery(tag)}
                                >
                                    <span className="text-brand-primary/60 mr-1 group-hover:text-brand-primary transition-colors">#</span>
                                    <span className="group-hover:text-white transition-colors">{tag}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SearchBar;
