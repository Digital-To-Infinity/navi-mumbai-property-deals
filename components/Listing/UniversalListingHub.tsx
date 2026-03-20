"use client";
import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Calendar, Compass, SlidersHorizontal, X } from "lucide-react";
import HeroHeader from "./sections/HeroHeader";
import MetricsBar from "./sections/MetricsBar";
import FilterSidebar from "./sections/FilterSidebar";
import PropertyGrid from "./sections/PropertyGrid";
import LocalityInsights from "./sections/LocalityInsights";
import HandpickedCarousel from "./sections/HandpickedCarousel";
import SellingProcess from "./sections/SellingProcess";
import FAQ from "./sections/FAQ";

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

import {
    generatePropertyListSchema,
    generateFAQSchema,
    generateBreadcrumbSchema,
} from "./sections/ListingSchema";

//  Types & Props
interface HubProps {
    mode: ListingMode;
    pageTitle: string;
    pageSubtitle: string;
    filterKeyword?: string;  /* Optional: filter properties by slug/keyword */
    initialProperties?: ListingProperty[];
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
    initialProperties,
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
    const filtered = useMemo(() => {
        return listingProperties.filter((p) => {
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
    }, [budget, config, status, postedBy, propertyType, furnishing, facing, age, amenities, reraOnly, area.min, area.max, filterKeyword, sortBy]);

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

    const breadcrumbs = useMemo(() => [
        { label: "Home", href: "/" },
        { label: mode === "buy" ? "Buy" : mode === "rent" ? "Rent" : "Sell", href: `/${mode}` },
        ...(filterKeyword
            ? [
                {
                    label: filterKeyword
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" "),
                    href: `/${mode}/${filterKeyword}`,
                },
            ]
            : []),
    ], [mode, filterKeyword]);

    // FAQ Data based on mode
    const faqs = useMemo(() => (
        mode === "buy"
            ? [
                { question: "What are the top residential areas in Navi Mumbai for families?", answer: "Kharghar, Seawoods, and Vashi are top-rated for families due to their excellent social infrastructure, including top-tier schools like Ryan International and DPS, modern healthcare facilities, and numerous public parks. These areas also offer superior connectivity and a cleaner environment compared to other major nodes." },
                { question: "Is property investment in Navi Mumbai a good idea?", answer: "Navi Mumbai is one of India's fastest-growing real estate markets. With the upcoming Navi Mumbai International Airport (NMIA), the Mumbai Trans-Harbour Link (MTHL), and the expansion of the Metro network, property values are projected to appreciate significantly. Investment in developing nodes like Ulwe and Kharghar is particularly promising." },
                { question: "What is RERA and how does it protect buyers?", answer: "The Real Estate (Regulation and Development) Act (RERA) ensures transparency and accountability in real estate. It protects buyers by mandating that developers register projects, provide accurate possession timelines, and use escrow accounts for project funds, preventing mismanagement and delays." },
                { question: "What are the hidden costs when buying a property?", answer: "Beyond the base property price, buyers should account for Stamp Duty (usually 6-7%), Registration Fees (1%), GST (5-12% for under-construction), Society Maintenance deposits, and Legal/Home Loan processing fees." },
                { question: "Can I get a home loan for resale properties in Navi Mumbai?", answer: "Yes, most major banks and NBFCs provide home loans for resale properties. The process involves a technical and legal valuation of the property. The loan amount usually depends on the property's age and the buyer's credit profile." }
            ]
            : mode === "rent"
                ? [
                    { question: "What is the average rent for a 2BHK in Navi Mumbai?", answer: "Rents vary by node. A 2BHK in prime areas like Vashi or Palm Beach Road ranges from ₹35,000 - ₹55,000, whereas in developing nodes like Kharghar or Ulwe, it ranges from ₹18,000 - ₹30,000. Gated societies with amenities usually command a 15-20% premium." },
                    { question: "What documents are required for a rental agreement?", answer: "Standard requirements include Aadhaar Card, PAN Card, and a permanent address proof for the tenant. For the owner, property proofs like Tax Receipts or Index II are needed. Registered leave and license agreements are now mandatory in Maharashtra." },
                    { question: "What is the typical security deposit amount?", answer: "The security deposit in Navi Mumbai typically ranges from 3 to 6 months of rent, depending on whether the apartment is unfurnished, semi-furnished, or fully furnished. This is refundable upon completion of the license period." },
                    { question: "Are bachelors allowed to rent in Navi Mumbai societies?", answer: "While most modern societies are open, some older co-operative societies have specific bylaws regarding bachelor tenants. It's always advisable to clarify this with the property owner and society office beforehand." },
                    { question: "Who pays the maintenance and society charges?", answer: "In most rental agreements, the society maintenance is paid by the owner (included in rent), while utilities like electricity, water, and internet are paid on actual consumption by the tenant. Specific terms should be documented in the agreement." }
                ]
                : [
                    { question: "How can I sell my property faster in Navi Mumbai?", answer: "To ensure a quick sale, ensure your property is professionally cleaned, photographed in good lighting, and listed at a competitive market price. Highlighting RERA compliance, OC (Occupancy Certificate) status, and nearby infrastructure projects can also attract serious buyers faster." },
                    { question: "What is Capital Gains Tax on property sale?", answer: "If you sell a property after 2 years, it's considered Long-Term Capital Gain (LTCG) and taxed at 20% with indexation benefits. Selling before 2 years attracts Short-Term Capital Gain (STCG) taxed at your regular income tax slab." },
                    { question: "Which nodes have the highest property demand currently?", answer: "Kharghar and Panvel are currently seeing peak demand due to the airport vicinity. Seawoods is highly sought after for luxury properties, while Ulwe remains popular for high-yield investment potential." },
                    { question: "Do I need a real estate agent to sell my property?", answer: "While you can list directly on portals, an experienced local agent can help with professional valuation, screening serious buyers, managing site visits, and ensuring all legal paperwork and society NOCs are in order." },
                    { question: "What are the mandatory documents to sell a flat?", answer: "Key documents include the Original Sale Deed, Index II, Share Certificate (if society), NOC from Society, Allotment Letter, and latest Property Tax receipts. An Occupancy Certificate (OC) is crucial for buyer confidence." }
                ]
    ), [mode]);

    return (
        <div className="min-h-screen bg-[#fafaf9] relative">
            {/* Schema Injection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, item: b.href }))))
                }}
            />
            {filtered.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generatePropertyListSchema(filtered.slice(0, 10)))
                    }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateFAQSchema(faqs))
                }}
            />

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
                />

                <MetricsBar mode={mode} metrics={metricsData} />

                <main className="container mx-auto px-4 sm:px-6 py-16" aria-label="Property listings">
                    <div className="flex flex-col lg:flex-row gap-6 relative">
                        {/* Mobile & Tablet Filter Row (Sticky) */}
                        <div className="lg:hidden sticky top-[0px] z-[50] bg-white/95 backdrop-blur-md -mx-4 px-4 py-3 border-b border-zinc-100 shadow-sm animate-fade-in">
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 min-h-[50px]">
                                {/* Sort Dropdown */}
                                <FilterDropdown
                                    label="Sort"
                                    icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>}
                                    value={sortBy === "relevance" ? "" : "Applied"}
                                    active={sortBy !== "relevance"}
                                >
                                    <div className="flex flex-col gap-1 p-3 min-w-[240px]">
                                        {(
                                            [
                                                ["relevance", "Relevance"],
                                                ["price-low", "Price: Low to High"],
                                                ["price-high", "Price: High to Low"],
                                                ["newest", "Newest First"],
                                                ["area-high", "Area: High to Low"],
                                                ["area-low", "Area: Low to High"],
                                            ] as [SortFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ x: 4, backgroundColor: "rgba(186,163,96,0.05)" }}
                                                onClick={() => setSortBy(val)}
                                                className={`text-left px-5 py-4 rounded-2xl text-[13px] font-bold transition-all
                                                           ${sortBy === val ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" : "text-zinc-600"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* Budget Dropdown */}
                                <FilterDropdown
                                    label="Budget"
                                    value={budget === "all" ? "" : budget}
                                    active={budget !== "all"}
                                >
                                    <div className="p-5 grid grid-cols-2 gap-3 min-w-[300px]">
                                        {(
                                            [
                                                ["all", "Any"],
                                                ["under60L", "< ₹60L"],
                                                ["60L-1Cr", "₹60L–1Cr"],
                                                ["1Cr-2Cr", "₹1–2Cr"],
                                                ["2Cr-5Cr", "₹2–5Cr"],
                                                ["above5Cr", "> ₹5Cr"],
                                            ] as [BudgetFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setBudget(val)}
                                                className={`px-3 py-3 rounded-2xl text-[12px] font-bold border transition-all
                                                           ${budget === val ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20" : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-primary/30"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* BHK Dropdown */}
                                <FilterDropdown
                                    label="BHK"
                                    value={config === "all" ? "" : config}
                                    active={config !== "all"}
                                >
                                    <div className="p-5 grid grid-cols-3 gap-3 min-w-[300px]">
                                        {(
                                            [
                                                ["all", "Any"],
                                                ["1bhk", "1 BHK"],
                                                ["2bhk", "2 BHK"],
                                                ["3bhk", "3 BHK"],
                                                ["4bhk+", "4 BHK+"],
                                                ["studio", "Studio"],
                                            ] as [ConfigFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ scale: 1.08 }}
                                                whileTap={{ scale: 0.92 }}
                                                onClick={() => setConfig(val)}
                                                className={`px-2 py-3 rounded-2xl text-[11px] font-black border transition-all text-center
                                                           ${config === val ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20" : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-primary/30"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* Property Type */}
                                <FilterDropdown
                                    label="Type"
                                    value={propertyType === "all" ? "" : propertyType}
                                    active={propertyType !== "all"}
                                >
                                    <div className="p-4 flex flex-col gap-1 min-w-[240px]">
                                        {(
                                            [
                                                ["all", "Any"],
                                                ["residential", "Residential"],
                                                ["commercial", "Commercial"],
                                                ["plot", "Plots"],
                                                ["industrial", "Industrial"],
                                            ] as [PropertyTypeFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ x: 6, backgroundColor: "rgba(186,163,96,0.05)" }}
                                                onClick={() => setPropertyType(val)}
                                                className={`text-left px-5 py-4 rounded-2xl text-[13px] font-bold transition-all
                                                           ${propertyType === val ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" : "text-zinc-600"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* Status */}
                                <FilterDropdown
                                    label="Status"
                                    value={status === "all" ? "" : status}
                                    active={status !== "all"}
                                >
                                    <div className="p-4 flex flex-col gap-1 min-w-[260px]">
                                        {(
                                            [
                                                ["all", "Any Status"],
                                                ["ready-to-move", "Ready to Move"],
                                                ["under-construction", "Under Construction"],
                                                ["new-launch", "New Launch"],
                                            ] as [StatusFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ x: 6, backgroundColor: "rgba(186,163,96,0.05)" }}
                                                onClick={() => setStatus(val)}
                                                className={`text-left px-5 py-4 rounded-2xl text-[13px] font-bold transition-all
                                                           ${status === val ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" : "text-zinc-600"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* Posted By */}
                                <FilterDropdown
                                    label="Posted"
                                    value={postedBy === "all" ? "" : postedBy}
                                    active={postedBy !== "all"}
                                >
                                    <div className="p-5 grid grid-cols-2 gap-3 min-w-[280px]">
                                        {(
                                            [
                                                ["all", "All"],
                                                ["owner", "Owner"],
                                                ["agent", "Agent"],
                                                ["builder", "Builder"],
                                            ] as [PostedByFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setPostedBy(val)}
                                                className={`px-4 py-3 rounded-2xl text-[12px] font-bold border transition-all text-center
                                                           ${postedBy === val ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20" : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-primary/30"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* Area Dropdown */}
                                <FilterDropdown
                                    label="Area"
                                    value={area.min || area.max ? "Applied" : ""}
                                    active={!!(area.min || area.max)}
                                    icon={<SlidersHorizontal className="w-4 h-4" />}
                                >
                                    <div className="p-6 space-y-4 min-w-[300px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                                                <SlidersHorizontal className="w-4 h-4" />
                                            </div>
                                            <h4 className="text-[12px] font-black text-zinc-800 uppercase tracking-widest">Area (sq.ft)</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-zinc-400 ml-1">MINIMUM</span>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={area.min}
                                                    onChange={(e) => setArea({ ...area, min: e.target.value })}
                                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-[12px] font-bold focus:outline-none focus:border-brand-primary transition-all"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-zinc-400 ml-1">MAXIMUM</span>
                                                <input
                                                    type="number"
                                                    placeholder="Any"
                                                    value={area.max}
                                                    onChange={(e) => setArea({ ...area, max: e.target.value })}
                                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-[12px] font-bold focus:outline-none focus:border-brand-primary transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </FilterDropdown>

                                {/* Furnishing */}
                                <FilterDropdown
                                    label="Furnishing"
                                    value={furnishing === "all" ? "" : furnishing}
                                    active={furnishing !== "all"}
                                >
                                    <div className="p-5 flex flex-wrap gap-2 min-w-[280px]">
                                        {(
                                            [
                                                ["all", "All"],
                                                ["furnished", "Furnished"],
                                                ["semi-furnished", "Semi"],
                                                ["unfurnished", "Unfurnished"],
                                            ] as [FurnishingFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setFurnishing(val)}
                                                className={`px-4 py-3 rounded-2xl text-[12px] font-bold border transition-all flex-1 text-center
                                                           ${furnishing === val ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20" : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-primary/30"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* Facing */}
                                <FilterDropdown
                                    label="Facing"
                                    value={facing === "all" ? "" : facing}
                                    active={facing !== "all"}
                                    icon={<Compass className="w-4 h-4" />}
                                >
                                    <div className="p-5 grid grid-cols-2 gap-3 min-w-[260px]">
                                        {(
                                            [
                                                ["all", "Any"],
                                                ["east", "East"],
                                                ["west", "West"],
                                                ["north", "North"],
                                                ["south", "South"],
                                            ] as [FacingFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setFacing(val)}
                                                className={`px-3 py-3 rounded-2xl text-[12px] font-bold border transition-all text-center
                                                           ${facing === val ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20" : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-primary/30"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* Age of Property */}
                                <FilterDropdown
                                    label="Age"
                                    value={age === "all" ? "" : age}
                                    active={age !== "all"}
                                    icon={<Calendar className="w-4 h-4" />}
                                >
                                    <div className="p-5 flex flex-wrap gap-2 min-w-[300px]">
                                        {(
                                            [
                                                ["all", "Any"],
                                                ["0-1", "0-1 Yr"],
                                                ["1-5", "1-5 Yrs"],
                                                ["5-10", "5-10 Yrs"],
                                                ["10+", "10+ Yrs"],
                                            ] as [AgeFilter, string][]
                                        ).map(([val, lbl]) => (
                                            <motion.button
                                                key={val}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setAge(val)}
                                                className={`px-4 py-3 rounded-2xl text-[12px] font-bold border transition-all flex-1 min-w-[80px] text-center
                                                           ${age === val ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20" : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-primary/30"}`}
                                            >
                                                {lbl}
                                            </motion.button>
                                        ))}
                                    </div>
                                </FilterDropdown>

                                {/* Amenities */}
                                <FilterDropdown
                                    label="Amenities"
                                    value={amenities.length > 0 ? `${amenities.length}` : ""}
                                    active={amenities.length > 0}
                                >
                                    <div className="p-6 space-y-4 min-w-[320px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                                                <X className="w-4 h-4 rotate-45" />
                                            </div>
                                            <h4 className="text-[12px] font-black text-zinc-800 uppercase tracking-widest">Amenities</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Gym", "Pool", "Parking", "Security", "Clubhouse", "Park"].map((amenity) => (
                                                <motion.button
                                                    key={amenity}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        if (amenities.includes(amenity)) {
                                                            setAmenities(amenities.filter((a) => a !== amenity));
                                                        } else {
                                                            setAmenities([...amenities, amenity]);
                                                        }
                                                    }}
                                                    className={`px-4 py-3 rounded-2xl text-[11px] font-bold border transition-all text-center
                                                               ${amenities.includes(amenity) ? "bg-brand-primary text-white border-brand-primary shadow-sm" : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-primary/30"}`}
                                                >
                                                    {amenity}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </FilterDropdown>

                                {/* Quality / RERA */}
                                <FilterDropdown
                                    label="Quality"
                                    value={reraOnly ? "RERA" : ""}
                                    active={reraOnly}
                                >
                                    <div className="p-6 space-y-4 min-w-[280px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <h4 className="text-[12px] font-black text-zinc-800 uppercase tracking-widest">Verification</h4>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            onClick={() => setReraOnly(!reraOnly)}
                                            className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all
                                                       ${reraOnly ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-zinc-100 text-zinc-600 hover:border-emerald-200/50'}`}
                                        >
                                            <span className="text-[13px] font-black">RERA Verified</span>
                                            <div className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${reraOnly ? 'bg-emerald-500' : 'bg-zinc-200'}`}>
                                                <motion.div 
                                                    animate={{ x: reraOnly ? 22 : 2 }}
                                                    className="w-5 h-5 bg-white rounded-full shadow-sm"
                                                />
                                            </div>
                                        </motion.button>
                                    </div>
                                </FilterDropdown>
                            </div>

                            {/* Active Filter Pills */}
                            {hasActiveFilters && (
                                <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                                    <button 
                                        onClick={resetFilters}
                                        className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    {budget !== "all" && <QuickPill label={`Budget: ${budget}`} onClick={() => setBudget("all")} />}
                                    {config !== "all" && <QuickPill label={`BHK: ${config}`} onClick={() => setConfig("all")} />}
                                    {status !== "all" && <QuickPill label={`Status: ${status}`} onClick={() => setStatus("all")} />}
                                    {propertyType !== "all" && <QuickPill label={`Type: ${propertyType}`} onClick={() => setPropertyType("all")} />}
                                    {postedBy !== "all" && <QuickPill label={`Posted: ${postedBy}`} onClick={() => setPostedBy("all")} />}
                                    {furnishing !== "all" && <QuickPill label={`Furnishing: ${furnishing}`} onClick={() => setFurnishing("all")} />}
                                    {facing !== "all" && <QuickPill label={`Facing: ${facing}`} onClick={() => setFacing("all")} />}
                                    {age !== "all" && <QuickPill label={`Age: ${age}`} onClick={() => setAge("all")} />}
                                    {amenities.length > 0 && <QuickPill label={`${amenities.length} Amenities`} onClick={() => setAmenities([])} />}
                                    {reraOnly && <QuickPill label="RERA Only" onClick={() => setReraOnly(false)} />}
                                    {(area.min || area.max) && <QuickPill label="Area Filter" onClick={() => setArea({ min: "", max: "" })} />}
                                </div>
                            )}
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
                            initialProperties={initialProperties || listingProperties.slice(0, 10)}
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

                <FAQ faqs={faqs} mode={mode} />
            </div>
        </div>
    );
}

// Helper component for Quick Filter Pills
function QuickPill({ label, onClick }: { label: string, onClick: () => void }) {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full whitespace-nowrap text-[11px] font-black hover:bg-brand-primary/20 transition-all shadow-sm"
        >
            <span className="max-w-[120px] truncate">{label}</span>
            <X className="w-3 h-3 flex-shrink-0" />
        </motion.button>
    );
}

// Helper component for Dropdown Filters
function FilterDropdown({ label, icon, value, active, children }: { label: string, icon?: React.ReactNode, value: string, active: boolean, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const updatePosition = useCallback(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            let left = rect.left;
            const menuWidth = 320;
            if (left + menuWidth > window.innerWidth - 12) {
                left = window.innerWidth - menuWidth - 12;
            }
            if (left < 12) left = 12;

            setCoords({ 
                top: rect.bottom + 12, 
                left: left
            });
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            
            const handleClickOutside = (event: MouseEvent) => {
                const target = event.target as Element;
                if (dropdownRef.current && !dropdownRef.current.contains(target) && !target.closest(".filter-portal-content")) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
                document.addEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isOpen, updatePosition]);

    if (!mounted) return null;

    return (
        <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2.5 px-6 py-4 rounded-[24px] whitespace-nowrap text-[13px] font-black transition-all duration-300 border relative group
                           ${active 
                               ? "bg-zinc-900 text-white border-zinc-900 shadow-[0_12px_24px_rgba(0,0,0,0.15)] scale-[1.02]" 
                               : "bg-white border-zinc-100 text-zinc-800 hover:border-brand-primary/40 hover:bg-zinc-50 shadow-sm"}`}
            >
                {/* Active Indicator Line */}
                {active && (
                    <motion.div 
                        layoutId="active-line"
                        className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-8 h-[3px] bg-brand-primary rounded-full shadow-[0_0_8px_rgba(186,163,96,0.5)]" 
                    />
                )}
                
                {icon && <span className={`${active ? "text-brand-primary" : "text-brand-primary"} transition-colors`}>{icon}</span>}
                {label}
                {value && (
                    <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`text-[10px] px-2 py-0.5 rounded-full ml-0.5 font-black ${active ? "bg-brand-primary text-white" : "bg-brand-primary text-white"}`}
                    >
                        {value}
                    </motion.span>
                )}
                <svg className={`w-3 h-3 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : ""} ${active ? "text-white/40" : "text-zinc-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="filter-portal fixed inset-0 z-[10000] pointer-events-none">
                            <div 
                                onClick={() => setIsOpen(false)}
                                className="absolute inset-0 bg-black/[0.02] pointer-events-auto"
                            />
                            
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                                transition={{ type: "spring", damping: 28, stiffness: 400 }}
                                style={{ 
                                    top: coords.top, 
                                    left: coords.left,
                                    position: "fixed" 
                                }}
                                className="filter-portal-content pointer-events-auto bg-white rounded-[32px] border border-zinc-100 shadow-[0_32px_80px_rgba(0,0,0,0.28)] overflow-hidden min-w-[280px] w-auto max-w-[calc(100vw-24px)]"
                            >
                                <div className="max-h-[60vh] overflow-y-auto no-scrollbar scroll-smooth">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {children}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
