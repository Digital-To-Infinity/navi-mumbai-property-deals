"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";

export interface ReviewData {
    name: string;
    city: string;
    role: string;
    ratings: {
        connectivity: number;
        lifestyle: number;
        safety: number;
        environment: number;
    };
    like: string;
    dislike: string;
    date: string;
}

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ReviewData) => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
    const [city, setCity] = useState("");
    const [role, setRole] = useState("");
    const roles = ["Owner", "Tenant", "Former Resident", "Real Estate Agent"];

    const [name, setName] = useState("");

    const [ratings, setRatings] = useState({
        connectivity: 0,
        lifestyle: 0,
        safety: 0,
        environment: 0,
    });

    const [like, setLike] = useState("");
    const [dislike, setDislike] = useState("");

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const isFormValid = 
        name.trim().length > 0 &&
        city.trim().length > 0 &&
        role.trim().length > 0 &&
        ratings.connectivity > 0 &&
        ratings.lifestyle > 0 &&
        ratings.safety > 0 &&
        ratings.environment > 0 &&
        like.trim().length >= 100 &&
        dislike.trim().length >= 100;

    const handleSubmit = () => {
        if (!isFormValid) return;
        onSubmit({
            name,
            city,
            role,
            ratings,
            like,
            dislike,
            date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
        });
        
        setName("");
        setCity("");
        setRole("");
        setRatings({ connectivity: 0, lifestyle: 0, safety: 0, environment: 0 });
        setLike("");
        setDislike("");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-white rounded-2xl shadow-2xl z-[110] overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 bg-white sticky top-0 z-10">
                            <h2 className="text-xl font-bold text-brand-heading">Write a Review</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-brand-heading hover:text-red-500 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-6 md:p-8 space-y-10" style={{ scrollbarWidth: "thin" }}>

                            {/* Section 1: Location & Personal Details */}
                            <div className="space-y-7">
                                <div className="space-y-2 pt-2">
                                    <label className="block text-brand-heading font-semibold text-[15px]">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-[15px] placeholder:text-brand-muted"
                                    />
                                    <p className="text-xs text-brand-muted pl-1 font-medium">This name will be shown on your review.</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-brand-heading font-semibold text-[15px]">Add location</label>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-[15px] placeholder:text-brand-muted"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-brand-heading font-semibold text-[15px]">You're best described as...</label>
                                    <div className="flex flex-wrap gap-3">
                                        {roles.map((r) => (
                                            <button
                                                key={r}
                                                onClick={() => setRole(r)}
                                                className={`px-5 py-1.5 rounded-full border text-base font-medium transition-all cursor-pointer ${role === r
                                                    ? "border-brand-primary bg-brand-primary text-white"
                                                    : "border-zinc-200 text-brand-paragraph hover:border-brand-primary hover:text-brand-primary"
                                                    }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-zinc-100" />

                            {/* Section 2: Ratings */}
                            <div className="space-y-3 pt-2">
                                <h3 className="text-[17px] font-semibold text-brand-heading mb-6">Your Thoughts</h3>

                                <StarRating
                                    title="Connectivity & Commute"
                                    subtitle="Availability of public or private conveyance"
                                    rating={ratings.connectivity}
                                    onChange={(v) => setRatings({ ...ratings, connectivity: v })}
                                />
                                <StarRating
                                    title="Lifestyle & facilities"
                                    subtitle="How is the quality of life and necessary services"
                                    rating={ratings.lifestyle}
                                    onChange={(v) => setRatings({ ...ratings, lifestyle: v })}
                                />
                                <StarRating
                                    title="Safety & Security"
                                    subtitle="Do you feel safe at all times in this locality?"
                                    rating={ratings.safety}
                                    onChange={(v) => setRatings({ ...ratings, safety: v })}
                                />
                                <StarRating
                                    title="Environment"
                                    subtitle="How calm, hygiene & soothing are the surroundings?"
                                    rating={ratings.environment}
                                    onChange={(v) => setRatings({ ...ratings, environment: v })}
                                />
                            </div>

                            <hr className="border-zinc-100" />

                            {/* Section 3: Text Reviews */}
                            <div className="space-y-10 pt-2">
                                <div>
                                    <div className="flex flex-col mb-1">
                                        <label className="text-brand-heading font-semibold text-[16px] mb-1">What do you like about this locality?</label>
                                    </div>
                                    <textarea
                                        maxLength={300}
                                        placeholder="Please share your positive experiences regarding the availability of commute options, basic and luxury amenities, safety and security, as well as greenery and parks."
                                        rows={4}
                                        value={like}
                                        onChange={(e) => setLike(e.target.value)}
                                        className="w-full border border-zinc-200 rounded-lg p-5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-[15px] placeholder:text-brand-muted placeholder:leading-relaxed resize-none"
                                    />
                                    <div className="flex items-center justify-between text-[13px] text-brand-muted px-1 font-medium">
                                        <span>Minimum 100, Maximum 300 characters</span>
                                        <span>{like.length < 10 ? `0${like.length}` : like.length}/300</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col mb-1">
                                        <label className="text-brand-heading font-semibold text-[16px] mb-1">What do you dislike about this locality?</label>
                                    </div>
                                    <textarea
                                        maxLength={300}
                                        placeholder="Please share your experiences related to the lack of amenities, parking issues, market accessibility, pollution, water, electricity, and other concerns."
                                        rows={4}
                                        value={dislike}
                                        onChange={(e) => setDislike(e.target.value)}
                                        className="w-full border border-zinc-200 rounded-lg p-5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-[15px] placeholder:text-zinc-400 placeholder:leading-relaxed resize-none"
                                    />
                                    <div className="flex items-center justify-between text-[13px] text-brand-muted px-1 font-medium">
                                        <span>Minimum 100, Maximum 300 characters</span>
                                        <span>{dislike.length < 10 ? `0${dislike.length}` : dislike.length}/300</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="p-5 md:px-8 md:py-5 border-t border-zinc-100 bg-white flex justify-end gap-4 rounded-b-2xl sticky bottom-0">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-lg text-brand-heading font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!isFormValid}
                                className={`px-6 py-2.5 rounded-lg font-bold shadow-sm transition-all ${
                                    isFormValid 
                                        ? "bg-brand-primary hover:bg-brand-primary-hover text-white cursor-pointer" 
                                        : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                                }`}
                            >
                                Post Review
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

const StarRating = ({
    title,
    subtitle,
    rating,
    onChange,
}: {
    title: string;
    subtitle: string;
    rating: number;
    onChange: (val: number) => void;
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 last:mb-0">
            <div>
                <h4 className="!font-medium text-brand-heading text-[16px] leading-tight mb-1">{title}</h4>
                <p className="text-[13px] font-medium text-brand-paragraph">{subtitle}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-8 h-8 md:w-7 md:h-7 cursor-pointer transition-colors ${star <= rating
                            ? "text-brand-primary fill-brand-primary"
                            : "text-zinc-200 fill-transparent"
                            }`}
                        onClick={() => onChange(star)}
                    />
                ))}
            </div>
        </div>
    );
};
