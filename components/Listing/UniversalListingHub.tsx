"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import HeroHeader from "./sections/HeroHeader";
import MetricsBar from "./sections/MetricsBar";
import FilterSidebar from "./sections/FilterSidebar";
import PropertyGrid from "./sections/PropertyGrid";
import LocalityInsights from "./sections/LocalityInsights";
import HandpickedCarousel from "./sections/HandpickedCarousel";
import SellingProcess from "./sections/SellingProcess";

import {
    listingProperties,
    localityMetrics,
    localityInsight,
    type ListingMode,
    type ListingProperty,
} from "./listingData";

import {
    BudgetFilter,
    ConfigFilter,
    StatusFilter,
    PostedByFilter,
    PropertyTypeFilter,
    FurnishingFilter,
    FacingFilter,
    AgeFilter,
    SortFilter,
    AreaFilter,
} from "./sections/types";


//  Types & Props
interface HubProps {
    mode: ListingMode;
    pageTitle: string;
    pageSubtitle: string;
    filterKeyword?: string;  /* Optional: filter properties by slug/keyword */
}

//  Helpers
function pricePasses(property: ListingProperty, budget: BudgetFilter): boolean {
    if (budget === "all") return true;
    const lakhs = parsePrice(property.price);
    if (budget === "under60L") return lakhs < 60;
    if (budget === "60L-1Cr") return lakhs >= 60 && lakhs < 100;
    if (budget === "1Cr-2Cr") return lakhs >= 100 && lakhs < 200;
    if (budget === "2Cr-5Cr") return lakhs >= 200 && lakhs < 500;
    if (budget === "above5Cr") return lakhs >= 500;
    return true;
}

function parsePrice(price: string): number {
    const raw = price.replace(/[₹,\s]/g, "");
    if (raw.includes("Cr")) return parseFloat(raw.replace("Cr", "")) * 100;
    if (raw.includes("L")) return parseFloat(raw.replace("L", ""));
    return 0;
}

function parseArea(area: string): number {
    return parseFloat(area.replace(/[,\ssq.ft]/gi, ""));
}

