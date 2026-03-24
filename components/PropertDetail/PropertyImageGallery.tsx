"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from 'lucide-react';
import type { ListingProperty } from '../../components/Listing/listingData';
import { fadeUp } from './variants';

interface Props {
    property: ListingProperty;
}

const PropertyImageGallery = ({ property }: Props) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const images = property.gallery || [property.image]; 

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % images.length);
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + images.length) % images.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    useEffect(() => {
        if (selectedImage !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImage]);

    return (
        <section id="gallery" className="w-full">
            <motion.div 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                className="flex flex-col gap-8"
            >
                {/* Header with Title & Description */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-brand-heading tracking-tight">Property <span className='text-brand-primary italic'>Gallery</span></h2>
                        <div className="h-1.5 w-26 bg-brand-primary rounded-full"></div>
                    </div>
                </div>

                {/* Premium Layout - Bento/Masonry Style */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 min-h-[500px] md:h-[600px]">
                    {/* Main Featured Image */}
                    <div className="md:col-span-2 lg:col-span-3 h-full">
                        <motion.div 
                            whileHover={{ scale: 0.99 }}
                            onClick={() => setSelectedImage(0)}
                            className="relative w-full h-full rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.1)] group border border-zinc-100"
                        >
                            <Image 
                                src={images[0]} 
                                alt={property.title} 
                                fill 
                                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-full scale-50 group-hover:scale-100 transition-transform duration-500">
                                    <Maximize2 className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Side Grid */}
                    <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-3">
                        {images.slice(1, 5).map((img, i) => (
                            <motion.div
                                key={i + 1}
                                whileHover={{ scale: 0.98 }}
                                onClick={() => setSelectedImage(i + 1)}
                                className={`relative rounded-[22px] overflow-hidden cursor-pointer group shadow-sm border border-zinc-100 h-full
                                    ${i === 3 && images.length > 5 ? 'relative' : ''}
                                `}
                            >
                                <Image 
                                    src={img} 
                                    alt={`${property.title} View ${i + 1}`} 
                                    fill 
                                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                />
                                
                                {i === 3 && images.length > 5 && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white gap-2 group-hover:bg-black/40 transition-colors">
                                        <span className="text-3xl font-black">+{images.length - 5}</span>
                                        <span className="text-xs font-bold uppercase tracking-widest">More Photos</span>
                                    </div>
                                )}
                                
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <Maximize2 className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        
                        {/* Fallback space fillers if < 5 images */}
                        {Array.from({ length: Math.max(0, 4 - (images.length - 1)) }).map((_, i) => (
                           <div key={`empty-${i}`} className="bg-zinc-50 rounded-[22px] border-2 border-dashed border-zinc-200 flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-zinc-200" />
                           </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Premium Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-xl flex items-center justify-center"
                    >
                        {/* Control Bar */}
                        <div className="absolute top-0 inset-x-0 h-20 px-6 flex items-center justify-between z-[110]">
                           <div className="flex items-center gap-4">
                                <div className="text-white/50 text-sm font-black uppercase tracking-widest border-r border-white/10 pr-4">
                                    Gallery
                                </div>
                                <div className="text-white font-bold">
                                    {selectedImage + 1} / {images.length}
                                </div>
                           </div>
                           <button
                                onClick={() => setSelectedImage(null)}
                                className="p-3 bg-white/5 hover:bg-white/15 rounded-2xl text-white transition-all transform hover:rotate-90 duration-300 cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Buttons */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-6 md:left-12 p-4 bg-white/5 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-md z-[110] group"
                                >
                                    <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-6 md:right-12 p-4 bg-white/5 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-md z-[110] group"
                                >
                                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </>
                        )}

                        {/* Main Image Container */}
                        <div className="w-full max-w-7xl h-full flex flex-col items-center justify-center p-4">
                            <motion.div
                                key={selectedImage}
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                                className="relative w-full h-[75vh] group"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={images[selectedImage]}
                                    alt={`${property.title} Full View`}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PropertyImageGallery;
