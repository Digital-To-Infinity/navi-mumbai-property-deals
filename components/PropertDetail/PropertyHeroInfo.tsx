"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, BadgeCheck, Building2, Maximize2, Compass, Calendar } from 'lucide-react';
import type { ListingProperty } from '../../listingData';
import { fadeUp } from './variants';

interface Props {
    property: ListingProperty;
}

const PropertyHeroInfo = ({ property }: Props) => {
    return (
        <div className="flex flex-col gap-8">
            {/* Header Info */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-wider rounded-md border border-brand-primary/20">
                        {property.tag}
                    </span>
                    {property.isReraVerified && (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-wider rounded-md border border-emerald-200 flex items-center gap-1.5">
                            <BadgeCheck className="w-3.5 h-3.5" />
                            RERA Verified
                        </span>
                    )}
                    <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-wider rounded-md border border-zinc-200">
                        {property.propertyType}
                    </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-heading leading-[1.15] tracking-tight">
                    {property.title}
                </h1>
                <p className="flex items-center gap-2 text-lg text-brand-paragraph font-medium mb-2">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                    {property.location}
                </p>
            </motion.div>

            {/* Image Gallery */}
            <motion.div variants={fadeUp} className="w-full h-[400px] sm:h-[500px] relative rounded-3xl overflow-hidden shadow-xl border border-white group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    priority
                />
            </motion.div>

            {/* Quick Stats Banner */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white border border-zinc-100 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex flex-col gap-1 p-3">
                    <Building2 className="w-6 h-6 text-brand-primary mb-1" />
                    <span className="text-zinc-500 text-xs font-bold uppercase">Configuration</span>
                    <span className="text-brand-heading font-extrabold text-lg">{property.bhk}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 border-l border-zinc-100">
                    <Maximize2 className="w-6 h-6 text-brand-primary mb-1" />
                    <span className="text-zinc-500 text-xs font-bold uppercase">Super Area</span>
                    <span className="text-brand-heading font-extrabold text-lg">{property.area}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 md:border-l border-zinc-100">
                    <Compass className="w-6 h-6 text-brand-primary mb-1" />
                    <span className="text-zinc-500 text-xs font-bold uppercase">Facing</span>
                    <span className="text-brand-heading font-extrabold text-lg capitalize">{property.facing}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 border-l border-zinc-100">
                    <Calendar className="w-6 h-6 text-brand-primary mb-1" />
                    <span className="text-zinc-500 text-xs font-bold uppercase">Property Age</span>
                    <span className="text-brand-heading font-extrabold text-lg">{property.age} Years</span>
                </div>
            </motion.div>
        </div>
    );
};

export default PropertyHeroInfo;
