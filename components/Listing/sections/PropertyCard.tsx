"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Maximize2, BadgeCheck, ArrowRight, Building2, Sparkles, Sofa, Calendar, User, Shield, Layers, ParkingCircle, Bookmark } from "lucide-react";
import type { ListingProperty, ListingMode } from "../listingData";


const tagColors: Record<string, string> = {
    "Ready to Move": "bg-emerald-500/90 text-white",
    Premium: "bg-[#baa360]/90 text-white",
    "New Launch": "bg-violet-600/90 text-white",
    Exclusive: "bg-rose-600/90 text-white",
    "Under Construction": "bg-amber-500/90 text-white",
    Upgraded: "bg-sky-600/90 text-white",
    "Value Pick": "bg-teal-500/90 text-white",
    Trending: "bg-pink-500/90 text-white",
};

function getTagClass(tag: string): string {
    return tagColors[tag] ?? "bg-zinc-700/90 text-white";
}

function getCtaLabel(mode: ListingMode): string {
    if (mode === "buy") return "View Property";
    if (mode === "rent") return "View Property";
    return "List for Sale";
}

// Card animation variants
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.55,
            delay: i * 0.09,
            ease: EASE_OUT_EXPO,
        },
    }),
};

// Component
interface PropertyCardProps {
    property: ListingProperty;
    index: number;
    mode: ListingMode;
}

