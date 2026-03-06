"use client";
import Link from 'next/link';
import { User, Menu, X, Plus, CircleUserRound } from 'lucide-react';

interface NavbarActionsProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (val: boolean) => void;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (val: boolean) => void;
    wishlistCount: number;
    cartCount: number;
}

const NavbarActions = ({
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: NavbarActionsProps) => {
    return (
        <div className="flex items-center space-x-2 md:space-x-3">
            <Link
                href="/add-property"
                className="group hidden md:flex items-center space-x-2 bg-white text-brand-heading pl-4 pr-1 py-1 text-base font-medium transition-all rounded-full border-2 border-brand-primary/20 hover:border-brand-primary cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="text-brand-heading group-hover:text-brand-primary transition-colors z-10">Add Property</span>
                <div className="w-10 h-10 text-brand-primary rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 z-10">
                    <Plus size={18} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                </div>
            </Link>

            <Link
                href="/login"
                className="bg-brand-primary group hidden sm:flex items-center space-x-2 bg-brand-button text-white pl-1 pr-4 py-1 text-base font-medium hover:bg-brand-button-hover transition-all rounded-full border border-brand-button cursor-pointer"
            >
                <div className="w-10 h-10 text-brand-white rounded-full bg-brand-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-brand-primary transition-colors">
                    <User size={18} strokeWidth={2} />
                </div>
                <span>Sign In</span>
            </Link>

            {/* Mobile-only Icons (<= 426px) */}
            <Link
                href="/add-property"
                className="hidden max-[426px]:flex text-brand-paragraph p-2 rounded-full hover:bg-brand-primary/10 transition-colors"
                title="Add Property"
            >
                <Plus size={24} strokeWidth={2.5} />
            </Link>

            <Link
                href="/login"
                className="hidden max-[426px]:flex text-brand-paragraph hover:text-brand-heading p-2 rounded-full hover:bg-zinc-100 transition-colors"
                title="Sign In"
            >
                <CircleUserRound size={23} strokeWidth={2} />
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
                onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    setIsSearchOpen(false);
                }}
                className="lg:hidden text-brand-heading hover:bg-zinc-100 p-2 rounded-full transition-colors"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
    );
};

export default NavbarActions;
