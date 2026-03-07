"use client";
import { motion } from "framer-motion";
import { BedDouble, Bath, Square, Heart, IndianRupee, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const properties = [
    {
        id: 1,
        title: "Luxury Villa in Palm Beach",
        location: "Seawoods, Navi Mumbai",
        price: "4.5 Cr",
        beds: 4,
        baths: 4,
        sqft: "3,500",
        type: "Villa",
        tag: "Premium",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Modern Apartment in Kharghar",
        location: "Sector 35, Kharghar",
        price: "1.2 Cr",
        beds: 2,
        baths: 2,
        sqft: "1,100",
        type: "Apartment",
        tag: "Hot Property",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Spacious Duplex with Garden",
        location: "Vashi, Navi Mumbai",
        price: "2.8 Cr",
        beds: 3,
        baths: 3,
        sqft: "2,200",
        type: "Duplex",
        tag: "New Launch",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    },
];

export default function FeaturedProperties() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <section className="py-20 bg-brand-white">
            <div className="container mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <span className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2 block">
                            Handpicked Deals
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-heading mb-4">
                            Featured Properties
                        </h2>
                        <p className="text-brand-paragraph text-lg">
                            Explore our curated selection of premium properties handpicked for their unique charm and unparalleled quality in Navi Mumbai.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 md:mt-0"
                    >
                        <button className="px-6 py-3 border border-brand-primary text-brand-primary rounded-full hover:bg-brand-primary hover:text-white transition-all font-medium flex items-center gap-2 group">
                            View All Properties
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </motion.div>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredCard(property.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 border border-brand-neutral-border/50 group"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                                        {property.tag}
                                    </span>
                                    <span className="bg-white/90 text-brand-heading text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                                        {property.type}
                                    </span>
                                </div>

                                <button className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full text-brand-paragraph hover:text-red-500 hover:bg-white transition-all">
                                    <Heart className="w-5 h-5" />
                                </button>

                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />

                                {/* Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content Container */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-brand-heading mb-2 line-clamp-1 group-hover:text-brand-primary transition-colors">
                                    {property.title}
                                </h3>
                                <p className="text-brand-paragraph text-sm mb-4 flex items-center gap-1.5 line-clamp-1">
                                    <MapPin className="w-4 h-4 text-brand-primary" />
                                    {property.location}
                                </p>

                                {/* Features */}
                                <div className="flex items-center justify-between py-4 border-y border-brand-neutral-border/50 mb-4">
                                    <div className="flex items-center gap-2 text-brand-paragraph text-sm font-medium">
                                        <BedDouble className="w-4 h-4 text-brand-primary" />
                                        <span>{property.beds} Beds</span>
                                    </div>
                                    <div className="w-px h-6 bg-brand-neutral-border/50"></div>
                                    <div className="flex items-center gap-2 text-brand-paragraph text-sm font-medium">
                                        <Bath className="w-4 h-4 text-brand-primary" />
                                        <span>{property.baths} Baths</span>
                                    </div>
                                    <div className="w-px h-6 bg-brand-neutral-border/50"></div>
                                    <div className="flex items-center gap-2 text-brand-paragraph text-sm font-medium">
                                        <Square className="w-4 h-4 text-brand-primary" />
                                        <span>{property.sqft} sqft</span>
                                    </div>
                                </div>

                                {/* Price and Action */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-2xl font-black text-brand-heading">
                                        <IndianRupee className="w-5 h-5 mr-1" />
                                        {property.price}
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-brand-neutral-bg flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                        <span className="sr-only">View Details</span>
                                        <span className="ml-0.5 text-lg leading-none">↗</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
