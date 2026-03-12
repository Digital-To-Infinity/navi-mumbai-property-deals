"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BlogHero from "@/components/Blog/BlogHero";
import BlogFilters from "@/components/Blog/BlogFilters";
import BlogGrid from "@/components/Blog/BlogGrid";
import Newsletter from "@/components/Blog/Newsletter";

function BlogsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFocused, setIsFocused] = React.useState(false);

    const activeCategory = searchParams.get("category") || "All";
    const searchQuery = searchParams.get("q") || "";

    const isSearchActive = !!searchQuery || isFocused;

    const setActiveCategory = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const setSearchQuery = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (!query) {
            params.delete("q");
        } else {
            params.set("q", query);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <>
            <BlogHero
                isSearching={isSearchActive}
                onSearchFocusChange={setIsFocused}
            />
            <AnimatePresence>
                {!isSearchActive && (
                    <motion.div
                        initial={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="overflow-hidden"
                    >
                        <BlogFilters
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <BlogGrid
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            {!isSearchActive && <Newsletter />}
        </>
    );
}

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Hub...</div>}>
                <BlogsContent />
            </Suspense>
        </main>
    );
}
