"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import type { ListingProperty } from '../../listingData';
import { fadeUp } from './variants';

interface Props {
    property: ListingProperty;
}

const PropertyFeatures = ({ property }: Props) => {
    return (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-3xl font-extrabold text-brand-heading tracking-tight">Key Features</h2>
                <div className="h-1.5 w-20 bg-brand-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {(property.features || [
                    "Vastu Compliant",
                    "Italian Marble",
                    "Power Backup",
                    "Visitor Parking",
                    "Smart Security"
                ]).map((feature, i) => (
                    <div key={i} className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl flex flex-col gap-4 text-center hover:bg-white hover:shadow-lg hover:border-brand-primary/20 transition-all group">
                        <div className="mx-auto w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                            <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-black text-brand-heading uppercase tracking-wide">{feature}</span>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default PropertyFeatures;
