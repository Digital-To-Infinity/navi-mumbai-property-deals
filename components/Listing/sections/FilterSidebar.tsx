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
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            <aside
                id="filter-sidebar"
                aria-label="Property filters"
                className={`
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    fixed lg:static top-0 left-0 h-full lg:h-auto z-50 lg:z-auto
                    w-[300px] lg:w-[260px] xl:w-[290px] flex-shrink-0
                    transition-transform duration-300 ease-out lg:transition-none
                `}
            >
                <div
                    className="bg-white h-full lg:h-auto rounded-none lg:rounded-[24px]
                               border-r lg:border border-zinc-100
                               shadow-xl lg:shadow-[0_4px_32px_rgba(0,0,0,0.04)]
                               lg:sticky lg:top-28 p-6"
                >
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between mb-7">
                        <div className="flex items-center gap-2.5">
                            <SlidersHorizontal
                                className="w-5 h-5 text-[#baa360]"
                                aria-hidden="true"
                            />
                            <span className="text-[17px] font-black text-zinc-900 tracking-tight">
                                Filters
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="text-[12px] font-bold text-[#baa360]
                                               px-3 py-1 rounded-full bg-[#baa360]/5
                                               hover:bg-[#baa360]/10 transition-colors"
                                >
                                    Reset
                                </button>
                            )}
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden w-8 h-8 rounded-full bg-zinc-50
                                           flex items-center justify-center
                                           text-zinc-500 hover:bg-zinc-100 transition-colors"
                                aria-label="Close filters panel"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
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
                    </div>
                </div>
            </aside>
        </React.Fragment>
    );
}
