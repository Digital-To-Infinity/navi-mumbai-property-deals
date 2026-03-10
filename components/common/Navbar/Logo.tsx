"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group relative flex items-center gap-1 py-1">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                >
                    <Image
                        src="/images/nm-property-logo.png"
                        alt="Navi Mumbai Property Deals - Trusted Real Estate Portal"
                        width={180}
                        height={60}
                        priority
                        fetchPriority="high"
                        className="h-auto w-auto max-w-[120px]"
                    />
                </motion.div>
            </Link>
        </div>
    );
};

export default Logo;
