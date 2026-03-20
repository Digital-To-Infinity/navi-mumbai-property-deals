"use client";
import { motion, Variants } from "framer-motion";
import { Building2, Train, Plane, Zap } from "lucide-react";
import { ListingMode } from "./types";
import { LocalityInsight } from "../listingData";

interface LocalityInsightsProps {
    mode: ListingMode;
    insight: LocalityInsight;
}

export default function LocalityInsights({ mode, insight }: LocalityInsightsProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const headingText = {
        buy: "Why Invest",
        rent: "Why Live",
        sell: "Why Sell"
    };

    const cardConfigs = {
        buy: {
            market: { title: "Market Overview", subtitle: "Strategic Advantage", icon: Building2, color: "brand-primary", text: insight.whyInvest, highlightLabel: "Investment Highlights", highlights: insight.highlights },
            connectivity: { title: "Connectivity", subtitle: "Seamless Access", icon: Train, color: "blue-500", text: insight.connectivity, highlightLabel: "Transport Highlights", highlights: insight.connectivityHighlights },
            infrastructure: { title: "Infrastructure", subtitle: "Future Growth", icon: Plane, color: "violet-500", text: insight.infrastructure, highlightLabel: "Development Highlights", highlights: insight.infraHighlights }
        },
        rent: {
            market: {
                title: "Lifestyle Index",
                subtitle: "Quality of Living",
                icon: Building2,
                color: "brand-primary",
                text: "Experience an elevated metropolitan lifestyle in India's most organized city. Navi Mumbai's urban planning ensures a perfect balance between luxury high-rises and 40% open green spaces, offering a superior air quality index and a high standard of living compared to traditional Mumbai corridors.",
                highlightLabel: "Lifestyle Highlights",
                highlights: [
                    "Premium Schools (DPS, Ryan, Podar)",
                    "Multispeciality Healthcare (MGM, Apollo)",
                    "Iconic Central Park & Golf Course",
                    "Premium Malls (Nexus Seawoods, Inorbit)",
                    "Over 40% Planned Open Green Spaces"
                ]
            },
            connectivity: {
                title: "Commuter Friendly",
                subtitle: "Daily Convenience",
                icon: Train,
                color: "blue-500",
                text: "Navi Mumbai's transit network is anchored by the newly launched Metro and the Atal Setu (MTHL), reducing travel time to South Mumbai to just 20 minutes. The robust suburban rail system and the highly efficient Navi Mumbai Municipal Transport (NMMT) bus network provide seamless intra-city movement.",
                highlightLabel: "Transit Options",
                highlights: [
                    "MTHL (Atal Setu): 20m drive to SoBo",
                    "Navi Mumbai Metro Line 1, 2 & 3",
                    "Dedicated Cycle Tracks & Wide Roads",
                    "Connected to Mumbai via 3 Rail Lines",
                    "Upcoming NMIA (International Airport)"
                ]
            },
            infrastructure: {
                title: "Urban Amenities",
                subtitle: "Modern Living",
                icon: Zap,
                color: "violet-500",
                text: "Live in a futuristic urban ecosystem designed for seamless daily convenience. From the highly planned CIDCO nodes providing reliable 24/7 utility support to the advanced fiber-optic digital backbone, every detail is engineered to ensure a hassle-free and technologically advanced residential experience.",
                highlightLabel: "Utility Highlights",
                highlights: [
                    "24/7 Uninterrupted Power & Water Supply",
                    "Smart City Surveillance & Security",
                    "Gigabit Fiber-optic Connectivity",
                    "Planned Underground Drainage Systems",
                    "Ample Public Recreational Parks"
                ]
            }
        },
        sell: {
            market: {
                title: "Market Liquidity",
                subtitle: "High Demand Velocity",
                icon: Building2,
                color: "brand-primary",
                text: "Navi Mumbai is currently experiencing a peak in buyer inquiries. Properties here liquidate 30% faster than the Mumbai average due to high migration and corporate shifts.",
                highlightLabel: "Liquidity Factors",
                highlights: ["High Buyer-to-Seller Ratio", "Average Closing: 45 Days", "9.2/10 Demand Index"]
            },
            connectivity: {
                title: "Capital Growth",
                subtitle: "Asset Appreciation",
                icon: Zap,
                color: "blue-500",
                text: "The MTHL and upcoming International Airport have created a massive equity surge. Property values in premium nodes have seen a 16.1% YoY increase.",
                highlightLabel: "Appreciation Triggers",
                highlights: ["Airport Connectivity Premium", "MTHL Impact: +20% Value", "NMIA Operational Surge"]
            },
            infrastructure: {
                title: "Seller Exposure",
                subtitle: "Global Visibility",
                icon: Plane,
                color: "violet-500",
                text: "List your property to reach over 50,000+ monthly active buyers. Our platform ensures your asset reaches premium HNI and corporate investors.",
                highlightLabel: "Marketing Edge",
                highlights: ["Verified Premium Buyers", "Zero Brokerage for Owners", "Professional Photography"]
            }
        }
    };

    const config = cardConfigs[mode === 'sell' ? 'sell' : mode === 'rent' ? 'rent' : 'buy'];

    return (
        <section
            aria-labelledby="locality-insights-heading"
            className="relative overflow-hidden bg-[#fafafa] py-16"
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#baa360]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="container relative mx-auto px-4 sm:px-6">
                {/* Heading */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#baa360]/10 border border-[#baa360]/20 shadow-sm backdrop-blur-sm">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#baa360] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#baa360]"></span>
                            </div>
                            <span className="text-[#baa360] text-[10px] font-black uppercase tracking-[0.2em]">Market Intelligence Pulse</span>
                        </div>
                    </motion.div>

                    <div className="max-w-4xl relative">
                        {/* Interactive Background Shape for Heading */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#baa360]/10 rounded-full blur-[60px] pointer-events-none opacity-50"></div>

                        <motion.h2
                            id="locality-insights-heading"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-heading tracking-tighter leading-[1.05] mb-6"
                        >
                            {headingText[mode]} in {" "}
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#8f7b44] to-brand-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                                    {insight.location}
                                </span>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute -bottom-2 left-0 h-[8px] bg-brand-primary/20 -z-0 rounded-full"
                                ></motion.span>
                            </span>
                            <span className="text-brand-primary">?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-brand-paragraph text-lg font-medium max-w-2xl mx-auto leading-relaxed"
                        >
                            {mode === 'sell'
                                ? "Unlock the maximum potential of your property with real-time market trends, equity analysis, and superior reach for Navi Mumbai's premium assets."
                                : mode === 'rent'
                                    ? "Find your perfect home in a neighborhood that balances metropolitan energy with serene open spaces and world-class connectivity."
                                    : "Deep dive into the regional fundamentals, infrastructure growth, and connectivity maps of India's fastest-growing residential corridor."
                            }
                        </motion.p>
                    </div>
                </div>

                {/* Insights Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 min-[770px]:grid-cols-3 gap-8"
                >
                    {/* Market / Liquidity */}
                    <motion.article
                        variants={itemVariants}
                        whileHover="hover"
                        initial="initial"
                        animate="initial"
                        className={`group relative flex flex-col h-full bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm transition-all duration-500 hover:border-[#baa360]/30`}
                        style={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.05)" }}
                    >
                        <motion.div variants={{ initial: { y: 0 }, hover: { y: -8 } }} className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-10 h-10 rounded-xl bg-[#baa360]/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                                    <config.market.icon className="w-5 h-5 text-[#baa360]" aria-hidden="true" />
                                </div>
                                <span className="text-[14px] font-bold text-brand-muted uppercase tracking-widest">{config.market.title}</span>
                            </div>
                            <h3 className="text-xl font-bold text-brand-heading mb-4 transition-colors">{config.market.subtitle}</h3>
                            <p className="text-brand-paragraph text-[15px] font-medium leading-relaxed mb-6">{config.market.text}</p>
                            {config.market.highlights && (
                                <div className="space-y-3 mt-auto pt-6 border-t border-brand-muted/20">
                                    <span className="text-[12px] font-black uppercase tracking-widest text-[#baa360]">{config.market.highlightLabel}</span>
                                    {config.market.highlights.map((h, i) => (
                                        <div key={i} className="flex items-start gap-2 mt-4">
                                            <div className="w-5 h-5 rounded-full bg-[#baa360]/20 flex items-center justify-center flex-shrink-0">
                                                <Zap className="w-3 h-3 text-[#baa360]" />
                                            </div>
                                            <span className="text-brand-paragraph text-[14px] font-medium leading-tight">{h}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.article>

                    {/* Connectivity / Capital Growth */}
                    <motion.article
                        variants={itemVariants}
                        whileHover="hover"
                        initial="initial"
                        animate="initial"
                        className="group relative flex flex-col h-full bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm transition-all duration-500 hover:border-blue-200"
                        style={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.05)" }}
                    >
                        <motion.div variants={{ initial: { y: 0 }, hover: { y: -8 } }} className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                    <config.connectivity.icon className="w-5 h-5 text-blue-500" aria-hidden="true" />
                                </div>
                                <span className="text-[14px] font-bold text-brand-muted uppercase tracking-widest">{config.connectivity.title}</span>
                            </div>
                            <h3 className="text-xl font-bold text-brand-heading mb-4 transition-colors">{config.connectivity.subtitle}</h3>
                            <p className="text-brand-paragraph text-[15px] leading-relaxed font-medium mb-8 flex-grow">{config.connectivity.text}</p>
                            {config.connectivity.highlights && (
                                <div className="space-y-3 pt-6 border-t border-brand-muted/20">
                                    <span className="text-[12px] font-black uppercase tracking-widest text-blue-500/60">{config.connectivity.highlightLabel}</span>
                                    {config.connectivity.highlights.map((h, i) => (
                                        <div key={i} className="flex items-start gap-2 mt-4">
                                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <Zap className="w-3 h-3 text-blue-500" />
                                            </div>
                                            <span className="text-brand-paragraph text-[14px] font-medium leading-tight">{h}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.article>

                    {/* Infrastructure / Seller Exposure */}
                    <motion.article
                        variants={itemVariants}
                        whileHover="hover"
                        initial="initial"
                        animate="initial"
                        className="group relative flex flex-col h-full bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm transition-all duration-500 hover:border-violet-200"
                        style={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.05)" }}
                    >
                        <motion.div variants={{ initial: { y: 0 }, hover: { y: -8 } }} className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                    <config.infrastructure.icon className="w-5 h-5 text-violet-500" aria-hidden="true" />
                                </div>
                                <span className="text-[14px] font-bold text-brand-muted uppercase tracking-widest">{config.infrastructure.title}</span>
                            </div>
                            <h3 className="text-xl font-bold text-brand-heading mb-4 group-hover:text-violet-500 transition-colors">{config.infrastructure.subtitle}</h3>
                            <p className="text-brand-paragraph text-[15px] leading-relaxed font-medium mb-8 flex-grow">{config.infrastructure.text}</p>
                            {config.infrastructure.highlights && (
                                <div className="space-y-3 pt-6 border-t border-brand-muted/20">
                                    <span className="text-[12px] font-black uppercase tracking-widest text-violet-500/60">{config.infrastructure.highlightLabel}</span>
                                    {config.infrastructure.highlights.map((h, i) => (
                                        <div key={i} className="flex items-start gap-2 mt-4">
                                            <div className="w-5 h-5 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0">
                                                <Zap className="w-2.5 h-2.5 text-violet-500" />
                                            </div>
                                            <span className="text-brand-paragraph text-[14px] font-medium leading-tight">{h}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.article>
                </motion.div>
            </div>
        </section>
    );
}
