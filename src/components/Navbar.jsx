import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Menu, X, Grip } from 'lucide-react';
import Button from './ui/Button';
import MegaMenu from './layout/MegaMenu';
import MobileMenu from './layout/MobileMenu';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4 ${isScrolled ? 'pt-0' : 'pt-2'}`}>
            <div className={`
        w-full max-w-[95%] bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 md:px-10 py-5 flex items-center justify-between shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300
        ${isScrolled ? 'bg-[#0a0a0a]/95 shadow-2xl border-[var(--primary)]/20' : ''}
      `}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[var(--primary)] blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative border border-white/10 bg-white/5 p-2 rounded-lg group-hover:border-[var(--primary)]/50 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--primary)]">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-white leading-none">AI Mantra</span>
                        <span className="text-[10px] text-[var(--primary)] tracking-widest uppercase font-semibold">Build the Future</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Methodology</Link>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Alumni</a>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Newsletter</a>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact Us</a>
                </div>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-6 relative">
                    <Link to="/apply-mentor" className="hidden lg:block text-sm font-medium text-gray-400 hover:text-white transition-colors mr-4">
                        Apply as Mentor
                    </Link>

                    <div className="hidden lg:block h-6 w-px bg-white/10 mx-2"></div>
                    <SignedOut>
                        <Link to="/sign-in" className="text-sm font-semibold text-gray-300 hover:text-white px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all">
                            Sign In
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 border border-white/20"
                                }
                            }}
                        />
                    </SignedIn>

                    <div className="relative">
                        <Button
                            variant="primary"
                            className="!py-2.5 !px-5 !text-sm !font-bold"
                            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                        >
                            Explore Courses
                        </Button>
                        <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <MobileMenu onClose={() => setMobileMenuOpen(false)} />
                )}
            </AnimatePresence>
        </nav>
    );
}
