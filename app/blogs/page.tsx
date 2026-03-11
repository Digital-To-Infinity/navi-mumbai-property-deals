"use client";
import React from "react";
import BlogHero from "@/components/Blog/BlogHero";
import BlogFilters from "@/components/Blog/BlogFilters";
import BlogGrid from "@/components/Blog/BlogGrid";
import Newsletter from "@/components/Blog/Newsletter";

export default function BlogsPage() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [activeCategory, setActiveCategory] = React.useState("All");

    return (
        <main className="min-h-screen bg-white">
            <BlogHero />
            <div className="container mx-auto px-4 mt-16 relative z-20">
                <BlogFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            </div>
            <BlogGrid
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <Newsletter />
        </main>
    );
}
