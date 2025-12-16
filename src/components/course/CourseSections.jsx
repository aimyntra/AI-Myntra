import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, Rocket, ChevronDown, Check, Lock } from 'lucide-react';

export function AudienceSection({ audience }) {
    const icons = [Users, Briefcase, Rocket];

    return (
        <section className="py-32 relative z-10">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Transform Your Career</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Designed for professionals ready to lead the AI revolution.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {audience.slice(0, 3).map((item, idx) => {
                        const Icon = icons[idx] || Users;
                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="bg-[#121216]/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl h-[300px] flex flex-col justify-between group hover:border-[#00ff88]/30 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]"
                            >
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#00ff88] group-hover:bg-[#00ff88] group-hover:text-black transition-all">
                                    <Icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">Ideally suited for those looking to integrate AI into high-impact workflows.</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export function CurriculumTimeline({ structure }) {
    const [expanded, setExpanded] = useState(0);

    return (
        <section className="py-40 bg-[#0a0a0f] relative overflow-hidden">
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
