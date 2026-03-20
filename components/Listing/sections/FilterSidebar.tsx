"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterGroup from "./FilterGroup";
import FilterPill from "./FilterPill";
import {
    SlidersHorizontal,
    X,
    BadgeCheck,
    Home,
    User,
    Building,
    LayoutGrid,
    Compass,
    Sparkles,
    Calendar,
    ArrowUpDown,
    Maximize2,
} from "lucide-react";

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
} from "./types";

interface FilterSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    budget: BudgetFilter;
    setBudget: (budget: BudgetFilter) => void;
    config: ConfigFilter;
    setConfig: (config: ConfigFilter) => void;
    status: StatusFilter;
    setStatus: (status: StatusFilter) => void;
    postedBy: PostedByFilter;
    setPostedBy: (val: PostedByFilter) => void;
    propertyType: PropertyTypeFilter;
    setPropertyType: (val: PropertyTypeFilter) => void;
    furnishing: FurnishingFilter;
    setFurnishing: (val: FurnishingFilter) => void;
    facing: FacingFilter;
    setFacing: (val: FacingFilter) => void;
    age: AgeFilter;
    setAge: (val: AgeFilter) => void;
    amenities: string[];
    setAmenities: (val: string[]) => void;
    area: AreaFilter;
    setArea: (val: AreaFilter) => void;
    sortBy: SortFilter;
    setSortBy: (val: SortFilter) => void;
    reraOnly: boolean;
    setReraOnly: (reraOnly: boolean) => void;
    hasActiveFilters: boolean;
    resetFilters: () => void;
}

