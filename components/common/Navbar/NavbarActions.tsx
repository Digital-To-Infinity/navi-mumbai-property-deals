"use client";
import { useState } from 'react';
import Link from 'next/link';
import { User, Menu, X, Plus, CircleUserRound, LogOut, Settings, ChevronDown, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="flex items-center space-x-2 md:space-x-4">
            {/* Add Property Button */}
            <Link
                href="/add-property"
                className="group hidden md:flex items-center space-x-2 bg-white text-brand-heading pl-4 pr-1 py-1 text-base font-medium transition-all rounded-full border-2 border-brand-primary/10 hover:border-brand-primary/40 cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="text-brand-heading group-hover:text-brand-primary transition-colors z-10">Add Property</span>
                <div className="w-10 h-10 text-brand-primary rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 z-10">
                    <Plus size={18} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                </div>
            </Link>

            {/* User Authentication Section */}
            {!user ? (
                <>
                    <Link
                        href="/login"
                        className="bg-brand-primary group hidden sm:flex items-center space-x-2 bg-brand-button text-white pl-1 pr-4 py-1 text-base font-medium hover:bg-zinc-800 transition-all rounded-full border border-zinc-800 cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <div className="w-10 h-10 text-brand-white rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-brand-primary transition-colors">
                            <User size={18} strokeWidth={2} />
                        </div>
                        <span>Sign In</span>
                    </Link>

                    {/* Mobile-only Login Icon */}
                    <Link
                        href="/login"
                        className="hidden max-[426px]:flex text-brand-paragraph hover:text-brand-heading p-2 rounded-full hover:bg-zinc-100 transition-colors"
                        title="Sign In"
                    >
                        <CircleUserRound size={23} strokeWidth={2} />
                    </Link>
                </>
            ) : (
                <div 
                    className="relative hidden sm:block"
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3 bg-white border-2 border-brand-primary/10 hover:border-brand-primary/40 pl-1 pr-4 py-1 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-primary/60 flex items-center justify-center text-white font-bold text-lg shadow-inner group-hover:shadow-brand-primary/20 transition-all">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-brand-heading font-semibold max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                            <ChevronDown size={16} className={`text-brand-paragraph transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </motion.button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-[110] backdrop-blur-xl bg-white/95"
                            >
                                {/* Dropdown Header */}
                                <div className="p-5 bg-gradient-to-br from-brand-primary/5 to-transparent border-b border-zinc-50">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-primary/20">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="overflow-hidden">
                                            <h4 className="text-brand-heading font-bold text-lg truncate leading-tight">{user.name}</h4>
                                            <p className="text-brand-paragraph text-sm truncate opacity-70 mb-1">{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dropdown Body */}
                                <div className="p-2">
                                    <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors group">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <UserCircle size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-brand-heading">My Profile</p>
                                            <p className="text-[12px] text-brand-paragraph">Manage your account settings</p>
                                        </div>
                                    </Link>
                                    
                                    <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors group">
                                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                            <Settings size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-brand-heading">Dashboard</p>
                                            <p className="text-[12px] text-brand-paragraph">View your activity and stats</p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Dropdown Footer */}
                                <div className="p-2 border-t border-zinc-50 bg-zinc-50/50">
                                    <button 
                                        onClick={logout}
                                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 text-red-600 transition-all font-semibold group cursor-pointer"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                                <LogOut size={18} />
                                            </div>
                                            <span className="text-sm">Sign Out</span>
                                        </div>
                                        <ChevronDown size={16} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Mobile-only Icons (Add Property) */}
            {!user && (
                <Link
                    href="/add-property"
                    className="hidden max-[426px]:flex text-brand-paragraph p-2 rounded-full hover:bg-brand-primary/10 transition-colors"
                    title="Add Property"
                >
                    <Plus size={24} strokeWidth={2.5} />
                </Link>
            )}

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