export default function PropertyCard({ property, index, mode }: PropertyCardProps) {
    const [isSaved, setIsSaved] = useState(false);
    const titleId = `prop-title-${property.id}`;
    const ctaLabel = getCtaLabel(mode);

    return (
        <motion.article
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            aria-labelledby={titleId}
            className="group relative flex flex-col bg-white rounded-[22px] overflow-hidden
                       border border-zinc-100 shadow-[0_2px_24px_rgba(0,0,0,0.05)]
                       hover:shadow-[0_20px_56px_rgba(186,163,96,0.18)]
                       hover:border-[#baa360]/25
                       transition-all duration-500"
        >
            {/* Image wrapper */}
            <div className="relative h-[220px] overflow-hidden" aria-hidden="true">
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent z-10 opacity-75 group-hover:opacity-90 transition-opacity duration-500" />

                <Image
                    src={property.image}
                    alt={`Exterior view of ${property.title} in ${property.location}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1100ms] ease-in-out"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 30vw"
                />

                {/* Top-left badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                    {property.isFeatured && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary text-white text-[10px] font-black uppercase tracking-wider">
                            <Sparkles className="w-3 h-3 fill-current" />
                            Featured
                        </span>
                    )}
                    <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase
                                   tracking-wider shadow-md backdrop-blur-sm ${getTagClass(property.tag)}`}
                    >
                        {property.tag}
                    </span>
                </div>

                {/* Save button */}
                <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full
                               bg-white/90 backdrop-blur-sm flex items-center justify-center
                               transition-all duration-300 shadow-md active:scale-90 cursor-pointer"
                    aria-label={`${isSaved ? "Unsave" : "Save"} ${property.title}`}
                    title={isSaved ? "Unsave" : "Save"}
                >
                    <Bookmark
                        className={`w-[18px] h-[18px] transition-all duration-300 
                                   ${isSaved ? "fill-brand-heading text-hading" : "text-brand-paragraph hover:text-brand-heading"}`}
                        strokeWidth={2}
                    />
                </button>

                {/* Price overlay */}
                <div className="absolute bottom-3 left-4 z-20">
                    <p
                        className="text-white text-[22px] sm:text-[26px] font-black drop-shadow-lg tracking-tight leading-none"
                        aria-label={`Price: ${mode === 'rent' ? property.rentPrice : property.price}`}
                    >
                        {mode === 'rent' ? property.rentPrice : property.price}
                    </p>
                    <p className="text-white/70 text-[12px] font-semibold">
                        {mode === 'rent' ? property.area : property.pricePerSqft}
                    </p>
                </div>

                {/* RERA badge overlay */}
                <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end gap-1.5">
                    {property.isReraVerified && (
                        <div
                            className="inline-flex items-center gap-1
                                       bg-emerald-500/90 backdrop-blur-sm text-white
                                       text-[10px] font-black px-2.5 py-1 rounded-full
                                       shadow-md uppercase tracking-wide"
                            title="RERA Registered & Verified"
                        >
                            <BadgeCheck className="w-3 h-3 fill-white stroke-emerald-600" aria-hidden="true" />
                            RERA Verified
                        </div>
                    )}
                    <div
                        className="inline-flex items-center gap-1
                                   bg-white/90 backdrop-blur-sm text-zinc-900
                                   text-[9px] font-black px-2.5 py-1 rounded-full
                                   shadow-md uppercase tracking-wider"
                    >
                        <User className="w-2.5 h-2.5 text-brand-primary" />
                        {property.postedBy}
                    </div>
                </div>
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                {/* Title + Location */}
                <div>
                    <h3
                        id={titleId}
                        className="text-[18px] font-extrabold text-zinc-900 leading-snug
                                   group-hover:text-[#baa360] transition-colors duration-300
                                   line-clamp-1 mb-2"
                    >
                        {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[14px] text-brand-paragraph font-semibold">
                        <MapPin className="w-4 h-4 text-brand-primary flex-shrink-0" aria-hidden="true" />
                        <span className="truncate">{property.location}</span>
                    </div>
                </div>

                {/* BHK + Area pills */}
                <div
                    className="flex flex-wrap items-center gap-2"
                    role="group"
                    aria-label="Property specifications"
                >
                    <span
                        className="flex items-center gap-1.5 bg-brand-muted/10 border border-brand-muted/40
                                   text-brand-paragraph text-[11px] font-bold px-2.5 py-1 rounded-full
                                   group-hover:border-brand-primary/30 transition-colors duration-300"
                    >
                        <Building2 className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                        {property.bhk}
                    </span>
                    <span
                        className="flex items-center gap-1.5 bg-brand-muted/10 border border-brand-muted/40
                                   text-brand-paragraph text-[11px] font-bold px-2.5 py-1 rounded-full
                                   group-hover:border-brand-primary/30 transition-colors duration-300"
                    >
                        <Maximize2 className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                        {property.area}
                    </span>
                </div>

                {/* Secondary Specs */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-1">
                    <div className="flex items-center gap-1.5 px-0.5" title="Furnishing Status">
                        <Sofa className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="text-[11px] font-bold text-zinc-500 capitalize leading-tight">{property.furnishing}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-0.5" title="Property Age">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="text-[11px] font-bold text-zinc-500 leading-tight">{property.age} Yrs</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-0.5" title="Floor Info">
                        <Layers className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="text-[11px] font-bold text-zinc-500 leading-tight">
                            {property.floor}/{property.totalFloors} Flr
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-0.5" title="Parking available">
                        <ParkingCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="text-[11px] font-bold text-zinc-500 leading-tight">
                            {property.parking} Pk
                        </span>
                    </div>
                </div>

                {/* Amenities Tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {property.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-[10px] font-bold text-brand-primary/80 bg-brand-primary/5 px-2 py-0.5 rounded-md border border-brand-primary/10">
                            {amenity}
                        </span>
                    ))}
                    {property.amenities.length > 3 && (
                        <span className="text-[10px] font-bold text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-md">
                            +{property.amenities.length - 3}
                        </span>
                    )}
                </div>

                {/* Builder */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100">
                    <p className="text-[12px] text-zinc-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis mr-2">
                        By <span className="text-zinc-900 font-bold">{property.builder}</span>
                    </p>
                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter shrink-0">
                        <Shield className="w-3 h-3" />
                        Verified
                    </div>
                </div>

                {/* CTA — shimmer button */}
                <button
                    className="relative w-full py-3 rounded-[14px] bg-brand-primary
                               text-white text-[14px] font-bold overflow-hidden gap-2
                               hover:bg-brand-primary-hover transition-all duration-500
                               flex items-center justify-center active:scale-[0.98] cursor-pointer"
                    aria-label={`${ctaLabel} — ${property.title}`}
                >
                    {/* shimmer sweep */}
                    <span
                        className="absolute inset-0 -translate-x-full
                                   bg-gradient-to-r from-transparent via-white/20 to-transparent
                                   group-hover:translate-x-full transition-transform duration-[800ms] ease-in-out
                                   pointer-events-none"
                        aria-hidden="true"
                    />
                    <span className="relative flex items-center gap-2">
                        {ctaLabel}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </span>
                </button>
            </div>
        </motion.article >
    );
}
