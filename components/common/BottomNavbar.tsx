"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Key, Tag, BookOpen } from 'lucide-react';

const navItems = [
    { name: 'Buy', href: '/buy', icon: Home },
    { name: 'Rent', href: '/rent', icon: Key },
    { name: 'Sell', href: '/sell', icon: Tag },
    { name: 'Blogs', href: '/blogs', icon: BookOpen },
];

const BottomNavbar = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Hide navbar on any scroll
            setIsVisible(false);

            // Clear the previous timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set a new timeout to show the navbar after no scrolling
            timeoutRef.current = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-[100] hidden max-[426px]:block transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "translate-y-full"
                }`}
        >
            {/* Elegant glassmorphism background with safe area padding */}
            <nav className="bg-white/85 backdrop-blur-2xl border-t border-zinc-200/60">
                <ul className="flex justify-around items-center h-full max-w-md mx-auto relative">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
                        const Icon = item.icon;

                        return (
                            <li key={item.name} className="relative z-10 flex-1 flex justify-center h-full">
                                {isActive && (
                                    <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-brand-primary/40 via-brand-primary/10 to-transparent -z-10" />
                                )}
                                <Link
                                    href={item.href}
                                    className={`flex flex-col items-center justify-center w-full gap-1.5 py-1 transition-all duration-300 group ${isActive
                                        ? 'text-brand-primary-hover'
                                        : 'text-brand-paragraph hover:text-brand-primary'
                                        }`}
                                >
                                    <div className="relative flex items-center justify-center">
                                        <motion.div
                                            whileTap={{ scale: 0.85 }}
                                            className={`relative z-10 p-2.5 rounded-2xl transition-all duration-500 ease-out ${isActive ? 'scale-105' : 'bg-transparent group-hover:bg-zinc-100/50'
                                                }`}
                                        >
                                            <Icon
                                                size={22}
                                                strokeWidth={isActive ? 2.5 : 2}
                                                className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : 'scale-100'}`}
                                            />
                                        </motion.div>

                                        {/* Golden glow effect behind active icon */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-brand-primary/40 blur-2xl rounded-full scale-150 -z-10" />
                                        )}
                                    </div>
                                    <span className={`text-sm leading-none uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-brand-primary-hover opacity-100 font-bold scale-100' : 'text-brand-paragraph opacity-100 font-semibold scale-95 group-hover:text-brand-primary'
                                        }`}>
                                        {item.name}
                                    </span>
                                </Link>

                                {/* Golden top indicator line with spring animation */}
                                {isActive && (
                                    <motion.div
                                        layoutId="bottom-nav-indicator"
                                        className="absolute top-0 left-0 w-full h-[3px] bg-brand-primary"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default BottomNavbar;
