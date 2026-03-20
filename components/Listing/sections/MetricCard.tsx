"use client";
import { motion } from "framer-motion";
import { BRAND } from "./types";
import type { ListingMode } from "./types";

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub?: string;
    mode: ListingMode;
    highlight?: boolean;
}

export default function MetricCard({
    icon,
    label,
    value,
    sub,
    highlight,
}: MetricCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.018 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
            className={`
                relative flex items-center gap-4 flex-1 min-w-[220px]
                ${BRAND.cardBg} rounded-2xl p-5 max-[769px]:p-3
                border ${BRAND.borderCls}
                ${BRAND.hoverGlow}
                transition-all duration-300 cursor-default overflow-hidden
                ${highlight ? BRAND.iconRing : ""}
            `}
        >
            {/* Corner glow */}
            <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-[0.1] -translate-y-8 translate-x-8 blur-md"
                style={{ background: "#baa360" }}
            />

            {/* Icon badge */}
            <div
                className={`
                    w-12 h-12 rounded-xl ${BRAND.iconBg} ${BRAND.iconRing}
                    flex items-center justify-center flex-shrink-0
                `}
            >
                <span className="text-white [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-[2.5]">
                    {icon}
                </span>
            </div>

            {/* Text stack */}
            <div className="flex-1 min-w-0">
                <p className={`text-[11px] !text-brand-primary-hover font-black ${BRAND.labelCls} uppercase tracking-wider mb-1`}>
                    {label}
                </p>
                <p className={`text-[22px] !text-brand-primary-hover font-black ${BRAND.valueCls} leading-none tracking-tight`}>
                    {value}
                </p>
                {sub && (
                    <p className={`text-[11px] !text-brand-primary-hover font-black ${BRAND.subCls} mt-1 leading-none`}>
                        {sub}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
