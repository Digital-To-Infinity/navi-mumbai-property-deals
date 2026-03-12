"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactInfo() {
    const contactDetails = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Our Office",
            details: ["Shop No. 12, Platinum Heights,", "Sector 20, Kharghar, Navi Mumbai,", "Maharashtra 410210"],
            action: "Get Directions",
            link: "https://maps.google.com"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us Anytime",
            details: ["+91 98765 43210", "+91 22 2345 6789"],
            action: "Call Now",
            link: "tel:+919876543210"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Support",
            details: ["info@nmpdeals.com", "support@nmpdeals.com"],
            action: "Send Email",
            link: "mailto:info@nmpdeals.com"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Working Hours",
            details: ["Monday - Saturday: 10:00 AM - 8:00 PM", "Sunday: 11:00 AM - 5:00 PM"],
            action: "Book Appointment",
            link: "#contact-form"
        }
    ];

    return (
        <div className="space-y-12">
            <div>
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-6"
                >
                    Let's Talk About Your <span className="text-brand-primary">Future Home</span>
                </motion.h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                    Have questions about specific projects? Or need advice on the best sectors to invest in Navi Mumbai? Our experts are ready to provide you with data-driven insights.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
                {contactDetails.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-brand-primary/30 transition-all duration-500"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                        <div className="space-y-2 mb-6">
                            {item.details.map((detail, i) => (
                                <p key={i} className="text-zinc-400 text-sm leading-relaxed">{detail}</p>
                            ))}
                        </div>
                        <a
                            href={item.link}
                            className="inline-flex items-center gap-2 text-brand-primary font-bold text-sm group/link"
                        >
                            {item.action}
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
