import React from 'react';
import { Play, Quote } from 'lucide-react';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah J.",
            role: "Product Manager",
            text: "The Agentic workflows I built in one weekend replaced 20 hours of my weekly busywork.",
            color: "from-purple-500 to-blue-500"
        },
        {
            name: "David K.",
            role: "Software Engineer",
            text: "The Engineering Accelerator isn't just theory. I deployed a RAG system to production the next day.",
            color: "from-green-500 to-teal-500"
        },
        {
            name: "Elena R.",
            role: "Founder",
            text: "AI Myntra gave me the confidence to pivot my agency entirely to AI solutions.",
            color: "from-orange-500 to-red-500"
        }
    ];

    return (
        <section className="py-24 bg-[var(--bg-color)]">
            <div className="container">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Real Impact. Real Results.</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-[var(--bg-card)] rounded-[var(--radius)] overflow-hidden border border-transparent hover:border-[var(--border-color)] group hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                            {/* Video Background */}
                            <div className="aspect-video relative overflow-hidden">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                >
                                    <source src={
                                        idx === 0 ? "https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2646/1080p.mp4" :
                                            idx === 1 ? "https://cdn.coverr.co/videos/coverr-coding-on-laptop-2651/1080p.mp4" :
                                                "https://cdn.coverr.co/videos/coverr-people-working-in-a-start-up-4509/1080p.mp4"
                                    } type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform cursor-pointer hover:bg-[var(--primary)] hover:text-black">
                                        <Play className="fill-current ml-1" size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 relative">
                                <Quote className="absolute top-6 left-6 text-[var(--primary)] opacity-20" size={48} />
                                <p className="text-lg mb-6 leading-relaxed relative z-10 text-gray-200">"{t.text}"</p>
                                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-black">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white leading-tight">{t.name}</div>
                                        <div className="text-xs text-[var(--primary)] font-mono">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
