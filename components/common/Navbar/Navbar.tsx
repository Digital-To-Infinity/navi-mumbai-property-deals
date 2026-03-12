"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import NavLinks from './NavLinks';
import NavbarActions from './NavbarActions';
import MobileMenu from './MobileMenu';
import Schema from './Schema';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'Buy', href: '/flats-for-sale-in-navi-mumbai' },
        { name: 'Rent', href: '/flats-for-rent-in-navi-mumbai' },
        { name: 'Sell', href: '/sell-property-navi-mumbai' },
        { name: 'Contact', href: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        const handleToggleSearch = () => {
            setIsSearchOpen(prev => !prev);
            setIsMobileMenuOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('toggle-search', handleToggleSearch);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('toggle-search', handleToggleSearch);
        };
    }, []);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-[100]"
        >
            <Schema />
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full transition-all duration-500 ease-in-out border-b ${isScrolled
                    ? 'bg-white/80 backdrop-blur-xl shadow-sm border-zinc-200/50 py-2 px-6 max-[426px]:px-2 max-[426px]:py-0'
                    : 'bg-transparent border-transparent py-4 px-8 max-[769px]:px-4 max-[426px]:px-2 max-[426px]:py-0'
                    }`}
            >
                <div className="w-full flex justify-between items-center h-16">

                    {/* LEFT: Logo */}
                    <Logo />

                    {/* CENTER: NavLinks (Desktop) */}
                    <div className="hidden lg:flex items-center flex-1 justify-center px-8">
                        <AnimatePresence mode="wait">
                            <NavLinks navLinks={navLinks} />
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: Actions */}
                    <NavbarActions
                        isSearchOpen={isSearchOpen}
                        setIsSearchOpen={setIsSearchOpen}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        wishlistCount={wishlistCount}
                        cartCount={cartCount}
                    />

                </div>
            </motion.nav>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu
                        navLinks={navLinks}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;