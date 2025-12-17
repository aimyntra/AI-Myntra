import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from './ui/Button';

export default function Hero() {
    const [taglineIndex, setTaglineIndex] = useState(0);
    const taglines = [
        "Build, Automate & Monetize with AI",
        "From AI Curiosity to AI Mastery",
        "Your Gateway to Practical AI"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-[var(--bg-color)] z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] mask-gradient-to-b"></div>
                {/* Very subtle gradient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--primary)] rounded-full opacity-[0.03] blur-[120px]"></div>
            </div>

            <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">

                {/* Badge - Minimal */}
                <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-fade-in-up">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
                    <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">
                        {taglines[taglineIndex]}
                    </span>
                </div>

                {/* Headline - max 2 lines visually */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Transform Your Career with <br />
                    <span className="text-[var(--text-muted)]">Real-World AI Skills</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-2xl animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
                    AI Mantra helps professionals and founders build production-grade AI systems, automate workflows, and launch products.
                </p>

                {/* CTAs - Centered, max 2 */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Button variant="primary" className="w-full sm:w-auto min-w-[160px] justify-center text-base font-semibold px-8 py-3.5 shadow-none hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] transition-shadow">
                        Explore Programs
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto min-w-[160px] justify-center text-base font-medium px-8 py-3.5 border-white/10 text-white hover:bg-white/5">
                        Talk to an Expert
                    </Button>
                </div>
            </div>
        </section>
    );
}
