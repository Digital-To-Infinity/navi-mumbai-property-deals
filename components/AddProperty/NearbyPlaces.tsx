"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Train, Plus, Trash2, MapPin, School, Hospital, ShoppingBag } from "lucide-react";
import CustomDropdown from "./CustomDropdown";

interface NearbyPlacesProps {
    formData: any;
    updateFormData: (field: string, value: any) => void;
}

const CATEGORIES = [
    { label: "Education", icon: <School className="w-4 h-4" /> },
    { label: "Healthcare", icon: <Hospital className="w-4 h-4" /> },
    { label: "Transit", icon: <Train className="w-4 h-4" /> },
    { label: "Shopping", icon: <ShoppingBag className="w-4 h-4" /> },
];

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ formData, updateFormData }) => {
    
    const addPlace = () => {
        const places = formData.nearbyPlaces || [];
        updateFormData("nearbyPlaces", [...places, { name: "", distance: "", category: "Education" }]);
    };

    const removePlace = (index: number) => {
        const places = (formData.nearbyPlaces || []).filter((_: any, i: number) => i !== index);
        updateFormData("nearbyPlaces", places);
    };

    const updatePlace = (index: number, field: string, value: string) => {
        const places = (formData.nearbyPlaces || []).map((p: any, i: number) => {
            if (i === index) return { ...p, [field]: value };
            return p;
        });
        updateFormData("nearbyPlaces", places);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all duration-500"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-zinc-900">Nearby Landmarks</h2>
                        <p className="text-sm text-zinc-500 font-medium">Add accessibility information (Schools, Transit, etc.)</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addPlace}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white text-[13px] font-black rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-hover transition-all"
                >
                    <Plus className="w-4 h-4" /> Add Landmark
                </motion.button>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {(formData.nearbyPlaces || []).map((place: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-6 bg-zinc-50/50 border border-zinc-100 rounded-2xl flex flex-col md:flex-row gap-4 items-end"
                        >
                            <div className="flex-1 space-y-2 group w-full">
                                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Place Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Ryan International School"
                                    value={place.name}
                                    onChange={(e) => updatePlace(index, "name", e.target.value)}
                                    className="w-full bg-white border border-zinc-100 rounded-xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-brand-primary transition-all"
                                />
                            </div>

                            <div className="w-full md:w-32 space-y-2 group">
                                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Distance</label>
                                <input
                                    type="text"
                                    placeholder="0.8 km"
                                    value={place.distance}
                                    onChange={(e) => updatePlace(index, "distance", e.target.value)}
                                    className="w-full bg-white border border-zinc-100 rounded-xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-brand-primary transition-all text-center"
                                />
                            </div>

                            <div className="w-full md:w-48">
                                <CustomDropdown
                                    label="Category"
                                    options={CATEGORIES.map(c => ({ value: c.label, label: c.label }))}
                                    value={place.category}
                                    onChange={(val) => updatePlace(index, "category", val)}
                                    // Dynamic icon selection based on category
                                    icon={CATEGORIES.find(c => c.label === place.category)?.icon || <MapPin className="w-4 h-4" />}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removePlace(index)}
                                className="p-3 bg-red-50 text-red-500 rounded-xl transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {(formData.nearbyPlaces || []).length === 0 && (
                    <div className="py-12 text-center border-2 border-dashed border-zinc-100 rounded-[32px] bg-zinc-50/20">
                        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300">
                             <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-zinc-600 font-bold mb-1">No landmarks added yet</h3>
                        <p className="text-zinc-400 text-sm">Add nearby schools, hospitals, or transit points</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default NearbyPlaces;
