import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function StickyEnrollmentBar({ onEnroll, price = "$299" }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the Hero (approx 600px)
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 pointer-events-none"
                >
                    <div className="max-w-[1200px] mx-auto pointer-events-auto">
                        <div className="bg-[#121216]/90 backdrop-blur-xl border border-[#00ff88]/30 rounded-2xl p-4 shadow-[0_0_50px_rgba(0,255,136,0.2)] flex items-center justify-between gap-4">

                            <div className="hidden md:flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#00ff88]/20 flex items-center justify-center text-[#00ff88] animate-pulse">
                                    <Zap size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Limited Cohort</div>
                                    <div className="text-[#00ff88] text-xs font-bold uppercase tracking-wider">Selling Fast</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 flex-1 md:flex-none justify-end">
                                <div className="hidden sm:block text-right">
                                    <span className="block text-gray-400 text-xs line-through">$599</span>
                                    <span className="block text-white font-bold text-xl">{price}</span>
                                </div>

                                <button
                                    onClick={onEnroll}
                                    className="group relative px-6 py-3 bg-[#00ff88] text-black font-black text-lg uppercase tracking-wide rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_40px_rgba(0,255,136,0.6)] hover:scale-105 transition-all flex items-center gap-2 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Enroll Now <ArrowRight size={20} />
                                    </span>
                                    {/* Flash Effect */}
                                    <div className="absolute inset-0 bg-white/40 -skew-x-12 translate-x-[-150%] group-hover:animate-shine" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
