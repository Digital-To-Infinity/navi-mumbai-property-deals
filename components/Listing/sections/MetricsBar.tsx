"use client";
import MetricCard from "./MetricCard";
import type { ListingMode } from "./types";
import type { LocalityMetrics } from "../listingData";
import { BarChart3, TrendingUp, Zap, BadgeCheck } from "lucide-react";

interface MetricsBarProps {
    mode: ListingMode;
    metrics: LocalityMetrics;
}

export default function MetricsBar({ mode, metrics }: MetricsBarProps) {
    return (
        <section
            aria-label="Market metrics for this locality"
            className="relative overflow-hidden py-5"
            style={{
                background:
                    "linear-gradient(135deg,#fffdf5 0%,#fafaf9 50%,#fdf6e3 100%)",
            }}
        >
            {/* Background mesh pattern */}
            <div
                className="pointer-events-none absolute"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #baa360 0.6px, transparent 0.6px)",
                    backgroundSize: "20px 20px",
                }}
            />
            {/* Ambient glow top-right */}
            <div
                className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.07] -translate-y-1/2 translate-x-1/3 blur-3xl"
                style={{ background: "#baa360" }}
            />

            <div className="container mx-auto px-4 sm:px-6 py-6">
                {/* Section label */}
                <div className="flex items-center gap-2 mb-8">
                    <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest max-[321px]:tracking-wider"
                        style={{
                            background: "rgba(186,163,96,0.12)",
                            color: "#8f7b44",
                            border: "1px solid rgba(186,163,96,0.35)",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary-hover animate-pulse" />
                        Live Market Intelligence · Navi Mumbai
                    </span>
                </div>

                {/* Metric cards row */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    <MetricCard
                        mode={mode}
                        highlight
                        icon={<BarChart3 aria-hidden="true" />}
                        label="Avg. Locality Price"
                        value={metrics.avgPricePsf}
                        sub="Per sq.ft · Q1 2026"
                    />
                    <MetricCard
                        mode={mode}
                        icon={<TrendingUp aria-hidden="true" />}
                        label="1-Year Growth"
                        value={metrics.yearlyGrowth}
                        sub="YoY · Navi Mumbai avg."
                    />
                    <MetricCard
                        mode={mode}
                        icon={<Zap aria-hidden="true" />}
                        label="Demand Index"
                        value={metrics.demandIndex}
                        sub={metrics.demandLabel}
                    />
                    <MetricCard
                        mode={mode}
                        icon={<BadgeCheck aria-hidden="true" />}
                        label="RERA Verified"
                        value="100%"
                        sub="All listings verified"
                    />
                </div>
            </div>
        </section>
    );
}
