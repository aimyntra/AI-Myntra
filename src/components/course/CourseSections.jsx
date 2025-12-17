import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, Rocket, ChevronDown, Check, Zap, Target, Crown } from 'lucide-react';

export function AudienceSection({ audience }) {
    // Custom icons map for a premium feel
    const icons = [Users, Briefcase, Rocket];
    const gradients = [
        "from-[#00ff88]/20 to-[#00ff88]/5",
        "from-purple-500/20 to-purple-500/5",
        "from-blue-500/20 to-blue-500/5"
    ];

    return (
        <section className="py-32 relative z-10 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-[#00ff88]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 relative">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Target size={14} className="text-[#00ff88]" />
                        Who Is This For?
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
                    >
                        Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00b8ff]">Career Trajectory</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        This isn't just a course. It's an accelerator for professionals ready to dominate the AI revolution.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {audience.slice(0, 3).map((item, idx) => {
                        const Icon = icons[idx] || Users;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-[#121216] border border-white/10 p-8 rounded-[32px] h-[320px] flex flex-col justify-between overflow-hidden shadow-2xl"
                            >
                                {/* Hover Gradient Fill */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-white/20 shadow-lg">
                                        <Icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#00ff88] transition-colors">
                                        {item}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                        Unlock new capabilities and separate yourself from the obsolete workforce.
                                    </p>
                                </div>

                                <div className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors mt-auto">
                                    <span className="w-8 h-[2px] bg-gray-700 group-hover:bg-[#00ff88] transition-colors" />
                                    Perfect Match
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

// CurriculumTimeline remains unchanged as fallback
export function CurriculumTimeline({ structure }) {
    const [expanded, setExpanded] = useState(0);

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '80px' }} className="bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1000px] mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Curriculum Timeline</h2>
                    <p className="text-gray-400 text-lg">Structured for speed and depth.</p>
                </div>

                <div className="relative ml-4 md:ml-0">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/10 md:left-1/2 md:-ml-[1px]" />

                    <div className="space-y-12">
                        {structure.map((module, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-100px", once: true }}
                                className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Center Dot */}
                                <div className="absolute left-0 w-10 h-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2 z-20">
                                    <div className={`w-4 h-4 rounded-full border-2 ${idx === expanded ? 'bg-[#00ff88] border-[#00ff88] shadow-[0_0_15px_#00ff88]' : 'bg-[#0a0a0f] border-gray-600'} transition-all duration-500`} />
                                </div>

                                {/* Content Card */}
                                <div className={`ml-16 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                                    <div
                                        className={`bg-[#121216] border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-white/20 ${expanded === idx ? 'ring-1 ring-[#00ff88]/50' : ''}`}
                                        onClick={() => setExpanded(idx === expanded ? -1 : idx)}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-2 justify-between">
                                                <span className={`text-[#00ff88] text-xs font-bold uppercase tracking-wider ${idx % 2 !== 0 && 'md:ml-auto'}`}>{module.title}</span>
                                                <ChevronDown size={16} className={`text-gray-500 transition-transform ${expanded === idx ? 'rotate-180' : ''}`} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{module.focus}</h3>
                                        </div>

                                        <AnimatePresence>
                                            {expanded === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-6 pb-6 bg-black/20"
                                                >
                                                    <div className={`space-y-3 pt-4 border-t border-white/5 ${idx % 2 !== 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                                                        {module.outcomes.map((outcome, i) => (
                                                            <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                                                <Check size={14} className="text-[#00ff88]" />
                                                                {outcome}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Empty spacer for grid alignment */}
                                <div className="hidden md:block md:w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
