"use client";
import Link from 'next/link';
import { User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface PredefinedLink {
    name: string;
    href: string;
}

interface MobileMenuProps {
    navLinks: PredefinedLink[];
    setIsMobileMenuOpen: (val: boolean) => void;
}

const MobileMenu = ({ navLinks, setIsMobileMenuOpen }: MobileMenuProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-zinc-100 overflow-hidden absolute top-full left-0 right-0 shadow-xl"
        >
            <div className="px-6 py-8 space-y-4">
                {navLinks.map((link, idx) => (
                    <motion.div
                        key={link.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-semibold text-brand-heading hover:text-brand-button flex items-center justify-between group"
                        >
                            {link.name}
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                →
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
                <div className="pt-6 border-t border-zinc-100 flex flex-col space-y-3">
                    <Link
                        href="/add-property"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-white text-brand-heading border-2 border-brand-primary/20 hover:border-brand-primary py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-[0.98]"
                    >
                        <Plus size={20} className="text-brand-primary" strokeWidth={2.5} />
                        <span>Add Property</span>
                    </Link>
                    <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-brand-button text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-brand-button/20 active:scale-[0.98] transition-transform"
                    >
                        <User size={20} />
                        <span>Sign In</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default MobileMenu;
