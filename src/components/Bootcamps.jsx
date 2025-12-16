import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Star } from 'lucide-react';
import Button from './ui/Button';

export default function Bootcamps() {
    return (
        <section className="py-20 bg-[var(--bg-color)] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>

            <div className="container">
                <div className="rounded-[var(--radius)] md:p-12 relative overflow-hidden">

                    <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                <span className="text-yellow-400 font-medium tracking-wider text-xs uppercase">Fast Track</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                AI Builder Bootcamp
                            </h2>

                            <p className="text-[var(--text-muted)] mb-8 text-lg leading-relaxed max-w-md">
                                Build & launch AI projects in one week. Voice agents, automations, and AI clones.
                                Perfect for makers who want to ship fast.
                            </p>

                            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10 text-sm text-[var(--text-dim)] font-medium">
                                <span>No-code + Light Code</span>
                                <span className="w-1 h-1 rounded-full bg-white/10 self-center"></span>
                                <span>MVP Launch</span>
                                <span className="w-1 h-1 rounded-full bg-white/10 self-center"></span>
                                <span>Cohort Based</span>
                            </div>

                            <Link to="/programs/ai-builder-bootcamp">
                                <Button variant="primary" className="w-full md:w-auto px-8">
                                    Join Bootcamp <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </div>

                        <div className="relative">
                            {/* Simplified Visual Representation */}
                            <div className="bg-[#0A0A0A] rounded-xl border border-white/5 p-8 shadow-2xl relative">
                                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center">
                                        <Star className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Project_Launch_V1</h4>
                                        <p className="text-xs text-gray-500">Deployed 2m ago</p>
                                    </div>
                                </div>
                                <div className="space-y-4 opacity-50">
                                    <div className="h-2 bg-white/20 rounded w-3/4"></div>
                                    <div className="h-2 bg-white/20 rounded w-1/2"></div>
                                    <div className="h-2 bg-white/20 rounded w-full"></div>
                                </div>
                                <div className="mt-8 flex justify-between items-center bg-black/50 p-4 rounded-lg border border-white/5">
                                    <span className="text-sm font-mono text-gray-400">$ node deploy_agent.js</span>
                                    <span className="text-xs text-green-500 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
