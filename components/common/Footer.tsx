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
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Blogs", href: "/blogs" },
        { name: "Contact", href: "/contact" },
    ];

    const propertyTypes = [
        { name: "Apartments", href: "/category/apartments" },
        { name: "Villas", href: "/category/villas" },
        { name: "Commercial", href: "/category/commercial" },
        { name: "Plots", href: "/category/plots" },
        { name: "Luxury Properties", href: "/category/luxury" },
    ];

    return (
        <footer className="bg-brand-dark text-white pt-16 pb-12 max-[426px]:pb-28 relative overflow-hidden">
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
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/nm-property-logo.png"
                                alt="Navi Mumbai Property Deals Logo"
                                width={180}
                                height={60}
                                className="h-auto w-auto max-w-[180px]"
                            />
                        </Link>
                        <p className="text-brand-muted text-base leading-relaxed max-w-xs">
                            Explore the most exclusive properties in the most desirable locations in Navi Mumbai. Your dream home awaits.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            {[
                                { Icon: Facebook, bgHover: "hover:bg-[#1877F2]", textHover: "hover:text-white" },
                                { Icon: Twitter, bgHover: "hover:bg-[#1DA1F2]", textHover: "hover:text-white" },
                                { Icon: Instagram, bgHover: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]", textHover: "hover:text-white" },
                                { Icon: Linkedin, bgHover: "hover:bg-[#0A66C2]", textHover: "hover:text-white" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 transition-all duration-300 ${social.bgHover} ${social.textHover}`}
                                >
                                    <social.Icon size={18} />
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
                                    <Link href={link.href} className="text-brand-muted hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group w-fit">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                                    <Link href={link.href} className="text-brand-muted hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group w-fit">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-brand-muted group">
                                <MapPin className="text-brand-primary shrink-0 mt-1" size={18} />
                                <span className="group-hover:text-white transition-colors duration-300">
                                    Navi Mumbai Property Deals,<br />
                                    Sector 17, Vashi,<br />
                                    Navi Mumbai - 400703
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-brand-muted group">
                                <Phone className="text-brand-primary shrink-0" size={18} />
                                <a href="tel:+919876543210" className="group-hover:text-brand-primary transition-colors duration-300">
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-brand-muted group">
                                <Mail className="text-brand-primary shrink-0" size={18} />
                                <a href="mailto:info@navimumbaiproperty.com" className="group-hover:text-brand-primary transition-colors duration-300">
                                    info@navimumbaiproperty.com
                                </a>
                            </li>
                        </ul>
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
                        <Link href="/privacy" className="hover:text-brand-primary hover:underline transition-colors duration-300">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-brand-primary hover:underline transition-colors duration-300">Terms of Service</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
