"use client";
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { ListingProperty } from '../../components/Listing/listingData';
import { fadeUp } from './variants';

interface Props {
    property: ListingProperty;
}

const PropertyDescription = ({ property }: Props) => {
    return (
        <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
            <h2 className="text-2xl font-extrabold text-brand-heading mb-6 border-b border-zinc-100 pb-4">Description</h2>
            <h3 className="text-xl font-bold text-zinc-900 mb-1">{property.title}</h3>
            <p className="text-sm font-semibold text-zinc-500 mb-6 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {property.address}</p>
            <div className="prose prose-zinc max-w-none text-brand-paragraph font-medium leading-relaxed">
                <p>
                    Welcome to this exquisitely designed {property.bhk} residence located in the prime neighborhood of {property.location}.
                    With an expansive super built-up area of {property.area}, this {property.furnishing} property offers a perfect blend of luxury, comfort, and state-of-the-art aesthetics.
                </p>
                <p className="mt-4">
                    Developed by the renowned <strong>{property.builder}</strong>, the architecture embraces modern living with spacious interiors, excellent cross-ventilation, and abundant natural light. {property.isReraVerified ? "Being a RERA-registered property, it guarantees absolute transparency and trust." : ""}
                </p>
                <p className="mt-4">
                    Ideal for discerning buyers seeking an upgraded lifestyle in one of Navi Mumbai's most sought-after localities. Enjoy close proximity to premium schools, top-tier healthcare facilities, commercial hubs, and seamless transit networks.
                </p>
            </div>
        </motion.div>
    );
};

export default PropertyDescription;
