"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, MapPin, Mic, Plus, Check, BedDouble, Users, Sparkles, Clock, Key, User, Building, Briefcase } from "lucide-react";

const tabs = [
    { label: "Buy" },
    { label: "Rent" },
    { label: "Sell" },
    { label: "Commercial" },
    { label: "Plots/Land" },
    { label: "PG/Co-Living" },
];

const budgetPresets = [1, 5, 10, 25, 50, 100];

const bedroomOptions = ["1 RK/1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];

const constructionStatusOptions = [
    { label: "New Launch", desc: "Best preliminary offers", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Under Construction", desc: "Customizable options", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Ready to move", desc: "Immediate possession", icon: Key, color: "text-emerald-500", bg: "bg-emerald-50" }
];

const postedByOptions = [
    { label: "Owner", desc: "Zero brokerage fees", icon: User },
    { label: "Builder", desc: "Direct from developer", icon: Building },
    { label: "Dealer", desc: "Verified real estate agents", icon: Briefcase }
];

export default function AdvancedSearch() {
    const [activeTab, setActiveTab] = useState("Buy");

    // Filter Popover State
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilterTab, setActiveFilterTab] = useState("Budget");

    // Filter selections
    const [activeBudget, setActiveBudget] = useState(100);
    const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedPostedBy, setSelectedPostedBy] = useState<string[]>([]);

    const filterRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close the filter popup
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilters(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleSelection = (setter: React.Dispatch<React.SetStateAction<string[]>>, option: string) => {
        setter((prev) =>
            prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
        );
    };

    const getDropdownLabel = () => {
        const parts = [];
        if (activeBudget < 100) parts.push(`Up to ${activeBudget}Cr`);
        if (selectedBedrooms.length > 0) parts.push(...selectedBedrooms);
        if (selectedStatus.length > 0) parts.push(...selectedStatus);
        if (selectedPostedBy.length > 0) parts.push(...selectedPostedBy);

        if (parts.length === 0) return "Property Filters";

        return parts.join(", ");
    };


    return (
        <div className="container mx-auto px-4 max-w-6xl relative z-30 -mt-24 md:-mt-[5.5rem]">
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-border w-full flex flex-col">
                {/* Top Tabs Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-border">
                    <div className="flex items-center overflow-x-auto w-full no-scrollbar px-2 sm:px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.label)}
                                className={`relative flex items-center whitespace-nowrap px-6 py-5 text-[15px] transition-colors duration-300 font-medium cursor-pointer ${activeTab === tab.label
                                    ? "text-brand-heading font-extrabold"
                                    : "text-brand-paragraph hover:text-brand-heading"
                                    }`}
                            >
                                {tab.label}
                                {/* Active Underline */}
                                {activeTab === tab.label && (
                                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-primary rounded-t-sm" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="hidden sm:flex items-center py-3 px-8 border-l border-neutral-border h-full">
                        <button className="flex items-center gap-2 text-brand-paragraph hover:text-brand-primary transition-colors text-[15px] font-semibold whitespace-nowrap cursor-pointer">
                            Post Property
                        </button>
                    </div>
                </div>

                {/* Bottom Search Row */}
                <div className="flex flex-col md:flex-row items-stretch min-h-[88px] relative">
                    {/* Dropdown & Filter Popover */}
                    <div className="flex flex-col justify-center min-w-max md:border-r border-b md:border-b-0 border-neutral-border" ref={filterRef}>
                        <div
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center px-6 py-4 md:py-0 w-full h-full cursor-pointer hover:bg-neutral-50 transition-colors md:rounded-bl-xl"
                        >
                            <button className="flex items-center gap-3 w-full justify-between text-[15px] text-brand-heading font-semibold cursor-pointer">
                                <span className="truncate max-w-[150px] md:max-w-[200px] xl:max-w-[230px] text-left">
                                    {getDropdownLabel()}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-brand-heading transition-transform duration-300 flex-shrink-0 ${showFilters ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* The Mega Filter Popover */}
                        {showFilters && (
                            <div className="absolute top-[100%] left-0 mt-2 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-border w-full p-6 z-50 animate-fade-in">
                                {/* Top filter tabs */}
                                <div className="flex flex-wrap items-center gap-3 mb-8">
                                    {["Budget", "Bedroom", "Construction Status", "Posted By"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveFilterTab(tab)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[14px] font-medium transition-all ${activeFilterTab === tab
                                                ? "border-brand-primary text-brand-primary bg-brand-primary/5"
                                                : "border-neutral-border text-brand-paragraph hover:border-brand-primary hover:text-brand-primary"
                                                }`}
                                        >
                                            {tab}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${activeFilterTab === tab ? "rotate-180" : ""}`} />
                                        </button>
                                    ))}
                                </div>

                                {/* Active Tab Content */}
                                <div className="min-h-[120px]">
                                    {activeFilterTab === "Budget" && (
                                        <div className="flex flex-col gap-6 animate-fade-in p-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div>
                                                    <span className="text-brand-heading font-semibold text-[16px] block mb-1">Select Price Range</span>
                                                    <span className="text-brand-paragraph/70 font-medium text-[13px]">Slide to adjust your maximum budget</span>
                                                </div>
                                                <div className="px-5 py-2.5 bg-brand-primary/10 rounded-xl border border-brand-primary/20 shadow-sm flex items-center justify-center gap-2 group/budget hover:bg-brand-primary/15 transition-colors">
                                                    <span className="text-brand-heading text-[13px] font-medium">Up to</span>
                                                    <span className="text-brand-primary font-bold text-[18px]">
                                                        {activeBudget === 100 ? "100+ Cr" : `${activeBudget} Cr`}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-12 mb-6 relative flex items-center w-full h-8 group px-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={activeBudget}
                                                    onChange={(e) => setActiveBudget(Number(e.target.value))}
                                                    className="w-full absolute z-20 opacity-0 cursor-pointer h-full left-0 m-0"
                                                />

                                                {/* Track Background */}
                                                <div className="w-full h-2.5 bg-neutral-200 rounded-full relative z-10 pointer-events-none shadow-inner overflow-hidden border border-neutral-300">
                                                    {/* Filled Track */}
                                                    <div
                                                        className="h-full bg-gradient-to-r from-brand-primary/70 to-brand-primary rounded-full transition-all duration-150 relative"
                                                        style={{ width: `${activeBudget}%` }}
                                                    ></div>
                                                </div>

                                                {/* Left Fixed Marker */}
                                                <div className="absolute top-8 left-2 text-[12px] font-bold text-brand-paragraph/50">
                                                    0
                                                </div>
                                                {/* Right Fixed Marker */}
                                                <div className="absolute top-8 right-2 text-[12px] font-bold text-brand-paragraph/50">
                                                    100+ Cr
                                                </div>

                                                {/* Draggable Handle */}
                                                <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-150 pointer-events-none z-30"
                                                    style={{ left: `calc(8px + (100% - 16px) * ${activeBudget / 100})` }}>
                                                    {/* Tooltip */}
                                                    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-brand-dark text-white text-[13px] font-bold px-3.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap transition-all duration-200 group-hover:scale-105 group-hover:-translate-y-1 group-active:scale-95 group-active:bg-brand-primary">
                                                        {activeBudget === 100 ? "100+ Cr" : `${activeBudget} Cr`}
                                                        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-brand-dark group-active:bg-brand-primary transition-colors rotate-45"></div>
                                                    </div>
                                                    {/* Outer Ring Handle */}
                                                    <div className="w-7 h-7 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.15)] border-2 border-brand-primary flex items-center justify-center transform -translate-x-1/2 group-hover:scale-110 group-active:scale-95 transition-transform duration-200 ring-4 ring-brand-primary/10 group-active:ring-brand-primary/30">
                                                        {/* Inner Dot */}
                                                        <div className="w-2.5 h-2.5 bg-brand-primary rounded-full transition-transform group-active:scale-125"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Select Presets */}
                                            <div className="mt-4 pt-6 border-t border-neutral-border">
                                                <span className="text-[14px] text-brand-heading font-semibold mb-4 flex items-center gap-2">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                                    Quick Select Budgets
                                                </span>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3">
                                                    {budgetPresets.map((preset) => (
                                                        <button
                                                            key={preset}
                                                            onClick={(e) => { e.stopPropagation(); setActiveBudget(preset); }}
                                                            className={`px-4 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all duration-300 md:flex-1 text-center justify-center flex items-center gap-1.5
                                                                ${activeBudget === preset
                                                                    ? 'bg-brand-primary text-white shadow-[0_4px_12px_rgba(186,163,96,0.3)] transform scale-[1.02] border border-transparent'
                                                                    : 'bg-neutral-50 text-brand-paragraph border border-neutral-border hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 hover:shadow-sm'
                                                                }`}
                                                        >
                                                            {activeBudget === preset && <Check className="w-4 h-4" />}
                                                            {preset === 100 ? "100+ Cr" : `Up to ${preset} Cr`}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeFilterTab === "Bedroom" && (
                                        <div className="flex flex-col gap-6 animate-fade-in p-2">
                                            <div>
                                                <span className="text-brand-heading font-semibold text-[16px] block mb-1">Number of Bedrooms</span>
                                                <span className="text-brand-paragraph/70 font-medium text-[13px]">Select configurations that fit your family size</span>
                                            </div>

                                            {/* Quick Suggestions */}
                                            <div className="flex flex-wrap gap-3 mb-2">
                                                <button onClick={() => setSelectedBedrooms(["1 RK/1 BHK", "2 BHK"])} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[13px] font-medium hover:bg-blue-100 transition-colors border border-blue-100"><Users className="w-3.5 h-3.5" /> Small Family (1-2 BHK)</button>
                                                <button onClick={() => setSelectedBedrooms(["3 BHK", "4 BHK", "4+ BHK"])} className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-[13px] font-medium hover:bg-green-100 transition-colors border border-green-100"><Users className="w-3.5 h-3.5" /> Large Family (3+ BHK)</button>
                                            </div>

                                            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 mt-1">
                                                {bedroomOptions.map((opt) => {
                                                    const isSelected = selectedBedrooms.includes(opt);
                                                    return (
                                                        <button
                                                            key={opt}
                                                            onClick={() => toggleSelection(setSelectedBedrooms, opt)}
                                                            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border font-semibold transition-all duration-300 md:flex-1
                                                                ${isSelected
                                                                    ? "border-brand-primary bg-brand-primary text-white shadow-[0_4px_12px_rgba(186,163,96,0.3)] transform scale-[1.02]"
                                                                    : "border-neutral-border bg-neutral-50 text-brand-paragraph hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 hover:shadow-sm"
                                                                }`}
                                                        >
                                                            {isSelected ? <Check className="w-4 h-4" /> : <BedDouble className={`w-4 h-4 ${isSelected ? "text-white" : "text-brand-paragraph opacity-60"}`} />}
                                                            {opt}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {activeFilterTab === "Construction Status" && (
                                        <div className="flex flex-col gap-6 animate-fade-in p-2">
                                            <div>
                                                <span className="text-brand-heading font-semibold text-[16px] block mb-1">Construction Status</span>
                                                <span className="text-brand-paragraph/70 font-medium text-[13px]">When are you planning to move in?</span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                                                {constructionStatusOptions.map((opt) => {
                                                    const isSelected = selectedStatus.includes(opt.label);
                                                    const Icon = opt.icon;
                                                    return (
                                                        <button
                                                            key={opt.label}
                                                            onClick={() => toggleSelection(setSelectedStatus, opt.label)}
                                                            className={`relative flex flex-col items-start p-4 rounded-xl border transition-all duration-300 overflow-hidden group text-left
                                                                ${isSelected
                                                                    ? "border-brand-primary bg-brand-primary/5 shadow-sm"
                                                                    : "border-neutral-border bg-white hover:border-brand-primary hover:shadow-md"
                                                                }`}
                                                        >
                                                            {/* Active Indicator Top line */}
                                                            {isSelected && <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>}

                                                            <div className="flex items-center justify-between w-full mb-3">
                                                                <div className={`p-2 rounded-lg ${isSelected ? "bg-brand-primary text-white" : opt.bg + " " + opt.color} transition-colors`}>
                                                                    <Icon className="w-5 h-5" />
                                                                </div>
                                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-brand-primary bg-brand-primary" : "border-neutral-300"}`}>
                                                                    {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                                                </div>
                                                            </div>
                                                            <span className={`font-bold text-[15px] mb-1 leading-tight ${isSelected ? "text-brand-primary" : "text-brand-heading"}`}>{opt.label}</span>
                                                            <span className="text-[12px] font-medium text-brand-paragraph/60 text-left">{opt.desc}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {activeFilterTab === "Posted By" && (
                                        <div className="flex flex-col gap-6 animate-fade-in p-2">
                                            <div>
                                                <span className="text-brand-heading font-semibold text-[16px] block mb-1">Posted By</span>
                                                <span className="text-brand-paragraph/70 font-medium text-[13px]">Filter properties by the type of seller</span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                                                {postedByOptions.map((opt) => {
                                                    const isSelected = selectedPostedBy.includes(opt.label);
                                                    const Icon = opt.icon;
                                                    return (
                                                        <button
                                                            key={opt.label}
                                                            onClick={() => toggleSelection(setSelectedPostedBy, opt.label)}
                                                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
                                                                ${isSelected
                                                                    ? "border-brand-primary bg-brand-primary shadow-[0_4px_12px_rgba(186,163,96,0.3)] transform scale-[1.02]"
                                                                    : "border-neutral-border bg-neutral-50 hover:border-brand-primary hover:bg-white hover:shadow-md"
                                                                }`}
                                                        >
                                                            <div className={`p-2.5 rounded-full flex-shrink-0 transition-colors ${isSelected ? "bg-white/20 text-white" : "bg-neutral-200 text-brand-heading"}`}>
                                                                <Icon className="w-5 h-5" />
                                                            </div>
                                                            <div className="flex flex-col items-start text-left">
                                                                <span className={`font-bold text-[14px] leading-tight ${isSelected ? "text-white" : "text-brand-heading"}`}>{opt.label}</span>
                                                                <span className={`font-medium text-[12px] mt-0.5 ${isSelected ? "text-white/80" : "text-brand-paragraph/70"}`}>{opt.desc}</span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Input Area */}
                    <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-0 w-full min-w-[200px]">
                        <Search className="w-5 h-5 text-brand-heading/70 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder='Search "Flats for sale in Kharghar, Navi Mumbai"'
                            className="w-full bg-transparent border-none outline-none px-3 text-[15px] text-brand-heading placeholder:text-brand-paragraph/80 placeholder:font-medium max-[426px]:placeholder:text-sm max-[376px]:placeholder:text-xs"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 px-4 md:px-6 py-4 md:py-0 ml-auto max-[426px]:ml-0 max-[426px]:w-full max-[426px]:justify-between md:rounded-br-xl rounded-b-xl">
                        <div className="flex items-center gap-3">
                            <button className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors flex-shrink-0 cursor-pointer" title="Detect Location">
                                <MapPin className="w-[20px] h-[20px]" strokeWidth={2.5} />
                            </button>
                            <button className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors flex-shrink-0 cursor-pointer" title="Voice Search">
                                <Mic className="w-[20px] h-[20px]" strokeWidth={2.5} />
                            </button>
                        </div>
                        <button className="flex items-center justify-center bg-brand-button hover:bg-brand-button-hover text-brand-white px-8 h-12 rounded-lg font-bold transition-all shadow-sm hover:shadow text-[16px] cursor-pointer">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
