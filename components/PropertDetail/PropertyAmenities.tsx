"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Waves, Trees, Car, Shield, Lock, Building2, Wind, CheckCircle2 } from 'lucide-react';
import type { ListingProperty } from '../../listingData';
import { fadeUp } from './variants';

const getAmenityIcon = (amenity: string) => {
    const term = amenity.toLowerCase();
    if (term.includes('gym')) return <Dumbbell className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('pool')) return <Waves className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('park') && !term.includes('parking')) return <Trees className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('parking')) return <Car className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('secur')) return <Shield className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('smart')) return <Lock className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('club')) return <Building2 className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('terrace')) return <Wind className="w-5 h-5 text-brand-primary shrink-0" />;
    return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
};

interface Props {
    property: ListingProperty;
}

const PropertyAmenities = ({ property }: Props) => {
    return (
        <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 mb-8 lg:mb-0">
            <h2 className="text-2xl font-extrabold text-brand-heading mb-6 border-b border-zinc-100 pb-4">Premium Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                        {getAmenityIcon(amenity)}
                        <span className="font-bold text-zinc-800 text-sm">{amenity}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default PropertyAmenities;
