"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Info, Car, Utensils, ShieldCheck, TreePine, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import type { ListingProperty } from '../Listing/listingData';
import { fadeUp } from './variants';
import ReviewModal, { ReviewData } from './ReviewModal';

interface Props {
    property: ListingProperty;
}

const CircularProgress = ({ value, maxValue = 5, icon: Icon }: { value: number, maxValue?: number, icon: any }) => {
    const percentage = (value / maxValue) * 100;
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center shrink-0">
            <svg width="48" height="48" className="transform -rotate-90">
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="transparent"
                    className="text-zinc-100"
                />
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="text-brand-primary transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-brand-primary">
                <Icon className="w-4 h-4" />
            </div>
        </div>
    );
};

const PropertyLocalityReviews = ({ property }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollRef.current || reviews.length <= 1) return;
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollBy({ left: clientWidth > 768 ? 400 : clientWidth, behavior: 'smooth' });
                }
            }
        }, 3500);
        return () => clearInterval(interval);
    }, [reviews.length]);

    const handleAddReview = (data: ReviewData) => {
        setReviews([data, ...reviews]);
    };

    const totalReviewsCount = reviews.length;
    
    // Dynamic calculations based entirely on user submitted reviews
    const denom = totalReviewsCount > 0 ? totalReviewsCount : 1;
    const avgConnectivity = reviews.reduce((acc, r) => acc + r.ratings.connectivity, 0) / denom;
    const avgLifestyle = reviews.reduce((acc, r) => acc + r.ratings.lifestyle, 0) / denom;
    const avgSafety = reviews.reduce((acc, r) => acc + r.ratings.safety, 0) / denom;
    const avgEnvironment = reviews.reduce((acc, r) => acc + r.ratings.environment, 0) / denom;

    const overallAvgRating = totalReviewsCount > 0 ? (avgConnectivity + avgLifestyle + avgSafety + avgEnvironment) / 4 : 0;
    const displayTotalReviews = totalReviewsCount;

    const stats = [
        { label: 'Connectivity', value: Number(avgConnectivity.toFixed(1)), icon: Car },
        { label: 'Lifestyle', value: Number(avgLifestyle.toFixed(1)), icon: Utensils },
        { label: 'Safety', value: Number(avgSafety.toFixed(1)), icon: ShieldCheck },
        { label: 'Green Area', value: Number(avgEnvironment.toFixed(1)), icon: TreePine },
    ];

    const fullStars = Math.floor(overallAvgRating);
    const hasHalfStar = (overallAvgRating % 1) > 0.1;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

    return (
        <motion.div variants={fadeUp} className="w-full font-sans mb-8 lg:mb-0">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-2">
                <div>
                    <h2 className="text-3xl font-extrabold text-brand-heading">
                        Locality <span className='text-brand-primary italic'>Reviews</span>
                    </h2>
                    <div className="h-1.5 w-16 bg-brand-primary rounded-full mt-2"></div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-3 px-6 rounded-lg text-base shadow-sm transition-all shrink-0 cursor-pointer"
                >
                    Review your Society / Locality
                </button>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 flex flex-col md:flex-row overflow-hidden">

                {/* Left Side: Rating */}
                <div className="flex flex-col items-center justify-center py-10 px-8 md:w-[320px] md:border-r border-zinc-100 border-b md:border-b-0 shrink-0">
                    <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-[3.5rem] leading-none font-bold text-brand-heading">{overallAvgRating.toFixed(1)}</span>
                        <span className="text-xl font-bold text-brand-paragraph">/ 5</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 mb-4">
                        {[...Array(fullStars)].map((_, i) => (
                            <Star key={`full-${i}`} className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                        ))}
                        {hasHalfStar && (
                            <div className="relative w-5 h-5 text-emerald-500">
                                <Star className="w-5 h-5 text-zinc-200 fill-zinc-200" />
                                <div className="absolute inset-0 overflow-hidden" style={{ width: `${Math.round((overallAvgRating % 1) * 100)}%` }}>
                                    <Star className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                                </div>
                            </div>
                        )}
                        {[...Array(emptyStars)].map((_, i) => (
                            <Star key={`empty-${i}`} className="w-5 h-5 text-zinc-200 fill-zinc-200" />
                        ))}
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="font-bold text-brand-heading text-[15px]">Average Rating</span>
                        <span className="text-brand-paragraph text-[13px] font-semibold mt-0.5">( {displayTotalReviews} Total Reviews )</span>
                    </div>
                </div>

                {/* Right Side: Features */}
                <div className="flex-1 py-10 px-8 md:px-12 bg-white flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-brand-heading font-bold text-base">Ratings by features</span>
                        <Info className="w-[16px] h-[16px] text-brand-paragraph" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-between gap-y-8 gap-x-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex items-center gap-3.5">
                                <CircularProgress value={stat.value} icon={stat.icon} />
                                <div className="flex flex-col">
                                    <span className="text-brand-heading font-semibold text-[16px]">{stat.label}</span>
                                    <span className="text-brand-muted text-[13px] font-semibold">{stat.value} out of 5</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Testimonials Section */}
            {reviews.length > 0 && (
                <div className="mt-12 space-y-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-brand-heading">
                            Locality <span className='text-brand-primary italic'>Reviews</span>
                        </h2>
                        <div className="h-1.5 w-16 bg-brand-primary rounded-full mt-2"></div>
                    </div>
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                    >
                        {reviews.map((review, idx) => {
                            const avgRating = (review.ratings.connectivity + review.ratings.lifestyle + review.ratings.safety + review.ratings.environment) / 4;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className="bg-white border border-zinc-100 p-6 sm:p-8 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between shrink-0 snap-center snap-always w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-lg border border-brand-primary/20 shrink-0">
                                                    {review.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-brand-heading text-[16px]">{review.name}</h4>
                                                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mt-1">
                                                        <span>{review.role}</span>
                                                        <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-1 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">
                                                    <span className="font-bold text-brand-heading">{avgRating.toFixed(1)}</span>
                                                    <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                                                </div>
                                                <span className="text-xs text-zinc-400 mt-2 font-medium">{review.date}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                                                <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-sm">
                                                    <ThumbsUp className="w-4 h-4" /> What I like
                                                </div>
                                                <p className="text-sm text-brand-paragraph leading-relaxed">{review.like}</p>
                                            </div>

                                            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                                                <div className="flex items-center gap-2 mb-2 text-red-500 font-bold text-sm">
                                                    <ThumbsDown className="w-4 h-4" /> What I dislike
                                                </div>
                                                <p className="text-sm text-brand-paragraph leading-relaxed">{review.dislike}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddReview}
            />
        </motion.div>
    );
};

export default PropertyLocalityReviews;
