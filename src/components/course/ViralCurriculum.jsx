import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Clock, Star, Zap } from 'lucide-react';

export default function ViralCurriculum({ curriculum }) {
    const [activeWeek, setActiveWeek] = useState(0);

    return (
        <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light"></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-sm font-bold uppercase tracking-wider mb-6 border border-[#00ff88]/20"
                    >
                        <Zap size={16} fill="currentColor" />
                        Complete Roadmap
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        8 Weeks to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00ccff]">AI Mastery</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A rigorous, day-by-day battlefield plan designed to take you from novice to AI Architect. No fluff, just shipping.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Week Selector (Desktop Sidebar / Mobile Top) */}
                    <div className="lg:col-span-4 flex flex-col gap-3 sticky top-24">
                        {curriculum.map((week, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveWeek(index)}
                                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left relative overflow-hidden ${activeWeek === index
                                        ? 'bg-[#1a1a20] border-[#00ff88]/50 shadow-[0_0_30px_rgba(0,255,136,0.1)]'
                                        : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold transition-colors ${activeWeek === index ? 'bg-[#00ff88] text-black' : 'bg-white/10 text-gray-400 group-hover:text-white'
                                    }`}>
                                    {week.week}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold transition-colors ${activeWeek === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                        {week.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{week.focus}</p>
                                </div>
                                {activeWeek === index && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 to-transparent pointer-events-none"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8 bg-[#121216] border border-white/10 rounded-3xl p-8 md:p-10 relative shadow-2xl min-h-[600px]">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 blur-[80px] rounded-full pointer-events-none" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeWeek}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                                    <div>
                                        <span className="text-[#00ff88] font-bold tracking-wider text-sm uppercase mb-2 block">
                                            Week {curriculum[activeWeek].week}
                                        </span>
                                        <h3 className="text-3xl font-bold text-white">
                                            {curriculum[activeWeek].title}
                                        </h3>
                                        <p className="text-gray-400 mt-2 text-lg">
                                            Focus: <span className="text-gray-200">{curriculum[activeWeek].focus}</span>
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                            <Calendar className="text-gray-400" size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {curriculum[activeWeek].days.map((day, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group flex gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                        >
                                            <div className="flex-shrink-0 w-24 pt-1">
                                                <div className="text-sm font-bold text-gray-500 group-hover:text-[#00ff88] transition-colors uppercase tracking-wider">
                                                    {day.day}
                                                </div>
                                            </div>

                                            <div className="relative pl-6 border-l border-white/10 group-hover:border-[#00ff88]/50 transition-colors">
                                                <div className="absolute left-[-5px] top-[10px] w-2.5 h-2.5 rounded-full bg-[#121216] border-2 border-white/20 group-hover:border-[#00ff88] transition-colors" />
                                                <h5 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ff88] transition-colors">
                                                    {day.topic}
                                                </h5>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    {day.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
