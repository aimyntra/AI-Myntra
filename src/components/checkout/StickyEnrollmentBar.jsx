import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Tag } from 'lucide-react';

export default function StickyEnrollmentBar({ onEnroll, price, originalPrice }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to calculate discount percentage
    const calculateDiscount = (curr, orig) => {
        if (!orig || !curr) return 0;
        const currNum = parseInt(curr.replace(/[^0-9]/g, ''));
        const origNum = parseInt(orig.replace(/[^0-9]/g, ''));
        if (origNum <= 0) return 0;
        return Math.round(((origNum - currNum) / origNum) * 100);
    };

    const discount = calculateDiscount(price, originalPrice);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 pb-6 pointer-events-none"
                >
                    <div className="max-w-[1200px] mx-auto pointer-events-auto">
                        <div className="bg-[#121216]/95 backdrop-blur-2xl border border-[#00ff88]/30 rounded-2xl p-4 md:px-6 shadow-[0_0_50px_rgba(0,255,136,0.15)] flex items-center justify-between gap-4">

                            <div className="hidden md:flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88] animate-pulse border border-[#00ff88]/20">
                                    <Zap size={22} fill="currentColor" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <div className="text-white font-bold text-base">Limited Time Offer</div>
                                        {discount > 0 && (
                                            <span className="bg-red-500/20 text-red-500 text-[10px] font-black px-2 py-0.5 rounded-full border border-red-500/30 uppercase tracking-widest">
                                                Save {discount}%
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-gray-400 text-xs font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></span>
                                        High Demand
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 flex-1 md:flex-none justify-end">
                                <div className="text-right">
                                    {originalPrice && (
                                        <span className="block text-gray-500 text-xs font-medium line-through decoration-red-500/50 decoration-2">
                                            {originalPrice}
                                        </span>
                                    )}
                                    <span className="block text-white font-black text-2xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e0e0e0]">
                                        {price}
                                        <span className="text-xs text-gray-400 font-normal ml-1">only</span>
                                    </span>
                                </div>

                                <button
                                    onClick={onEnroll}
                                    className="group relative px-6 md:px-8 py-3 bg-[#00ff88] text-black font-black text-lg md:text-xl uppercase tracking-wide rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 overflow-hidden border-b-4 border-[#00cc6a]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Enroll Now <ArrowRight size={22} strokeWidth={2.5} />
                                    </span>
                                    {/* Flash Effect */}
                                    <div className="absolute inset-0 bg-white/60 -skew-x-12 w-[50%] translate-x-[-150%] group-hover:animate-[shine_0.75s_ease-in-out_infinite]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
