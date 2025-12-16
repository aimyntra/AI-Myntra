import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Zap, Play, Calendar, Clock, Monitor } from 'lucide-react';

export default function CourseHero({ course }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#0a0a0f]">
            {/* Animated Gradient Background Mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.08),transparent_70%)] blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)] blur-[120px] animate-pulse-slower" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[#00ff88] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-md shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                    >
                        <Zap size={14} className="fill-current" />
                        {course.format.type || "Live Cohort"}
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
                    >
                        AI Empowerment <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00b8ff]">
                            Mastery
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg"
                    >
                        {course.tagline}
                    </motion.p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 255, 136, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-[#00ff88] text-black font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
                        >
                            Apply Now
                            <ChevronRight size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border border-white/10 text-white font-medium text-lg rounded-xl flex items-center justify-center gap-2 hover:border-white/30 transition-all backdrop-blur-md"
                        >
                            View Curriculum
                        </motion.button>
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 flex items-center gap-4 text-sm text-gray-500 font-medium"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#0a0a0f]" />
                            ))}
                        </div>
                        <span>Joined by 500+ Engineers</span>
                    </motion.div>
                </motion.div>

                {/* Right: Abstract Graphics / Parallax Mockup */}
                <div className="relative h-[600px] hidden lg:block">
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute top-10 right-10 w-[400px] h-[500px] bg-[#121216]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 z-20 flex flex-col gap-6"
                    >
                        {/* Fake Dashboard UI */}
                        <div className="w-full h-8 bg-white/5 rounded-lg flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="flex-1 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00ff88]/10 to-transparent opacity-50" />
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                                <div className="h-2 w-24 bg-[#00ff88] rounded-full mb-2" />
                                <div className="h-2 w-16 bg-white/20 rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Floating Cards */}
                    <motion.div
                        style={{ y: y2 }}
                        className="absolute bottom-20 left-0 bg-[#1a1a2e]/90 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-xl z-30 flex items-center gap-4 animate-float"
                    >
                        <div className="p-3 bg-[#00ff88]/20 rounded-lg text-[#00ff88]"><Calendar size={24} /></div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Next Cohort</div>
                            <div className="text-white font-bold">Starts Feb 12</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
