"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const quickLinks = [
        { name: "Home", href: "/", title: "Back to Home - Navi Mumbai Property Deals" },
        { name: "About Us", href: "/about", title: "Learn About Our Real Estate Expertise in Navi Mumbai" },
        { name: "Blogs", href: "/blogs", title: "Read Latest Navi Mumbai Property Market Trends" },
        { name: "Contact", href: "/contact-navi-mumbai-property-experts", title: "Get in Touch with Our Property Consultants" },
    ];

    const propertyTypes = [
        { name: "Apartments", href: "/apartments-for-sale-in-navi-mumbai", title: "Browse Luxury Apartments for Sale in Navi Mumbai" },
        { name: "Villas", href: "/villas-for-sale-in-navi-mumbai", title: "View Exclusive Villas and Row Houses in Navi Mumbai" },
        { name: "Commercial", href: "/commercial-properties-for-sale-in-navi-mumbai", title: "Invest in Prime Commercial Spaces in Navi Mumbai" },
        { name: "Plots", href: "/residential-plots-for-sale-in-navi-mumbai", title: "Verified Residential and CIDCO Plots for Sale" },
        { name: "Luxury Properties", href: "/luxury-real-estate-navi-mumbai", title: "Explore Premium High-End Properties in Navi Mumbai" },
    ];

    const socialLinks = [
        { Icon: Facebook, href: "https://facebook.com/nmpd", label: "Follow NMPD on Facebook", bgHover: "hover:bg-[#1877F2]", textHover: "hover:text-white" },
        { Icon: Twitter, href: "https://twitter.com/nmpd", label: "Follow NMPD on Twitter", bgHover: "hover:bg-[#1DA1F2]", textHover: "hover:text-white" },
        { Icon: Instagram, href: "https://instagram.com/nmpd", label: "Follow NMPD on Instagram", bgHover: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]", textHover: "hover:text-white" },
        { Icon: Linkedin, href: "https://linkedin.com/company/nmpd", label: "Follow NMPD on LinkedIn", bgHover: "hover:bg-[#0A66C2]", textHover: "hover:text-white" }
    ];

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Navi Mumbai Property Deals",
        "url": "https://navimumbaiproperty.com",
        "logo": "https://navimumbaiproperty.com/images/nm-property-logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98765-43210",
            "contactType": "customer service",
            "areaServed": "Navi Mumbai",
            "availableLanguage": ["English", "Hindi", "Marathi"]
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sector 17, Vashi",
            "addressLocality": "Navi Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400703",
            "addressCountry": "IN"
        }
    };

    return (
        <footer className="bg-brand-dark text-white pt-16 max-[426px]:pt-8 pb-12 max-[426px]:pb-28 relative overflow-hidden">
            {/* SEO: JSON-LD Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            {/* Interactive Grid Background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Decorative Gold Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 z-0"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary rounded-full blur-[120px] opacity-[0.08] pointer-events-none z-0"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-primary rounded-full blur-[120px] opacity-[0.08] pointer-events-none z-0"></div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 backdrop-blur-[1px]">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12"
                >
                    {/* Column 1: About */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <Link href="/" className="inline-block" title="Navi Mumbai Property Deals - Home">
                            <Image
                                src="/images/nm-property-logo.png"
                                alt="Navi Mumbai Property Deals Logo"
                                width={180}
                                height={60}
                                className="h-auto w-auto max-w-[180px]"
                                priority
                            />
                        </Link>
                        <p className="text-brand-muted text-base leading-relaxed max-w-xs">
                            Explore the most exclusive properties in the most desirable locations in Navi Mumbai. Your dream home awaits.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    title={social.label}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 transition-all duration-300 ${social.bgHover} ${social.textHover}`}
                                >
                                    <social.Icon size={18} aria-hidden="true" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-lg font-semibold !text-brand-primary relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-brand-primary"></span>
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        title={link.title}
                                        className="text-brand-muted hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group w-fit"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Property Types */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-lg font-semibold !text-brand-primary relative inline-block">
                            Property Types
                            <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-brand-primary"></span>
                        </h3>
                        <ul className="space-y-3">
                            {propertyTypes.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        title={link.title}
                                        className="text-brand-muted hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group w-fit"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4: Contact & Newsletter */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-lg font-semibold !text-brand-primary relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-brand-primary"></span>
                        </h3>
                        <address className="not-italic">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-brand-muted group">
                                    <MapPin className="text-brand-primary shrink-0 mt-1" size={18} aria-hidden="true" />
                                    <span className="group-hover:text-white transition-colors duration-300">
                                        Navi Mumbai Property Deals,<br className="max-[426px]:hidden" />
                                        Sector 17, Vashi,<br className="max-[426px]:hidden" />
                                        Navi Mumbai - 400703
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-brand-muted group">
                                    <Phone className="text-brand-primary shrink-0" size={18} aria-hidden="true" />
                                    <a
                                        href="tel:+919876543210"
                                        title="Call Navi Mumbai Property Deals"
                                        className="group-hover:text-brand-primary transition-colors duration-300"
                                    >
                                        +91 98765 43210
                                    </a>
                                </li>
                                <li className="flex items-center gap-3 text-brand-muted group">
                                    <Mail className="text-brand-primary shrink-0" size={18} aria-hidden="true" />
                                    <a
                                        href="mailto:info@navimumbaiproperty.com"
                                        title="Email our property experts"
                                        className="group-hover:text-brand-primary transition-colors duration-300"
                                    >
                                        info@navimumbaiproperty.com
                                    </a>
                                </li>
                            </ul>
                        </address>
                        <div className="pt-2">
                            <p className="text-xs text-brand-muted/70 font-medium tracking-wide uppercase">
                                RERA Registered Agent & Member of <br />
                                <span className="text-brand-primary">Navi Mumbai Realtors Association</span>
                            </p>
                        </div>
                    </motion.div>

                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="pt-8 border-t border-zinc-700 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <p className="text-brand-muted text-sm text-center md:text-left">
                        &copy; {currentYear} Navi Mumbai Property Deals. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-base text-brand-muted">
                        <Link
                            href="/privacy"
                            title="Privacy Policy - Navi Mumbai Property Deals"
                            className="hover:text-brand-primary hover:underline transition-colors duration-300"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            title="Terms of Service - Navi Mumbai Property Deals"
                            className="hover:text-brand-primary hover:underline transition-colors duration-300"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