//  Main Component
export default function UniversalListingHub({
    mode,
    pageTitle,
    pageSubtitle,
    filterKeyword,
}: HubProps) {
    // Filters State
    const [budget, setBudget] = useState<BudgetFilter>("all");
    const [config, setConfig] = useState<ConfigFilter>("all");
    const [status, setStatus] = useState<StatusFilter>("all");
    const [postedBy, setPostedBy] = useState<PostedByFilter>("all");
    const [propertyType, setPropertyType] = useState<PropertyTypeFilter>("all");
    const [furnishing, setFurnishing] = useState<FurnishingFilter>("all");
    const [facing, setFacing] = useState<FacingFilter>("all");
    const [age, setAge] = useState<AgeFilter>("all");
    const [amenities, setAmenities] = useState<string[]>([]);
    const [area, setArea] = useState<AreaFilter>({ min: "", max: "" });
    const [sortBy, setSortBy] = useState<SortFilter>("relevance");
    const [reraOnly, setReraOnly] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Carousel State
    const carouselRef = useRef<HTMLDivElement>(null);
    const [carouselProgress, setCarouselProgress] = useState(0);

    const handleCarouselScroll = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;
        const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
        setCarouselProgress(progress);
    }, []);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        el.addEventListener("scroll", handleCarouselScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleCarouselScroll);
    }, [handleCarouselScroll]);

    const scrollCarousel = (dir: "left" | "right") => {
        const el = carouselRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
    };

    // Filter Logic
    const filtered = listingProperties.filter((p) => {
        if (!pricePasses(p, budget)) return false;
        if (config !== "all" && p.configuration !== config) return false;
        if (status !== "all" && p.constructionStatus !== status) return false;
        if (postedBy !== "all" && p.postedBy !== postedBy) return false;
        if (propertyType !== "all" && p.propertyType !== propertyType) return false;
        if (furnishing !== "all" && p.furnishing !== furnishing) return false;
        if (facing !== "all" && p.facing !== facing) return false;
        if (age !== "all" && p.age !== age) return false;
        if (amenities.length > 0) {
            if (!amenities.every((a) => p.amenities.includes(a))) return false;
        }
        if (reraOnly && !p.isReraVerified) return false;

        // Area Filter
        const pArea = parseArea(p.area);
        if (area.min && pArea < parseFloat(area.min)) return false;
        if (area.max && pArea > parseFloat(area.max)) return false;

        if (filterKeyword) {
            const kw = filterKeyword.toLowerCase();
            const match =
                p.location.toLowerCase().includes(kw) ||
                p.title.toLowerCase().includes(kw) ||
                p.configuration.toLowerCase().includes(kw);
            if (!match) return true;
        }
        return true;
    }).sort((a, b) => {
        if (sortBy === "price-low") return parsePrice(a.price) - parsePrice(b.price);
        if (sortBy === "price-high") return parsePrice(b.price) - parsePrice(a.price);
        if (sortBy === "area-high") return parseArea(b.area) - parseArea(a.area);
        if (sortBy === "area-low") return parseArea(a.area) - parseArea(b.area);
        if (sortBy === "newest") return b.id.localeCompare(a.id); // Mock logic for newest
        return 0;
    });

    const resetFilters = () => {
        setBudget("all");
        setConfig("all");
        setStatus("all");
        setPostedBy("all");
        setPropertyType("all");
        setFurnishing("all");
        setFacing("all");
        setAge("all");
        setAmenities([]);
        setArea({ min: "", max: "" });
        setSortBy("relevance");
        setReraOnly(false);
    };

    const hasActiveFilters =
        budget !== "all" ||
        config !== "all" ||
        status !== "all" ||
        postedBy !== "all" ||
        propertyType !== "all" ||
        furnishing !== "all" ||
        facing !== "all" ||
        age !== "all" ||
        amenities.length > 0 ||
        area.min !== "" ||
        area.max !== "" ||
        sortBy !== "relevance" ||
        reraOnly;
    const metricsData = localityMetrics[mode];
    const handpicked = listingProperties.slice(0, 5);

    const breadcrumbs = [
        { label: mode === "buy" ? "Buy" : mode === "rent" ? "Rent" : "Sell", href: `/${mode}` },
        ...(filterKeyword
            ? [
                {
                    label: filterKeyword
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" "),
                    href: "",
                },
            ]
            : []),
    ];

    return (
        <div className="min-h-screen bg-[#fafaf9] relative">
            {/* Mesh background */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
                aria-hidden="true"
                style={{
                    backgroundImage: "radial-gradient(#000 0.7px, transparent 0.7px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Ambient glow blobs */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] right-[-8%] w-[600px] h-[600px] bg-[#baa360]/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#baa360]/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
                <HeroHeader
                    mode={mode}
                    pageTitle={pageTitle}
                    pageSubtitle={pageSubtitle}
                    filteredCount={filtered.length}
                    hasActiveFilters={hasActiveFilters}
                    onResetFilters={resetFilters}
                    breadcrumbs={breadcrumbs}
                />

                <MetricsBar mode={mode} metrics={metricsData} />

                <main className="container mx-auto px-4 sm:px-6 py-16" aria-label="Property listings">
                    <div className="flex gap-6 relative">
                        {/* Mobile filter toggle */}
                        <div className="lg:hidden mb-4 w-full">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="flex items-center gap-2 px-5 py-3 bg-white border border-zinc-200
                                           rounded-2xl text-[14px] font-bold text-zinc-700
                                           shadow-sm hover:border-[#baa360]/50 transition-colors"
                            >
                                <SlidersHorizontal className="w-4 h-4 text-[#baa360]" aria-hidden="true" />
                                Filters
                                {hasActiveFilters && (
                                    <span className="ml-1 w-5 h-5 rounded-full bg-[#baa360] text-white
                                                   text-[10px] font-black flex items-center justify-center">
                                        !
                                    </span>
                                )}
                            </button>
                        </div>

                        <FilterSidebar
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                            budget={budget}
                            setBudget={setBudget}
                            config={config}
                            setConfig={setConfig}
                            status={status}
                            setStatus={setStatus}
                            postedBy={postedBy}
                            setPostedBy={setPostedBy}
                            propertyType={propertyType}
                            setPropertyType={setPropertyType}
                            furnishing={furnishing}
                            setFurnishing={setFurnishing}
                            facing={facing}
                            setFacing={setFacing}
                            age={age}
                            setAge={setAge}
                            amenities={amenities}
                            setAmenities={setAmenities}
                            area={area}
                            setArea={setArea}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            reraOnly={reraOnly}
                            setReraOnly={setReraOnly}
                            hasActiveFilters={hasActiveFilters}
                            resetFilters={resetFilters}
                        />

                        <PropertyGrid
                            filtered={filtered}
                            mode={mode}
                            resetFilters={resetFilters}
                        />
                    </div>
                </main>

                <LocalityInsights mode={mode} insight={localityInsight} />

                {mode === "sell" && <SellingProcess />}

                <HandpickedCarousel
                    carouselRef={carouselRef}
                    carouselProgress={carouselProgress}
                    handpicked={handpicked}
                    mode={mode}
                    scrollCarousel={scrollCarousel}
                />
            </div>
        </div>
    );
}