export default function FilterSidebar({
    sidebarOpen,
    setSidebarOpen,
    budget,
    setBudget,
    config,
    setConfig,
    status,
    setStatus,
    postedBy,
    setPostedBy,
    propertyType,
    setPropertyType,
    furnishing,
    setFurnishing,
    facing,
    setFacing,
    age,
    setAge,
    amenities,
    setAmenities,
    area,
    setArea,
    sortBy,
    setSortBy,
    reraOnly,
    setReraOnly,
    hasActiveFilters,
    resetFilters,
}: FilterSidebarProps) {
    // Extract filter content to a separate variable for reuse
    const filterContent = (
        <>
            {/* Sort By filter */}
            <FilterGroup title="Sort By" icon={<ArrowUpDown className="w-4 h-4" />} activeCount={sortBy !== "relevance" ? 1 : 0}>
                <div className="flex flex-col gap-2 pt-1">
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
                        <button
                            key={val}
                            onClick={() => setSortBy(val)}
                            className={`text-left px-4 py-2 rounded-xl text-[13px] cursor-pointer font-semibold border transition-all duration-200
                                       ${sortBy === val
                                    ? "bg-brand-primary text-white border-brand-primary"
                                    : "bg-white text-brand-paragraph border-brand-muted/40 hover:border-brand-primary hover:text-brand-primary"
                                }`}
                        >
                            {lbl}
                        </button>
                    ))}
                </div>
            </FilterGroup>

            {/* Budget filter */}
            <FilterGroup title="Budget" icon={<Sparkles className="w-4 h-4" />} activeCount={budget !== "all" ? 1 : 0}>
                <div className="flex flex-wrap gap-2 pt-1">
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
                        <FilterPill
                            key={val}
                            label={lbl}
                            active={budget === val}
                            onClick={() => setBudget(val)}
                        />
                    ))}
                </div>
            </FilterGroup>

            {/* Area filter */}
            <FilterGroup title="Area (sq. ft.)" icon={<Maximize2 className="w-4 h-4" />} activeCount={(area.min || area.max) ? 1 : 0}>
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-brand-paragraph uppercase tracking-wider ml-1">Min Area</label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Min"
                                value={area.min}
                                onChange={(e) => setArea({ ...area, min: e.target.value })}
                                className="w-full bg-brand-muted/10 border border-brand-muted/30 rounded-xl px-3 py-2 text-[13px] 
                                           font-semibold text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-primary/20 
                                           focus:border-brand-primary transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-brand-paragraph uppercase tracking-wider ml-1">Max Area</label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Max"
                                value={area.max}
                                onChange={(e) => setArea({ ...area, max: e.target.value })}
                                className="w-full bg-brand-muted/10 border border-brand-muted/30 rounded-xl px-3 py-2 text-[13px] 
                                           font-semibold text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-primary/20 
                                            focus:border-brand-primary transition-all"
                            />
                        </div>
                    </div>
                </div>
            </FilterGroup>

            {/* Configuration filter */}
            <FilterGroup title="BHK Type" icon={<Home className="w-4 h-4" />} activeCount={config !== "all" ? 1 : 0}>
                <div className="flex flex-wrap gap-2 pt-1">
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
                        <FilterPill
                            key={val}
                            label={lbl}
                            active={config === val}
                            onClick={() => setConfig(val)}
                        />
                    ))}
                </div>
            </FilterGroup>

            {/* Property Type filter */}
            <FilterGroup title="Property Type" icon={<LayoutGrid className="w-4 h-4" />} activeCount={propertyType !== "all" ? 1 : 0}>
                <div className="flex flex-wrap gap-2 pt-1">
                    {(
                        [
                            ["all", "Any"],
                            ["residential", "Residential"],
                            ["commercial", "Commercial"],
                            ["plot", "Plots"],
                            ["industrial", "Industrial"],
                        ] as [PropertyTypeFilter, string][]
                    ).map(([val, lbl]) => (
                        <FilterPill
                            key={val}
                            label={lbl}
                            active={propertyType === val}
                            onClick={() => setPropertyType(val)}
                        />
                    ))}
                </div>
            </FilterGroup>

            {/* Posting filter */}
            <FilterGroup title="Posted By" icon={<User className="w-4 h-4" />} activeCount={postedBy !== "all" ? 1 : 0}>
                <div className="flex flex-wrap gap-2 pt-1">
                    {(
                        [
                            ["all", "All"],
                            ["owner", "Owner"],
                            ["agent", "Agent"],
                            ["builder", "Builder"],
                        ] as [PostedByFilter, string][]
                    ).map(([val, lbl]) => (
                        <FilterPill
                            key={val}
                            label={lbl}
                            active={postedBy === val}
                            onClick={() => setPostedBy(val)}
                        />
                    ))}
                </div>
            </FilterGroup>

            {/* Construction Status filter */}
            <FilterGroup title="Possession Status" icon={<Building className="w-4 h-4" />} activeCount={status !== "all" ? 1 : 0}>
                <div className="flex flex-col gap-2 pt-1">
                    {(
                        [
                            ["all", "Any Status"],
                            ["ready-to-move", "Ready to Move"],
                            ["under-construction", "Under Construction"],
                            ["new-launch", "New Launch"],
                        ] as [StatusFilter, string][]
                    ).map(([val, lbl]) => (
                        <button
                            key={val}
                            onClick={() => setStatus(val)}
                            className={`text-left px-4 py-2.5 rounded-xl text-[13px] cursor-pointer
                                       font-bold border transition-all duration-200
                                       ${status === val
                                    ? "bg-[#baa360] text-white border-[#baa360]"
                                    : "bg-white text-zinc-600 border-zinc-100 hover:border-[#baa360]/50 hover:text-[#baa360]"
                                }`}
                        >
                            {lbl}
                        </button>
                    ))}
                </div>
            </FilterGroup>

            {/* Furnishing filter */}
            <FilterGroup title="Furnishing" icon={<LayoutGrid className="w-4 h-4" />} activeCount={furnishing !== "all" ? 1 : 0}>
                <div className="flex flex-wrap gap-2 pt-1">
                    {(
                        [
                            ["all", "All"],
                            ["furnished", "Furnished"],
                            ["semi-furnished", "Semi"],
                            ["unfurnished", "Unfurnished"],
                        ] as [FurnishingFilter, string][]
                    ).map(([val, lbl]) => (
                        <FilterPill
                            key={val}
                            label={lbl}
                            active={furnishing === val}
                            onClick={() => setFurnishing(val)}
                        />
                    ))}
                </div>
            </FilterGroup>

            {/* Facing filter */}
            <FilterGroup title="Facing" icon={<Compass className="w-4 h-4" />} activeCount={facing !== "all" ? 1 : 0}>
                <div className="grid grid-cols-2 gap-2 pt-1">
                    {(
                        [
                            ["all", "Any"],
                            ["east", "East"],
                            ["west", "West"],
                            ["north", "North"],
                            ["south", "South"],
                            ["north-east", "N-East"],
                            ["north-west", "N-West"],
                        ] as [FacingFilter, string][]
                    ).map(([val, lbl]) => (
                        <FilterPill
                            key={val}
                            label={lbl}
                            active={facing === val}
                            onClick={() => setFacing(val)}
                        />
                    ))}
                </div>
            </FilterGroup>

            {/* Age filter */}
            <FilterGroup title="Age of Property" icon={<Calendar className="w-4 h-4" />} activeCount={age !== "all" ? 1 : 0}>
                <div className="flex flex-wrap gap-2 pt-1">
                    {(
                        [
                            ["all", "Any"],
                            ["0-1", "0-1 Year"],
                            ["1-5", "1-5 Years"],
                            ["5-10", "5-10 Years"],
                            ["10+", "10+ Years"],
                        ] as [AgeFilter, string][]
                    ).map(([val, lbl]) => (
                        <FilterPill
                            key={val}
                            label={lbl}
                            active={age === val}
                            onClick={() => setAge(val)}
                        />
                    ))}
                </div>
            </FilterGroup>

            {/* Amenities multi-select */}
            <FilterGroup title="Amenities" icon={<Sparkles className="w-4 h-4" />} activeCount={amenities.length}>
                <div className="flex flex-wrap gap-2 pt-1">
                    {["Gym", "Pool", "Parking", "Security", "Clubhouse", "Park"].map((amenity) => (
                        <FilterPill
                            key={amenity}
                            label={amenity}
                            active={amenities.includes(amenity)}
                            onClick={() => {
                                if (amenities.includes(amenity)) {
                                    setAmenities(amenities.filter((a) => a !== amenity));
                                } else {
                                    setAmenities([...amenities, amenity]);
                                }
                            }}
                        />
                    ))}
                </div>
            </FilterGroup>

            {/* RERA Toggle */}
            <FilterGroup title="Quality" activeCount={reraOnly ? 1 : 0}>
                <label
                    htmlFor="rera-toggle"
                    className="flex items-center justify-between
                               cursor-pointer group/toggle pt-1"
                >
                    <div className="flex items-center gap-2.5">
                        <BadgeCheck
                            className="w-4 h-4 text-emerald-500"
                            aria-hidden="true"
                        />
                        <span className="text-[13px] font-bold text-zinc-700
                                       group-hover/toggle:text-zinc-900 transition-colors">
                            RERA Verified only
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="rera-toggle"
                            checked={reraOnly}
                            onChange={(e) => setReraOnly(e.target.checked)}
                            className="sr-only"
                            aria-label="Show only RERA verified properties"
                        />
                        <div
                            className={`w-10 h-5.5 rounded-full transition-colors duration-300 flex items-center
                                       ${reraOnly ? "bg-emerald-500" : "bg-zinc-200"}`}
                        >
                            <div
                                className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm
                                           transition-transform duration-300
                                           ${reraOnly ? "translate-x-5" : "translate-x-0.5"}`}
                            />
                        </div>
                    </div>
                </label>
            </FilterGroup>
        </>
    );

    return (
        <React.Fragment>
            {/* Mobile overlay backdrop */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-[100] lg:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        id="filter-sidebar"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 left-0 w-full max-w-[320px] bg-white z-[101] lg:hidden flex flex-col shadow-2xl border-r border-zinc-100"
                    >
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                                    <SlidersHorizontal className="w-5 h-5 text-brand-primary" />
                                </div>
                                <div>
                                    <span className="block text-[17px] font-black text-brand-heading leading-tight">
                                        Filters
                                    </span>
                                    <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                                        Refine Search
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-2 no-scrollbar">
                            {filterContent}
                        </div>

                        {/* Sticky Bottom Footer for Mobile */}
                        <div className="p-4 sm:p-6 border-t border-zinc-100 bg-white/80 backdrop-blur-md space-y-3">
                            {hasActiveFilters && (
                                <button
                                    onClick={() => {
                                        resetFilters();
                                        setSidebarOpen(false);
                                    }}
                                    className="w-full py-3.5 bg-zinc-50 text-zinc-600 rounded-2xl font-bold text-[14px] hover:bg-zinc-100 transition-all"
                                >
                                    Reset All
                                </button>
                            )}
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black text-[15px] shadow-lg shadow-brand-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-black"
                            >
                                Show Listings
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar (Static) */}
            <aside
                id="filter-sidebar-desktop"
                className="hidden lg:block w-[260px] xl:w-[300px] flex-shrink-0"
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-[32px] border border-zinc-100 shadow-[0_8px_40px_rgba(0,0,0,0.03)] sticky top-28 overflow-hidden"
                >
                    {/* Desktop Header */}
                    <div className="p-7 pb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                                    <SlidersHorizontal className="w-5 h-5" />
                                </div>
                                <span className="text-[18px] font-black text-zinc-900 uppercase tracking-tight">Filters</span>
                            </div>
                            {hasActiveFilters && (
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "#fef2f2", color: "#ef4444" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetFilters}
                                    className="text-[11px] font-black text-zinc-400 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-100 transition-all uppercase tracking-widest"
                                >
                                    Reset
                                </motion.button>
                            )}
                        </div>
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Refine Listings</p>
                    </div>

                    <div className="px-7 py-2 max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar scroll-smooth">
                        {filterContent}
                    </div>

                    {/* Subtle aesthetic footer for the card */}
                    <div className="p-6 bg-zinc-50/50 border-t border-zinc-50 mt-4">
                        <div className="flex items-center justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest px-2">
                            <span>{hasActiveFilters ? "Active Filters Applied" : "No Filters"}</span>
                            <div className={`w-2 h-2 rounded-full ${hasActiveFilters ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-zinc-200"}`} />
                        </div>
                    </div>
                </motion.div>
            </aside>
        </React.Fragment>
    );
}
