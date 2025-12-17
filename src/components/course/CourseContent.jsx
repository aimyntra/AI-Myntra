import React from 'react';
import { motion } from 'framer-motion';
import { Check, Layers, ArrowRight, Database, Bot, Cloud, Terminal, Image, Workflow, Cpu, Code2, Zap, Award, Lock, MessageSquare } from 'lucide-react';

export function MasterySection({ skills, tools }) {
    return (
        <div className="bg-[#0a0a0f]">
            {/* Part A: What You Will Master - Viral Grid */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="mb-16">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
                        >
                            Unlock <span className="text-[#00ff88]">God Mode</span>
                        </motion.h2>
                        <div className="h-1 w-20 bg-[#00ff88] rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {skills.map((skill, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-[#121216] p-8 rounded-[30px] border border-white/10 overflow-hidden hover:border-[#00ff88]/50 transition-all duration-500 shadow-2xl"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Cpu size={100} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-6 relative z-10 group-hover:text-[#00ff88] transition-colors">{skill}</h3>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-start gap-4 text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-[#00ff88]" />
                                        </div>
                                        <span className="text-sm font-medium">Advanced implementation & scaling</span>
                                    </div>
                                    <div className="flex items-start gap-4 text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-[#00ff88]" />
                                        </div>
                                        <span className="text-sm font-medium">Enterprise-grade architecture</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Part B: Production Stack - Tech Grid */}
            <section className="py-24 bg-[#0d0d12] border-y border-white/5 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Production Stack</h3>
                            <p className="text-gray-400">The modern arsenal for high-velocity engineering.</p>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-gray-700" />)}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { cat: "LLMs / Models", items: ["ChatGPT", "Claude", "Gemini"], icon: Bot, color: "text-blue-400" },
                            { cat: "Automation", items: ["Make.com", "Zapier"], icon: Zap, color: "text-purple-400" },
                            { cat: "Media", items: ["Midjourney", "Magnific"], icon: Image, color: "text-pink-400" },
                            { cat: "Engineering", items: ["Cursor", "GitHub"], icon: Terminal, color: "text-[#00ff88]" }
                        ].map((stack, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-[#1a1a20] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all shadow-lg"
                            >
                                <div className={`flex items-center gap-3 mb-6 ${stack.color}`}>
                                    <stack.icon size={24} />
                                    <span className="font-bold tracking-wider uppercase text-sm">{stack.cat}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {stack.items.map((t, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-[#0a0a0f] rounded-lg text-xs font-mono text-gray-300 border border-white/10 hover:border-white/30 transition-colors cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export function ArtifactsShowcase({ projects }) {
    return (
        <section className="py-32 relative overflow-hidden bg-[#0a0a0f]">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff88]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00ff88] text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Cpu size={14} fill="currentColor" />
                        Proof of Work
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00b8ff]">Real Solutions</span>
                    </motion.h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Ship production-grade artifacts. No toy projects allowed. Your GitHub is about to get very green.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -15, rotateX: 5, scale: 1.02 }}
                            className="group relative h-[450px] bg-[#121216] rounded-[32px] border border-white/10 overflow-hidden flex flex-col shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(0,255,136,0.3)] perspective-1000"
                        >
                            {/* Visual Area (Holographic Card) */}
                            <div className="relative h-[240px] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] flex items-center justify-center border-b border-white/5 overflow-hidden group-hover:border-[#00ff88]/30 transition-colors">
                                {/* Grid Background */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                                {/* Floating Stack */}
                                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                                    <div className="absolute w-24 h-32 bg-[#00ff88]/20 rounded-xl blur-xl" />
                                    <Layers size={80} className="text-white drop-shadow-[0_0_15px_rgba(0,255,136,0.5)]" />
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine pointer-events-none" />
                            </div>

                            <div className="p-8 flex-1 flex flex-col relative z-20 bg-[#121216]">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors">{project.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-300 transition-colors">{project.description}</p>
                                <div className="mt-auto flex items-center gap-2 text-[#00ff88] text-sm font-bold uppercase tracking-wider cursor-pointer group-hover:gap-4 transition-all">
                                    View Source Code <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Features / Benefits Grid (The "Icons" from screenshot) */}
                <div className="grid md:grid-cols-3 gap-8 py-10 border-t border-white/5">
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88] mb-6 border border-[#00ff88]/20 group-hover:scale-110 group-hover:bg-[#00ff88] group-hover:text-black transition-all duration-300">
                            <Award size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Industry Certification</h3>
                        <p className="text-gray-400 text-sm">Recognized credential to boost your LinkedIn profile.</p>
                    </div>

                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 border border-purple-500/20 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                            <Lock size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Lifetime Access</h3>
                        <p className="text-gray-400 text-sm">Course updates and new modules included forever.</p>
                    </div>

                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                            <MessageSquare size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Private Discord</h3>
                        <p className="text-gray-400 text-sm">Network with 500+ elite engineers and founders.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
