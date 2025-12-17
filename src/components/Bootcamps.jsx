import React from 'react';
import ProgramCard from './ui/ProgramCard';

export default function Bootcamps() {
    return (
        <section className="py-20 bg-[var(--bg-color)] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>

            <div className="container">
                <div className="text-center mb-12">
                    <p className="text-yellow-400 font-bold tracking-widest uppercase mb-2">Fast Track</p>
                    <h2 className="text-3xl md:text-5xl font-bold">Launch in One Week</h2>
                </div>

                <div className="max-w-md mx-auto relative z-10">
                    <ProgramCard
                        title="AI Builder Bootcamp"
                        slug="ai-builder-bootcamp"
                        duration="1 Week"
                        level="Makers & Builders"
                        description="Build & launch AI projects in one week. Voice agents, automations, and AI clones. Perfect for makers who want to ship fast."
                        outcome="MVP Launch, No-code + Light Code"
                        cta="Join Bootcamp"
                        highlight={true}
                    />
                </div>
            </div>
        </section>
    );
}
