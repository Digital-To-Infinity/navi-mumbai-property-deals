"use client";
import { motion } from "framer-motion";
import { BadgeCheck, MapPin, TrendingUp, X } from "lucide-react";
import { modeLabel } from "./types";
import type { ListingMode } from "./types";

interface HeroHeaderProps {
    mode: ListingMode;
    pageTitle: string;
    pageSubtitle: string;
    filteredCount: number;
    hasActiveFilters: boolean;
    onResetFilters: () => void
}

export default function HeroHeader({
    mode,
    pageTitle,
    pageSubtitle,
    filteredCount,
    hasActiveFilters,
    onResetFilters,
}: HeroHeaderProps) {
    return (
        <header
            className="relative overflow-hidden border-b border-[#e8dfc8]"
            role="banner"
            style={{
                background:
                    "linear-gradient(135deg, #fefcf5 0%, #fffdf8 35%, #fdf8ec 65%, #faf4e0 100%)",
            }}
        >
            {/* Animated ambient orbs */}
            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
            >
                <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.13, 0.22, 0.13] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[80px]"
                    style={{
                        background: "radial-gradient(circle, #baa360 0%, transparent 70%)",
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.16, 0.08] }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute -bottom-16 -left-16 w-[340px] h-[340px] rounded-full blur-[70px]"
                    style={{
                        background: "radial-gradient(circle, #8f7b44 0%, transparent 70%)",
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4,
                    }}
                    className="absolute top-1/2 left-1/2 w-[500px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
                    style={{
                        background: "radial-gradient(ellipse, #baa360 0%, transparent 65%)",
                    }}
                />
                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#baa360 1px, transparent 1px), linear-gradient(90deg, #baa360 1px, transparent 1px)", backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                    {/* LEFT: Main headline block */}
                    <div className="flex-1 max-w-3xl">
                        {/* Mode badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5"
                            style={{
                                background: "rgba(186,163,96,0.12)",
                                border: "1px solid rgba(186,163,96,0.4)",
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full bg-[#baa360] animate-pulse"
                                aria-hidden="true"
                            />
                            <span className="text-[11px] max-[321px]:text-[10px] font-black uppercase tracking-[0.15em] text-brand-primary-hover">
                                {modeLabel[mode]} · Navi Mumbai
                            </span>
                            <span
                                className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                                style={{
                                    background: "rgba(186,163,96,0.18)",
                                    color: "#8f7b44",
                                }}
                            >
                                Live
                            </span>
                        </motion.div>

                        {/* H1 */}
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.08 }}
                            className="text-[32px] sm:text-[42px] lg:text-[52px] max-[321px]:text-[30px] font-black leading-[1.08] tracking-tight mb-4 text-brand-paragraph"
                        >
                            {(() => {
                                const words = pageTitle.split(" ");
                                const accentText = words.slice(0, 2).join(" ");
                                const rest = words.slice(2).join(" ");
                                return (
                                    <>
                                        <span
                                            className="inline bg-clip-text text-transparent"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(135deg, #7a5d1e 0%, #baa360 50%, #d4aa5e 100%)",
                                            }}
                                        >
                                            {accentText}
                                        </span>
                                        {rest && (
                                            <span className="text-zinc-900"> {rest}</span>
                                        )}
                                    </>
                                );
                            })()}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.16 }}
                            className="text-brand-paragraph text-[16px] sm:text-[18px] font-medium leading-relaxed max-w-2xl mb-6"
                        >
                            {pageSubtitle}
                        </motion.p>

                        {/* Property count + clear filters row */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.24 }}
                            className="flex flex-wrap items-center gap-3"
                        >
                            {/* Animated live count chip */}
                            <div
                                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #baa360 0%, #8f7b44 100%)", boxShadow: "0 4px 20px rgba(186,163,96,0.4)",
                                }}
                            >
                                <span className="text-brand-white font-bold text-[16px]">
                                    {filteredCount}
                                    <span className="font-semibold text-brand-white text-[15px] ml-1.5">
                                        Properties Found
                                    </span>
                                </span>
                            </div>

                            {hasActiveFilters && (
                                <button
                                    onClick={onResetFilters}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl
                                               text-[13px] font-bold text-[#8f7b44]
                                               border border-[#baa360]/35 bg-white/70
                                               hover:bg-[#baa360]/10 hover:border-[#baa360]/60
                                               transition-all duration-200 backdrop-blur-sm"
                                >
                                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                                    Clear Filters
                                </button>
                            )}
                        </motion.div>
                    </div>

                    {/* RIGHT: Trust / Stats panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55, delay: 0.2 }}
                        className="flex flex-col gap-3 lg:min-w-[260px]"
                    >
                        {[
                            {
                                icon: <BadgeCheck className="w-5 h-5" />,
                                label: "RERA Verified",
                                value: "100% Listings",
                                color: "#22c55e",
                            },
                            {
                                icon: <MapPin className="w-5 h-5" />,
                                label: "Coverage Area",
                                value: "Navi Mumbai",
                                color: "#baa360",
                            },
                            {
                                icon: <TrendingUp className="w-5 h-5" />,
                                label: "Market Growth",
                                value: "↑ 12.4% YoY",
                                color: "#baa360",
                            },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-3 px-4 py-3 rounded-2xl
                                           bg-white/80 backdrop-blur-sm
                                           border border-[#baa360]/18
                                           shadow-[0_2px_12px_rgba(186,163,96,0.10)]
                                           hover:shadow-[0_4px_20px_rgba(186,163,96,0.18)]
                                           hover:border-[#baa360]/35
                                           transition-all duration-250 cursor-default"
                            >
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: `rgba(${stat.color === "#22c55e"
                                            ? "34,197,94"
                                            : "186,163,96"
                                            },0.12)`,
                                        color: stat.color,
                                    }}
                                >
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest leading-none mb-0.5">
                                        {stat.label}
                                    </p>
                                    <p className="text-[14px] font-black text-brand-paragraph leading-none">
                                        {stat.value}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom divider line with badge */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                    className="mt-8 flex items-center gap-4"
                >
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#baa360]/30 to-transparent" />
                    <span
                        className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                        style={{
                            color: "#a89060",
                            background: "rgba(186,163,96,0.08)",
                            border: "1px solid rgba(186,163,96,0.25)",
                        }}
                    >
                        <span className="w-1 h-1 rounded-full bg-[#baa360]" />
                        Verified Listings · Updated Daily
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#baa360]/30 to-transparent" />
                </motion.div>
            </div>
        </header>
    );
}
