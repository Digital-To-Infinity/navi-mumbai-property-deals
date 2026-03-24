"use client";
import React from "react";
import { motion } from "framer-motion";
import { Layers, Compass, Calendar, Car, Sofa, Ruler, Grid3X3 } from "lucide-react";
import CustomDropdown from "./CustomDropdown";

interface PropertyDetailsProps {
    formData: any;
    updateFormData: (field: string, value: any) => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ formData, updateFormData }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all duration-500"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Layers className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-zinc-900">Property Details</h2>
                    <p className="text-sm text-zinc-500 font-medium">Specific measurements and building features</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Area */}
                <div className="space-y-2 group">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1 group-focus-within:text-brand-primary transition-colors">Total Area (sq.ft)</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. 1,200 sq.ft"
                            value={formData.area}
                            onChange={(e) => updateFormData("area", e.target.value)}
                            className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-5 py-4 text-[14px] font-bold focus:outline-none focus:border-brand-primary focus:bg-white transition-all shadow-sm"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300">
                           <Ruler className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Furnishing */}
                <CustomDropdown
                    label="Furnishing Status"
                    options={[
                        { value: "unfurnished", label: "Unfurnished" },
                        { value: "semi-furnished", label: "Semi-Furnished" },
                        { value: "furnished", label: "Fully Furnished" },
                    ]}
                    value={formData.furnishing}
                    onChange={(val) => updateFormData("furnishing", val)}
                    icon={<Sofa className="w-5 h-5" />}
                />

                {/* Facing */}
                <CustomDropdown
                    label="Facing Direction"
                    options={[
                        { value: "east", label: "East" },
                        { value: "west", label: "West" },
                        { value: "north", label: "North" },
                        { value: "south", label: "South" },
                        { value: "north-east", label: "North-East" },
                        { value: "north-west", label: "North-West" },
                        { value: "south-east", label: "South-East" },
                        { value: "south-west", label: "South-West" },
                    ]}
                    value={formData.facing}
                    onChange={(val) => updateFormData("facing", val)}
                    icon={<Compass className="w-5 h-5" />}
                />

                {/* Floor Information */}
                <div className="space-y-2 group">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1 group-focus-within:text-brand-primary transition-colors">Floor Number</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. 15th"
                            value={formData.floor}
                            onChange={(e) => updateFormData("floor", e.target.value)}
                            className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-5 py-4 text-[14px] font-bold focus:outline-none focus:border-brand-primary focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1 group-focus-within:text-brand-primary transition-colors">Total Floors</label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="e.g. 25"
                            value={formData.totalFloors}
                            onChange={(e) => updateFormData("totalFloors", e.target.value)}
                            className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-5 py-4 text-[14px] font-bold focus:outline-none focus:border-brand-primary focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Parking */}
                <CustomDropdown
                    label="Parking Available"
                    options={[
                        { value: "None", label: "None" },
                        { value: "1 Covered", label: "1 Covered" },
                        { value: "2 Covered", label: "2 Covered" },
                        { value: "1 Open", label: "1 Open" },
                        { value: "2 Open", label: "2 Open" },
                        { value: "3+ Covered", label: "3+ Covered" },
                    ]}
                    value={formData.parking}
                    onChange={(val) => updateFormData("parking", val)}
                    icon={<Car className="w-5 h-5" />}
                />

                {/* Construction Status */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">Construction Status</label>
                    <div className="flex p-1.5 bg-zinc-100/50 rounded-2xl gap-1">
                        {["ready-to-move", "under-construction", "new-launch"].map((status) => (
                            <button
                                key={status}
                                onClick={() => updateFormData("constructionStatus", status)}
                                className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter
                                    ${formData.constructionStatus === status 
                                        ? "bg-white text-zinc-900 shadow-sm border border-zinc-100" 
                                        : "text-zinc-400 hover:text-zinc-600"}`}
                            >
                                {status.replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Age Area */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">Age of Property</label>
                    <div className="flex p-1.5 bg-zinc-100/50 rounded-2xl gap-1">
                        {["0-1", "1-5", "5-10", "10+"].map((age) => (
                            <button
                                key={age}
                                onClick={() => updateFormData("age", age)}
                                className={`flex-1 py-3 px-2 rounded-xl text-[11px] font-black transition-all uppercase
                                    ${formData.age === age 
                                        ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                                        : "text-zinc-400 hover:text-zinc-600"}`}
                            >
                                {age === "10+" ? "10+ Yrs" : age + " Yrs"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyDetails;
