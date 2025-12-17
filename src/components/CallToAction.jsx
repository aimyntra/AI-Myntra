import React from 'react';
import Button from './ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToAction() {
    return (
        <section className="py-32 relative overflow-hidden flex items-center justify-center bg-black">
            {/* Magic Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

            <div className="container relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 animate-bounce-slow">
                    <Sparkles size={16} className="text-[#CCF381]" />
                    <span className="text-sm font-medium text-white">Limited spots for next cohort</span>
                </div>

                <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter text-white leading-tight">
                    Ready to Build<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCF381] via-white to-[#CCF381] animate-text-shimmer bg-[length:200%_auto]">
                        Your AI Edge?
                    </span>
                </h2>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Join the top 1% of builders shipping real AI products. Your future career starts with one click.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button
                        variant="primary"
                        className="!text-lg !px-10 !py-5 shadow-[0_0_40px_-10px_rgba(204,243,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(204,243,129,0.7)] hover:scale-105 transition-all duration-300"
                    >
                        Start Your Journey <ArrowRight className="ml-2" />
                    </Button>
                    <button className="px-10 py-5 text-lg font-bold text-white rounded-[14px] border border-white/10 hover:bg-white/5 transition-all hover:border-white/30">
                        Book a Strategy Call
                    </button>
                </div>

                {/* Social Proof */}
                <div className="mt-16 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-xl font-bold text-white">Google</span>
                    <span className="text-xl font-bold text-white">Microsoft</span>
                    <span className="text-xl font-bold text-white">Spotify</span>
                    <span className="text-xl font-bold text-white">Amazon</span>
                </div>
            </div>
        </section>
    );
}
