import React from 'react';
import { motion } from 'framer-motion';
import { Check, Layers, ArrowRight, Database, Bot, Cloud, Terminal, Image, Workflow } from 'lucide-react';

export function MasterySection({ skills, tools }) {
    return (
        <>
            {/* Part A: What You Will Master */}
            <section style={{ paddingTop: '120px', paddingBottom: '80px' }} className="bg-[#0a0a0f]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-[#00ff88] pl-6">What You Will Master</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {skills.map((skill, idx) => (
                            <div key={idx} className="bg-[#121216] p-8 rounded-2xl border border-white/5 hover:border-[#00ff88]/20 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-4">{skill}</h3>
                                <div className="space-y-3">
                                    <div className="flex gap-3 text-gray-400 text-sm">
                                        <Check size={16} className="text-[#00ff88] mt-0.5 shrink-0" />
                                        <span>Advanced workflow techniques</span>
                                    </div>
                                    <div className="flex gap-3 text-gray-400 text-sm">
                                        <Check size={16} className="text-[#00ff88] mt-0.5 shrink-0" />
                                        <span>Real-world application scenarios</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Spacer/Divider */}
            <div style={{ height: '80px' }} className="bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0d0d12] flex items-center justify-center">
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
            </div>

            {/* Part B: Production Stack - Separate Section */}
            <section style={{ paddingTop: '80px', paddingBottom: '120px' }} className="bg-[#0d0d12]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h3 className="text-3xl font-bold text-white mb-12 border-l-4 border-[#00ff88] pl-6">Production Stack</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { cat: "LLMs / Models", items: ["ChatGPT", "Claude", "Gemini"], icon: Bot },
                            { cat: "Automation", items: ["Make.com", "Zapier"], icon: Workflow },
                            { cat: "Media", items: ["Midjourney", "Magnific"], icon: Image },
                            { cat: "Engineering", items: ["Google AI Studio", "Hugging Face"], icon: Terminal }
                        ].map((stack, idx) => (
                            <div key={idx} className="bg-[#1a1a2e]/50 p-6 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3 mb-4 text-[#00ff88]">
                                    <stack.icon size={20} />
                                    <span className="font-bold text-sm tracking-wider uppercase">{stack.cat}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {stack.items.map((t, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/5">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export function ArtifactsShowcase({ projects }) {
    return (
        <section style={{ paddingTop: '80px', paddingBottom: '120px' }} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0d0d12]" />
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Build Real-World Solutions</h2>
                    <p className="text-gray-400">Ship production-grade artifacts, not just toy projects.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="group relative h-[400px] bg-[#121216] rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
                        >
                            {/* Visual Area */}
                            <div className="h-[200px] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] relative flex items-center justify-center border-b border-white/5">
                                {/* Stacked Layer Simulation */}
                                <div className="absolute w-32 h-40 bg-white/5 rounded-xl rotate-[-6deg] border border-white/10 group-hover:rotate-[-12deg] transition-transform duration-500" />
                                <div className="absolute w-32 h-40 bg-white/10 rounded-xl rotate-[6deg] border border-white/10 group-hover:rotate-[12deg] transition-transform duration-500" />
                                <div className="absolute w-32 h-40 bg-[#121216] rounded-xl flex items-center justify-center border border-white/20 shadow-xl z-10">
                                    <Layers size={40} className="text-[#00ff88]" />
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6">{project.description}</p>
                                <div className="mt-auto flex items-center gap-2 text-[#00ff88] text-sm font-bold cursor-pointer group-hover:gap-3 transition-all">
                                    View Artifact <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
