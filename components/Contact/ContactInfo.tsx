"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
} as any;

export default function ContactInfo() {
    const contactDetails = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Our Office",
            details: ["Shop 12, Sector 20, Kharghar,", "Navi Mumbai, MH 410210"],
            action: "Get Directions",
            link: "https://www.google.com/maps?cid=13110000000000000000", // Representative CID deep link for SEO anchoring
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us Anytime",
            details: ["+91 98765 43210", "+91 22 2345 6789"],
            action: "Call Now",
            link: "tel:+919876543210",
            color: "bg-emerald-50 text-emerald-600"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Support",
            details: ["info@nmpdeals.com", "support@nmpdeals.com"],
            action: "Send Email",
            link: "mailto:info@nmpdeals.com",
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Working Hours",
            details: ["Mon - Sat: 10:00 AM - 8:00 PM", "Sun: 11:00 AM - 5:00 PM"],
            action: "Book Appointment",
            link: "#contact-form",
            color: "bg-orange-50 text-orange-600"
        }
    ];

    const getIconWithAria = (icon: React.ReactNode) => {
        return React.cloneElement(icon as React.ReactElement<any>, { "aria-hidden": "true" });
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
        >
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-semibold tracking-wide uppercase"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                    </span>
                    Contact Information
                </motion.div>

                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-6xl max-[321px]:text-3xl font-bold text-brand-heading leading-tight"
                >
                    Let's Talk About Your <span className="text-brand-primary relative">
                        Future Home
                        <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 100 8" preserveAspectRatio="none">
                            <path d="M0 7C33.3333 2.33333 66.6667 2.33333 100 7" stroke="#baa360" strokeWidth="2" fill="none" />
                        </svg>
                    </span>
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-brand-paragraph text-lg leading-relaxed max-w-lg"
                >
                    Have questions about specific projects? Or need advice on the best sectors to invest in Navi Mumbai? Our experts are ready to provide you with data-driven insights.
                </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {contactDetails.map((item, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="group relative p-8 max-[376px]:p-6 rounded-[2rem] bg-white border border-neutral-border hover:border-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-300 flex flex-col"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                            {getIconWithAria(item.icon)}
                        </div>

                        <h3 className="text-xl font-bold text-brand-heading mb-3">{item.title}</h3>

                        {item.title === "Visit Our Office" ? (
                            <address className="not-italic space-y-1.5 mb-8">
                                {item.details.map((detail, i) => (
                                    <p key={i} className="text-brand-paragraph text-base !font-semibold leading-relaxed">{detail}</p>
                                ))}
                            </address>
                        ) : (
                            <div className="space-y-1.5 mb-8">
                                {item.details.map((detail, i) => (
                                    <p key={i} className="text-brand-paragraph text-base !font-semibold leading-relaxed">{detail}</p>
                                ))}
                            </div>
                        )}

                        <a
                            href={item.link}
                            aria-label={`${item.action} - ${item.title}`}
                            title={item.action}
                            className="mt-auto inline-flex items-center gap-2 text-brand-primary font-bold text-sm tracking-wide group/link"
                        >
                            <span className="relative">
                                {item.action}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover/link:w-full"></span>
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                        </a>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
