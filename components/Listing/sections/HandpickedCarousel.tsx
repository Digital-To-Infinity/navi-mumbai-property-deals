"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { ListingProperty, ListingMode } from "../listingData";

interface HandpickedCarouselProps {
    carouselRef: React.RefObject<HTMLDivElement | null>;
    carouselProgress: number;
    handpicked: ListingProperty[];
    mode: ListingMode;
    scrollCarousel: (dir: "left" | "right") => void;
}

export default function HandpickedCarousel({
    carouselRef,
    carouselProgress,
    handpicked,
    mode,
    scrollCarousel,
}: HandpickedCarouselProps) {
    return (
        <section
            aria-labelledby="recommendations-heading"
            className="bg-[#fafaf9] border-t border-zinc-100 py-12 overflow-x-clip"
        >
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2
                            id="recommendations-heading"
                            className="text-xl sm:text-2xl font-extrabold text-zinc-900"
                        >
                            ✦ Handpicked Recommendations
                        </h2>
                        <p className="text-zinc-500 text-[13px] font-medium mt-0.5">
                            Curated by our property experts
                        </p>
                    </div>

                    {/* Carousel controls */}
                    <div
                        className="hidden sm:flex items-center gap-2"
                        role="group"
                        aria-label="Carousel navigation"
                    >
                        <button
                            onClick={() => scrollCarousel("left")}
                            className="w-9 h-9 rounded-full bg-white border border-zinc-200
                                       flex items-center justify-center
                                       hover:border-[#baa360]/50 hover:bg-[#baa360]/5
                                       transition-all shadow-sm active:scale-95"
                            aria-label="Scroll carousel left"
                        >
                            <ChevronLeft className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => scrollCarousel("right")}
                            className="w-9 h-9 rounded-full bg-white border border-zinc-200
                                       flex items-center justify-center
                                       hover:border-[#baa360]/50 hover:bg-[#baa360]/5
                                       transition-all shadow-sm active:scale-95"
                            aria-label="Scroll carousel right"
                        >
                            <ChevronRight className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Carousel track */}
                <div
                    ref={carouselRef}
                    className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory
                               pb-6 scroll-smooth"
                    style={{ WebkitOverflowScrolling: "touch" }}
                    role="list"
                    aria-label="Recommended properties carousel"
                >
                    {handpicked.map((prop, i) => (
                        <div
                            key={prop.id}
                            className="min-w-[88vw] sm:min-w-[340px] lg:min-w-[310px] flex-shrink-0 snap-center"
                            role="listitem"
                        >
                            <PropertyCard property={prop} index={i} mode={mode} />
                        </div>
                    ))}

                    {/* "See all" card */}
                    <div
                        className="min-w-[200px] flex-shrink-0 snap-center flex items-center justify-center"
                        role="listitem"
                        aria-label="View all properties"
                    >
                        <Link
                            href={`/${mode}`}
                            className="flex flex-col items-center gap-3 p-8 bg-white
                                       rounded-[22px] border border-zinc-100 shadow-sm
                                       hover:border-[#baa360]/40 hover:shadow-md
                                       transition-all duration-300 group/see-all"
                        >
                            <div
                                className="w-12 h-12 rounded-full bg-[#baa360]/10
                                           flex items-center justify-center
                                           group-hover/see-all:bg-[#baa360]/20
                                           transition-colors"
                            >
                                <ArrowRight
                                    className="w-5 h-5 text-[#baa360]
                                              group-hover/see-all:translate-x-0.5
                                              transition-transform"
                                    aria-hidden="true"
                                />
                            </div>
                            <span className="text-[14px] font-bold text-zinc-700 text-center">
                                View All
                                <br />
                                Properties
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Progress indicator */}
                <div
                    className="mt-2 h-[2px] bg-zinc-200/60 rounded-full overflow-hidden max-w-[160px]"
                    role="progressbar"
                    aria-valuenow={carouselProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <motion.div
                        className="h-full bg-[#baa360] rounded-full"
                        style={{ width: `${carouselProgress}%` }}
                    />
                </div>
            </div>
        </section>
    );
}
